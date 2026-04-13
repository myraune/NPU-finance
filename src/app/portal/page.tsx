"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  status: string;
  capacity?: number | null;
  _count?: { registrations: number };
}

interface Registration {
  id: string;
  eventId: string;
  name: string;
  createdAt: string;
}

export default function MemberPortal() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [myRegistrations, setMyRegistrations] = useState<Registration[]>([]);
  const [loaded, setLoaded] = useState(false);

  const user = session?.user;
  const role = (user as { role?: string } | undefined)?.role;
  const isAdmin = role === "ADMIN";

  useEffect(() => {
    Promise.all([
      fetch("/api/events").then((r) => r.json()),
      fetch("/api/portal/registrations").then((r) => r.json()),
    ])
      .then(([evts, regs]) => {
        setEvents(evts);
        setMyRegistrations(Array.isArray(regs) ? regs : []);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const upcoming = events.filter((e) => e.status === "UPCOMING");
  const myEventIds = new Set(myRegistrations.map((r) => r.eventId));
  const myUpcoming = upcoming.filter((e) => myEventIds.has(e.id));

  return (
    <div className="min-h-screen bg-base pt-24">
      {/* Header */}
      <div className="border-b border-border-subtle bg-surface-0/50 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center">
              <img src="/images/logo.png" alt="NPFIS Logo" className="w-8 h-8 object-contain" />
            </Link>
            <span className="text-white/10">|</span>
            <span className="text-[11px] tracking-[0.15em] uppercase text-text-muted font-medium">
              Member Portal
            </span>
          </div>
          <div className="flex items-center gap-4">
            {isAdmin && (
              <Link
                href="/admin"
                className="text-[10px] tracking-wider uppercase text-accent hover:text-accent-light transition-colors"
              >
                Admin →
              </Link>
            )}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-medium text-text-primary">{user?.name}</p>
                <p className="text-[10px] text-text-muted">{user?.email}</p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-[10px] tracking-wider uppercase text-text-muted hover:text-negative transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Welcome */}
        <div className="mb-10">
          <p className="text-[11px] tracking-[0.15em] uppercase font-medium text-accent mb-2">
            Welcome back
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {user?.name?.split(" ")[0] || "Member"}
          </h1>
        </div>

        {!loaded ? (
          <p className="text-text-muted text-sm">Loading...</p>
        ) : (
          <div className="grid lg:grid-cols-[1fr_340px] gap-8">
            {/* Main content */}
            <div className="space-y-8">
              {/* My Registered Events */}
              <section>
                <h2 className="text-lg font-bold tracking-tight mb-4">
                  My Events
                </h2>
                {myUpcoming.length === 0 ? (
                  <div className="border border-border-subtle rounded-xl p-8 text-center">
                    <p className="text-text-muted text-sm mb-3">
                      You haven&apos;t registered for any upcoming events yet.
                    </p>
                    <Link
                      href="/events"
                      className="inline-block text-accent text-sm font-medium hover:text-accent-light transition-colors"
                    >
                      Browse Events →
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {myUpcoming.map((evt) => (
                      <div
                        key={evt.id}
                        className="border border-border-subtle rounded-xl p-5 hover:border-accent/20 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-text-primary tracking-tight">
                              {evt.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-accent text-[11px] tracking-wider font-medium">
                                {evt.date}
                              </span>
                              <span className="text-text-muted text-[11px]">/</span>
                              <span className="text-text-tertiary text-[11px]">{evt.time}</span>
                              <span className="text-text-muted text-[11px]">/</span>
                              <span className="text-text-tertiary text-[11px]">{evt.location}</span>
                            </div>
                          </div>
                          <span className="shrink-0 text-[9px] tracking-wider uppercase bg-accent/10 text-accent px-2 py-1 rounded">
                            Registered
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* All Upcoming Events */}
              <section>
                <h2 className="text-lg font-bold tracking-tight mb-4">
                  Upcoming Events
                </h2>
                {upcoming.length === 0 ? (
                  <p className="text-text-muted text-sm">No upcoming events right now.</p>
                ) : (
                  <div className="space-y-3">
                    {upcoming.map((evt) => {
                      const registered = myEventIds.has(evt.id);
                      const regCount = evt._count?.registrations ?? 0;
                      const isFull = evt.capacity ? regCount >= evt.capacity : false;

                      return (
                        <div
                          key={evt.id}
                          className="border border-border-subtle rounded-xl p-5 hover:border-border-medium transition-all duration-300"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-bold text-text-primary tracking-tight">
                                {evt.title}
                              </h3>
                              <p className="text-text-secondary text-sm mt-1 line-clamp-2">
                                {evt.description}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-accent text-[11px] tracking-wider font-medium">
                                  {evt.date}
                                </span>
                                <span className="text-text-muted text-[11px]">/</span>
                                <span className="text-text-tertiary text-[11px]">{evt.time}</span>
                                <span className="text-text-muted text-[11px]">/</span>
                                <span className="text-text-tertiary text-[11px]">{evt.location}</span>
                              </div>
                              <div className="flex items-center gap-3 mt-2">
                                <span className="text-[10px] text-text-muted">
                                  {regCount} registered
                                  {evt.capacity && ` / ${evt.capacity} spots`}
                                </span>
                                {isFull && (
                                  <span className="text-[9px] tracking-wider uppercase text-negative">
                                    Full
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="shrink-0 ml-4">
                              {registered ? (
                                <span className="text-[9px] tracking-wider uppercase bg-accent/10 text-accent px-2 py-1 rounded">
                                  Registered ✓
                                </span>
                              ) : (
                                <Link
                                  href="/events"
                                  className="text-[10px] tracking-wider uppercase text-accent hover:text-accent-light transition-colors"
                                >
                                  View →
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="border border-border-subtle rounded-xl p-5">
                <h3 className="text-[10px] tracking-[0.15em] uppercase text-text-muted font-medium mb-4">
                  Your Activity
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-bold text-accent tabular-nums">
                      {myRegistrations.length}
                    </p>
                    <p className="text-[10px] text-text-muted uppercase tracking-wider">
                      Events Joined
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-accent tabular-nums">
                      {myUpcoming.length}
                    </p>
                    <p className="text-[10px] text-text-muted uppercase tracking-wider">
                      Upcoming
                    </p>
                  </div>
                </div>
              </div>

              {/* Member since */}
              <div className="border border-border-subtle rounded-xl p-5">
                <h3 className="text-[10px] tracking-[0.15em] uppercase text-text-muted font-medium mb-3">
                  Membership
                </h3>
                <p className="text-sm text-text-secondary">
                  {isAdmin ? "Founder / Admin" : "Member"}
                </p>
                <p className="text-[10px] text-text-muted mt-1">
                  {user?.email}
                </p>
              </div>

              {/* Quick Links */}
              <div className="border border-border-subtle rounded-xl p-5">
                <h3 className="text-[10px] tracking-[0.15em] uppercase text-text-muted font-medium mb-4">
                  Quick Links
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/portal/profile"
                    className="flex items-center justify-between text-sm text-text-secondary hover:text-accent transition-colors py-1"
                  >
                    <span>Edit Profile</span>
                    <span className="text-text-muted">→</span>
                  </Link>
                  <Link
                    href="/events"
                    className="flex items-center justify-between text-sm text-text-secondary hover:text-accent transition-colors py-1"
                  >
                    <span>Browse Events</span>
                    <span className="text-text-muted">→</span>
                  </Link>
                  <Link
                    href="/events/calendar"
                    className="flex items-center justify-between text-sm text-text-secondary hover:text-accent transition-colors py-1"
                  >
                    <span>Calendar</span>
                    <span className="text-text-muted">→</span>
                  </Link>
                  <Link
                    href="/about"
                    className="flex items-center justify-between text-sm text-text-secondary hover:text-accent transition-colors py-1"
                  >
                    <span>About NPFIS</span>
                    <span className="text-text-muted">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
