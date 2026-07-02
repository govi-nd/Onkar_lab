"use client";

import { useState } from "react";
import CategoryFilter from "@/components/tests/CategoryFilter";

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

import TestCard, { TestDetails } from "./TestCard";

export default function TestsCatalog({
  tests,
  categories,
}: {
  tests: TestDetails[];
  categories: string[];
}) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTests =
    activeCategory === "All"
      ? tests
      : tests.filter((test) => test.category === activeCategory);

  return (
    <>
      <div className="bg-[#F4F8FD] ">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="flex flex-col mx-auto max-w-6xl">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Find your test
            </h1>

            <span className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Search our full catalog and book in minutes - reports delivered
              digitally.
            </span>
          </div>

          <div className="relative mt-6 max-w-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            >
              <path d="m21 21-4.34-4.34"></path>
              <circle cx="11" cy="11" r="8"></circle>
            </svg>

            <input
              type="text"
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-11 pl-9"
              placeholder="Search by test name (e.g. Thyroid, CBC, HbA1c)"
            />
          </div>

          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
      </div>

      <div className="min-h-screen py-12 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-6 text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {filteredTests.length}
            </span>{" "}
            tests
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {filteredTests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

