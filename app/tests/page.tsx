import Link from "next/link";
import { prisma } from "@/lib/prisma";

type TestDetails = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
};

export default async function Home() {
  const testDetails = await prisma.test.findMany({
    orderBy: {
      title: "asc",
    },
    select: {
      id: true,
      title: true,
      subtitle: true,
      price: true,
    },
  });

  return (
    <div className="min-h-screen bg-[#f7f8fa] py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testDetails.map((test) => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TestCard({ test }: { test: TestDetails }) {
  return (
    <div className="flex h-full w-96 flex-col rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-bold text-[oklch(20%_.03_250)]">
          {test.title}
        </h3>

        <div className="rounded-md bg-[#ECF0E9] px-2.5 py-0.5 text-xs font-bold text-[#426F23]">
          general
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
