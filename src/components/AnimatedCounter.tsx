"use client";

import { useEffect, useState } from "react";
import { useInView } from "./useInView";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

export default function AnimatedCounter({
  target,
  suffix = "",
  duration = 2000,
}: AnimatedCounterProps) {
  const { ref, isVisible } = useInView(0.3);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const startTime = performance.now();

    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      if (current !== start) {
        start = current;
        setCount(current);
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDone(true);
      }
    }

    requestAnimationFrame(step);
  }, [isVisible, target, duration]);

  return (
    <span
      ref={ref}
      className="font-data tabular-nums transition-all duration-1000"
      style={{
        textShadow: isVisible && !done
          ? "0 0 30px rgba(212,168,67,0.3)"
          : "none",
      }}
    >
      {count}
      {suffix}
    </span>
  );
}
