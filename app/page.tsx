import Link from "next/link";
import {
  ArrowRight,
  FlaskConical,
  Users,
  Clock,
  ShieldCheck,
  Award,
  Stethoscope,
  Sparkles,
  CheckCircle2,
  Quote,
  HeartPulse,
  Microscope,
  FileText,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import TestCard from "@/components/tests/TestCard";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Onkar Lab Diagnostics — Trusted Diagnostics, Delivered Fast",
  description: "Book 50+ diagnostic lab tests online with 24hr report delivery and trusted accuracy.",
};

export default async function HomePage() {
  const tests = await prisma.test.findMany({
    where: {
      NOT: {
        category: {
          in: ["ert"]
        }
      }
    },
    select: {
      id: true,
      title: true,
      subtitle: true,
      price: true,
      category: true,
    },
  });

  // Treat these seeded tests as featured (popular)
  const featured = tests.slice(0, 4);

  return (
    <div className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: "var(--gradient-soft)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-40 h-80 w-80 rounded-full bg-accent/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "28px 28px",
            color: "var(--primary)",
          }}
        />

        <div className="mx-auto grid max-w-6xl gap-12 px-4 pt-16 pb-20 sm:px-6 sm:pt-24 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-8 lg:pt-28 lg:pb-28">
          {/* copy */}
          <div className="text-center lg:text-left">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent">
              <Sparkles className="h-3 w-3" />
              NABL-accredited diagnostic lab
            </div>
            <h1 className="font-display text-balance text-5xl font-bold leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Trusted Diagnostics,{" "}
              <span
                className="bg-clip-text italic text-transparent"
                style={{ backgroundImage: "var(--gradient-primary)" }}
              >
                Delivered Fast.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg lg:mx-0">
              Book pathology tests online, visit at your slot, and receive digitally signed reports
              in 24 hours — accurate, affordable, and reviewed by experts.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <Button
                asChild
                size="lg"
                className="rounded-full shadow-xl shadow-primary/30 transition-transform hover:-translate-y-0.5"
                style={{ background: "var(--gradient-primary)" }}
              >
                <Link href="/book">
                  Book a Test <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link href="/tests">View All Tests</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground lg:justify-start">
              {["NABL Certified", "ISO 15189", "Home Collection", "Digital Reports"].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* visual mock */}
          <div className="relative mx-auto hidden w-full max-w-md lg:block">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[2rem] opacity-50 blur-2xl"
              style={{ background: "var(--gradient-primary)" }}
            />
            {/* Main report card */}
            <div
              className="relative rounded-3xl border border-white/60 bg-card p-6 shadow-2xl animate-float"
              style={{ boxShadow: "var(--shadow-elegant)" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="grid h-9 w-9 place-items-center rounded-lg text-primary-foreground"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    <FileText className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <div className="text-xs font-semibold text-foreground">Lab Report #2841</div>
                    <div className="text-[10px] text-muted-foreground">Issued · Today, 9:42 AM</div>
                  </div>
                </div>
                <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
                  Verified
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  { label: "Hemoglobin", value: "14.2 g/dL", ok: true },
                  { label: "Cholesterol", value: "182 mg/dL", ok: true },
                  { label: "TSH", value: "2.1 mIU/L", ok: true },
                  { label: "HbA1c", value: "5.4%", ok: true },
                ].map((r) => (
                  <div
                    key={r.label}
                    className="flex items-center justify-between rounded-xl border border-border/70 bg-secondary/40 px-3 py-2.5"
                  >
                    <span className="text-xs font-medium text-muted-foreground">{r.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-foreground">{r.value}</span>
                      <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3 text-[10px] text-muted-foreground">
                <span>Reviewed by Dr. A. Mehra, MD</span>
                <span className="font-semibold text-primary">All Normal</span>
              </div>
            </div>

            {/* floating badge */}
            <div
              className="absolute -left-6 top-12 hidden rounded-2xl border border-white/60 bg-card/90 p-3 shadow-xl backdrop-blur-md sm:flex animate-float [animation-delay:-2s]"
            >
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/10 text-accent">
                  <HeartPulse className="h-4.5 w-4.5" />
                </span>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Turnaround</div>
                  <div className="text-sm font-extrabold text-foreground">Just 24 hrs</div>
                </div>
              </div>
            </div>

            {/* floating rating */}
            <div
              className="absolute -right-4 bottom-10 hidden rounded-2xl border border-white/60 bg-card/90 p-3 shadow-xl backdrop-blur-md sm:flex animate-float [animation-delay:-4s]"
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div>
                  <div className="text-sm font-extrabold text-foreground">4.9 / 5</div>
                  <div className="text-[10px] text-muted-foreground">2k+ reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* logo strip */}
        {/* <div className="border-y border-border/60 bg-card/40 backdrop-blur">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 py-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:px-6">
            <span className="opacity-60">As trusted by</span>
            {["Apollo", "Fortis", "Manipal", "Narayana", "Max Health"].map((b) => (
              <span key={b} className="text-foreground/70">{b}</span>
            ))}
          </div>
        </div> */}
      </section>

      {/* Trust bar */}
      <section className="relative">
        <div className="mx-auto -mt-10 max-w-6xl px-4 sm:px-6">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: FlaskConical, label: "50+", sub: "Accredited tests across all specialties" },
              { icon: Users, label: "2,000+", sub: "Patients trust us every single month" },
              { icon: Clock, label: "24 hrs", sub: "Digitally signed reports, on time" },
            ].map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="group relative overflow-hidden rounded-2xl border border-white/60 bg-card/80 p-5 shadow-lg shadow-primary/[0.06] backdrop-blur-md transition-transform hover:-translate-y-0.5"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                />
                <div className="flex items-center gap-4">
                  <span
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-primary-foreground ring-1 ring-white/20 shadow-md shadow-primary/20"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    <Icon className="h-5.5 w-5.5" />
                  </span>
                  <div>
                    <div className="font-display text-2xl font-bold text-foreground">{label}</div>
                    <div className="text-xs text-muted-foreground">{sub}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured tests */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
              <Microscope className="h-3 w-3" /> Featured
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              Popular <span className="italic text-primary">Tests</span>
            </h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Most-booked tests by our patients this month — curated by our pathologists.
            </p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link href="/tests">See all <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="mt-10 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <div className="flex gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((t) => (
              <div key={t.id} className="w-72 shrink-0 sm:w-auto">
                <TestCard test={t} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — dark premium timeline */}
      <section className="relative overflow-hidden bg-[oklch(0.17_0.03_250)] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-primary/25 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 bottom-10 h-80 w-80 rounded-full bg-accent/25 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white/80">
              <ShieldCheck className="h-3.5 w-3.5" />
              Simple & secure
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
              How it <span className="italic text-white/80">works</span>
            </h2>
            <p className="mt-2 text-sm text-white/60">
              Three simple steps from booking to report.
            </p>
          </div>

          <div className="relative mx-auto mt-16 max-w-2xl">
            <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-white/15 to-accent/60" />
            <div className="space-y-10">
              {[
                { step: "01", icon: FlaskConical, color: "bg-primary", title: "Choose Test", text: "Browse 50+ accredited lab tests from the comfort of your home." },
                { step: "02", icon: Stethoscope, color: "bg-accent", title: "Book Slot", text: "Pick a convenient time and pay securely via online methods." },
                { step: "03", icon: FileText, color: "bg-primary/70", title: "Get Report", text: "Receive your digitally signed reports within 24 hours." },
              ].map(({ step, icon: Icon, color, title, text }) => (
                <div key={step} className="relative flex items-start gap-5 pl-1">
                  <div
                    className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full ${color} text-sm font-bold text-white ring-4 ring-[oklch(0.17_0.03_250)] shadow-lg`}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="pt-1">
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Step {step}</div>
                    <h4 className="mt-1 font-display text-xl font-bold text-white">{title}</h4>
                    <p className="mt-1 text-sm text-white/60">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Onkar Labs */}
      {/* <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent">
            <Award className="h-3 w-3" /> Why Onkar Labs
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Built on <span className="italic text-primary">precision</span>, delivered with care.
          </h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "NABL Accredited", text: "Highest national standard for clinical labs in India." },
            { icon: Microscope, title: "Expert Pathologists", text: "Every report is reviewed and signed by an MD pathologist." },
            { icon: Clock, title: "On-Time, Always", text: "Most reports delivered within 24 hours, guaranteed." },
            { icon: HeartPulse, title: "Home Collection", text: "Free home sample collection across your city." },
            { icon: FileText, title: "Digital Reports", text: "Access reports anywhere with secure digital delivery." },
            { icon: Award, title: "5★ Rated", text: "Loved by 2,000+ patients with a 4.9 rating on Google." },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/10">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-foreground">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* Testimonials */}
      {/* <section className="border-y border-border bg-[var(--surface-alt)]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
              <Quote className="h-3 w-3" /> Patient stories
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              Loved by <span className="italic text-primary">2,000+</span> patients
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { name: "Priya S.", role: "Bengaluru", text: "Reports came in well under 24 hours and the home collection was super smooth. Genuinely impressed." },
              { name: "Rohit K.", role: "Indiranagar", text: "Clean, professional, and the digital reports are easy to share with my doctor. Will keep using Onkar Labs." },
              { name: "Anita R.", role: "Whitefield", text: "Booked a thyroid panel at 9 PM, sample picked next morning, report by evening. Just brilliant service." },
            ].map((t) => (
              <div
                key={t.name}
                className="relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
              >
                <Quote className="h-6 w-6 text-primary/30" />
                <p className="mt-3 text-sm leading-relaxed text-foreground">{t.text}</p>
                <div className="mt-5 flex items-center gap-3 border-t border-border/70 pt-4">
                  <span
                    className="grid h-9 w-9 place-items-center rounded-full text-xs font-bold text-primary-foreground"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <div>
                    <div className="text-sm font-bold text-foreground">{t.name}</div>
                    <div className="text-[11px] text-muted-foreground">{t.role}</div>
                  </div>
                  <div className="ml-auto flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div
          className="relative overflow-hidden rounded-3xl px-6 py-14 text-center text-white shadow-2xl sm:px-12 sm:py-20"
          style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-elegant)" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "22px 22px",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/15 blur-3xl"
          />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
              Ready when you are.
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-white/85 sm:text-base">
              Book your test in under 60 seconds. Free home collection across the city.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary" className="rounded-full bg-white text-primary hover:bg-white/90">
                <Link href="/book">Book a Test <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <Link href="/contact">Talk to us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}