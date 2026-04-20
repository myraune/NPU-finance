import Link from "next/link";
import Image from "next/image";
import { images } from "@/lib/images";
import StockTicker from "@/components/StockTicker";
import InvestmentCalculator from "@/components/InvestmentCalculator";
import ScrollReveal from "@/components/ScrollReveal";
import GradientOrb from "@/components/GradientOrb";
import AnimatedCounter from "@/components/AnimatedCounter";
import BeamCTA from "@/components/BeamCTA";

export default function Home() {
  return (
    <>
      {/* ▌HERO — full-bleed with grid pattern + orbs */}
      <section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden">
        <Image
          src={images.campusAerial}
          alt="North Park University campus aerial view"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-base/70 via-base/40 to-base" />
        <div className="absolute inset-0 bg-grid" />
        <GradientOrb />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-20 md:pb-28">
          <p className="reveal text-accent text-[11px] tracking-[0.2em] uppercase font-medium mb-5">North Park University</p>
          <h1 className="reveal reveal-d1 text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.92] tracking-[-0.03em] max-w-4xl">
            Finance &amp;<br />Investment<br />Society
          </h1>
          <div className="reveal reveal-d2 flex items-center gap-5 mt-10">
            <Link href="/contact" className="group relative overflow-hidden inline-flex items-center gap-2 text-[13px] font-semibold text-base bg-accent hover:bg-accent-light rounded-lg px-7 py-3.5 transition-all duration-300 glow-accent-hover hover:scale-[1.02] btn-shimmer">
              Become a Member
              <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link href="/about" className="text-[13px] text-text-secondary hover:text-text-primary transition-all duration-300 group flex items-center gap-2">
              Learn more
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ▌LIVE STOCK TICKER */}
      <StockTicker />

      <div className="hr-gold" />

      {/* ▌ABOUT SPLIT — asymmetric */}
      <section className="grid md:grid-cols-[1.3fr_1fr] md:min-h-screen">
        <div className="flex flex-col justify-center px-6 md:px-16 lg:px-28 py-24 md:py-0">
          <ScrollReveal>
            <p className="text-accent text-[11px] tracking-[0.15em] uppercase font-medium mb-6">Who We Are</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-4xl md:text-5xl font-semibold leading-tight tracking-[-0.02em] mb-8">
              Where ambition<br />meets opportunity.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-text-secondary text-[15px] leading-[1.8] mb-6 max-w-md">
              We&apos;re a student-run organization dedicated to giving North Park students the tools, knowledge, and connections they need to break into finance — no matter their major.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <p className="text-text-tertiary text-[15px] leading-[1.8] mb-10 max-w-md">
              From hands-on investment workshops to Wall Street alumni panels, we create experiences that can&apos;t be found in a textbook.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={400}>
            <Link href="/about" className="text-accent text-sm tracking-wide hover:text-accent-light transition-colors w-fit group flex items-center gap-2">
              More about us
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>
        <ScrollReveal direction="left" className="relative group overflow-hidden h-[50vh] md:h-auto md:min-h-[400px] m-0 md:m-8 md:rounded-2xl">
          <Image
            src={images.oldMain}
            alt="Old Main building at North Park University"
            fill
            className="object-cover image-reveal"
            sizes="(max-width: 768px) 100vw, 45vw"
          />
          <div className="absolute inset-0 bg-base/10" />
        </ScrollReveal>
      </section>

      <div className="hr-gold" />

      {/* ▌WHAT WE DO — stacked rows with stat badges */}
      <section className="bg-base py-8">
        <ScrollReveal>
          <div className="px-6 md:px-12 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-accent text-[11px] tracking-[0.15em] uppercase font-medium">What We Do</p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2.5 glass-accent rounded-lg px-4 py-2.5">
                <p className="text-accent text-lg font-semibold font-data">
                  <AnimatedCounter target={50} suffix="+" />
                </p>
                <p className="text-text-tertiary text-[10px] tracking-wider uppercase">Members</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
        {[
          { num: "01", title: "Investment Workshops", desc: "Hands-on sessions covering stock analysis, portfolio construction, and valuation fundamentals. Learn by doing." },
          { num: "02", title: "Speaker Series", desc: "Industry professionals share career advice and market insights. Coming soon." },
          { num: "03", title: "Competitions", desc: "Stock pitch competitions where you present to judges, win prizes, and build your resume. Coming soon." },
          { num: "04", title: "Career Development", desc: "Resume reviews, mock interviews, LinkedIn optimization, and networking with finance professionals. Coming soon." },
        ].map((item, i) => (
          <ScrollReveal key={item.num} delay={i * 80}>
            <div className="group border-b border-border-subtle hover:bg-surface-1/50 transition-all duration-500 rounded-lg mx-2">
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16 px-6 md:px-12 py-10 md:py-14">
                <span className="font-data text-accent-dim text-xs tracking-widest">{item.num}</span>
                <h3 className="text-xl md:text-2xl font-semibold text-text-primary tracking-tight md:w-72 shrink-0 group-hover:text-accent transition-colors duration-500">{item.title}</h3>
                <p className="text-text-tertiary text-[15px] leading-relaxed flex-1 max-w-xl group-hover:text-text-secondary transition-colors duration-500">{item.desc}</p>
                <svg className="w-5 h-5 text-text-muted group-hover:text-accent shrink-0 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </section>

      <div className="hr-gold" />

      {/* ▌PAST EVENT — compact recap card, links to detail page */}
      <section className="bg-base py-16 md:py-24">
        <div className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-8 md:mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <p className="text-accent text-[11px] tracking-[0.15em] uppercase font-medium mb-2">
                  Past Event
                </p>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight">
                  What we&apos;ve hosted recently
                </h2>
              </div>
              <Link
                href="/events"
                className="text-[13px] text-text-tertiary hover:text-accent transition-colors inline-flex items-center gap-2 w-fit group"
              >
                All events
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <Link
              href="/events/angel-escobedo-april-2026"
              className="group relative block overflow-hidden rounded-2xl border border-border-subtle hover:border-accent/40 transition-colors duration-500"
            >
              <div className="grid md:grid-cols-[1fr_1.2fr]">
                {/* Image side */}
                <div className="relative h-[220px] md:h-auto md:min-h-[260px] overflow-hidden">
                  <Image
                    src={images.johnsonCenterDusk}
                    alt="Johnson Center at dusk"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-base/70 via-base/30 to-transparent" />
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-base/70 backdrop-blur-md px-3 py-1 text-[10px] tracking-[0.12em] uppercase font-medium text-text-secondary border border-border-subtle">
                    <span className="w-1.5 h-1.5 rounded-full bg-text-tertiary" />
                    Concluded
                  </span>
                </div>

                {/* Copy side */}
                <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center bg-surface-0/60">
                  <p className="text-[10px] md:text-[11px] tracking-[0.15em] uppercase font-medium text-text-tertiary mb-3">
                    April 15, 2026 · JC 208
                  </p>
                  <h3 className="text-[22px] sm:text-2xl md:text-3xl font-semibold tracking-tight leading-[1.15] mb-3 text-balance group-hover:text-accent transition-colors duration-500">
                    Angel Escobedo &amp; Navigating Early Career Success in Finance
                  </h3>
                  <p className="text-text-tertiary text-sm md:text-[15px] leading-relaxed mb-5 max-w-xl text-pretty">
                    A candid conversation with a multi-hat finance professional — covering
                    internships, career paths, and real perspective from JP Morgan, Morgan Stanley,
                    PwC, and Old National Bank.
                  </p>
                  <span className="inline-flex items-center gap-2 text-accent text-sm font-semibold w-fit">
                    Read the recap
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ▌CAMPUS GALLERY — full width asymmetric */}
      <section className="px-3 md:px-6 py-3">
        <div className="grid gap-3 md:grid-cols-12 md:h-[70vh]">
          <ScrollReveal direction="right" className="md:col-span-7 relative group overflow-hidden rounded-2xl h-[46vh] md:h-auto">
            <Image
              src={images.johnsonCenter}
              alt="Johnson Center at North Park University"
              fill
              className="object-cover image-reveal"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-base/30" />
            <div className="absolute bottom-0 left-0 p-6 md:p-10">
              <div className="glass-accent rounded-lg px-4 py-3 inline-block max-w-[calc(100%-1rem)]">
                <p className="text-accent text-[10px] tracking-[0.15em] uppercase font-medium mb-1">Johnson Center</p>
                <p className="text-text-primary text-base md:text-xl font-semibold">Where innovation meets tradition</p>
              </div>
            </div>
          </ScrollReveal>
          <div className="md:col-span-5 grid gap-3 md:grid-rows-2">
            <ScrollReveal delay={150} className="relative group overflow-hidden rounded-2xl h-[28vh] md:h-auto">
              <Image
                src={images.fallCampus}
                alt="North Park campus in fall"
                fill
                className="object-cover image-reveal"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-base/10" />
            </ScrollReveal>
            <ScrollReveal delay={300} className="relative group overflow-hidden rounded-2xl h-[28vh] md:h-auto">
              <Image
                src={images.springCampus}
                alt="North Park campus in spring"
                fill
                className="object-cover image-reveal"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-base/10" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="hr-gold" />

      {/* ▌CALCULATOR — S&P 500 investment estimator */}
      <InvestmentCalculator />

      <div className="hr-gold" />

      {/* ▌CTA — PulseBeams with premium pill button */}
      <BeamCTA />
    </>
  );
}
