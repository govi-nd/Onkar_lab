"use client";

import Link from "next/link";
import { useState } from "react";
import CategoryFilter from "./category";

export type TestDetails = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  category: string;
};

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
      <div className="bg-[#F4F8FD]">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 ">
          <div className="flex flex-col mx-auto max-w-6xl ">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {" "}
              Find your test{" "}
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
              className="lucide lucide-search pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            >
              <path d="m21 21-4.34-4.34"></path>
              <circle cx="11" cy="11" r="8"></circle>
            </svg>
            <input
              type="text"
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-11 pl-9"
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

      <div className="min-h-screen py-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-4 text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {filteredTests.length}
            </span>{" "}
            tests
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredTests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function TestCard({ test }: { test: TestDetails }) {
  return (
    <div className="flex h-full w-full flex-col rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-bold text-[oklch(20%_.03_250)]">
          {test.title}
        </h3>

        <div className="rounded-md bg-[#ECF0E9] px-2.5 py-0.5 text-xs font-bold text-[#426F23]">
          {test.category}
        </div>
      </div>

      <p className="mt-2 text-sm text-gray-500">{test.subtitle}</p>

      <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
        <ClockIcon />
        <span>Reports in 24hrs</span>
      </div>

      <div className="mt-auto flex items-center justify-between pt-5">
        <div className="text-xl font-bold text-black">₹ {test.price}</div>

        <Link
          href="/book"
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}

function ClockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}
