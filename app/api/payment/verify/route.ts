import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            bookingId,
        } = await req.json();

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !bookingId) {
            return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
        }

        // Verify signature — confirms response genuinely came from Razorpay
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(body)
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (!isAuthentic) {
            // Try to mark payment as failed — use upsert in case the row doesn't exist
            await prisma.payment.upsert({
                where: { bookingId },
                update: { status: "FAILED" },
                create: {
                    bookingId,
                    amount: 0,
                    status: "FAILED",
                },
            });
            return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 });
        }

        // Sequential updates — $transaction([]) doesn't work reliably with Neon serverless adapter
        await prisma.payment.upsert({
            where: { bookingId },
            update: {
                razorpayPaymentId: razorpay_payment_id,
                status: "SUCCESS",
            },
            create: {
                bookingId,
                razorpayPaymentId: razorpay_payment_id,
                amount: 0,
                status: "SUCCESS",
            },
        });

        await prisma.booking.update({
            where: { id: bookingId },
            data: { paymentStatus: "SUCCESS" },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Verify payment failed:", error);
        return NextResponse.json({ success: false, error: "Verification failed" }, { status: 500 });
    }
}