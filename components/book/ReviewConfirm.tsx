"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, User, CalendarDays, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";

export default function ReviewConfirm() {
  const router = useRouter();
  const { cart, patientDetails, clearBooking } = useCartStore();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (cart.length === 0) {
      router.replace("/book/select-tests");
    } else if (!patientDetails.name || !patientDetails.date || !patientDetails.slot) {
      router.replace("/book/details");
    }
  }, [cart, patientDetails, router]);

  const subtotal = cart.reduce((sum, t) => sum + t.price, 0);
  const homeCollectionFee = 0;
  const finalPayableAmount = subtotal + homeCollectionFee;

  const handleBack = () => {
    router.push("/book/details");
  };

  const handleConfirm = () => {
    // In a real app, this would submit data to an API
    setSubmitted(true);
    // Clear booking state after a delay or immediately
    setTimeout(() => {
      clearBooking();
    }, 5000);
  };

  if (cart.length === 0 || !patientDetails.name) return null; // Prevent flicker

  if (submitted) {
    return (
      <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-accent/10 text-accent ring-8 ring-accent/5">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </span>
        <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Appointment confirmed
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Booked {cart.length} {cart.length === 1 ? "test" : "tests"} for{" "}
          <span className="font-medium text-foreground">{patientDetails.date}</span> at{" "}
          <span className="font-medium text-foreground">{patientDetails.slot}</span>. Confirmation sent to{" "}
          <span className="font-medium text-foreground">{patientDetails.email}</span>.
        </p>
        <div className="mt-8 w-full rounded-2xl border border-border bg-card p-5 text-left">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Booking ID</div>
          <div className="mt-1 font-mono text-sm text-foreground">MDL-9843A2F</div>
        </div>
        <Button onClick={() => router.push("/")} className="mt-8" variant="outline">
          Return Home
        </Button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl sm:px-6 sm:py-14">
      <div className="flex items-center justify-between gap-3 mt-2 mb-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>
        <Button type="button" size="lg" onClick={handleConfirm}>
          Pay ₹{finalPayableAmount} & confirm
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0">
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-7">
            <h2 className="text-lg font-semibold text-foreground">Review & confirm</h2>
            <p className="text-sm text-muted-foreground">One last look before we lock in your slot.</p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <InfoBlock icon={User} label="Patient">
                <div className="font-medium text-foreground">{patientDetails.name}</div>
                <div className="text-xs text-muted-foreground">{patientDetails.phone} · {patientDetails.email}</div>
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
      <span
        className={cn(
          "font-medium",
          accent ? "text-primary" : muted ? "text-muted-foreground" : "text-foreground",
        )}
      >
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
