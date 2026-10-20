import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { images } from "@/lib/images";
import ScrollReveal from "@/components/ScrollReveal";
import GradientOrb from "@/components/GradientOrb";
import AddToCalendar from "@/components/AddToCalendar";
import { KNOWN_EVENT_TIMES } from "@/lib/event-times";

export const metadata: Metadata = {
  title: "Guest Speaker: Christopher Chaidez of JPMorgan | NPFIS",
  description:
    "October 21, 2026: NPFIS's first event of the semester. Christopher Chaidez, Associate Business Development Officer at JPMorgan and MBA candidate at Chicago Booth. Johnson Center 3rd Floor Boardroom, 12:00 to 2:00 PM.",
};

const EVENT_ID = "christopher-chaidez-october-2026";

const event = {
  title: "Guest Speaker: Christopher Chaidez of JPMorgan",
  date: "Wednesday, October 21, 2026",
  time: "12:00 – 2:00 PM",
  location: "Johnson Center, 3rd Floor Boardroom",
};

const { startUtc: START_UTC, endUtc: END_UTC } = KNOWN_EVENT_TIMES[EVENT_ID];

const CONTACTS = [
  { role: "President", email: "tjhabetler@northpark.edu" },
  { role: "Vice President", email: "aggrden@northpark.edu" },
];
const INSTAGRAM_HANDLE = "@fis_npu";
const INSTAGRAM_URL = "https://www.instagram.com/fis_npu";

const highlights = [
  { title: "Career insights", detail: "What business development at JPMorgan looks like day to day, and how he got there." },
  { title: "Tips & advice", detail: "Practical guidance on internships, recruiting, and balancing work with an MBA." },
  { title: "Networking session", detail: "Time to meet Christopher and connect with other students interested in finance." },
  { title: "Q&A panel", detail: "Bring your questions about banking, business school, and breaking into the industry." },
];

