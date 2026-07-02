import { notFound } from "next/navigation";
import { CheckCircle2, CalendarDays, Clock } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ bookingId: string }>;
}

export default async function ConfirmationPage({ params }: Props) {
  const { bookingId } = await params;

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      user: true,
      tests: {
        include: {
          test: true,
        },
      },
    },
  });

  if (!booking) {
    notFound();
  }

  const formattedDate = booking.appointmentDate.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl">
        {/* Success header */}
        <div className="flex flex-col items-center text-center">
          <span className="grid h-20 w-20 place-items-center rounded-full bg-green-100 ring-8 ring-green-50 dark:bg-green-900/30 dark:ring-green-900/10">
            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
          </span>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Booking Confirmed!
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Payment successful. Your appointment is locked in.
          </p>
        </div>

        {/* Booking details card */}
        <div className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
          {/* Booking ID */}
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Booking ID</p>
            <p className="mt-1 font-mono text-sm font-semibold text-foreground">{booking.id}</p>
          </div>

          <div className="h-px bg-border" />

          {/* Patient */}
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Patient</p>
            <p className="mt-1 font-medium text-foreground">{booking.user.name}</p>
            <p className="text-xs text-muted-foreground">{booking.user.email}</p>
          </div>

          <div className="h-px bg-border" />

          {/* Appointment */}
          <div className="flex items-start gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
              <CalendarDays className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Appointment</p>
              <p className="mt-0.5 font-medium text-foreground">{formattedDate}</p>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {booking.slot}
              </div>
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Tests Booked */}
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Tests Booked</p>
            <div className="space-y-3">
              {booking.tests.map(({ test }) => (
                <div key={test.id} className="flex items-start justify-between gap-3 text-sm">
                  <div>
                    <p className="font-medium text-foreground">{test.title}</p>
                    {test.category === "Package" && (
                      <p className="text-xs text-muted-foreground mt-0.5">Health Package</p>
                    )}
                  </div>
                  <div className="font-medium shrink-0">₹{test.price}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Total */}
          <div className="flex items-center justify-between rounded-xl bg-primary p-4 text-primary-foreground">
            <span className="text-sm font-medium">Total Paid</span>
            <span className="text-2xl font-bold">₹{booking.totalAmount}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <p className="text-xs text-muted-foreground text-center">
            Our phlebotomist will contact you to confirm the visit. Reports will be shared within 24 hours.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-6 py-2.5 text-sm font-medium text-foreground shadow-sm hover:bg-muted/50 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
