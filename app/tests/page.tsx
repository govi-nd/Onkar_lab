import Link from "next/link";

/* =========================
   PAGE
========================= */

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f7f8fa] py-10">
  
  {/* Container */}
  <div className="mx-auto max-w-7xl px-6">
    
    {/* Cards Grid */}
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      
      <TestCard
        title="Complete Blood Count (CBC)"
        subtitle="Evaluates overall health and detects a range of disorders."
        category="Hematology"
        deliversIn="24hrs"
        price="350"
      />
      <TestCard
        title="Complete Blood Count (CBC)"
        subtitle="Evaluates overall health and detects a range of disorders."
        category="Hematology"
        deliversIn="24hrs"
        price="350"
      />
      <TestCard
        title="Complete Blood Count (CBC)"
        subtitle="Evaluates overall health and detects a range of disorders."
        category="Hematology"
        deliversIn="24hrs"
        price="350"
      />
      <TestCard
        title="Complete Blood Count (CBC)"
        subtitle="Evaluates overall health and detects a range of disorders."
        category="Hematology"
        deliversIn="24hrs"
        price="350"
      />
      <TestCard
        title="Complete Blood Count (CBC)"
        subtitle="Evaluates overall health and detects a range of disorders."
        category="Hematology"
        deliversIn="24hrs"
        price="350"
      />
      <TestCard
        title="Complete Blood Count (CBC)"
        subtitle="Evaluates overall health and detects a range of disorders."
        category="Hematology"
        deliversIn="24hrs"
        price="350"
      />
      <TestCard
        title="Complete Blood Count (CBC)"
        subtitle="Evaluates overall health and detects a range of disorders."
        category="Hematology"
        deliversIn="24hrs"
        price="350"
      />
      <TestCard
        title="Complete Blood Count (CBC)"
        subtitle="Evaluates overall health and detects a range of disorders."
        category="Hematology"
        deliversIn="24hrs"
        price="350"
      />
      <TestCard
        title="Complete Blood Count (CBC)"
        subtitle="Evaluates overall health and detects a range of disorders."
        category="Hematology"
        deliversIn="24hrs"
        price="350"
      />

    </div>
  </div>
</div>
  );
}

/* =========================
   TYPES
========================= */

type TestTypes = {
  title: string;
  subtitle: string;
  category: string;
  deliversIn: string;
  price: string;
};

/* =========================
   COMPONENT
========================= */

function TestCard({
  title,
  subtitle,
  category,
  deliversIn,
  price,
}: TestTypes) {
  return (
    <div className="flex h-full w-96 flex-col rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      
      {/* Top Section */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-bold text-[oklch(20%_.03_250)]">
          {title}
        </h3>

        <div className="rounded-md bg-[#ECF0E9] px-2.5 py-0.5 text-xs font-bold text-[#426F23]">
          {category}
        </div>
      </div>

      {/* Subtitle */}
      <p className="mt-2 text-sm text-gray-500">
        {subtitle}
      </p>

      {/* Delivery Time */}
      <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
        <ClockIcon />

        <span>Reports in {deliversIn}</span>
      </div>

      {/* Bottom Section */}
      <div className="mt-auto flex items-center justify-between pt-5">
        <div className="text-xl font-bold text-black">
          ₹{price}
        </div>

        <Link
          href="/book?test=cbc"
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}

/* =========================
   ICONS
========================= */

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