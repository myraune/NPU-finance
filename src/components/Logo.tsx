export default function Logo({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size * 1.18}
      viewBox="0 0 100 118"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="NPFIS Logo"
      className={className}
    >
      {/* Shield shape */}
      <path
        d="M50 2L6 18V62C6 86 26 108 50 116C74 108 94 86 94 62V18L50 2Z"
        fill="#0a0f1a"
        stroke="#d4a843"
        strokeWidth="3"
      />
      {/* Inner shield border */}
      <path
        d="M50 10L14 24V62C14 82 30 100 50 108C70 100 86 82 86 62V24L50 10Z"
        fill="none"
        stroke="#d4a843"
        strokeWidth="1.5"
        opacity="0.4"
      />
      {/* NP text */}
      <text
        x="50"
        y="60"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#d4a843"
        fontFamily="system-ui, sans-serif"
        fontWeight="700"
        fontSize="30"
        letterSpacing="2"
      >
        NP
      </text>
      {/* Laurel branches - left */}
      <path
        d="M22 90C26 85 32 82 36 80C32 84 28 88 26 92"
        stroke="#d4a843"
        strokeWidth="1.2"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M26 92C30 88 36 86 40 84C36 88 32 92 30 96"
        stroke="#d4a843"
        strokeWidth="1.2"
        fill="none"
        opacity="0.5"
      />
      {/* Laurel branches - right */}
      <path
        d="M78 90C74 85 68 82 64 80C68 84 72 88 74 92"
        stroke="#d4a843"
        strokeWidth="1.2"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M74 92C70 88 64 86 60 84C64 88 68 92 70 96"
        stroke="#d4a843"
        strokeWidth="1.2"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}
