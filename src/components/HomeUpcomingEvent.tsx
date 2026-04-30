"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";
import ScrollReveal from "@/components/ScrollReveal";
import AddToCalendar from "@/components/AddToCalendar";
import { KNOWN_EVENT_TIMES, utcToMs, fallbackUtc } from "@/lib/event-times";

// Events that have a dedicated detail page.
const EVENT_DETAIL_ROUTES = new Set<string>([
  "angel-escobedo-april-2026",
  "elvin-ahmeti-april-2026",
]);

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string | null;
  status: string;
}

export default function HomeUpcomingEvent() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then((data) => { setEvents(data); setLoaded(true); })
      .catch(() => setLoaded(true));
  }, []);

  // Pick the soonest upcoming event using the same time logic as the events page.
  const next = useMemo(() => {
    const now = Date.now();
    const candidates: { e: Event; start: number }[] = [];
    for (const e of events) {
      const known = KNOWN_EVENT_TIMES[e.id];
      const { startUtc, endUtc } = known ?? fallbackUtc(e.date);
      const endMs = utcToMs(endUtc);
      const isPast = e.status === "PAST" || (Number.isFinite(endMs) && endMs < now);
      if (!isPast && e.status === "UPCOMING") {
        candidates.push({ e, start: utcToMs(startUtc) });
      }
    }
    candidates.sort((a, b) => a.start - b.start);
    return candidates[0]?.e ?? null;
  }, [events]);

  // Don't render anything until we know whether there's an upcoming event.
  if (!loaded || !next) return null;

  const known = KNOWN_EVENT_TIMES[next.id];
  const { startUtc, endUtc } = known ?? fallbackUtc(next.date);
  const hasDetailPage = EVENT_DETAIL_ROUTES.has(next.id);

  const card = (
    <div className="group relative block overflow-hidden rounded-2xl border border-border-subtle hover:border-accent/40 transition-colors duration-500">
      <div className="grid md:grid-cols-[1fr_1.2fr]">
        {/* Image */}
        <div className="relative h-[220px] md:h-auto md:min-h-[260px] overflow-hidden">
          <Image
            src={next.imageUrl || images.johnsonCenter}
            alt={next.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-base/70 via-base/30 to-transparent" />
          <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-accent/20 backdrop-blur-md px-3 py-1 text-[10px] tracking-[0.12em] uppercase font-medium text-accent border border-accent/30">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Upcoming
          </span>
        </div>

        {/* Copy */}
        <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center bg-surface-0/60">
          <p className="text-[10px] md:text-[11px] tracking-[0.15em] uppercase font-medium text-text-tertiary mb-3">
            {next.date} · {next.time} · {next.location}
          </p>
          <h3 className="text-[22px] sm:text-2xl md:text-3xl font-semibold tracking-tight leading-[1.15] mb-3 text-balance group-hover:text-accent transition-colors duration-500">
            {next.title}
          </h3>
          <p className="text-text-tertiary text-sm md:text-[15px] leading-relaxed mb-5 max-w-xl text-pretty line-clamp-3">
            {next.description}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <AddToCalendar
              title={next.title}
              description={next.description}
              location={next.location}
              startUtc={startUtc}
              endUtc={endUtc}
            />
            {hasDetailPage && (
              <span className="inline-flex items-center gap-2 text-accent text-sm font-semibold w-fit">
                More info
                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="hr-gold" />
      <section className="bg-base py-16 md:py-24">
        <div className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-8 md:mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <p className="text-accent text-[11px] tracking-[0.15em] uppercase font-medium mb-2">
                  Upcoming Event
                </p>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight">
                  Next up
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
            {hasDetailPage ? (
              <Link href={`/events/${next.id}`} className="block">
                {card}
              </Link>
            ) : (
              card
            )}
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
