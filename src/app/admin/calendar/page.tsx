"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import Calendar, { type CalendarEvent } from "@/components/Calendar";

export default function AdminCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then(setEvents);
  }, []);

  const selectedEvents = selectedDate
    ? events.filter((e) => e.date === format(selectedDate, "yyyy-MM-dd"))
    : [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-text-muted text-[10px] tracking-[0.2em] uppercase font-bold mb-1">
            [Calendar]
          </p>
          <h1 className="text-xl font-bold uppercase tracking-tight">
            Event Calendar
          </h1>
        </div>
        <Link
          href="/admin/events/new"
          className="px-5 py-2 bg-accent text-black text-xs font-bold uppercase tracking-wider hover:bg-white"
          style={{ transition: "background 50ms linear" }}
        >
          + New Event
        </Link>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        {/* Calendar Grid */}
        <div className="border border-border p-4">
          <Calendar
            events={events}
            currentMonth={currentMonth}
            onMonthChange={setCurrentMonth}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        </div>

        {/* Day Detail Panel */}
        <div className="border border-border">
          <div className="border-b border-border bg-surface px-4 py-2">
            <p className="text-[10px] uppercase tracking-wider text-text-muted">
              {selectedDate
                ? format(selectedDate, "EEEE, MMMM d, yyyy")
                : "Select a date"}
            </p>
          </div>

          {selectedDate ? (
            selectedEvents.length === 0 ? (
              <div className="px-4 py-12 text-center text-text-muted text-xs uppercase tracking-wider">
                No events
              </div>
            ) : (
              <div>
                {selectedEvents.map((evt) => {
                  const regCount = evt._count?.registrations ?? 0;
                  const isFull =
                    evt.capacity ? regCount >= evt.capacity : false;
                  const fillPct = evt.capacity
                    ? Math.min((regCount / evt.capacity) * 100, 100)
                    : 0;

                  return (
                    <div
                      key={evt.id}
                      className="border-b border-border last:border-b-0 p-4"
                    >
                      {/* Status indicator */}
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            evt.status === "UPCOMING"
                              ? "bg-accent"
                              : evt.status === "CANCELLED"
                                ? "bg-negative"
                                : "bg-text-muted"
                          }`}
                        />
                        <span className="text-[10px] uppercase tracking-wider text-text-muted">
                          {evt.status}
                        </span>
                      </div>

                      <Link
                        href={`/admin/events/${evt.id}`}
                        className="text-xs font-bold uppercase tracking-tight hover:text-accent block mb-1"
                        style={{ transition: "color 50ms linear" }}
                      >
                        {evt.title}
                      </Link>

                      <p className="text-text-muted text-[10px] mb-1">
                        {evt.time} / {evt.location}
                      </p>

                      {evt.description && (
                        <p className="text-text-secondary text-[10px] leading-relaxed mt-1 mb-1 line-clamp-2">
                          {evt.description}
                        </p>
                      )}

                      {/* Registration stats */}
                      <div className="mt-3">
                        <div className="flex justify-between text-[10px] mb-1">
                          <span className="text-accent tabular-nums">
                            {regCount} registered
                          </span>
                          {evt.capacity && (
                            <span className="text-text-muted tabular-nums">
                              {evt.capacity} max
                            </span>
                          )}
                        </div>
                        {evt.capacity && (
                          <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                isFull ? "bg-negative" : "bg-accent"
                              }`}
                              style={{
                                width: `${fillPct}%`,
                                transition: "width 300ms ease",
                              }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 mt-3">
                        <Link
                          href={`/admin/events/${evt.id}`}
                          className="text-[10px] uppercase tracking-wider text-accent hover:text-white"
                          style={{ transition: "color 50ms linear" }}
                        >
                          [Edit]
                        </Link>
                        <Link
                          href={`/admin/events/${evt.id}`}
                          className="text-[10px] uppercase tracking-wider text-text-muted hover:text-accent"
                          style={{ transition: "color 50ms linear" }}
                        >
                          [Registrations]
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            <div className="px-4 py-12 text-center text-text-muted text-xs uppercase tracking-wider">
              Click a date to view events
            </div>
          )}

          {/* Monthly Summary */}
          <div className="border-t border-border bg-surface px-4 py-3">
            <p className="text-[10px] uppercase tracking-wider text-text-muted mb-2">
              {format(currentMonth, "MMMM")} Summary
            </p>
            <div className="grid grid-cols-3 gap-2">
              {(() => {
                const monthEvents = events.filter((e) => {
                  const d = new Date(e.date + "T00:00:00");
                  return (
                    d.getMonth() === currentMonth.getMonth() &&
                    d.getFullYear() === currentMonth.getFullYear()
                  );
                });
                const totalRegs = monthEvents.reduce(
                  (s, e) => s + (e._count?.registrations ?? 0),
                  0
                );
                const upcoming = monthEvents.filter(
                  (e) => e.status === "UPCOMING"
                ).length;

                return (
                  <>
                    <div>
                      <p className="text-lg font-bold text-accent tabular-nums">
                        {monthEvents.length}
                      </p>
                      <p className="text-[9px] uppercase tracking-wider text-text-muted">
                        Events
                      </p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-accent tabular-nums">
                        {totalRegs}
                      </p>
                      <p className="text-[9px] uppercase tracking-wider text-text-muted">
                        Regs
                      </p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-accent tabular-nums">
                        {upcoming}
                      </p>
                      <p className="text-[9px] uppercase tracking-wider text-text-muted">
                        Upcoming
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
