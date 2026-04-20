import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { images } from "@/lib/images";
import ScrollReveal from "@/components/ScrollReveal";
import GradientOrb from "@/components/GradientOrb";

export const metadata: Metadata = {
  title: "Angel Escobedo — Navigating Early Career Success in Finance | NPFIS",
  description:
    "Recap of NPFIS's April 15, 2026 guest-speaker session at JC 208 with Angel Escobedo on navigating internships and building a career in finance.",
};

const event = {
  title: "Angel Escobedo and Navigating Early Career Success in Finance",
  date: "Wednesday, April 15, 2026",
  time: "12:00 – 2:00 PM",
  location: "Johnson Center, Room 208",
};

const SPEAKER_LINKEDIN = "https://www.linkedin.com/in/escobedo-angel";
const CONTACT_EMAIL = "tjhabetler@northpark.edu";
const INSTAGRAM_HANDLE = "@fis_npu";
const INSTAGRAM_URL = "https://www.instagram.com/fis_npu";

// Real brand logos, hosted locally in /public/logos/ (downloaded from
// Wikimedia Commons). Displayed on a neutral light card so they read
// correctly in both light and dark site themes.
// Aspect ratios match each SVG's intrinsic viewBox so the logo fills the
// card cleanly on every screen size.
const firmLogos = [
  {
    name: "JPMorgan",
    tag: "Investment Banking",
    src: "/logos/jpmorgan.svg",
    alt: "JPMorgan logo",
    // viewBox 98 × 21  →  ~4.67:1
    aspect: "aspect-[14/3]",
  },
  {
    name: "Morgan Stanley",
    tag: "Wealth Management",
    src: "/logos/morgan-stanley.svg",
    alt: "Morgan Stanley logo",
    // viewBox 360 × 90  →  4:1
    aspect: "aspect-[4/1]",
  },
  {
    name: "PwC",
    tag: "Advisory",
    src: "/logos/pwc.svg",
    alt: "PwC logo",
    // viewBox 1000 × 759  →  ~4:3
    aspect: "aspect-[4/3]",
  },
  {
    name: "Old National Bank",
    tag: "Currently · Analyst",
    src: "/logos/old-national.svg",
    alt: "Old National Bank logo",
    // viewBox 251 × 27  →  ~9:1
    aspect: "aspect-[9/1]",
  },
];

const otherExperience = [
  { name: "Private Equity", tag: "Deal Experience" },
  { name: "Venture Capital", tag: "Early-Stage Investing" },
  { name: "Angel Investing", tag: "Personal Portfolio" },
];

const takeaways = [
  "How to navigate internships and build a career path in finance.",
  "Real perspective from bulge-bracket, Big Four, and community banking roles.",
  "Insight into private equity, venture capital, and angel investing.",
  "Direct Q&A with the speaker — snacks and beverages included.",
];

