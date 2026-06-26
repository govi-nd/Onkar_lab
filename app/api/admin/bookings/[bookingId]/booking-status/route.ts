import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { BookingStatus } from "@/lib/generated/prisma/enums";

const VALID_STATUSES = new Set<string>(Object.values(BookingStatus));

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ bookingId: string }> }
) {
  const adminCheck = await requireAdmin();
  if (adminCheck.error) {
    return adminCheck.error;
  }

  const { bookingId } = await params;

  try {
    const { status } = await req.json();

    if (!VALID_STATUSES.has(status)) {
      return NextResponse.json(
        { message: "Invalid booking status" },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      select: { id: true },
    });

    if (!booking) {
      return NextResponse.json({ message: "Booking not found" }, { status: 404 });
    }

    await prisma.booking.update({
      where: { id: bookingId },
      data: { bookingStatus: status as BookingStatus },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
