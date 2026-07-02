"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ChevronLeft, User, CalendarDays, Clock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";

declare global {
  interface Window {
    Razorpay: any;
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && typeof window.Razorpay !== "undefined") {
      resolve(true);
      return;
    }
    const existing = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function ReviewConfirm() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { cart, patientDetails, clearBooking } = useCartStore();

  const [paying, setPaying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isSuccess) return;
    if (cart.length === 0) {
      router.replace("/book/select-tests");
    } else if (!patientDetails.name || !patientDetails.date || !patientDetails.slot) {
      router.replace("/book/details");
    }
  }, [cart, patientDetails, router, isSuccess]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);

  const subtotal = cart.reduce((sum, t) => sum + t.price, 0);
  const finalPayableAmount = subtotal;

  const handleBack = () => router.push("/book/details");

  const handlePayNow = async () => {
    setError(null);
    setPaying(true);

    try {
      // 1. Load Razorpay SDK first
      const sdkLoaded = await loadRazorpayScript();
      if (!sdkLoaded) {
        setError("Failed to load payment gateway. Check your internet connection.");
        setPaying(false);
        return;
      }

      // 2. Create booking in DB
      const bookingRes = await fetch("/api/bookings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, patientDetails }),
      });
      const bookingData = await bookingRes.json();

      if (!bookingRes.ok) {
        setError(bookingData.error || "Failed to create booking. Please try again.");
        setPaying(false);
        return;
      }

      const bookingId: string = bookingData.bookingId;

      // 3. Create Razorpay order
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId }),
      });
      const order = await orderRes.json();

      if (!orderRes.ok) {
        setError(order.error || "Failed to create payment order.");
        setPaying(false);
        return;
      }

      // 4. Open Razorpay modal
      const options = {
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        name: "Onkar Labs",
        description: "Lab Test Booking",
        order_id: order.orderId,
        handler: async function (response: any) {
          // 5. Verify payment
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
            setIsSuccess(true);
            clearBooking();
            router.push(`/booking/${bookingId}/confirmation`);
          } else {
            setError("Payment verification failed. Contact support if amount was deducted.");
            setPaying(false);
          }
        },
        prefill: {
          name: patientDetails.name,
          email: patientDetails.email,
          contact: patientDetails.phone || "",
        },
        theme: { color: "#0f4c81" },
        modal: {
          ondismiss: () => setPaying(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response: any) => {
        setError(`Payment failed: ${response.error.description}`);
        setPaying(false);
      });
      rzp.open();
    } catch (err) {
      console.error("Payment flow error:", err);
      setError("Something went wrong. Please try again.");
      setPaying(false);
    }
  };

  if (cart.length === 0 || !patientDetails.name) return null;
  if (status === "loading") return null;

  return (
    <section className="mx-auto max-w-6xl sm:px-6 sm:py-14">
      <div className="flex items-center justify-between gap-3 mt-2 mb-2">
        <Button type="button" variant="outline" onClick={handleBack} className="gap-1">
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>

        <Button type="button" size="lg" onClick={handlePayNow} disabled={paying} className="gap-2">
          {paying ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Processing…
            </>
          ) : (
            <>
              <ShieldCheck className="h-4 w-4" />
              Pay ₹{finalPayableAmount} &amp; Confirm
            </>
          )}
        </Button>
      </div>

      {error && (
        <p className="mt-2 text-sm text-destructive text-right font-medium">{error}</p>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0">
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-7">
            <h2 className="text-lg font-semibold text-foreground">Review &amp; confirm</h2>
            <p className="text-sm text-muted-foreground">One last look before we lock in your slot.</p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <InfoBlock icon={User} label="Patient">
                <div className="font-medium text-foreground">{patientDetails.name}</div>
                <div className="text-xs text-muted-foreground">
                  {patientDetails.phone} · {patientDetails.email}
                </div>
              </InfoBlock>
              <InfoBlock icon={CalendarDays} label="Appointment">
                <div className="font-medium text-foreground">{patientDetails.date}</div>
                <div className="text-xs text-muted-foreground">{patientDetails.slot}</div>
              </InfoBlock>
            </div>

            <div className="mt-4 rounded-xl border border-border bg-muted/30 p-4">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Tests ({cart.length})
              </div>
              <ul className="divide-y divide-border">
                {cart.map((t) => (
                  <li key={t.id} className="flex items-center justify-between py-2 text-sm">
                    <span className="text-foreground">{t.title}</span>
                    <span className="font-medium text-foreground">₹{t.price}</span>
                  </li>
                ))}
              </ul>
            </div>

            {patientDetails.notes && (
              <div className="mt-4 rounded-xl border border-dashed border-border p-3 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Note:</span> {patientDetails.notes}
              </div>
            )}
          </div>
        </div>

        {/* Summary sidebar */}
        <aside className="h-fit rounded-2xl border border-border bg-gradient-to-b from-muted/30 to-card p-5 shadow-sm lg:sticky lg:top-24">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Order summary</h3>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
              {cart.length} {cart.length === 1 ? "test" : "tests"}
            </span>
          </div>

          <ul className="mt-4 space-y-2 text-sm">
            {cart.map((t) => (
              <li key={t.id} className="flex items-start justify-between gap-3">
                <span className="text-muted-foreground line-clamp-1">{t.title}</span>
                <span className="font-medium text-foreground">₹{t.price}</span>
              </li>
            ))}
          </ul>

          <div className="my-4 h-px bg-border" />

          <div className="space-y-1.5 text-sm">
            <Row label="Subtotal" value={`₹${subtotal}`} />
            <Row label="Home collection" value="Free" muted />
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl bg-primary p-4 text-primary-foreground">
            <span className="text-sm font-medium">Payable</span>
            <span className="font-display text-2xl font-bold">₹{finalPayableAmount}</span>
          </div>

          <div className="mt-4 space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-primary" /> Digital reports in 24 hours
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Row({ label, value, muted, accent }: { label: string; value: string; muted?: boolean; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={cn("font-medium", accent ? "text-primary" : muted ? "text-muted-foreground" : "text-foreground")}>
        {value}
      </span>
    </div>
  );
}

function InfoBlock({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-background p-4">
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
}
