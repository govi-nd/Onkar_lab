export default function Logo({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 400 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
    >
      <defs>
        <linearGradient
          id="refined-grad"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#0062e4" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>

      {/* Background Cross */}
      <path
        d="M40 25 C40 22 42 20 45 20 H75 C78 20 80 22 80 25 V45 C80 48 82 50 85 50 H105 C108 50 110 52 110 55 V85 C110 88 108 90 105 90 H85 C82 90 80 92 80 95 V115 C80 118 78 120 75 120 H45 C42 120 40 118 40 115 V95 C40 92 38 90 35 90 H15 C12 90 10 88 10 85 V55 C10 52 12 50 15 50 H35 C38 50 40 48 40 45 V25 Z"
        fill="url(#refined-grad)"
        opacity="0.1"
      />

      {/* ECG */}
      <path
        d="M30 70 H45 L52 45 L68 95 L75 70 H90"
        stroke="url(#refined-grad)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ONKAR */}
      <text
        x="130"
        y="75"
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontWeight="800"
        fontSize="44"
        fill="#0F172A"
        letterSpacing="-1"
      >
        ONKAR
      </text>

      {/* DIAGNOSTICS */}
      <text
        x="130"
        y="102"
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontWeight="500"
        fontSize="18"
        fill="#0062e4"
        letterSpacing="4"
      >
        DIAGNOSTICS
      </text>
    </svg>
  );
}