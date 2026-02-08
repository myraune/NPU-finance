"use client";

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

  const translateMap: Record<string, string> = {
    up: `translateY(${distance}px) scale(0.97)`,
    left: `translateX(${distance}px) scale(0.97)`,
    right: `translateX(-${distance}px) scale(0.97)`,
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
        transform: isVisible ? "none" : translateMap[direction],
        filter: isVisible ? "blur(0px)" : (direction === "none" || direction === "fade" ? "none" : "blur(4px)"),
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
