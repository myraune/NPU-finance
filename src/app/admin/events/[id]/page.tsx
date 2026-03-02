"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";

interface Registration {
  id: string;
  name: string;
  email: string;
  major: string | null;
  year: string | null;
  message: string | null;
  createdAt: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string | null;
  capacity: number | null;
  lumaUrl: string | null;
  status: string;
}

export default function EditEvent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then((events: Event[]) => {
        const found = events.find((e) => e.id === id);
        if (found) setEvent(found);
      });

    fetch(`/api/admin/events/${id}/registrations`)
      .then((r) => r.json())
      .then(setRegistrations);
  }, [id]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!event) return;
    setLoading(true);
    setError("");

    const res = await fetch(`/api/admin/events/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
        location: event.location,
        imageUrl: event.imageUrl || "",
        capacity: event.capacity || null,
        lumaUrl: event.lumaUrl || "",
        status: event.status,
      }),
    });

    if (!res.ok) {
      setError("Failed to update");
      setLoading(false);
      return;
    }

    router.push("/admin/events");
  }

  function exportCSV() {
    const rows = [["Name", "Email", "Major", "Year", "Message", "Date"]];
    registrations.forEach((r) => {
      rows.push([r.name, r.email, r.major ?? "", r.year ?? "", r.message ?? "", new Date(r.createdAt).toLocaleDateString()]);
    });
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `registrations-${id}.csv`;
    a.click();
  }

  if (!event) return <p className="text-text-muted text-xs uppercase tracking-wider">Loading...</p>;

  const inputClass = "w-full bg-black border border-border px-3 py-2 text-xs text-white placeholder:text-text-muted focus:border-white focus:outline-none";

  return (
    <div>
      <p className="text-text-muted text-[10px] tracking-[0.2em] uppercase font-bold mb-1">[Edit]</p>
      <h1 className="text-xl font-bold uppercase tracking-tight mb-8">{event.title}</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-text-muted text-[10px] uppercase tracking-wider mb-1">Title</label>
            <input required value={event.title} onChange={(e) => setEvent({ ...event, title: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-text-muted text-[10px] uppercase tracking-wider mb-1">Description</label>
            <textarea required rows={4} value={event.description} onChange={(e) => setEvent({ ...event, description: e.target.value })} className={`${inputClass} resize-none`} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-text-muted text-[10px] uppercase tracking-wider mb-1">Date</label>
              <input type="date" required value={event.date} onChange={(e) => setEvent({ ...event, date: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="block text-text-muted text-[10px] uppercase tracking-wider mb-1">Time</label>
              <input required value={event.time} onChange={(e) => setEvent({ ...event, time: e.target.value })} className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-text-muted text-[10px] uppercase tracking-wider mb-1">Location</label>
              <input required value={event.location} onChange={(e) => setEvent({ ...event, location: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="block text-text-muted text-[10px] uppercase tracking-wider mb-1">Capacity (optional)</label>
              <input type="number" min="1" placeholder="Unlimited" value={event.capacity ?? ""} onChange={(e) => setEvent({ ...event, capacity: e.target.value ? parseInt(e.target.value, 10) : null })} className={inputClass} />
            </div>
          </div>
          <div>
            <label className="block text-text-muted text-[10px] uppercase tracking-wider mb-1">Luma Event URL (optional)</label>
            <input placeholder="https://lu.ma/..." value={event.lumaUrl ?? ""} onChange={(e) => setEvent({ ...event, lumaUrl: e.target.value || null })} className={inputClass} />
            <p className="text-text-muted/40 text-[9px] mt-1">If set, visitors register on Luma instead of on-site</p>
          </div>
          <div>
            <label className="block text-text-muted text-[10px] uppercase tracking-wider mb-1">Status</label>
            <select value={event.status} onChange={(e) => setEvent({ ...event, status: e.target.value })} className={inputClass}>
              <option value="UPCOMING">Upcoming</option>
              <option value="PAST">Past</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          {error && <p className="text-negative text-[10px] uppercase tracking-wider">{error}</p>}

          <button type="submit" disabled={loading} className="px-6 py-2.5 bg-accent text-black text-xs font-bold uppercase tracking-wider hover:bg-white disabled:opacity-50" style={{ transition: "background 50ms linear" }}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>

        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-muted text-[10px] tracking-[0.2em] uppercase font-bold">[Registrations: {registrations.length}]</p>
            {registrations.length > 0 && (
              <button onClick={exportCSV} className="text-[10px] uppercase tracking-wider text-accent hover:text-white" style={{ transition: "color 50ms linear" }}>
                Export CSV
              </button>
            )}
          </div>

          <div className="border border-border">
            {registrations.length === 0 ? (
              <div className="px-4 py-8 text-center text-text-muted text-xs uppercase tracking-wider">No registrations yet</div>
            ) : (
              registrations.map((r) => (
                <div key={r.id} className="border-b border-border last:border-b-0 px-4 py-3">
                  <p className="text-xs font-bold uppercase">{r.name}</p>
                  <p className="text-text-muted text-[10px]">{r.email}</p>
                  {r.major && <p className="text-text-muted text-[10px]">{r.major} {r.year && `/ ${r.year}`}</p>}
                  {r.message && <p className="text-text-secondary text-[10px] mt-1">{r.message}</p>}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
