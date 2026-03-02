import Link from "next/link";
import Image from "next/image";
import { images } from "@/lib/images";
import StockTicker from "@/components/StockTicker";
import ScrollReveal from "@/components/ScrollReveal";
import GradientOrb from "@/components/GradientOrb";
import AnimatedCounter from "@/components/AnimatedCounter";
import LinkedInFeed from "@/components/LinkedInFeed";

export default function Home() {
  return (
    <>
      {/* ▌HERO — full-bleed with grid pattern + orbs */}
      <section className="relative h-screen w-full overflow-hidden">
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
            <Link href="/contact" className="text-[13px] font-semibold text-base bg-accent hover:bg-accent-light rounded-lg px-7 py-3.5 transition-all duration-300 glow-accent-hover">
              Become a Member
            </Link>
            <Link href="/about" className="text-[13px] text-text-secondary hover:text-text-primary transition-all duration-300 group flex items-center gap-2">
              Learn more
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Floating glass stats card */}
        <div className="reveal reveal-d3 absolute bottom-8 right-6 md:right-12 z-20 hidden md:block">
          <div className="glass-accent rounded-xl px-6 py-5 flex gap-8">
            <div className="text-center">
              <p className="text-accent text-2xl font-semibold font-data">50+</p>
              <p className="text-text-tertiary text-[10px] tracking-wider uppercase mt-1">Members</p>
            </div>
            <div className="w-px bg-white/[0.06]" />
            <div className="text-center">
              <p className="text-accent text-2xl font-semibold font-data">20+</p>
              <p className="text-text-tertiary text-[10px] tracking-wider uppercase mt-1">Events</p>
            </div>
            <div className="w-px bg-white/[0.06]" />
            <div className="text-center">
              <p className="text-accent text-2xl font-semibold font-data">RSO</p>
              <p className="text-text-tertiary text-[10px] tracking-wider uppercase mt-1">Approved</p>
            </div>
          </div>
        </div>
      </section>

      {/* ▌LIVE STOCK TICKER */}
      <StockTicker />

      {/* ▌MARQUEE — scrolling text banner */}
      <section className="bg-surface-0 border-y border-white/[0.04] py-5 overflow-hidden no-scrollbar">
        <div className="marquee flex whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-10 mr-10 shrink-0">
              {["Investment Workshops", "Stock Pitch Competitions", "Guest Speakers", "Career Development", "Financial Literacy", "Networking Events", "Alumni Panels", "Portfolio Analysis"].map((t) => (
                <span key={t + i} className="flex items-center gap-10">
                  <span className="text-text-tertiary text-[11px] font-data tracking-[0.15em] uppercase">{t}</span>
                  <span className="w-1 h-1 rounded-full bg-accent/40" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ▌ABOUT SPLIT — asymmetric */}
      <section className="grid md:grid-cols-[1.3fr_1fr] min-h-screen">
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
        <ScrollReveal direction="left" className="relative group overflow-hidden min-h-[400px] m-0 md:m-8 md:rounded-2xl">
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

      {/* ▌NUMBERS — glass cards */}
      <section className="bg-surface-0 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { target: 50, suffix: "+", label: "Active Members" },
              { target: 20, suffix: "+", label: "Events Per Year" },
              { target: 12, suffix: "", label: "Industry Speakers" },
              { target: 95, suffix: "%", label: "Member Satisfaction" },
            ].map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 100}>
                <div className="rounded-xl bg-surface-1 border border-white/[0.06] px-6 py-10 md:py-14 text-center hover:border-accent/10 transition-all duration-500">
                  <p className="text-4xl md:text-5xl font-medium text-accent tracking-tight">
                    <AnimatedCounter target={s.target} suffix={s.suffix} />
                  </p>
                  <p className="text-text-tertiary text-[11px] tracking-[0.15em] uppercase mt-3">{s.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ▌CAMPUS GALLERY — full width asymmetric with rounded images */}
      <section className="px-3 md:px-6 py-3">
        <div className="grid md:grid-cols-12 gap-3 h-[70vh]">
          <ScrollReveal direction="right" className="md:col-span-7 relative group overflow-hidden rounded-2xl">
            <Image
              src={images.johnsonCenter}
              alt="Johnson Center at North Park University"
              fill
              className="object-cover image-reveal"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-base/30" />
            <div className="absolute bottom-0 left-0 p-8 md:p-10">
              <div className="glass-accent rounded-lg px-4 py-3 inline-block">
                <p className="text-accent text-[10px] tracking-[0.15em] uppercase font-medium mb-1">Johnson Center</p>
                <p className="text-text-primary text-lg md:text-xl font-semibold">Where innovation meets tradition</p>
              </div>
            </div>
          </ScrollReveal>
          <div className="md:col-span-5 grid grid-rows-2 gap-3">
            <ScrollReveal delay={150} className="relative group overflow-hidden rounded-2xl">
              <Image
                src={images.fallCampus}
                alt="North Park campus in fall"
                fill
                className="object-cover image-reveal"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-base/10" />
            </ScrollReveal>
            <ScrollReveal delay={300} className="relative group overflow-hidden rounded-2xl">
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

      {/* ▌WHAT WE DO — stacked rows with hover glow */}
      <section className="bg-base py-8">
        <ScrollReveal>
          <div className="px-6 md:px-12 py-8">
            <p className="text-accent text-[11px] tracking-[0.15em] uppercase font-medium">What We Do</p>
          </div>
        </ScrollReveal>
        {[
          { num: "01", title: "Investment Workshops", desc: "Hands-on sessions covering stock analysis, portfolio construction, DCF modeling, and valuation fundamentals. Learn by doing." },
          { num: "02", title: "Speaker Series", desc: "Industry professionals from JPMorgan, Goldman Sachs, and boutique firms share unfiltered career advice and market insights." },
          { num: "03", title: "Competitions", desc: "Put your skills to the test in our semester stock pitch competitions. Present to judges. Win prizes. Build your resume." },
          { num: "04", title: "Career Pipeline", desc: "Resume reviews, mock interviews, LinkedIn optimization, and direct introductions to recruiters and North Park alumni on Wall Street." },
        ].map((item, i) => (
          <ScrollReveal key={item.num} delay={i * 80}>
            <div className="group border-b border-white/[0.04] hover:bg-surface-1/50 transition-all duration-500 rounded-lg mx-2">
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

      {/* ▌UPCOMING EVENT — large cinematic block */}
      <ScrollReveal direction="none" className="relative h-[60vh] group overflow-hidden mx-3 md:mx-6 rounded-2xl my-3">
        <Image
          src={images.johnsonCenterDusk}
          alt="Johnson Center at dusk"
          fill
          className="object-cover image-reveal"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-base via-base/80 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
          <p className="text-accent text-[11px] tracking-[0.15em] uppercase font-medium mb-4">Next Event</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.02em] mb-3">Spring Investment Workshop</h2>
          <p className="text-text-secondary text-lg mb-2 font-data">March 15, 2026 · 5–7 PM · Anderson Hall 201</p>
          <p className="text-text-tertiary max-w-lg mb-8">Learn the fundamentals of building a diversified portfolio. Open to all majors.</p>
          <Link href="/events" className="text-[13px] font-semibold text-base bg-accent hover:bg-accent-light rounded-lg px-7 py-3.5 w-fit transition-all duration-300 glow-accent-hover">
            View All Events
          </Link>
        </div>
      </ScrollReveal>

      {/* ▌LINKEDIN — stay connected */}
      <section className="bg-base py-20 md:py-28 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-[11px] tracking-[0.15em] uppercase font-medium text-accent mb-2">
                Stay Connected
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Latest from LinkedIn
              </h2>
              <p className="text-text-tertiary text-sm mt-3 max-w-md mx-auto">
                Follow our journey, insights, and upcoming events.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <LinkedInFeed />
          </ScrollReveal>
        </div>
      </section>

      {/* ▌CTA — full width with orbs */}
      <section className="relative bg-surface-0 py-32 md:py-44 text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-grid" />
        <GradientOrb />
        <div className="relative z-10">
          <ScrollReveal>
            <p className="text-accent text-[11px] tracking-[0.2em] uppercase font-medium mb-6">Ready?</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] mb-6 max-w-3xl mx-auto leading-tight">
              Your future in finance starts with one step.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-text-secondary text-lg mb-12 max-w-md mx-auto">No experience required. All majors welcome.</p>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <Link href="/contact" className="text-[13px] font-semibold text-base bg-accent hover:bg-accent-light rounded-lg px-8 py-4 transition-all duration-300 glow-accent-hover">
              Join NPFIS Today
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
