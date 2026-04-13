import Link from "next/link";
import GradientOrb from "@/components/GradientOrb";

export default function Blog() {
  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-grid" />
        <GradientOrb />

        <div className="relative z-10">
          <p className="text-[11px] tracking-[0.15em] uppercase font-medium text-accent mb-4">
            Blog
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
            Coming Soon
          </h1>
          <p className="text-text-secondary text-lg max-w-md mx-auto mb-10">
            Insights, analysis, and educational content from the NPFIS team.
          </p>
          <Link
            href="/"
            className="text-sm font-semibold text-base bg-accent hover:bg-accent-light rounded-lg px-8 py-4 transition-all duration-300 glow-accent-hover"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}
