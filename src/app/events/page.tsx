"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";
import ScrollReveal from "@/components/ScrollReveal";
import GradientOrb from "@/components/GradientOrb";
import AddToCalendar from "@/components/AddToCalendar";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string | null;
  lumaUrl: string | null;
  status: string;
}

const fallbackImages = [
  images.johnsonCenter,
  images.oldMain,
  images.fallCampus,
  images.springCampus,
];

// Hard-coded Apr 15, 2026 · 12:00–2:00 PM CDT (UTC-5) so the known event wires straight into calendars.
// (If future events need different times, add `startUtc`/`endUtc` to the Event model.)
const KNOWN_EVENT_TIMES: Record<string, { startUtc: string; endUtc: string }> = {
  "angel-escobedo-april-2026": {
    startUtc: "20260415T170000Z",
    endUtc: "20260415T190000Z",
  },
};

// Events that have a dedicated marketing detail page. The route is
// /events/<id> and enables the "More info" link in the card.
const EVENT_DETAIL_ROUTES = new Set<string>(["angel-escobedo-april-2026"]);

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then((data) => {
        setEvents(data);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const upcoming = events.filter((e) => e.status === "UPCOMING");

  return (
    <>
      {/* ---- HERO ---- */}
      <section className="relative h-[55svh] min-h-[420px] w-full overflow-hidden">
        <Image
          src={images.johnsonCenterDusk}
          alt="Johnson Center at dusk"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-base/50 via-base/20 to-base" />

        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 pb-16 md:pb-24">
          <p className="reveal text-[11px] tracking-[0.15em] uppercase font-medium text-accent mb-4">
            Events
          </p>
          <h1 className="reveal reveal-d1 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]">
            What&apos;s Happening
          </h1>
          <p className="reveal reveal-d2 text-text-secondary text-lg md:text-xl mt-4 max-w-lg">
            Workshops, competitions, panels, and more.
          </p>
        </div>
      </section>

      {/* ---- UPCOMING EVENTS ---- */}
      <section className="bg-base py-20 md:py-28">
        <div className="px-6 md:px-12 mb-12 flex items-end justify-between">
          <ScrollReveal>
            <p className="text-[11px] tracking-[0.15em] uppercase font-medium text-accent mb-2">
              Upcoming
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Don&apos;t Miss These
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <Link
              href="/events/calendar"
              className="glass-accent text-xs font-semibold text-accent hover:text-accent-light px-5 py-2.5 rounded-lg glow-accent-hover transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              Calendar View
            </Link>
          </ScrollReveal>
        </div>

        {!loaded ? (
          <div className="px-6 md:px-12 py-16 text-text-tertiary text-sm">
            Loading events...
          </div>
        ) : upcoming.length === 0 ? (
          <div className="px-6 md:px-12 py-16 text-text-tertiary text-sm">
            No upcoming events at the moment. Check back soon.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4 px-6 md:px-12">
            {upcoming.map((e, i) => (
              <ScrollReveal key={e.id} delay={i * 100}>
                <div className="group relative h-[45vh] md:h-[50vh] rounded-2xl overflow-hidden">
                  <Image
                    src={e.imageUrl || fallbackImages[i % fallbackImages.length]}
                    alt={e.title}
                    fill
                    className="object-cover image-reveal"
                    sizes="50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-base via-base/40 to-transparent group-hover:via-base/30 transition-all duration-700" />

                  {/* Date badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="glass-strong rounded-lg px-3 py-2 text-center min-w-[60px]">
                      <p className="text-accent font-data text-[11px] tracking-wider uppercase font-medium">
                        {e.date}
                      </p>
                    </div>
                  </div>

                  {/* Glass text overlay */}
                  <div className="absolute bottom-0 inset-x-0 z-10 p-6 md:p-8">
                    <div className="glass rounded-xl p-5 md:p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[11px] tracking-[0.15em] uppercase font-medium text-accent">
                          {e.time}
                        </span>
                        <span className="text-text-muted text-[11px]">/</span>
                        <span className="text-[11px] tracking-[0.15em] uppercase font-medium text-text-tertiary">
                          {e.location}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-text-primary tracking-tight mb-2">
                        {e.title}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed mb-4">
                        {e.description}
                      </p>
                      {(() => {
                        const known = KNOWN_EVENT_TIMES[e.id];
                        // Fallback: synthesize start/end from the event.date string if we have no override.
                        // Accepts "YYYY-MM-DD" or a plain month-day string; defaults to 12:00–14:00 CDT.
                        const { startUtc, endUtc } = known ?? fallbackUtc(e.date);
                        const hasDetailPage = EVENT_DETAIL_ROUTES.has(e.id);
                        return (
                          <div className="flex flex-wrap items-center gap-2">
                            <AddToCalendar
                              title={e.title}
                              description={e.description}
                              location={e.location}
                              startUtc={startUtc}
                              endUtc={endUtc}
                            />
                            {hasDetailPage && (
                              <Link
                                href={`/events/${e.id}`}
                                className="inline-flex items-center gap-2 rounded-lg glass-accent text-accent hover:text-accent-light px-5 py-3 text-sm font-semibold transition-all duration-300 group"
                              >
                                More info
                                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                              </Link>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>


      {/* ---- CTA ---- */}
      <section className="relative bg-base py-28 md:py-40 text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-grid" />
        <GradientOrb />

        <div className="relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl mx-auto leading-tight">
              Don&apos;t miss out.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-text-tertiary text-lg mb-10 max-w-md mx-auto">
              Join to get early access to all events and exclusive invitations.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <Link
              href="/contact"
              className="inline-block glass-accent text-sm font-semibold text-accent hover:text-accent-light px-8 py-4 rounded-lg glow-accent-hover transition-all duration-300"
            >
              Join NPFIS
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </>
  );
}

/**
 * Best-effort fallback when an event has no known start/end time.
 * Parses YYYY-MM-DD or "Mon D" and defaults to 12:00–14:00 CDT (UTC-5).
 */
function fallbackUtc(dateStr: string): { startUtc: string; endUtc: string } {
  let year = new Date().getUTCFullYear();
  let month = 1;
  let day = 1;
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (iso) {
    year = Number(iso[1]);
    month = Number(iso[2]);
    day = Number(iso[3]);
  } else {
    const parsed = new Date(`${dateStr}, ${year}`);
    if (!isNaN(parsed.getTime())) {
      year = parsed.getFullYear();
      month = parsed.getMonth() + 1;
      day = parsed.getDate();
    }
  }
  const pad = (n: number) => String(n).padStart(2, "0");
  const base = `${year}${pad(month)}${pad(day)}T`;
  return { startUtc: `${base}170000Z`, endUtc: `${base}190000Z` };
}
