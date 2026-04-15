import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { images } from "@/lib/images";
import ScrollReveal from "@/components/ScrollReveal";
import GradientOrb from "@/components/GradientOrb";
import AddToCalendar from "@/components/AddToCalendar";

export const metadata: Metadata = {
  title: "Angel Escobedo — Navigating Early Career Success in Finance | NPFIS",
  description:
    "Join NPFIS on April 15, 2026 at JC 208 for a guest speaker session with Angel Escobedo on navigating internships and building a career in finance.",
};

// Poster card is a stylized composition (not the real Instagram banner) —
// echoes the navy + gold aesthetic without using third-party logos.

const event = {
  title: "Angel Escobedo and Navigating Early Career Success in Finance",
  date: "Wednesday, April 15, 2026",
  time: "12:00 – 2:00 PM",
  location: "Johnson Center, Room 208",
  locationShort: "JC 208, North Park University",
  startUtc: "20260415T170000Z",
  endUtc: "20260415T190000Z",
  description:
    "Gain information on how to navigate through internships and establish your career path.\n\nOur guest speaker has experience at JP Morgan, Morgan Stanley, angel investing, private equity, venture capital, PwC, and is currently an analyst at Old National Bank.\n\nSnacks and beverages will be provided!\n\nSpeaker's LinkedIn: https://www.linkedin.com/in/escobedo-angel",
};

const SPEAKER_LINKEDIN = "https://www.linkedin.com/in/escobedo-angel";
const CONTACT_EMAIL = "tjhabetler@northpark.edu";
const INSTAGRAM_HANDLE = "@fis_npu";
const INSTAGRAM_URL = "https://www.instagram.com/fis_npu";

// Speaker's career highlights — shown as branded badges.
// Background and ring colors echo each firm's primary brand color at low
// opacity so the grid stays monochrome-friendly with the rest of the site.
const experience = [
  {
    name: "JPMorgan Chase",
    tag: "Investment Banking",
    accent: "from-[#003E7E]/40 to-[#003E7E]/10",
    ring: "ring-[#003E7E]/40",
  },
  {
    name: "Morgan Stanley",
    tag: "Wealth Management",
    accent: "from-[#0068B5]/40 to-[#0068B5]/10",
    ring: "ring-[#0068B5]/40",
  },
  {
    name: "PwC",
    tag: "Advisory",
    accent: "from-[#D04A02]/40 to-[#D04A02]/10",
    ring: "ring-[#D04A02]/40",
  },
  {
    name: "Old National Bank",
    tag: "Currently · Analyst",
    accent: "from-[#003B5C]/40 to-[#003B5C]/10",
    ring: "ring-[#003B5C]/40",
  },
  {
    name: "Private Equity",
    tag: "Deal Experience",
    accent: "from-accent/25 to-accent/5",
    ring: "ring-accent/30",
  },
  {
    name: "Venture Capital",
    tag: "Early-Stage Investing",
    accent: "from-accent/25 to-accent/5",
    ring: "ring-accent/30",
  },
  {
    name: "Angel Investing",
    tag: "Personal Portfolio",
    accent: "from-accent/25 to-accent/5",
    ring: "ring-accent/30",
  },
];

const takeaways = [
  "How to navigate internships and build a career path in finance.",
  "Real perspective from bulge-bracket, Big Four, and community banking roles.",
  "Insight into private equity, venture capital, and angel investing.",
  "Space to ask direct questions — snacks and beverages provided.",
];

