"use client";

import { useState, useMemo, useEffect, useRef } from "react";

/* ── Animated number hook — tracks current value for smooth mid-slide interrupts ── */
function useAnimatedNumber(target: number, duration = 500): number {
  const [display, setDisplay] = useState(target);
  const raf = useRef<number>(0);
  const current = useRef(target);

  useEffect(() => {
    const from = current.current;
    const diff = target - from;
    if (Math.abs(diff) < 1) {
      current.current = target;
      setDisplay(target);
      return;
    }
    const start = performance.now();
    function step(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = from + diff * eased;
      current.current = val;
      setDisplay(val);
      if (progress < 1) raf.current = requestAnimationFrame(step);
    }
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);

  return display;
}

export default function InvestmentCalculator() {
  const [monthly, setMonthly] = useState(250);
  const [years, setYears] = useState(20);
  const [useReal, setUseReal] = useState(false);

  const rate = useReal ? 0.07 : 0.105;

  const result = useMemo(() => {
    const r = rate / 12;
    const n = years * 12;
    const totalContributions = monthly * n;
    const futureValue = monthly * ((Math.pow(1 + r, n) - 1) / r);
    const totalGains = futureValue - totalContributions;
    return { futureValue, totalContributions, totalGains };
  }, [monthly, years, rate]);

  const growthPct =
    result.futureValue > 0
      ? (result.totalGains / result.futureValue) * 100
      : 0;

  const animatedTotal = useAnimatedNumber(result.futureValue);
  const animatedContrib = useAnimatedNumber(result.totalContributions);
  const animatedGains = useAnimatedNumber(result.totalGains);

  const fmt = (v: number) => "$" + Math.round(v).toLocaleString("en-US");

  return (
    <section className="grid md:grid-cols-[1.3fr_1fr]">
      {/* ── Left: heading + controls ── */}
      <div className="flex flex-col justify-center px-6 md:px-16 lg:px-28 py-20 md:py-28">
        <p className="text-accent text-[11px] tracking-[0.15em] uppercase font-medium mb-6">
          See For Yourself
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold leading-tight tracking-[-0.02em] mb-8">
          The power of<br />compound interest.
        </h2>
        <p className="text-text-secondary text-[15px] leading-[1.8] mb-10 max-w-md">
          See how consistent monthly investing in the S&amp;P 500 could grow
          over time — based on historical average returns.
        </p>

        {/* Rate context */}
        <p className="text-text-tertiary text-sm mb-10">
          Using{" "}
          <span className="text-text-primary font-semibold">
            {useReal ? "7%" : "10.5%"}
          </span>{" "}
          avg. annual return{useReal ? " (inflation-adjusted)" : ""}.{" "}
          <button
            onClick={() => setUseReal(!useReal)}
            className="text-accent hover:text-accent-light underline underline-offset-4 decoration-accent/30 transition-colors"
          >
            {useReal ? "Use nominal" : "Adjust for inflation"}
          </button>
        </p>

        {/* Monthly investment */}
        <div className="mb-8">
          <div className="flex justify-between items-baseline mb-3">
            <label className="text-text-secondary text-sm">
              Monthly investment
            </label>
            <span className="text-accent text-lg font-semibold font-data">
              ${monthly}
            </span>
          </div>
          <input
            type="range"
            min={25}
            max={2000}
            step={25}
            value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value))}
            className="calc-slider w-full"
            style={
              {
                "--fill": `${((monthly - 25) / 1975) * 100}%`,
              } as React.CSSProperties
            }
          />
          <div className="flex justify-between text-text-muted text-[10px] font-data mt-1.5">
            <span>$25</span>
            <span>$2,000</span>
          </div>
        </div>

        {/* Time horizon */}
        <div>
          <div className="flex justify-between items-baseline mb-3">
            <label className="text-text-secondary text-sm">Time horizon</label>
            <span className="text-accent text-lg font-semibold font-data">
              {years} yrs
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={40}
            step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="calc-slider w-full"
            style={
              {
                "--fill": `${((years - 1) / 39) * 100}%`,
              } as React.CSSProperties
            }
          />
          <div className="flex justify-between text-text-muted text-[10px] font-data mt-1.5">
            <span>1 yr</span>
            <span>40 yrs</span>
          </div>
        </div>
      </div>

      {/* ── Right: results panel ── */}
      <div className="relative flex flex-col items-center justify-center bg-surface-0 m-3 md:m-8 rounded-2xl p-10 md:p-14 overflow-hidden min-h-[400px]">
        <div className="absolute inset-0 bg-grid opacity-40" />

        <div className="relative z-10 w-full max-w-sm">
          {/* Hero number */}
          <p className="text-text-tertiary text-[10px] tracking-[0.15em] uppercase mb-3 text-center">
            Estimated portfolio value
          </p>
          <p className="text-accent text-4xl md:text-5xl lg:text-6xl font-bold font-data tracking-tight text-center text-glow-accent">
            {fmt(animatedTotal)}
          </p>

          {/* Stacked bar */}
          <div className="mt-10 mb-6">
            <div className="h-2.5 rounded-full overflow-hidden flex bg-surface-2">
              <div
                className="bg-accent transition-all duration-700 ease-out"
                style={{ width: `${Math.max(100 - growthPct, 2)}%` }}
              />
              <div
                className="bg-positive transition-all duration-700 ease-out"
                style={{ width: `${Math.max(growthPct, 2)}%` }}
              />
            </div>
          </div>

          {/* Breakdown */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-text-tertiary text-[10px] tracking-wider uppercase">
                  You invest
                </span>
              </div>
              <p className="text-text-primary text-lg font-semibold font-data">
                {fmt(animatedContrib)}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-positive" />
                <span className="text-text-tertiary text-[10px] tracking-wider uppercase">
                  Market grows
                </span>
              </div>
              <p className="text-positive text-lg font-semibold font-data">
                +{fmt(animatedGains)}
              </p>
            </div>
          </div>

          {/* Growth callout */}
          <div className="border-t border-border-subtle mt-8 pt-6 text-center">
            <p className="text-text-secondary text-sm">
              <span className="text-positive font-semibold font-data">
                {Math.round(growthPct)}%
              </span>{" "}
              of your portfolio is pure market growth.
            </p>
          </div>

          <p className="text-text-muted text-[9px] mt-6 text-center leading-relaxed">
            For illustration only · Based on S&amp;P 500 historical averages
            <br />
            Past performance does not guarantee future results
          </p>
        </div>
      </div>
    </section>
  );
}
