"use client";

import { CalendarCheck, CheckCircle2, Sparkles, CalendarDays, ShieldCheck } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const STEPS = [
  { n: 1, label: "Select tests", icon: Sparkles, path: "/book/select-tests" },
  { n: 2, label: "Slot & details", icon: CalendarDays, path: "/book/details" },
  { n: 3, label: "Confirm", icon: ShieldCheck, path: "/book/review" },
] as const;

export default function BookLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const currentStep = pathname.includes("review")
    ? 3
    : pathname.includes("details")
      ? 2
      : 1;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <CalendarCheck className="h-3.5 w-3.5 text-primary" /> Book in under 2 minutes
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Schedule your visit
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
            Add the tests you need, pick a slot, and you&apos;re done. Reports arrive in 24 hours.
          </p>

          {/* Stepper */}
          <div className="mt-8 flex items-center gap-2 sm:gap-4">
            {STEPS.map((s, i) => {
              const active = currentStep === s.n;
              const done = currentStep > s.n;
              const Icon = s.icon;
              return (
                <div key={s.n} className="flex flex-1 items-center gap-2 sm:gap-3">
                  <div
                    className={cn(
                      "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm",
                      active && "border-primary bg-primary text-primary-foreground",
                      done && "border-primary/20 bg-primary/10 text-primary",
                      !active && !done && "border-border bg-card text-muted-foreground",
                    )}
                  >
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-background/20 text-[10px] font-semibold">
                      {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : s.n}
                    </span>
                    <Icon className="hidden h-3.5 w-3.5 sm:block" />
                    <span className="hidden sm:inline">{s.label}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={cn("h-px flex-1", done ? "bg-primary" : "bg-border")} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {children}
    </div>
  );
}
