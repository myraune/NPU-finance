import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { images } from "@/lib/images";
import ScrollReveal from "@/components/ScrollReveal";
import GradientOrb from "@/components/GradientOrb";
import AddToCalendar from "@/components/AddToCalendar";

export const metadata: Metadata = {
  title: "A Deal Walkthrough with Elvin Ahmeti | NPFIS",
  description:
    "April 30, 2026 — NPFIS x BSE-330-01: A live deal walkthrough covering valuation, negotiation, and cross-border deal strategy with guest speaker Elvin Ahmeti. JC 211, 6:30–9:30 PM.",
};

const event = {
  title: "A Deal Walkthrough with Guestspeaker Elvin Ahmeti",
  date: "Thursday, April 30, 2026",
  time: "6:30 – 9:30 PM",
  location: "Johnson Center, Room 211",
};

const START_UTC = "20260430T233000Z";
const END_UTC = "20260501T023000Z";

const CONTACT_EMAIL = "tjhabetler@northpark.edu";
const INSTAGRAM_HANDLE = "@fis_npu";
const INSTAGRAM_URL = "https://www.instagram.com/fis_npu";

const agenda = [
  { label: "6:30 PM", detail: "Doors open · snacks & beverages" },
  { label: "6:45 PM", detail: "Introduction — NPFIS & BSE-330-01" },
  { label: "7:00 PM", detail: "Deal walkthrough begins" },
  { label: "8:15 PM", detail: "Open Q&A" },
  { label: "9:00 PM", detail: "Wrap-up & networking" },
];

const topics = [
  "How a cross-border deal is sourced and structured",
  "Valuation methods used in real transactions",
  "Negotiation dynamics and what moves the needle",
  "The surprises and friction points no one talks about",
  "Career paths into M&A and international finance",
];