export default function ChristopherChaidezEventPage() {
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
              First event of the semester · October 21, 2026
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 backdrop-blur-md px-2.5 py-1 text-[10px] tracking-[0.12em] uppercase font-medium text-accent border border-accent/30">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Upcoming
            </span>
          </div>
          <h1 className="reveal reveal-d2 text-[28px] sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.02em] leading-[1.05] md:leading-[1.02] max-w-4xl text-white text-balance drop-shadow-[0_2px_24px_rgba(0,0,0,0.4)]">
            Guest Speaker: Christopher Chaidez of JPMorgan
          </h1>
          <ul className="reveal reveal-d3 mt-6 md:mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-y-2 sm:gap-x-6 md:gap-x-8 text-[13px] md:text-[16px] text-white/85 list-none">
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
                Learn, grow, build: hear from a JPMorgan banker.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="space-y-4 md:space-y-5 text-text-secondary text-[15px] md:text-[16px] leading-relaxed max-w-2xl text-pretty">
                <p>
                  Our first event of the semester welcomes Christopher Chaidez, an Associate
                  Business Development Officer at JPMorgan who is currently an MBA candidate at
                  the University of Chicago Booth School of Business.
                </p>
                <p>
                  It&apos;s a chance to connect with a working professional, learn about different
                  career paths in finance, and start building relationships in the industry.
                </p>
                <p>
                  Open to students from every major, not just finance. Snacks and beverages will
                  be provided.
                </p>
              </div>
            </ScrollReveal>

            {/* ── Speaker ── */}
            <ScrollReveal delay={150}>
              <div className="mt-10 md:mt-12 rounded-2xl border border-border-subtle bg-surface-0/60 p-5 sm:p-6 max-w-2xl flex flex-col sm:flex-row sm:items-center gap-5">
                <div className="rounded-xl bg-white px-5 py-4 w-[180px] shrink-0">
                  <div className="relative aspect-[14/3]">
                    <Image src="/logos/jpmorgan.svg" alt="JPMorgan logo" fill className="object-contain" />
                  </div>
                </div>
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase font-medium text-text-tertiary mb-1.5">
                    Speaker
                  </p>
                  <p className="text-lg font-semibold text-text-primary leading-tight">Christopher Chaidez</p>
                  <p className="text-sm text-text-secondary mt-1">JPMorgan · Associate Business Development Officer</p>
                  <p className="text-sm text-text-secondary">MBA Candidate · UChicago Booth</p>
                </div>
              </div>
              <p className="mt-3 text-[11px] text-text-muted max-w-2xl">
                Company logo shown for biographical reference only. NPFIS is a student
                organization and is not affiliated with JPMorgan.
              </p>
            </ScrollReveal>

            {/* ── What you get ── */}
            <ScrollReveal delay={200}>
              <h3 className="mt-10 md:mt-12 mb-4 md:mb-5 text-xs tracking-[0.15em] uppercase font-medium text-text-tertiary">
                What you get
              </h3>
              <div className="max-w-2xl">
                {highlights.map((item) => (
                  <div
                    key={item.title}
                    className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-5 py-3.5 border-b border-border-subtle last:border-0"
                  >
                    <span className="text-[15px] font-semibold text-text-primary shrink-0 sm:w-44">
                      {item.title}
                    </span>
                    <span className="text-[15px] text-text-secondary leading-relaxed text-pretty">
                      {item.detail}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* ── Contact ── */}
            <ScrollReveal delay={300}>
              <div className="mt-12 md:mt-14 pt-8 md:pt-10 border-t border-border-subtle grid sm:grid-cols-3 gap-5 sm:gap-6 max-w-2xl">
                {CONTACTS.map((c) => (
                  <div key={c.email}>
                    <p className="text-xs tracking-[0.15em] uppercase font-medium text-text-tertiary mb-2">
                      {c.role}
                    </p>
                    <a
                      href={`mailto:${c.email}`}
                      className="text-accent hover:text-accent-light transition-colors text-sm font-medium break-all"
                    >
                      {c.email}
                    </a>
                  </div>
                ))}
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase font-medium text-text-tertiary mb-2">
                    Follow NPFIS
                  </p>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent hover:text-accent-light transition-colors text-sm font-medium"
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

          {/* ── RIGHT COLUMN: Details card + AddToCalendar + flyer ── */}
          <ScrollReveal direction="left">
            <aside className="lg:sticky lg:top-28 space-y-5">
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
                    <dd className="text-text-primary text-sm">Free · open to all majors</dd>
                  </div>
                </dl>

                <div className="pt-3 border-t border-border-subtle">
                  <AddToCalendar
                    title={event.title}
                    description="NPFIS guest speaker: Christopher Chaidez, Associate Business Development Officer at JPMorgan and MBA candidate at UChicago Booth. Career insights, tips, networking and Q&A. Free, snacks and beverages provided."
                    location={event.location}
                    startUtc={START_UTC}
                    endUtc={END_UTC}
                  />
                </div>
              </div>

              <a
                href="/images/events/christopher-chaidez-flyer.webp"
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-2xl border border-border-subtle hover:border-accent/40 transition-colors duration-500"
              >
                <Image
                  src="/images/events/christopher-chaidez-flyer.webp"
                  alt="Event flyer: Finance & Investment Society guest speaker Christopher Chaidez, Wednesday October 21, 2026, 12:00 to 2:00 PM, 3rd Floor JC Boardroom"
                  width={1176}
                  height={1531}
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </a>
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
              Wednesday, Oct 21 · JC 3rd Floor Boardroom
            </p>
            <h2 className="text-[28px] sm:text-3xl md:text-5xl font-bold tracking-tight mb-5 md:mb-6 leading-[1.1] text-balance">
              See you there.
            </h2>
            <p className="text-text-tertiary text-sm sm:text-[16px] md:text-lg mb-8 md:mb-10">
              Free entry, a JPMorgan perspective, free snacks. Students from every major are welcome.
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
