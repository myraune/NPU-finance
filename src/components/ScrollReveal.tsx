"use client";

import { useEffect, useState } from "react";
import { useInView } from "./useInView";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none" | "fade" | "scale";
  className?: string;
  distance?: number;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  distance = 30,
}: ScrollRevealProps) {
  const { ref, isVisible } = useInView(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile so we can collapse horizontal reveals to vertical ones —
  // horizontal translates cause viewport-width overflow on small screens.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const effectiveDirection =
    isMobile && (direction === "left" || direction === "right") ? "up" : direction;
  const effectiveDistance = isMobile ? Math.min(distance, 16) : distance;

  const translateMap: Record<string, string> = {
    up: `translateY(${effectiveDistance}px) scale(0.97)`,
    left: `translateX(${effectiveDistance}px) scale(0.97)`,
    right: `translateX(-${effectiveDistance}px) scale(0.97)`,
    scale: "scale(0.95)",
    fade: "none",
    none: "none",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : translateMap[effectiveDirection],
        filter: isVisible
          ? "blur(0px)"
          : effectiveDirection === "none" || effectiveDirection === "fade"
            ? "none"
            : "blur(4px)",
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: isVisible ? "auto" : "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}
