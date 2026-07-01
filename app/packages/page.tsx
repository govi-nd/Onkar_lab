import Link from "next/link";
import { Check, Package, ShieldCheck, Clock, TrendingDown, ArrowRight, Sparkles, Home, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

import { PACKAGES, type HealthPackage } from "@/lib/packages-data";

export const metadata: Metadata = {
  title: "Health Checkup Packages — Onkar Lab Diagnostics",
  description: "Curated health packages — Full Body, Diabetes Care, Heart Health, Women's Wellness & more. Save up to 45% vs individual tests.",
  openGraph: {
    title: "Health Packages — Onkar Labs",
    description: "Comprehensive health checkup packages at unbeatable prices.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const TIER_STYLES: Record<HealthPackage["tier"], { badge: string; accent: string; gradient: string }> = {
  Essential: { badge: "bg-sky-500/10 text-sky-700 border-sky-500/20", accent: "text-sky-600", gradient: "from-sky-500/10 to-transparent" },
  Advanced: { badge: "bg-primary/10 text-primary border-primary/20", accent: "text-primary", gradient: "from-primary/15 to-transparent" },
  Premium: { badge: "bg-violet-500/10 text-violet-700 border-violet-500/20", accent: "text-violet-600", gradient: "from-violet-500/15 to-transparent" },
  Wellness: { badge: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20", accent: "text-emerald-600", gradient: "from-emerald-500/10 to-transparent" },
};

function PackageCard({ pkg }: { pkg: HealthPackage }) {
  const style = TIER_STYLES[pkg.tier];
  const savings = Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100);

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_-25px_rgba(24,95,165,0.4)]",
        pkg.popular ? "border-primary/40 shadow-lg" : "border-border hover:border-primary/30"
      )}
    >
      {pkg.popular && (
        <div className="absolute inset-x-0 top-0 bg-linear-to-r from-primary to-primary/80 py-1.5 text-center text-xs font-semibold uppercase tracking-wider text-primary-foreground">
          <Sparkles className="mr-1 inline h-3 w-3" /> Most Popular
        </div>
      )}

      <div
        className={cn(
          "pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-radial blur-3xl transition-opacity",
          style.gradient
        )}
        aria-hidden
      />

      <div className={cn("relative flex flex-1 flex-col p-6", pkg.popular && "pt-10")}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <Badge variant="outline" className={cn("mb-2 border font-medium", style.badge)}>
              {pkg.tier}
            </Badge>
            <h3 className="text-xl font-bold text-foreground">{pkg.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{pkg.tagline}</p>
          </div>
          <div className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ring-1 ring-inset ring-border", style.gradient)}>
            <Package className={cn("h-5 w-5", style.accent)} />
          </div>
        </div>

        <div className="mt-5 flex items-baseline gap-2">
          <span className="text-3xl font-bold text-foreground">₹{pkg.price.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground line-through">₹{pkg.originalPrice.toLocaleString()}</span>
          <Badge className="ml-auto border-0 bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/20">
            <TrendingDown className="mr-1 h-3 w-3" /> {savings}% off
          </Badge>
        </div>

        <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Award className="h-3.5 w-3.5" /> {pkg.testsCount} tests
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {pkg.turnaround}
          </span>
          <span className="inline-flex items-center gap-1">
            <Home className="h-3.5 w-3.5" /> Home sample
          </span>
        </div>

        <div className="my-5 h-px bg-border" />

        <div className="space-y-2.5">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Key inclusions</div>
          <ul className="space-y-2">
            {pkg.includes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                <Check className={cn("mt-0.5 h-4 w-4 shrink-0", style.accent)} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 rounded-lg bg-secondary/60 p-3 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Best for: </span>
          {pkg.bestFor}
        </div>

        <Button asChild className="mt-5 w-full gap-1.5 group/btn" size="lg">
          <Link href={`/book?test=${pkg.id}`}>
            Book this package
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default function PackagesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-linear-to-b from-(--surface-alt) to-background">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(24,95,165,0.08),transparent_50%),radial-gradient(circle_at_80%_100%,rgba(59,109,17,0.06),transparent_50%)]" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary">
            <Sparkles className="mr-1 h-3 w-3" /> Curated by Onkar Lab  experts
          </Badge>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Health packages that <span className="text-primary">save you more</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Bundled diagnostic tests designed by physicians. Save up to 45% compared to individual tests,
            with free home sample collection and digital reports.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { icon: ShieldCheck, label: "NABL Accredited", sub: "Certified labs" },
              { icon: Home, label: "Free Home Collection", sub: "At your convenience" },
              { icon: Clock, label: "Fast Reports", sub: "Digital in 24 hrs" },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{f.label}</div>
                  <div className="text-xs text-muted-foreground">{f.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Choose your package</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {PACKAGES.length} curated bundles — from essential screening to premium care.
            </p>
          </div>
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
            <Link href="/tests">Browse individual tests</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PACKAGES.map((p) => (
            <PackageCard key={p.id} pkg={p} />
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-[var(--surface-alt)]">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Not sure which package to pick?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Talk to our health advisors — free consultation to match a package to your age, history, and lifestyle.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/contact">Talk to an advisor</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/tests">Browse all tests</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}