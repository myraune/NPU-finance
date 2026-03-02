"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { format } from "date-fns";
import Calendar, { type CalendarEvent } from "@/components/Calendar";
import RegistrationModal from "@/components/RegistrationModal";
import ScrollReveal from "@/components/ScrollReveal";
import GradientOrb from "@/components/GradientOrb";

interface Attendee {
  name: string;
  major: string | null;
  year: string | null;
}

export default function EventCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [registering, setRegistering] = useState<CalendarEvent | null>(null);
  const [attendees, setAttendees] = useState<Record<string, Attendee[]>>({});
  const [expandedAttendees, setExpandedAttendees] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const fetchEvents = useCallback(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then((data: CalendarEvent[]) => {
        setEvents(data);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  function handleRegistrationClose() {
    setRegistering(null);
    // Re-fetch events to update registration counts
    fetchEvents();
    // Clear cached attendees so they re-fetch with updated data
    setAttendees({});
  }

  function toggleAttendees(eventId: string) {
    if (expandedAttendees === eventId) {
      setExpandedAttendees(null);
      return;
    }
    setExpandedAttendees(eventId);
    if (!attendees[eventId]) {
      fetch(`/api/events/${eventId}/attendees`)
        .then((r) => r.json())
        .then((data: Attendee[]) => {
          setAttendees((prev) => ({ ...prev, [eventId]: data }));
        });
    }
  }

  const selectedEvents = selectedDate
    ? events.filter((e) => e.date === format(selectedDate, "yyyy-MM-dd"))
    : [];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-base pt-32 pb-16 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <GradientOrb />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/events"
              className="text-text-tertiary hover:text-accent transition-colors duration-200 text-sm"
            >
              Events
            </Link>
            <span className="text-text-muted text-sm">/</span>
            <span className="text-accent text-sm">Calendar</span>
          </div>
          <p className="reveal text-[11px] tracking-[0.15em] uppercase font-medium text-accent mb-4">
            Calendar
          </p>
          <h1 className="reveal reveal-d1 text-4xl md:text-6xl font-bold tracking-tight leading-[0.95]">
            Event Calendar
          </h1>
          <p className="reveal reveal-d2 text-text-secondary text-lg mt-4 max-w-lg">
            Browse upcoming workshops, competitions, and panels at a glance.
          </p>
        </div>
      </section>

      {/* Calendar + Detail Panel */}
      <section className="bg-base pb-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          {!loaded ? (
            <div className="py-16 text-text-tertiary text-sm">Loading calendar...</div>
          ) : (
            <div className="grid lg:grid-cols-[1fr_380px] gap-6">
              {/* Calendar Grid */}
              <ScrollReveal>
                <div className="glass rounded-2xl p-4 md:p-6">
                  <Calendar
                    events={events}
                    currentMonth={currentMonth}
                    onMonthChange={setCurrentMonth}
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                  />
                </div>
              </ScrollReveal>

              {/* Detail Panel */}
              <ScrollReveal delay={100}>
                <div className="glass rounded-2xl p-6 lg:sticky lg:top-28 max-h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar">
                  {selectedDate ? (
                    <>
                      <p className="text-[11px] tracking-[0.15em] uppercase font-medium text-accent mb-1">
                        {format(selectedDate, "EEEE")}
                      </p>
                      <h3 className="text-xl font-bold tracking-tight mb-6">
                        {format(selectedDate, "MMMM d, yyyy")}
                      </h3>

                      {selectedEvents.length === 0 ? (
                        <p className="text-text-tertiary text-sm">
                          No events on this day.
                        </p>
                      ) : (
                        <div className="space-y-4">
                          {selectedEvents.map((evt) => {
                            const regCount = evt._count?.registrations ?? 0;
                            const isFull = evt.capacity ? regCount >= evt.capacity : false;
                            const eventAttendees = attendees[evt.id];
                            const isExpanded = expandedAttendees === evt.id;

                            return (
                              <div
                                key={evt.id}
                                className="border border-white/[0.06] rounded-xl p-4 bg-surface-0/50"
                              >
                                {/* Status tag */}
                                {evt.status === "CANCELLED" && (
                                  <span className="inline-block text-[9px] tracking-wider uppercase font-bold text-negative bg-negative/10 px-2 py-0.5 rounded mb-2">
                                    Cancelled
                                  </span>
                                )}

                                <h4 className="font-bold tracking-tight mb-1">
                                  {evt.title}
                                </h4>

                                <div className="flex items-center gap-2 text-text-tertiary text-xs mb-2">
                                  <span>{evt.time}</span>
                                  <span className="text-text-muted">/</span>
                                  <span>{evt.location}</span>
                                </div>

                                {evt.description && (
                                  <p className="text-text-secondary text-xs leading-relaxed mb-3 line-clamp-3">
                                    {evt.description}
                                  </p>
                                )}

                                {/* Capacity bar */}
                                {evt.capacity && (
                                  <div className="mb-3">
                                    <div className="flex justify-between text-[10px] text-text-muted mb-1">
                                      <span>{regCount} registered</span>
                                      <span>{evt.capacity} spots</span>
                                    </div>
                                    <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                                      <div
                                        className={`h-full rounded-full transition-all duration-500 ${
                                          isFull ? "bg-negative" : "bg-accent"
                                        }`}
                                        style={{
                                          width: `${Math.min((regCount / evt.capacity) * 100, 100)}%`,
                                        }}
                                      />
                                    </div>
                                  </div>
                                )}

                                {!evt.capacity && regCount > 0 && (
                                  <p className="text-[10px] text-text-muted mb-3">
                                    {regCount} registered
                                  </p>
                                )}

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                  {evt.status === "UPCOMING" && !isFull && (
                                    <button
                                      onClick={() => setRegistering(evt)}
                                      className="px-4 py-1.5 bg-accent text-base text-xs font-semibold rounded-lg hover:bg-accent-light transition-colors duration-200"
                                    >
                                      Register
                                    </button>
                                  )}
                                  {evt.status === "UPCOMING" && isFull && (
                                    <span className="px-4 py-1.5 bg-white/[0.04] text-text-muted text-xs font-semibold rounded-lg">
                                      Full
                                    </span>
                                  )}
                                  {regCount > 0 && (
                                    <button
                                      onClick={() => toggleAttendees(evt.id)}
                                      className="px-3 py-1.5 border border-white/[0.08] text-text-secondary text-xs rounded-lg hover:border-accent/30 hover:text-accent transition-all duration-200"
                                    >
                                      {isExpanded ? "Hide" : "Attendees"}
                                    </button>
                                  )}
                                </div>

                                {/* Attendees list */}
                                {isExpanded && (
                                  <div className="mt-3 pt-3 border-t border-white/[0.06]">
                                    {!eventAttendees ? (
                                      <p className="text-text-muted text-[10px]">Loading...</p>
                                    ) : eventAttendees.length === 0 ? (
                                      <p className="text-text-muted text-[10px]">No attendees yet.</p>
                                    ) : (
                                      <div className="space-y-1.5">
                                        {eventAttendees.map((a, i) => (
                                          <div
                                            key={i}
                                            className="flex items-center gap-2"
                                          >
                                            <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                                              <span className="text-[9px] font-bold text-accent">
                                                {a.name[0]}
                                              </span>
                                            </div>
                                            <div>
                                              <p className="text-xs text-text-primary leading-tight">
                                                {a.name}
                                              </p>
                                              {(a.major || a.year) && (
                                                <p className="text-[10px] text-text-muted leading-tight">
                                                  {[a.major, a.year].filter(Boolean).join(" / ")}
                                                </p>
                                              )}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                        </svg>
                      </div>
                      <p className="text-text-secondary text-sm font-medium mb-1">
                        Select a date
                      </p>
                      <p className="text-text-muted text-xs">
                        Click any day to see events and register.
                      </p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            </div>
          )}
        </div>
      </section>

      {/* Mobile list view for current month */}
      <section className="lg:hidden bg-surface-0 py-12">
        <div className="px-6">
          <p className="text-[11px] tracking-[0.15em] uppercase font-medium text-accent mb-2">
            This Month
          </p>
          <h2 className="text-xl font-bold tracking-tight mb-6">
            All Events in {format(currentMonth, "MMMM")}
          </h2>

          {events
            .filter((e) => {
              const eventDate = new Date(e.date + "T00:00:00");
              return (
                eventDate.getMonth() === currentMonth.getMonth() &&
                eventDate.getFullYear() === currentMonth.getFullYear()
              );
            })
            .sort((a, b) => a.date.localeCompare(b.date))
            .map((evt) => (
              <button
                key={evt.id}
                onClick={() => {
                  const d = new Date(evt.date + "T00:00:00");
                  setSelectedDate(d);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full flex items-center justify-between py-3 border-b border-white/[0.04] hover:bg-white/[0.02] px-2 rounded transition-all text-left"
              >
                <div>
                  <p className="text-sm font-medium text-text-primary">{evt.title}</p>
                  <p className="text-[11px] text-text-tertiary">{evt.time} / {evt.location}</p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <p className="text-xs font-data text-accent">
                    {format(new Date(evt.date + "T00:00:00"), "MMM d")}
                  </p>
                  <p className="text-[10px] text-text-muted">
                    {evt._count?.registrations ?? 0} joined
                  </p>
                </div>
              </button>
            ))}

          {events.filter((e) => {
            const eventDate = new Date(e.date + "T00:00:00");
            return (
              eventDate.getMonth() === currentMonth.getMonth() &&
              eventDate.getFullYear() === currentMonth.getFullYear()
            );
          }).length === 0 && (
            <p className="text-text-muted text-sm py-4">No events this month.</p>
          )}
        </div>
      </section>

      {/* Registration Modal */}
      {registering && (
        <RegistrationModal
          eventId={registering.id}
          eventTitle={registering.title}
          onClose={handleRegistrationClose}
        />
      )}
    </>
  );
}
