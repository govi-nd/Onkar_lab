import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { requireAdmin } from "@/lib/admin";

export async function POST(req: Request) {
  try {
    const adminCheck = await requireAdmin();
    if (adminCheck.error) {
      return adminCheck.error;
    }

    const formData = await req.formData();

    const file = formData.get("file");
    const bookingId = formData.get("bookingId");
    const remarks = formData.get("remarks");

    if (!(file instanceof File) || typeof bookingId !== "string") {
      return Response.json(
        { message: "Missing fields" },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return Response.json(
        { message: "Only PDF reports can be uploaded" },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      select: { id: true },
    });

    if (!booking) {
      return Response.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    const filePath = `${bookingId}-${Date.now()}-${file.name}`;

    const arrayBuffer = await file.arrayBuffer();

    const { error } = await supabase.storage
      .from("reports")
      .upload(filePath, arrayBuffer, {
        contentType: "application/pdf",
        upsert: true,
      });

    if (error) {
      console.error("Supabase Storage Upload Error details:", error);
      return Response.json(
        { message: `Failed to upload to Supabase: ${error.message}` },
        { status: 500 }
      );
    }

    const { data } = supabase.storage
      .from("reports")
      .getPublicUrl(filePath);

    await prisma.$transaction(async (tx) => {
      await tx.report.upsert({
        where: { bookingId },
        update: {
          fileUrl: data.publicUrl,
          fileName: file.name,
          remarks: typeof remarks === "string" ? remarks : null,
          status: "UPLOADED",
          uploadedAt: new Date(),
        },
        create: {
          bookingId,
          fileUrl: data.publicUrl,
          fileName: file.name,
          remarks: typeof remarks === "string" ? remarks : null,
          status: "UPLOADED",
          uploadedAt: new Date(),
        },
      });

      await tx.booking.update({
        where: { id: bookingId },
        data: { bookingStatus: "REPORT_READY" },
      });
    });

    return Response.json({
      success: true,
      url: data.publicUrl,
    });
  } catch (err: any) {
    console.error("Exception caught in upload route handler:", err);

    return Response.json(
      { message: "Internal server error: " + (err.message || String(err)) },
      { status: 500 }
    );
  }
}