export default function AngelEscobedoEventPage() {
  return (
    <>
      {/* ---- HERO ---- */}
      <section className="relative min-h-[60svh] md:min-h-[70svh] w-full overflow-hidden flex items-end">
        <Image
          src={images.johnsonCenterDusk}
          alt="Johnson Center at North Park University"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {/* Dark gradient kept black all the way to the bottom so white hero
            text stays readable in BOTH light and dark site themes
            (the previous `to-base` faded to parchment in light mode). */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
        <div className="absolute inset-0 bg-grid opacity-30" />

        <div className="relative z-10 px-6 md:px-12 lg:px-16 pt-24 pb-14 md:py-24 max-w-5xl w-full">
          <Link
            href="/events"
            className="reveal inline-flex items-center gap-2 text-white/70 hover:text-accent transition-colors text-[11px] md:text-xs tracking-[0.15em] uppercase font-medium mb-6 md:mb-8"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            All Events
          </Link>
          <div className="reveal reveal-d1 flex flex-wrap items-center gap-3 mb-3 md:mb-4">
            <p className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-medium text-accent">
              Guest Speaker · April 15, 2026
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md px-2.5 py-1 text-[10px] tracking-[0.12em] uppercase font-medium text-white/85 border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
              Concluded
            </span>
          </div>
          <h1 className="reveal reveal-d2 text-[28px] sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.02em] leading-[1.05] md:leading-[1.02] max-w-4xl text-white text-balance drop-shadow-[0_2px_24px_rgba(0,0,0,0.4)]">
            Angel Escobedo & Navigating Early Career Success in Finance
          </h1>
          {/* Meta row: stacks tight on phone, lays out horizontally from sm+. */}
          <ul className="reveal reveal-d3 mt-6 md:mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-y-2 sm:gap-x-6 md:gap-x-8 text-[13px] md:text-base text-white/85 list-none">
            <li className="inline-flex items-center gap-2">
              <span className="text-accent shrink-0">◆</span>
              <span>{event.time}</span>
            </li>
            <li className="inline-flex items-center gap-2">
              <span className="text-accent shrink-0">◆</span>
              <span>{event.location}</span>
            </li>
            <li className="inline-flex items-center gap-2">
              <span className="text-accent shrink-0">◆</span>
              <span>Snacks &amp; beverages provided</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ---- MAIN CONTENT ---- */}
      <section className="bg-base py-14 md:py-24">
        <div className="px-5 sm:px-6 md:px-12 lg:px-16 grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 max-w-7xl mx-auto">
          {/* ── LEFT COLUMN: Description + logos + contact ── */}
          <div>
            <ScrollReveal>
              <p className="text-[11px] tracking-[0.15em] uppercase font-medium text-accent mb-3">
                About the event
              </p>
              <h2 className="text-[26px] sm:text-3xl md:text-4xl font-semibold tracking-tight mb-5 md:mb-6 leading-[1.15] text-balance">
                A candid conversation with a multi-hat finance professional.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="space-y-4 md:space-y-5 text-text-secondary text-[15px] md:text-base leading-relaxed max-w-2xl text-pretty">
                <p>
                  Angel Escobedo brought a rare breadth of experience — spanning bulge-bracket
                  investment banking, Big Four advisory, private markets, and community banking.
                  The session was built for students who wanted an honest look at how careers
                  actually get built.
                </p>
                <p>
                  Whether attendees were aiming for their first internship or weighing offers, the
                  conversation focused on practical advice they could apply the week after.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <h3 className="mt-10 md:mt-12 mb-4 md:mb-5 text-xs tracking-[0.15em] uppercase font-medium text-text-tertiary">
                What attendees took away
              </h3>
              <ul className="space-y-3 max-w-2xl">
                {takeaways.map((point) => (
                  <li key={point} className="flex gap-3 text-[15px] text-text-secondary leading-relaxed text-pretty">
                    <span className="text-accent select-none mt-[2px] shrink-0">▸</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            {/* ── Firms the speaker has worked at — real logos on neutral cards ── */}
            <ScrollReveal delay={300}>
              <h3 className="mt-12 md:mt-14 mb-2 text-xs tracking-[0.15em] uppercase font-medium text-text-tertiary">
                Where the speaker has worked
              </h3>
              <p className="text-text-tertiary text-sm mb-5 md:mb-6 max-w-xl">
                A quick look at the firms across Angel&apos;s career.
              </p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-2xl">
                {firmLogos.map((firm, i) => (
                  <div
                    key={firm.name}
                    className="relative rounded-xl bg-white border border-border-subtle px-3 py-4 sm:px-4 sm:py-5 flex flex-col items-center justify-center gap-3 transition-transform duration-300 hover:scale-[1.02] hover:shadow-md min-h-[120px] sm:min-h-[132px]"
                  >
                    <div className={`relative w-full ${firm.aspect} flex items-center justify-center`}>
                      <Image
                        src={firm.src}
                        alt={firm.alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 200px"
                        loading={i < 2 ? "eager" : "lazy"}
                      />
                    </div>
                    <p className="text-[10px] tracking-[0.12em] uppercase text-neutral-500 font-medium text-center leading-tight">
                      {firm.tag}
                    </p>
                  </div>
                ))}
              </div>

              <h4 className="mt-7 md:mt-8 mb-3 text-xs tracking-[0.15em] uppercase font-medium text-text-tertiary">
                Also experienced in
              </h4>
              <div className="flex flex-wrap gap-2 max-w-2xl">
                {otherExperience.map((x) => (
                  <span
                    key={x.name}
                    className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-1/60 px-3 py-1.5 text-xs text-text-secondary whitespace-nowrap"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                    {x.name}
                    <span className="text-text-muted">·</span>
                    <span className="text-text-tertiary">{x.tag}</span>
                  </span>
                ))}
              </div>
              <p className="mt-5 text-xs text-text-muted max-w-2xl leading-relaxed">
                Company logos shown for biographical reference only. NPFIS is a student
                organization and has no affiliation with these firms.
              </p>
            </ScrollReveal>

            {/* ── Contact & Instagram ── */}
            <ScrollReveal delay={400}>
              <div className="mt-12 md:mt-14 pt-8 md:pt-10 border-t border-border-subtle grid sm:grid-cols-2 gap-5 sm:gap-6 max-w-2xl">
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase font-medium text-text-tertiary mb-2">
                    Get in touch
                  </p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-accent hover:text-accent-light transition-colors text-sm md:text-base font-medium break-all"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase font-medium text-text-tertiary mb-2">
                    Follow NPFIS
                  </p>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent hover:text-accent-light transition-colors text-sm md:text-base font-medium"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.849.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.849.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                    {INSTAGRAM_HANDLE}
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* ── RIGHT COLUMN: Details card only (no poster) ── */}
          <ScrollReveal direction="left">
            <aside className="lg:sticky lg:top-28">
              <div className="glass-strong rounded-2xl p-5 sm:p-6 md:p-7 space-y-5">
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase font-medium text-text-tertiary mb-2">
                    Event details
                  </p>
                  <h3 className="text-lg font-semibold text-text-primary leading-tight">
                    Event concluded
                  </h3>
                  <p className="text-text-tertiary text-xs mt-1">
                    Thanks to everyone who came out.
                  </p>
                </div>

                <dl className="space-y-4 text-sm">
                  <div className="flex gap-3">
                    <dt className="text-text-tertiary w-14 sm:w-16 shrink-0 text-[11px] sm:text-xs tracking-wider uppercase mt-[2px]">
                      When
                    </dt>
                    <dd className="text-text-primary text-sm">
                      {event.date}
                      <br />
                      <span className="text-text-secondary">{event.time} CDT</span>
                    </dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="text-text-tertiary w-14 sm:w-16 shrink-0 text-[11px] sm:text-xs tracking-wider uppercase mt-[2px]">
                      Where
                    </dt>
                    <dd className="text-text-primary text-sm">
                      {event.location}
                      <br />
                      <span className="text-text-secondary">North Park University</span>
                    </dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="text-text-tertiary w-14 sm:w-16 shrink-0 text-[11px] sm:text-xs tracking-wider uppercase mt-[2px]">
                      Cost
                    </dt>
                    <dd className="text-text-primary text-sm">Free · open to all students</dd>
                  </div>
                </dl>

                <div className="pt-3 border-t border-border-subtle space-y-3">
                  <a
                    href={SPEAKER_LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex justify-center items-center gap-2 rounded-lg glass-accent text-accent hover:text-accent-light px-5 py-3 text-sm font-semibold transition-all duration-300 min-h-[44px]"
                  >
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    Speaker&apos;s LinkedIn
                  </a>
                </div>
              </div>
            </aside>
          </ScrollReveal>
        </div>
      </section>

      {/* ---- CLOSING CTA ---- */}
      <section className="relative bg-base py-20 md:py-32 text-center px-5 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <GradientOrb />

        <div className="relative z-10 max-w-2xl mx-auto">
          <ScrollReveal>
            <p className="text-[11px] tracking-[0.15em] uppercase font-medium text-accent mb-3 md:mb-4">
              Thanks for coming
            </p>
            <h2 className="text-[28px] sm:text-3xl md:text-5xl font-bold tracking-tight mb-5 md:mb-6 leading-[1.1] text-balance">
              Don&apos;t miss the next one.
            </h2>
            <p className="text-text-tertiary text-sm sm:text-base md:text-lg mb-8 md:mb-10">
              Follow NPFIS to catch upcoming workshops, speakers, and competitions.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-accent hover:text-accent-light transition-colors text-sm font-semibold min-h-[44px] py-2"
              >
                All events
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <span className="text-text-muted text-xs">·</span>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:text-accent-light transition-colors text-sm font-semibold min-h-[44px] py-2"
              >
                Follow @fis_npu
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
