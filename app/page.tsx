import Link from "next/link";

export default function Home() {
  return (
    <>
      <HomePageFirstDiv />
      <HomePageSecDiv />
      <HowItWorks/>
    </>
  );
}

function HomePageFirstDiv() {
  return (
    <div className="flex items-center justify-center ">
      <div className="mt-32  flex flex-col justify-center items-center text-start">
        <h1 className=" font-display text-6xl font-bold  text-[#071321]">
          Your Health
        </h1>
        <h1 className=" font-display text-7xl font-bold  text-[#071321]">
          Our Priority,
        </h1>

        <h1 className=" text-7xl font-bold  text-sky-700 italic">
          Delivered Fast.
        </h1>

        <div className="mt-4">
          <p className="  text-lg text-gray-800 text-center">
            Book pathology tests online, visit at your slot, and receive
            digitally <br />
            signed reports in 24 hours — accurate, affordable, and reviewed{" "}
            <br />
            by experts.
          </p>
        </div>

        <div className=" mt-4  flex  items-start justify-center gap-3 ">
          <Link
            href="/book"
            className="px-5 py-1.5 rounded-full  bg-blue-500 text-white hover:-translate-y-1 transition duration-200"
          >
            Book a Test
          </Link>

          <Link
            href="/tests"
            className=" px-5 py-1.5 rounded-full  text-black hover:-translate-y-1 transition duration-200 hover:bg-[#447324] hover:text-white"
          >
            View All Tests
          </Link>
        </div>
      </div>
    </div>
  );
}

function HomePageSecDiv() {
  const flaskIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"></path>

      <path d="M6.453 15h11.094"></path>

      <path d="M8.5 2h7"></path>
    </svg>
  );
  const peopleIcon = (
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
      className="lucide lucide-users h-6 w-6"
      aria-hidden="true"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
      <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
      <circle cx="9" cy="7" r="4"></circle>
    </svg>
  );
  const clockIcon = (
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
      className="lucide lucide-clock h-6 w-6"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 6v6l4 2"></path>
    </svg>
  );

  return (
    <div className="flex flex-row gap-8 justify-center items-center mt-16 bg-[#F4F8FD] w-full h-36">
      <FeatureCard
        icon={flaskIcon}
        title="50+ Tests"
        subtitle="Across all major specialties"
      />

      <FeatureCard
        icon={peopleIcon}
        title="2000+ Patients"
        subtitle="Trusted us every month"
      />

      <FeatureCard
        icon={clockIcon}
        title="24hr Reports"
        subtitle="Digitally signed on time"
      />
    </div>
  );
}
type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
};

function FeatureCard({ icon, title, subtitle }: FeatureCardProps) {
  return (
    <div className="w-76 h-22 bg-white px-4 py-10 rounded-xl flex justify-center items-center">
      {/* Icon */}
      <div className="h-12 w-12 bg-[#F4F8FD] flex items-center justify-center rounded-xl">
        {icon}
      </div>

      {/* Text */}
      <div className="flex flex-col ml-4">
        <div className="text-lg font-bold text-[oklch(20%_.03_250)]">
          {title}
        </div>

        <div className="text-sm text-[oklch(50%_.02_250)]">{subtitle}</div>
      </div>
    </div>
  );
}

function HowItWorks (){
  return (
    <>
            <div className="bg-[#F4F8FD]">

      
      <div className="mx-auto max-w-6xl px-4 py-16 bg-[#F4F8FD] sm:px-6">
        <div className="text-center bg-[#F4F8FD]">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            How it works
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Three simple steps from booking to report.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="relative rounded-xl border border-border bg-card p-6">
            <div className="absolute right-5 top-5 text-xs font-semibold text-muted-foreground">
              01
            </div>
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-accent/10 text-accent">
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
                className="lucide lucide-clipboard-list h-6 w-6"
                aria-hidden="true"
              >
                <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <path d="M12 11h4"></path>
                <path d="M12 16h4"></path>
                <path d="M8 11h.01"></path>
                <path d="M8 16h.01"></path>
              </svg>
            </span>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              Choose Test
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Browse 50+ accredited lab tests.
            </p>
          </div>
          <div className="relative rounded-xl border border-border bg-card p-6">
            <div className="absolute right-5 top-5 text-xs font-semibold text-muted-foreground">
              02
            </div>
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-accent/10 text-accent">
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
                className="lucide lucide-calendar-check h-6 w-6"
                aria-hidden="true"
              >
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
                <path d="m9 16 2 2 4-4"></path>
              </svg>
            </span>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              Book Slot
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Pick a time and pay securely online.
            </p>
          </div>
          <div className="relative rounded-xl border border-border bg-card p-6">
            <div className="absolute right-5 top-5 text-xs font-semibold text-muted-foreground">
              03
            </div>
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-accent/10 text-accent">
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
                className="lucide lucide-file-text h-6 w-6"
                aria-hidden="true"
              >
                <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
                <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
                <path d="M10 9H8"></path>
                <path d="M16 13H8"></path>
                <path d="M16 17H8"></path>
              </svg>
            </span>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              Get Report
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Digitally signed reports within 24 hours.
            </p>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}