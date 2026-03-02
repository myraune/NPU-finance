"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: string;
  _count?: { registrations: number };
}

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetch("/api/events").then((r) => r.json()).then(setEvents);
  }, []);

  const filtered = filter === "ALL" ? events : events.filter((e) => e.status === filter);

  async function handleDelete(id: string) {
    if (!confirm("Delete this event?")) return;
    await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
    setEvents(events.filter((e) => e.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-text-muted text-[10px] tracking-[0.2em] uppercase font-bold mb-1">[Events]</p>
          <h1 className="text-xl font-bold uppercase tracking-tight">Manage Events</h1>
        </div>
        <Link href="/admin/events/new" className="px-5 py-2 bg-accent text-black text-xs font-bold uppercase tracking-wider hover:bg-white" style={{ transition: "background 50ms linear" }}>
          + New Event
        </Link>
      </div>

      <div className="flex gap-0 border border-border mb-6">
        {["ALL", "UPCOMING", "PAST", "CANCELLED"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 text-[10px] uppercase tracking-wider border-r border-border last:border-r-0 ${
              filter === s ? "text-accent bg-surface" : "text-text-muted hover:bg-white hover:text-black"
            }`}
            style={{ transition: "all 50ms linear" }}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="border border-border">
        <div className="grid grid-cols-[1fr_100px_80px_80px] gap-0 border-b border-border bg-surface">
          <div className="px-4 py-2 text-[10px] uppercase tracking-wider text-text-muted">Event</div>
          <div className="px-4 py-2 text-[10px] uppercase tracking-wider text-text-muted border-l border-border">Date</div>
          <div className="px-4 py-2 text-[10px] uppercase tracking-wider text-text-muted border-l border-border">Regs</div>
          <div className="px-4 py-2 text-[10px] uppercase tracking-wider text-text-muted border-l border-border">Action</div>
        </div>

        {filtered.map((e) => (
          <div key={e.id} className="grid grid-cols-[1fr_100px_80px_80px] gap-0 border-b border-border last:border-b-0 hover:bg-surface" style={{ transition: "background 50ms linear" }}>
            <div className="px-4 py-3">
              <Link href={`/admin/events/${e.id}`} className="text-xs font-bold uppercase tracking-tight hover:text-accent" style={{ transition: "color 50ms linear" }}>
                {e.title}
              </Link>
              <p className="text-text-muted text-[10px] mt-0.5">{e.location}</p>
            </div>
            <div className="px-4 py-3 text-xs text-text-secondary border-l border-border tabular-nums">{e.date}</div>
            <div className="px-4 py-3 text-xs text-accent border-l border-border tabular-nums">{e._count?.registrations ?? 0}</div>
            <div className="px-4 py-3 border-l border-border">
              <button onClick={() => handleDelete(e.id)} className="text-[10px] uppercase tracking-wider text-text-muted hover:text-negative" style={{ transition: "color 50ms linear" }}>
                [Del]
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="px-4 py-8 text-center text-text-muted text-xs uppercase tracking-wider">No events found</div>
        )}
      </div>
    </div>
  );
}
