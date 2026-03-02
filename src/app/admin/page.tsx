"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface EventData {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: string;
  capacity: number | null;
  _count?: { registrations: number };
}

interface DashData {
  eventCount: number;
  upcomingCount: number;
  registrationCount: number;
  unreadContact: number;
  upcomingEvents: EventData[];
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashData | null>(null);

  useEffect(() => {
    async function load() {
      const [eventsRes, contactRes] = await Promise.all([
        fetch("/api/events"),
        fetch("/api/admin/contact"),
      ]);

      const events: EventData[] = await eventsRes.json();
      const contacts = await contactRes.json();

      const upcoming = events
        .filter((e) => e.status === "UPCOMING")
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(0, 5);

      setData({
        eventCount: events.length,
        upcomingCount: events.filter((e) => e.status === "UPCOMING").length,
        registrationCount: events.reduce(
          (sum, e) => sum + (e._count?.registrations ?? 0),
          0
        ),
        unreadContact: contacts.filter((c: { read: boolean }) => !c.read)
          .length,
        upcomingEvents: upcoming,
      });
    }
    load();
  }, []);

  const stats = data
    ? [
        { label: "Total Events", value: data.eventCount },
        { label: "Upcoming", value: data.upcomingCount },
        { label: "Registrations", value: data.registrationCount },
        { label: "Unread Messages", value: data.unreadContact },
      ]
    : [];

  return (
    <div>
      <p className="text-text-muted text-[10px] tracking-[0.2em] uppercase font-bold mb-1">
        [Dashboard]
      </p>
      <h1 className="text-xl font-bold uppercase tracking-tight mb-8">
        Admin Panel
      </h1>

      {!data ? (
        <p className="text-text-muted text-xs uppercase tracking-wider">
          Loading...
        </p>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-border mb-8">
            {stats.map((s) => (
              <div
                key={s.label}
                className="border-r border-b border-border p-6 last:border-r-0"
              >
                <p className="text-3xl font-bold text-accent tabular-nums">
                  {s.value}
                </p>
                <p className="text-text-muted text-[10px] uppercase tracking-wider mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3 mb-8">
            <Link
              href="/admin/events"
              className="px-5 py-2 bg-accent text-black text-xs font-bold uppercase tracking-wider hover:bg-white"
              style={{ transition: "background 50ms linear" }}
            >
              Manage Events
            </Link>
            <Link
              href="/admin/calendar"
              className="px-5 py-2 border border-border text-xs font-bold uppercase tracking-wider text-text-secondary hover:bg-white hover:text-black"
              style={{ transition: "all 50ms linear" }}
            >
              Calendar
            </Link>
            <Link
              href="/admin/contact"
              className="px-5 py-2 border border-border text-xs font-bold uppercase tracking-wider text-text-secondary hover:bg-white hover:text-black"
              style={{ transition: "all 50ms linear" }}
            >
              View Messages ({data.unreadContact} new)
            </Link>
          </div>

          {/* Upcoming Events Preview */}
          <div>
            <p className="text-text-muted text-[10px] tracking-[0.2em] uppercase font-bold mb-3">
              [Next Events]
            </p>

            <div className="border border-border">
              <div className="grid grid-cols-[1fr_90px_100px_60px] gap-0 border-b border-border bg-surface">
                <div className="px-4 py-2 text-[10px] uppercase tracking-wider text-text-muted">
                  Event
                </div>
                <div className="px-4 py-2 text-[10px] uppercase tracking-wider text-text-muted border-l border-border">
                  Date
                </div>
                <div className="px-4 py-2 text-[10px] uppercase tracking-wider text-text-muted border-l border-border">
                  Spots
                </div>
                <div className="px-4 py-2 text-[10px] uppercase tracking-wider text-text-muted border-l border-border">
                  Fill
                </div>
              </div>

              {data.upcomingEvents.length === 0 ? (
                <div className="px-4 py-8 text-center text-text-muted text-xs uppercase tracking-wider">
                  No upcoming events
                </div>
              ) : (
                data.upcomingEvents.map((evt) => {
                  const regCount = evt._count?.registrations ?? 0;
                  const fillPct = evt.capacity
                    ? Math.min((regCount / evt.capacity) * 100, 100)
                    : 0;

                  return (
                    <div
                      key={evt.id}
                      className="grid grid-cols-[1fr_90px_100px_60px] gap-0 border-b border-border last:border-b-0 hover:bg-surface"
                      style={{ transition: "background 50ms linear" }}
                    >
                      <div className="px-4 py-3">
                        <Link
                          href={`/admin/events/${evt.id}`}
                          className="text-xs font-bold uppercase tracking-tight hover:text-accent"
                          style={{ transition: "color 50ms linear" }}
                        >
                          {evt.title}
                        </Link>
                        <p className="text-text-muted text-[10px] mt-0.5">
                          {evt.location}
                        </p>
                      </div>
                      <div className="px-4 py-3 text-xs text-text-secondary border-l border-border tabular-nums">
                        {evt.date}
                      </div>
                      <div className="px-4 py-3 text-xs border-l border-border tabular-nums">
                        <span className="text-accent">{regCount}</span>
                        <span className="text-text-muted">
                          {evt.capacity ? ` / ${evt.capacity}` : ""}
                        </span>
                      </div>
                      <div className="px-4 py-3 border-l border-border flex items-center">
                        {evt.capacity ? (
                          <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                fillPct >= 100 ? "bg-negative" : "bg-accent"
                              }`}
                              style={{
                                width: `${fillPct}%`,
                                transition: "width 300ms ease",
                              }}
                            />
                          </div>
                        ) : (
                          <span className="text-[10px] text-text-muted">
                            --
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
