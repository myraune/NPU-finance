"use client";

import { useEffect, useState, useCallback } from "react";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

function CoinRainOverlay({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 4500);
    return () => clearTimeout(timer);
  }, [onDone]);

  const coins = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 1.5,
    duration: 2 + Math.random() * 2,
    size: 16 + Math.random() * 16,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="fixed inset-0 z-[80] pointer-events-none overflow-hidden">
      {/* Toast */}
      <div
        className="absolute top-32 left-1/2 -translate-x-1/2 z-10"
        style={{ animation: "toastIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards, toastOut 0.5s cubic-bezier(0.16, 1, 0.3, 1) 3.5s forwards" }}
      >
        <div className="glass-accent rounded-xl px-8 py-4 text-center">
          <p className="text-accent text-2xl font-bold tracking-tight">BULL MARKET</p>
          <p className="text-text-tertiary text-xs mt-1">To the moon</p>
        </div>
      </div>

      {/* Coins */}
      {coins.map((c) => (
        <div
          key={c.id}
          className="absolute"
          style={{
            left: `${c.left}%`,
            top: "-40px",
            animation: `coinFall ${c.duration}s ease-in ${c.delay}s forwards`,
          }}
        >
          <svg
            width={c.size}
            height={c.size}
            viewBox="0 0 32 32"
            style={{ transform: `rotate(${c.rotation}deg)` }}
          >
            <circle cx="16" cy="16" r="14" fill="#d4a843" opacity="0.9" />
            <circle cx="16" cy="16" r="11" fill="none" stroke="#06090f" strokeWidth="0.5" opacity="0.3" />
            <text
              x="16"
              y="21"
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
              fill="#06090f"
              opacity="0.6"
              fontFamily="JetBrains Mono, monospace"
            >
              $
            </text>
          </svg>
        </div>
      ))}
    </div>
  );
}

export default function KonamiCode() {
  const [progress, setProgress] = useState(0);
  const [showRain, setShowRain] = useState(false);

  const handleDone = useCallback(() => setShowRain(false), []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (showRain) return;

      setProgress((prev) => {
        if (e.key === KONAMI[prev]) {
          const next = prev + 1;
          if (next === KONAMI.length) {
            setShowRain(true);
            return 0;
          }
          return next;
        }
        // Reset, but check if the new key matches the start
        return e.key === KONAMI[0] ? 1 : 0;
      });
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showRain]);

  if (!showRain) return null;
  return <CoinRainOverlay onDone={handleDone} />;
}
