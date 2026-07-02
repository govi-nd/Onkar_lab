"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

declare global {
    interface Window {
        Razorpay: any;
    }
}

function loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
        if (typeof window.Razorpay !== "undefined") {
            resolve(true);
            return;
        }
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
}

export function PayButton({
    bookingId,
    userName,
    userEmail,
    userPhone,
    amount,
}: {
    bookingId: string;
    userName: string;
    userEmail: string;
    userPhone?: string;
    amount: number;
}) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handlePayment() {
        setLoading(true);
        try {
            // Ensure Razorpay SDK is loaded
            const loaded = await loadRazorpayScript();
            if (!loaded) {
                alert("Failed to load payment gateway. Please check your internet connection.");
                setLoading(false);
                return;
            }

            // Create Razorpay order
            const res = await fetch("/api/payment/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bookingId }),
            });
            const order = await res.json();

            if (!res.ok) {
                alert(order.error || "Something went wrong creating payment order.");
                setLoading(false);
                return;
            }

            const options = {
                key: order.key,
                amount: order.amount,
                currency: order.currency,
                name: "Onkar Labs",
                description: "Lab Test Booking Payment",
                order_id: order.orderId,
                handler: async function (response: any) {
                    const verifyRes = await fetch("/api/payment/verify", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            bookingId,
                        }),
                    });
                    const result = await verifyRes.json();

                    if (result.success) {
                        router.push(`/booking/${bookingId}/confirmation`);
                    } else {
                        alert("Payment verification failed. Contact support if amount was deducted.");
                        setLoading(false);
                    }
                },
                prefill: {
                    name: userName,
                    email: userEmail,
                    contact: userPhone || "",
                },
                theme: { color: "#0f4c81" },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                    },
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.on("payment.failed", function (response: any) {
                alert(`Payment failed: ${response.error.description}`);
                setLoading(false);
            });
            rzp.open();
        } catch (error) {
            console.error(error);
            alert("Failed to initiate payment. Please try again.");
            setLoading(false);
        }
    }

    return (
        <button
            onClick={handlePayment}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {loading ? (
                <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing…
                </>
            ) : (
                <>Pay ₹{amount} &amp; confirm</>
            )}
        </button>
    );
}