export default function ElvinAhmetiEventPage() {
  return (
    <>
      {/* ---- HERO ---- */}
      <section className="relative min-h-[60svh] md:min-h-[70svh] w-full overflow-hidden flex items-end">
        <Image
          src={images.johnsonCenter}
          alt="Johnson Center at North Park University"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
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
              Deal Walkthrough · April 30, 2026
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 backdrop-blur-md px-2.5 py-1 text-[10px] tracking-[0.12em] uppercase font-medium text-accent border border-accent/30">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Upcoming
            </span>
          </div>
          <h1 className="reveal reveal-d2 text-[28px] sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.02em] leading-[1.05] md:leading-[1.02] max-w-4xl text-white text-balance drop-shadow-[0_2px_24px_rgba(0,0,0,0.4)]">
            A Deal Walkthrough with Guestspeaker Elvin Ahmeti
          </h1>
          <ul className="reveal reveal-d3 mt-6 md:mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-y-2 sm:gap-x-6 md:gap-x-8 text-[13px] md:text-base text-white/85 list-none">
            <li className="inline-flex items-center gap-2">
              <span className="text-accent shrink-0">◆</span>
              <span>{event.time} CDT</span>
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
          {/* ── LEFT COLUMN ── */}
          <div>
            <ScrollReveal>
              <p className="text-[11px] tracking-[0.15em] uppercase font-medium text-accent mb-3">
                About the event
              </p>
              <h2 className="text-[26px] sm:text-3xl md:text-4xl font-semibold tracking-tight mb-5 md:mb-6 leading-[1.15] text-balance">
                From handshake to closing — a real deal, explained.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="space-y-4 md:space-y-5 text-text-secondary text-[15px] md:text-base leading-relaxed max-w-2xl text-pretty">
                <p>
                  Most finance courses teach you the theory. This session shows you the reality.
                  Elvin Ahmeti will walk through how a cross-border deal actually gets done —
                  from the first conversation to the closing table.
                </p>
                <p>
                  Expect to cover valuation in practice, what negotiation really looks like,
                  the strategic decisions behind every term sheet, and the moments that catch
                  even experienced dealmakers off guard.
                </p>
                <p>
                  This event is hosted in collaboration with BSE-330-01 International Finance
                  and is open to all North Park students.
                </p>
              </div>
            </ScrollReveal>

            {/* ── Topics ── */}
            <ScrollReveal delay={200}>
              <h3 className="mt-10 md:mt-12 mb-4 md:mb-5 text-xs tracking-[0.15em] uppercase font-medium text-text-tertiary">
                What you&apos;ll learn
              </h3>
              <ul className="space-y-3 max-w-2xl">
                {topics.map((point) => (
                  <li key={point} className="flex gap-3 text-[15px] text-text-secondary leading-relaxed text-pretty">
                    <span className="text-accent select-none mt-[2px] shrink-0">▸</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            {/* ── Agenda ── */}
            <ScrollReveal delay={300}>
              <h3 className="mt-12 md:mt-14 mb-5 text-xs tracking-[0.15em] uppercase font-medium text-text-tertiary">
                Agenda
              </h3>
              <div className="space-y-0 max-w-2xl">
                {agenda.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-5 py-3.5 border-b border-border-subtle last:border-0"
                  >
                    <span className="font-data text-accent text-xs tracking-widest shrink-0 w-14 pt-[2px]">
                      {item.label}
                    </span>
                    <span className="text-[15px] text-text-secondary leading-relaxed">
                      {item.detail}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* ── Collaboration callout ── */}
            <ScrollReveal delay={350}>
              <div className="mt-12 md:mt-14 rounded-xl border border-accent/20 bg-accent/5 px-5 py-4 max-w-2xl flex gap-4 items-start">
                <span className="text-accent text-lg leading-none mt-0.5 shrink-0">◆</span>
                <div>
                  <p className="text-sm font-semibold text-text-primary mb-1">
                    In collaboration with BSE-330-01
                  </p>
                  <p className="text-xs text-text-tertiary leading-relaxed">
                    This event is co-hosted with the International Finance course at North Park
                    University. Open to all students — no enrollment required.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* ── Contact ── */}
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

          {/* ── RIGHT COLUMN: Details card + AddToCalendar ── */}
          <ScrollReveal direction="left">
            <aside className="lg:sticky lg:top-28">
              <div className="glass-strong rounded-2xl p-5 sm:p-6 md:p-7 space-y-5">
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase font-medium text-text-tertiary mb-2">
                    Event details
                  </p>
                  <h3 className="text-lg font-semibold text-text-primary leading-tight">
                    Free &amp; open to all students
                  </h3>
                  <p className="text-text-tertiary text-xs mt-1">
                    Snacks and beverages included.
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
                  <div className="flex gap-3">
                    <dt className="text-text-tertiary w-14 sm:w-16 shrink-0 text-[11px] sm:text-xs tracking-wider uppercase mt-[2px]">
                      With
                    </dt>
                    <dd className="text-text-primary text-sm">BSE-330-01<br /><span className="text-text-secondary">International Finance</span></dd>
                  </div>
                </dl>

                <div className="pt-3 border-t border-border-subtle">
                  <AddToCalendar
                    title={event.title}
                    description="A live deal walkthrough covering valuation, negotiation, and cross-border deal strategy. Hosted by NPFIS in collaboration with BSE-330-01 International Finance. Free — snacks and beverages provided."
                    location={event.location}
                    startUtc={START_UTC}
                    endUtc={END_UTC}
                  />
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
              April 30 · JC 211
            </p>
            <h2 className="text-[28px] sm:text-3xl md:text-5xl font-bold tracking-tight mb-5 md:mb-6 leading-[1.1] text-balance">
              See you there.
            </h2>
            <p className="text-text-tertiary text-sm sm:text-base md:text-lg mb-8 md:mb-10">
              Free entry, real insight, free snacks. Not a bad way to spend a Thursday.
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
