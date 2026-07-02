"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Clock, CheckCircle2, Plus, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { TestOptionType } from "./types";
import { useCartStore } from "@/store/useCartStore";

type SelectTestsProps = {
  tests: TestOptionType[];
};

export default function SelectTests({ tests }: SelectTestsProps) {
  const router = useRouter();
  
  // Zustand store
  const { cart, addToCart, removeFromCart } = useCartStore();
  
  // Local state for search & filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const formattedTests = tests.map((test) => ({
    id: test.id,
    title: test.title,
    subtitle: test.subtitle || "",
    price: test.price,
    category: test.category || "General",
    turnaround: test.turnaround || "24 hrs",
  }));

  const allAvailableItems = [...formattedTests];
  const uniqueCategories = new Set(allAvailableItems.map((item) => item.category));
  const categoryFilterOptions = ["All", ...Array.from(uniqueCategories)];
  
  const filteredItems = allAvailableItems.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const cleanQuery = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !cleanQuery ||
      item.title.toLowerCase().includes(cleanQuery) ||
      item.subtitle.toLowerCase().includes(cleanQuery);

    return matchesCategory && matchesSearch;
  });

  const subtotal = cart.reduce((sum, t) => sum + t.price, 0);
  const homeCollectionFee = 0;
  const finalPayableAmount = subtotal + homeCollectionFee;

  const handleContinue = () => {
    router.push("/book/details");
  };

  const handleToggle = (item: typeof allAvailableItems[0]) => {
    const exists = cart.some(t => t.id === item.id);
    if (exists) {
      removeFromCart(item.id);
    } else {
      addToCart({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        price: item.price,
        category: item.category,
      });
    }
  };

  return (
    <section className="mx-auto max-w-6xl sm:px-6 sm:py-14">
      <div className="flex items-center justify-end gap-3 mt-2 mb-2">
        <Button
          type="button"
          size="lg"
          onClick={handleContinue}
          disabled={cart.length === 0}
          className="gap-1"
        >
          Continue <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0">
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Add tests to your booking</h2>
                <p className="text-sm text-muted-foreground">Search or filter by category — you can pick multiple.</p>
              </div>
            </div>

            {/* Search */}
            <div className="mt-5 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search for blood test, thyroid, diabetes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-11 bg-background"
              />
            </div>

            {/* Categories */}
            <div className="mt-4 flex flex-wrap gap-2">
              {categoryFilterOptions.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    c === selectedCategory
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:text-foreground",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Selected chips */}
            {cart.length > 0 && (
              <div className="mt-5 rounded-xl border border-dashed border-primary/30 bg-primary/5 p-3">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                  In your cart
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cart.map((t) => (
                    <span
                      key={t.id}
                      className="inline-flex items-center gap-1.5 rounded-full bg-card px-2.5 py-1 text-xs font-medium text-foreground shadow-sm ring-1 ring-border"
                    >
                      {t.title}
                      <button
                        onClick={() => removeFromCart(t.id)}
                        className="grid h-4 w-4 place-items-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        aria-label={`Remove ${t.title}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Results */}
            <div className="mt-5 grid max-h-[520px] gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
              {filteredItems.length === 0 && (
                <div className="col-span-full rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                  No tests match your search.
                </div>
              )}
              {filteredItems.map((t) => {
                const on = cart.some(cartItem => cartItem.id === t.id);
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleToggle(t)}
                    className={cn(
                      "group relative flex items-start gap-3 rounded-xl border p-3 text-left transition-all",
                      on
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border bg-background hover:border-primary/40 hover:bg-muted/50",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors",
                        on ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card",
                      )}
                    >
                      {on ? <CheckCircle2 className="h-4 w-4" /> : <Plus className="h-3 w-3 text-muted-foreground" />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-sm font-semibold text-foreground">{t.title}</div>
                        <div className="shrink-0 text-sm font-bold text-primary">₹{t.price}</div>
                      </div>
                      <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                        <span className="rounded-full bg-muted px-1.5 py-0.5 font-medium uppercase tracking-wide">
                          {t.category}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {t.turnaround}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Summary sidebar */}
        <div className="relative">
          <div className="sticky top-6 rounded-2xl border border-border bg-card shadow-sm">
            <div className="border-b border-border p-5">
              <h3 className="font-semibold text-foreground">Order Summary</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {cart.length} {cart.length === 1 ? "test" : "tests"} selected
              </p>
            </div>
            <div className="p-5">
              {cart.length > 0 ? (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-start justify-between gap-3 text-sm">
                      <div className="font-medium text-foreground">{item.title}</div>
                      <div className="shrink-0 text-muted-foreground">₹{item.price}</div>
                    </div>
                  ))}
                  <div className="my-4 h-px bg-border" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">₹{subtotal}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Home collection</span>
                    <span className="font-medium text-emerald-600">Free</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between rounded-lg bg-muted/50 p-3">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-lg font-bold text-primary">₹{finalPayableAmount}</span>
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  Your cart is empty. <br /> Select a test to continue.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
