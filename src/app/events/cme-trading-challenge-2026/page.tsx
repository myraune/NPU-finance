import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { images } from "@/lib/images";
import ScrollReveal from "@/components/ScrollReveal";
import GradientOrb from "@/components/GradientOrb";

export const metadata: Metadata = {
  title: "2026 CME Group University Trading Challenge | NPFIS",
  description:
    "NPU FIS is putting together teams of 3–5 students for the 2026 CME Group University Trading Challenge, a simulated futures trading competition running October 4–30, 2026.",
};

const CONTACT_EMAIL = "tjhabetler@northpark.edu";
const INTEREST_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "CME Trading Challenge: I'm interested"
)}&body=${encodeURIComponent(
  "Hi Tyler,\n\nI'm interested in joining an NPU team for the 2026 CME University Trading Challenge.\n\nName:\nYear / major:\nPrior trading experience (none is fine):\nTeammates I'd like to team up with (optional):\n"
)}`;
const CME_URL =
  "https://www.cmegroup.com/events/university-trading-challenge/2026-trading-challenge.html";
const INSTAGRAM_URL = "https://www.instagram.com/fis_npu";

// Facts from CME Group's 2026 registration announcement (Sept 1, 2026).
const facts = [
  { label: "Competition", value: "October 4 – 30, 2026" },
  { label: "CME deadline", value: "September 29, 2026", sub: "5:00 PM CT" },
  { label: "Team size", value: "3 – 5 students" },
  { label: "Platform", value: "CQG simulated trading", sub: "Real market data, no real money" },
  { label: "Open to", value: "Every major, every level of experience" },
];

const whyJoin = [
  "Trade futures in a simulated environment with professional-grade tools.",
  "Compete against student teams from universities around the world.",
  "Put classroom theory into practice: risk management and decisions under pressure.",
  "A real line on your resume and something concrete to talk about in interviews.",
];

const steps = [
  {
    num: "01",
    title: "Tell us you're in",
    desc: "Email Tyler that you're interested. You don't need a team yet.",
  },
  {
    num: "02",
    title: "We build NPU teams",
    desc: "We group everyone into teams of 3–5 and handle registration before CME's Sept 29 deadline.",
  },
  {
    num: "03",
    title: "Trade Oct 4–30",
    desc: "Your team manages a mock futures portfolio for four weeks and competes on the global leaderboard.",
  },
];

export default function CmeTradingChallengePage() {
  return (
    <>
      {/* ---- HERO ---- */}
      <section className="relative min-h-[60svh] md:min-h-[70svh] w-full overflow-hidden flex items-end">
        <Image
          src={images.fallCampus2}
          alt="North Park University campus in fall"
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
              Competition · October 2026
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md px-2.5 py-1 text-[10px] tracking-[0.12em] uppercase font-medium text-white/85 border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Forming teams
            </span>
          </div>
          <h1 className="reveal reveal-d2 text-[28px] sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.02em] leading-[1.05] md:leading-[1.02] max-w-4xl text-white text-balance drop-shadow-[0_2px_24px_rgba(0,0,0,0.4)]">
            2026 CME University Trading Challenge
          </h1>
          <p className="reveal reveal-d3 mt-5 md:mt-6 text-white/85 text-[15px] md:text-lg max-w-2xl leading-relaxed text-pretty">
            We&apos;re putting together multiple NPU teams of 3–5 students. No finance major or
            trading experience needed.
          </p>
          <div className="reveal reveal-d3 mt-7 md:mt-8 flex flex-wrap items-center gap-4">
            <a
              href={INTEREST_MAILTO}
              className="group inline-flex items-center gap-2 text-[13px] font-semibold text-base bg-accent hover:bg-accent-light rounded-lg px-6 py-3.5 transition-all duration-300 min-h-[44px]"
            >
              I&apos;m interested
              <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </a>
            <span className="text-white/70 text-[13px]">Team sign-up closes before Sept 29</span>
          </div>
        </div>
      </section>

      {/* ---- MAIN CONTENT ---- */}
      <section className="bg-base py-14 md:py-24">
        <div className="px-5 sm:px-6 md:px-12 lg:px-16 grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 max-w-7xl mx-auto">
          <div>
            <ScrollReveal>
              <p className="text-[11px] tracking-[0.15em] uppercase font-medium text-accent mb-3">
                About the challenge
              </p>
              <h2 className="text-[26px] sm:text-3xl md:text-4xl font-semibold tracking-tight mb-5 md:mb-6 leading-[1.15] text-balance">
                Hands-on futures trading, without the real-money risk.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="space-y-4 md:space-y-5 text-text-secondary text-[15px] md:text-base leading-relaxed max-w-2xl text-pretty">
                <p>
                  The CME Group University Trading Challenge lets students experience futures
                  trading in a simulated environment and compete against other universities.
                  It&apos;s a chance to put what we learn in the classroom into practice, and to
                  learn how to manage risk and make decisions under pressure.
                </p>
                <p>
                  You don&apos;t need to be an expert trader or a Finance major. Whether you already
                  follow the markets or have never placed a trade, this is a good way to learn and
                  get involved.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <h3 className="mt-10 md:mt-12 mb-4 md:mb-5 text-xs tracking-[0.15em] uppercase font-medium text-text-tertiary">
                Why join
              </h3>
              <ul className="space-y-3 max-w-2xl">
                {whyJoin.map((point) => (
                  <li key={point} className="flex gap-3 text-[15px] text-text-secondary leading-relaxed text-pretty">
                    <span className="text-accent select-none mt-[2px] shrink-0">▸</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <h3 className="mt-12 md:mt-14 mb-5 md:mb-6 text-xs tracking-[0.15em] uppercase font-medium text-text-tertiary">
                How it works
              </h3>
              <ol className="max-w-2xl border-t border-border-subtle">
                {steps.map((s) => (
                  <li key={s.num} className="flex gap-5 md:gap-8 py-5 md:py-6 border-b border-border-subtle">
                    <span className="font-data text-accent-dim text-xs tracking-widest mt-1 shrink-0">{s.num}</span>
                    <div>
                      <p className="text-text-primary font-semibold text-base md:text-lg tracking-tight mb-1">{s.title}</p>
                      <p className="text-text-tertiary text-sm md:text-[15px] leading-relaxed text-pretty">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-xs text-text-muted max-w-2xl leading-relaxed">
                The University Trading Challenge is run by CME Group. NPU FIS organizes North Park
                teams and is not affiliated with CME Group.
              </p>
            </ScrollReveal>
          </div>

          {/* ── RIGHT COLUMN: key facts ── */}
          <ScrollReveal direction="left">
            <aside className="lg:sticky lg:top-28">
              <div className="glass-strong rounded-2xl p-5 sm:p-6 md:p-7 space-y-5">
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase font-medium text-text-tertiary mb-2">
                    Key details
                  </p>
                  <h3 className="text-lg font-semibold text-text-primary leading-tight">
                    Forming NPU teams now
                  </h3>
                </div>

                <dl className="space-y-4 text-sm">
                  {facts.map((f) => (
                    <div key={f.label} className="flex gap-3">
                      <dt className="text-text-tertiary w-24 shrink-0 text-[11px] sm:text-xs tracking-wider uppercase mt-[2px]">
                        {f.label}
                      </dt>
                      <dd className="text-text-primary text-sm">
                        {f.value}
                        {f.sub && (
                          <>
                            <br />
                            <span className="text-text-secondary">{f.sub}</span>
                          </>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="pt-3 border-t border-border-subtle space-y-3">
                  <a
                    href={INTEREST_MAILTO}
                    className="w-full inline-flex justify-center items-center gap-2 rounded-lg bg-accent hover:bg-accent-light text-base px-5 py-3 text-sm font-semibold transition-all duration-300 min-h-[44px]"
                  >
                    I&apos;m interested
                  </a>
                  <a
                    href={CME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex justify-center items-center gap-2 rounded-lg glass-accent text-accent hover:text-accent-light px-5 py-3 text-sm font-semibold transition-all duration-300 min-h-[44px]"
                  >
                    Official challenge page
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                  <p className="text-text-tertiary text-xs text-center">
                    Questions?{" "}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:text-accent-light break-all">
                      {CONTACT_EMAIL}
                    </a>
                  </p>
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
              Teams of 3–5
            </p>
            <h2 className="text-[28px] sm:text-3xl md:text-5xl font-bold tracking-tight mb-5 md:mb-6 leading-[1.1] text-balance">
              Want a spot on an NPU team?
            </h2>
            <p className="text-text-tertiary text-sm sm:text-base md:text-lg mb-8 md:mb-10">
              Let us know and we&apos;ll place you on a team. Bring friends if you like.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a
                href={INTEREST_MAILTO}
                className="inline-flex items-center gap-2 text-[13px] font-semibold text-base bg-accent hover:bg-accent-light rounded-lg px-6 py-3.5 transition-all duration-300 min-h-[44px]"
              >
                I&apos;m interested
              </a>
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