export default function AngelEscobedoEventPage() {
  return (
    <>
      {/* ---- HERO / BANNER ---- */}
      <section className="relative min-h-[70svh] w-full overflow-hidden flex items-end">
        <Image
          src={images.johnsonCenterDusk}
          alt="Johnson Center at North Park University"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-base/70 via-base/60 to-base" />
        <div className="absolute inset-0 bg-grid opacity-60" />

        <div className="relative z-10 px-6 md:px-12 lg:px-16 py-16 md:py-24 max-w-5xl">
          <Link
            href="/events"
            className="reveal inline-flex items-center gap-2 text-text-tertiary hover:text-accent transition-colors text-xs tracking-[0.15em] uppercase font-medium mb-8"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            All Events
          </Link>
          <p className="reveal reveal-d1 text-[11px] tracking-[0.2em] uppercase font-medium text-accent mb-4">
            Guest Speaker · April 15, 2026
          </p>
          <h1 className="reveal reveal-d2 text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.02em] leading-[1.02] max-w-4xl">
            Angel Escobedo & Navigating Early Career Success in Finance
          </h1>
          <div className="reveal reveal-d3 mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm md:text-base text-text-secondary">
            <span className="inline-flex items-center gap-2">
              <span className="text-accent">◆</span>
              {event.time}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="text-accent">◆</span>
              {event.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="text-accent">◆</span>
              Snacks & beverages provided
            </span>
          </div>
        </div>
      </section>

      {/* ---- MAIN CONTENT ---- */}
      <section className="bg-base py-16 md:py-24">
        <div className="px-6 md:px-12 lg:px-16 grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 max-w-7xl mx-auto">
          {/* ── LEFT COLUMN: Description + takeaways ── */}
          <div>
            <ScrollReveal>
              <p className="text-[11px] tracking-[0.15em] uppercase font-medium text-accent mb-3">
                About the event
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6 leading-tight">
                A candid conversation with a multi-hat finance professional.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="space-y-5 text-text-secondary text-[15px] md:text-base leading-relaxed max-w-2xl">
                <p>
                  Angel Escobedo brings a rare breadth of experience — spanning bulge-bracket
                  investment banking, Big Four advisory, private markets, and community banking.
                  This session is built for students who want an honest look at how careers actually
                  get built.
                </p>
                <p>
                  Whether you&apos;re aiming for your first internship or weighing offers, expect
                  practical advice you can apply the week after.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <h3 className="mt-12 mb-5 text-xs tracking-[0.15em] uppercase font-medium text-text-tertiary">
                What you&apos;ll take away
              </h3>
              <ul className="space-y-3 max-w-2xl">
                {takeaways.map((point) => (
                  <li key={point} className="flex gap-3 text-[15px] text-text-secondary leading-relaxed">
                    <span className="text-accent select-none mt-[2px] shrink-0">▸</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            {/* ── Experience / logos grid ── */}
            <ScrollReveal delay={300}>
              <h3 className="mt-14 mb-6 text-xs tracking-[0.15em] uppercase font-medium text-text-tertiary">
                Speaker&apos;s background
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl">
                {experience.map((firm) => (
                  <div
                    key={firm.name}
                    className={`relative rounded-xl p-4 md:p-5 bg-gradient-to-br ${firm.accent} ring-1 ${firm.ring} backdrop-blur-sm transition-transform duration-300 hover:scale-[1.02]`}
                  >
                    <p className="font-semibold text-text-primary text-sm md:text-base leading-tight">
                      {firm.name}
                    </p>
                    <p className="mt-1.5 text-[11px] tracking-[0.08em] uppercase text-text-tertiary">
                      {firm.tag}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-text-muted max-w-2xl">
                Firm names used for biographical purposes only. NPFIS is a student organization
                and has no affiliation with these companies.
              </p>
            </ScrollReveal>

            {/* ── Contact & Instagram ── */}
            <ScrollReveal delay={400}>
              <div className="mt-14 pt-10 border-t border-border-subtle grid sm:grid-cols-2 gap-6 max-w-2xl">
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase font-medium text-text-tertiary mb-2">
                    Any questions?
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
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.849.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.849.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                    {INSTAGRAM_HANDLE}
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* ── RIGHT COLUMN: Sticky details card ── */}
          <ScrollReveal direction="left">
            <aside className="lg:sticky lg:top-28 space-y-4">
              {/* Stylized poster card — mirrors the Instagram banner aesthetic
                  (navy field, gold geometric corners, NPFIS shield, firm badges)
                  without reproducing the actual poster image or third-party logos. */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border-subtle bg-gradient-to-br from-[#0a1a3a] via-[#0b1730] to-[#070f22] p-6 md:p-7 flex flex-col">
                {/* subtle grid + soft glows */}
                <div className="absolute inset-0 bg-grid opacity-[0.18]" />
                <div className="absolute -top-24 -left-16 w-64 h-64 rounded-full bg-accent/15 blur-3xl" />
                <div className="absolute -bottom-32 -right-20 w-72 h-72 rounded-full bg-[#0068B5]/20 blur-3xl" />

                {/* gold geometric corner — top right */}
                <svg
                  className="absolute -top-1 -right-1 w-28 h-28 text-accent/70"
                  viewBox="0 0 120 120"
                  fill="none"
                  aria-hidden
                >
                  <path d="M120 0 L120 120 L60 0 Z" fill="currentColor" opacity="0.85" />
                  <path d="M120 30 L120 120 L30 120 Z" fill="currentColor" opacity="0.35" />
                </svg>
                {/* gold geometric corner — bottom left */}
                <svg
                  className="absolute -bottom-1 -left-1 w-24 h-24 text-accent/60"
                  viewBox="0 0 120 120"
                  fill="none"
                  aria-hidden
                >
                  <path d="M0 120 L0 0 L60 120 Z" fill="currentColor" opacity="0.8" />
                  <path d="M0 90 L0 0 L90 0 Z" fill="currentColor" opacity="0.3" />
                </svg>

                <div className="relative z-10 flex flex-col h-full">
                  {/* top row: date + shield monogram */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-accent font-semibold text-[13px] tracking-wide">
                        4/15 · 12:00 – 2:00 PM
                      </p>
                      <p className="text-text-secondary text-[12px] tracking-wide mt-0.5">
                        @ Johnson 208
                      </p>
                    </div>
                    {/* NPFIS monogram shield */}
                    <div className="relative w-11 h-12 shrink-0">
                      <svg viewBox="0 0 44 48" className="w-full h-full" aria-hidden>
                        <path
                          d="M22 0 L44 8 V26 C44 38 34 46 22 48 C10 46 0 38 0 26 V8 Z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="text-accent"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-accent font-bold text-[11px] tracking-[0.08em]">
                        NP
                      </span>
                    </div>
                  </div>

                  {/* main title block */}
                  <h3 className="mt-5 text-[28px] md:text-[30px] font-bold leading-[0.98] tracking-[-0.02em] text-text-primary">
                    Finance &amp;<br />Investment<br />Society
                  </h3>

                  <div className="mt-5 h-px bg-gradient-to-r from-accent/60 via-accent/20 to-transparent" />

                  <p className="mt-4 text-accent text-[10px] tracking-[0.2em] uppercase font-medium">
                    Guest Speaker
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-text-primary mt-1 leading-tight">
                    Angel Escobedo
                  </p>

                  {/* firm pills — colored per brand */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {[
                      { n: "JPMorgan", color: "bg-[#003E7E]/70 ring-[#003E7E]/60" },
                      { n: "Morgan Stanley", color: "bg-[#0068B5]/60 ring-[#0068B5]/60" },
                      { n: "PwC", color: "bg-[#D04A02]/60 ring-[#D04A02]/50" },
                      { n: "Old National", color: "bg-[#003B5C]/70 ring-[#003B5C]/60" },
                    ].map((b) => (
                      <span
                        key={b.n}
                        className={`text-[9px] md:text-[10px] tracking-[0.06em] uppercase font-semibold text-white/95 ${b.color} ring-1 rounded-md px-2 py-1`}
                      >
                        {b.n}
                      </span>
                    ))}
                  </div>

                  {/* spacer pushes the footer down */}
                  <div className="flex-1" />

                  {/* footer: snacks line + contact/IG */}
                  <div className="mt-5 pt-4 border-t border-white/10">
                    <p className="text-[11px] text-text-secondary leading-snug">
                      Snacks &amp; beverages provided.
                    </p>
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <p className="text-[10px] text-text-tertiary truncate">
                        tjhabetler@northpark.edu
                      </p>
                      <span className="inline-flex items-center gap-1 text-accent text-[10px] font-semibold shrink-0">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M12 2.163c3.204 0 3.584.012 4.849.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.849.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                        @fis_npu
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-strong rounded-2xl p-6 md:p-7 space-y-5">
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase font-medium text-accent mb-2">
                    Event details
                  </p>
                  <h3 className="text-lg font-semibold text-text-primary leading-tight">
                    Save the date
                  </h3>
                </div>

                <dl className="space-y-4 text-sm">
                  <div className="flex gap-3">
                    <dt className="text-text-tertiary w-16 shrink-0 text-xs tracking-wider uppercase mt-[2px]">
                      When
                    </dt>
                    <dd className="text-text-primary">
                      {event.date}
                      <br />
                      <span className="text-text-secondary">{event.time} CDT</span>
                    </dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="text-text-tertiary w-16 shrink-0 text-xs tracking-wider uppercase mt-[2px]">
                      Where
                    </dt>
                    <dd className="text-text-primary">
                      {event.location}
                      <br />
                      <span className="text-text-secondary">North Park University</span>
                    </dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="text-text-tertiary w-16 shrink-0 text-xs tracking-wider uppercase mt-[2px]">
                      Cost
                    </dt>
                    <dd className="text-text-primary">Free · open to all students</dd>
                  </div>
                </dl>

                <div className="pt-3 border-t border-border-subtle space-y-3">
                  <AddToCalendar
                    title={event.title}
                    description={event.description}
                    location={event.locationShort}
                    startUtc={event.startUtc}
                    endUtc={event.endUtc}
                    className="w-full inline-flex justify-center items-center gap-2 rounded-lg bg-accent text-base font-semibold glow-accent-hover px-5 py-3 transition-all duration-300 hover:bg-accent-light text-sm"
                  />
                  <a
                    href={SPEAKER_LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex justify-center items-center gap-2 rounded-lg glass-accent text-accent hover:text-accent-light px-5 py-3 text-sm font-semibold transition-all duration-300"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
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
      <section className="relative bg-base py-24 md:py-32 text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <GradientOrb />

        <div className="relative z-10 max-w-2xl mx-auto">
          <ScrollReveal>
            <p className="text-[11px] tracking-[0.15em] uppercase font-medium text-accent mb-4">
              See you there
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              Bring a friend. Bring questions.
            </h2>
            <p className="text-text-tertiary text-base md:text-lg mb-10">
              Wednesday, April 15 · 12:00–2:00 PM · JC 208
            </p>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-light transition-colors text-sm font-semibold"
            >
              Back to all events
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
