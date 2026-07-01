"use client";

import { useCart } from "@/components/cartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Droplet,
  Sparkles,
  Beaker,
  HeartPulse,
  FlaskConical,
  Activity,
  Clock,
  ArrowRight
} from "lucide-react";

export type TestDetails = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  category: string;
};

const CATEGORY_STYLES: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; accent: string; ring: string; chip: string; glow: string }
> = {
  Hematology: {
    icon: Droplet,
    accent: "text-rose-600",
    ring: "from-rose-500/20 via-rose-500/5 to-transparent",
    chip: "bg-rose-500/10 text-rose-700 border-rose-500/20",
    glow: "bg-rose-500/10",
  },
  Hormone: {
    icon: Sparkles,
    accent: "text-violet-600",
    ring: "from-violet-500/20 via-violet-500/5 to-transparent",
    chip: "bg-violet-500/10 text-violet-700 border-violet-500/20",
    glow: "bg-violet-500/10",
  },
  Diabetes: {
    icon: Beaker,
    accent: "text-amber-600",
    ring: "from-amber-500/20 via-amber-500/5 to-transparent",
    chip: "bg-amber-500/10 text-amber-700 border-amber-500/20",
    glow: "bg-amber-500/10",
  },
  Cardiac: {
    icon: HeartPulse,
    accent: "text-red-600",
    ring: "from-red-500/20 via-red-500/5 to-transparent",
    chip: "bg-red-500/10 text-red-700 border-red-500/20",
    glow: "bg-red-500/10",
  },
  Liver: {
    icon: FlaskConical,
    accent: "text-emerald-600",
    ring: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    chip: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
    glow: "bg-emerald-500/10",
  },
  Kidney: {
    icon: Activity,
    accent: "text-sky-600",
    ring: "from-sky-500/20 via-sky-500/5 to-transparent",
    chip: "bg-sky-500/10 text-sky-700 border-sky-500/20",
    glow: "bg-sky-500/10",
  },
};

const getCategoryStyles = (category: string) => {
  const key = Object.keys(CATEGORY_STYLES).find(k => category.toLowerCase().includes(k.toLowerCase()));
  if (key) return CATEGORY_STYLES[key];

  return {
    icon: Activity,
    accent: "text-slate-600",
    ring: "from-slate-500/20 via-slate-500/5 to-transparent",
    chip: "bg-slate-500/10 text-slate-700 border-slate-500/20",
    glow: "bg-slate-500/10",
  };
};

export default function TestCard({ test }: { test: TestDetails }) {
  const { cart, addToCart, removeFromCart } = useCart();
  const isInCart = cart.some((item) => item.id === test.id);

  const style = getCategoryStyles(test.category);
  const Icon = style.icon;

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_50px_-20px_rgba(24,95,165,0.35)]">
      {/* decorative gradient orb */}
      <div
        className={cn(
          "pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-radial blur-2xl transition-opacity duration-300",
          style.glow,
          "opacity-60 group-hover:opacity-100"
        )}
        aria-hidden
      />

      <div className="relative flex flex-1 flex-col p-5">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ring-1 ring-inset ring-border",
              style.ring
            )}
          >
            <Icon className={cn("h-5 w-5", style.accent)} />
          </div>
          <div className="min-w-0 flex-1">
            <Badge variant="outline" className={cn("mb-1.5 border font-medium", style.chip)}>
              {test.category}
            </Badge>
            <h3 className="text-base font-semibold leading-snug text-foreground">
              {test.title}
            </h3>
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {test.subtitle}
        </p>

        <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          Reports in 24 hrs
        </div>

        <div className="mt-auto flex items-end justify-between pt-5">
          <div>
            <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Starting at</div>
            <div className="text-2xl font-bold text-foreground">
              ₹{test.price}
            </div>
          </div>

          {isInCart ? (
            <Button
              onClick={() => removeFromCart(test.id)}
              variant="destructive"
              size="sm"
              className="group/btn gap-1"
            >
              Remove
            </Button>
          ) : (
            <Button
              onClick={() => addToCart(test)}
              size="sm"
              className="group/btn gap-1"
            >
              Add to Cart
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
