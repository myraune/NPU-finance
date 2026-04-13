import Link from "next/link";
import GradientOrb from "@/components/GradientOrb";

export default function NotFound() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0 bg-grid" />
      <GradientOrb />
      <div className="relative z-10 text-center">
        <p className="text-accent text-[11px] tracking-[0.2em] uppercase font-medium mb-4">
          Error 404
        </p>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-4">
          Asset Not Found
        </h1>
        <p className="text-text-secondary text-lg mb-2 max-w-md mx-auto">
          This position has been liquidated.
        </p>
        <p className="text-text-tertiary text-sm mb-10 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist, was delisted, or moved to a different exchange.
        </p>

        <div className="mb-10 flex justify-center">
          <svg width="240" height="100" viewBox="0 0 240 100" className="opacity-60">
            <defs>
              <linearGradient id="crashGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="50%" stopColor="#d4a843" />
                <stop offset="100%" stopColor="#f87171" />
              </linearGradient>
            </defs>
            <polyline
              fill="none"
              stroke="url(#crashGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points="10,70 30,65 50,58 70,52 90,48 110,40 130,35 140,32 150,28 160,30 170,45 180,60 195,72 210,80 230,88"
            />
            <text x="185" y="22" fill="#f87171" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
              -100%
            </text>
            <circle cx="230" cy="88" r="3" fill="#f87171">
              <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        <Link
          href="/"
          className="text-[13px] font-semibold text-base bg-accent hover:bg-accent-light rounded-lg px-7 py-3.5 transition-all duration-300 glow-accent-hover"
        >
          Back to Market
        </Link>
      </div>
    </section>
  );
}
