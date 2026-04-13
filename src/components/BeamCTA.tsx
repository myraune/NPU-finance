"use client";

import Link from "next/link";
import { PulseBeams } from "@/components/ui/pulse-beams";
import ScrollReveal from "@/components/ScrollReveal";
import GradientOrb from "@/components/GradientOrb";
import { ArrowRight } from "lucide-react";

/* ── Beam configuration ───────────────────────────────────
   5 beams radiate from the central button outward to
   connection-point circles at the SVG edges.
   Delays are fixed (no Math.random) to avoid hydration drift.
   ───────────────────────────────────────────────────────── */
const beams = [
  {
    path: "M269 220.5H16.5C10.9772 220.5 6.5 224.977 6.5 230.5V398.5",
    gradientConfig: {
      initial: { x1: "0%", x2: "0%", y1: "80%", y2: "100%" },
      animate: {
        x1: ["0%", "0%", "200%"],
        x2: ["0%", "0%", "180%"],
        y1: ["80%", "0%", "0%"],
        y2: ["100%", "20%", "20%"],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear",
        repeatDelay: 2,
        delay: 0,
      },
    },
    connectionPoints: [
      { cx: 6.5, cy: 398.5, r: 6 },
      { cx: 269, cy: 220.5, r: 6 },
    ],
  },
  {
    path: "M568 200H841C846.523 200 851 195.523 851 190V40",
    gradientConfig: {
      initial: { x1: "0%", x2: "0%", y1: "80%", y2: "100%" },
      animate: {
        x1: ["20%", "100%", "100%"],
        x2: ["0%", "90%", "90%"],
        y1: ["80%", "80%", "-20%"],
        y2: ["100%", "100%", "0%"],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear",
        repeatDelay: 2,
        delay: 0.5,
      },
    },
    connectionPoints: [
      { cx: 851, cy: 34, r: 6.5 },
      { cx: 568, cy: 200, r: 6 },
    ],
  },
  {
    path: "M425.5 274V333C425.5 338.523 421.023 343 415.5 343H152C146.477 343 142 347.477 142 353V426.5",
    gradientConfig: {
      initial: { x1: "0%", x2: "0%", y1: "80%", y2: "100%" },
      animate: {
        x1: ["20%", "100%", "100%"],
        x2: ["0%", "90%", "90%"],
        y1: ["80%", "80%", "-20%"],
        y2: ["100%", "100%", "0%"],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear",
        repeatDelay: 2,
        delay: 1.0,
      },
    },
    connectionPoints: [
      { cx: 142, cy: 427, r: 6.5 },
      { cx: 425.5, cy: 274, r: 6 },
    ],
  },
  {
    path: "M493 274V333.226C493 338.749 497.477 343.226 503 343.226H760C765.523 343.226 770 347.703 770 353.226V427",
    gradientConfig: {
      initial: { x1: "40%", x2: "50%", y1: "160%", y2: "180%" },
      animate: {
        x1: "0%",
        x2: "10%",
        y1: "-40%",
        y2: "-20%",
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear",
        repeatDelay: 2,
        delay: 1.5,
      },
    },
    connectionPoints: [
      { cx: 770, cy: 427, r: 6.5 },
      { cx: 493, cy: 274, r: 6 },
    ],
  },
  {
    path: "M380 168V17C380 11.4772 384.477 7 390 7H414",
    gradientConfig: {
      initial: { x1: "-40%", x2: "-10%", y1: "0%", y2: "20%" },
      animate: {
        x1: ["40%", "0%", "0%"],
        x2: ["10%", "0%", "0%"],
        y1: ["0%", "0%", "180%"],
        y2: ["20%", "20%", "200%"],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear",
        repeatDelay: 2,
        delay: 0.3,
      },
    },
    connectionPoints: [
      { cx: 420.5, cy: 6.5, r: 6 },
      { cx: 380, cy: 168, r: 6 },
    ],
  },
];

const goldGradient = {
  start: "#e8c36a",
  middle: "#d4a843",
  end: "#a07e2e",
};

interface BeamCTAProps {
  heading?: string;
  subheading?: string;
  label?: string;
  buttonText?: string;
  href?: string;
}

export default function BeamCTA({
  heading = "Your future in finance starts with one step.",
  subheading = "No experience required. All majors welcome.",
  label = "Ready?",
  buttonText = "Join NPFIS Today",
  href = "/contact",
}: BeamCTAProps) {
  return (
    <PulseBeams
      beams={beams}
      gradientColors={goldGradient}
      className="bg-surface-0 py-32 md:py-44 px-6"
      background={
        <>
          <div className="absolute inset-0 bg-grid" />
          <GradientOrb />
        </>
      }
    >
      <div className="text-center">
        <ScrollReveal>
          <p className="text-accent text-[11px] tracking-[0.2em] uppercase font-medium mb-6">
            {label}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] mb-6 max-w-3xl mx-auto leading-tight">
            {heading}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-text-secondary text-lg mb-12 max-w-md mx-auto">
            {subheading}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          {/* ── Premium pill button with radial glow ── */}
          <Link href={href} className="group relative inline-block z-40">
            {/* Radial gradient overlay — fades in on hover */}
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(212,168,67,0.6)_0%,rgba(212,168,67,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            {/* Button body */}
            <div className="relative flex items-center justify-center gap-3 rounded-full bg-surface-1 px-10 py-5 ring-1 ring-accent/20 group-hover:ring-accent/40 transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(212,168,67,0.15)]">
              <span className="text-base md:text-lg font-semibold text-accent">
                {buttonText}
              </span>
              <ArrowRight className="w-5 h-5 text-accent group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </Link>
        </ScrollReveal>
      </div>
    </PulseBeams>
  );
}
