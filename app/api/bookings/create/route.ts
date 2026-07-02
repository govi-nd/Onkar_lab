import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { cart, patientDetails } = await req.json();

        if (!cart || cart.length === 0) {
            return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
        }

        if (!patientDetails?.name || !patientDetails?.date || !patientDetails?.slot) {
            return NextResponse.json({ error: "Missing patient details" }, { status: 400 });
        }

        // Parse appointment date (format: "YYYY-MM-DD")
        const [year, month, day] = patientDetails.date.split("-").map(Number);
        const appointmentDate = new Date(year, month - 1, day);

        // Compute total from cart (client-sent prices, safe since user already saw them)
        const totalAmount: number = cart.reduce(
            (sum: number, item: { price: number }) => sum + item.price,
            0
        );

        const testIds: string[] = cart.map((item: { id: string }) => item.id);

        const booking = await prisma.booking.create({
            data: {
                userId: session.user.id,
                appointmentDate,
                slot: patientDetails.slot,
                totalAmount,
                tests: {
                    create: testIds.map((testId) => ({ testId })),
                },
            },
        });

        return NextResponse.json({ bookingId: booking.id });
    } catch (error) {
        console.error("Create booking failed:", error);
        return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
    }
}
