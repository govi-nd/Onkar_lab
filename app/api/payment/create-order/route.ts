import { NextRequest, NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import { prisma } from "@/lib/prisma"; // apna prisma client import path check kar lena

export async function POST(req: NextRequest) {
    try {
        const { bookingId } = await req.json();

        if (!bookingId) {
            return NextResponse.json({ error: "bookingId is required" }, { status: 400 });
        }

        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
            include: { payment: true },
        });

        if (!booking) {
            return NextResponse.json({ error: "Booking not found" }, { status: 404 });
        }

        if (booking.paymentStatus === "SUCCESS") {
            return NextResponse.json({ error: "Booking already paid" }, { status: 400 });
        }

        // Amount hamesha booking.totalAmount se lo, client se kabhi mat lo
        const order = await razorpay.orders.create({
            amount: booking.totalAmount * 100, // rupees -> paise
            currency: "INR",
            receipt: `booking_${booking.id}`,
            notes: { bookingId: booking.id },
        });

        // Payment row upsert - agar retry ho raha hai to purana overwrite ho jaye
        await prisma.payment.upsert({
            where: { bookingId: booking.id },
            update: {
                razorpayOrderId: order.id,
                amount: booking.totalAmount,
                status: "PENDING",
            },
            create: {
                bookingId: booking.id,
                razorpayOrderId: order.id,
                amount: booking.totalAmount,
                status: "PENDING",
            },
        });

        return NextResponse.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        });
    } catch (error) {
        console.error("Create order failed:", error);
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}