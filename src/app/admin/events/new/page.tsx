"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewEvent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    imageUrl: "",
    capacity: "",
    lumaUrl: "",
    status: "UPCOMING",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { capacity: capStr, lumaUrl, ...rest } = form;
    const res = await fetch("/api/admin/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...rest,
        capacity: capStr ? parseInt(capStr, 10) : null,
        lumaUrl: lumaUrl || "",
      }),
    });

    if (!res.ok) {
      setError("Failed to create event");
      setLoading(false);
      return;
    }

    router.push("/admin/events");
  }

  const inputClass = "w-full bg-black border border-border px-3 py-2 text-xs text-white placeholder:text-text-muted focus:border-white focus:outline-none";

  return (
    <div>
      <p className="text-text-muted text-[10px] tracking-[0.2em] uppercase font-bold mb-1">[Create]</p>
      <h1 className="text-xl font-bold uppercase tracking-tight mb-8">New Event</h1>

      <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
        <div>
          <label className="block text-text-muted text-[10px] uppercase tracking-wider mb-1">Title</label>
          <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className="block text-text-muted text-[10px] uppercase tracking-wider mb-1">Description</label>
          <textarea required rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${inputClass} resize-none`} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-text-muted text-[10px] uppercase tracking-wider mb-1">Date</label>
            <input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-text-muted text-[10px] uppercase tracking-wider mb-1">Time</label>
            <input required placeholder="5-7 PM" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className={inputClass} />
          </div>
        </div>
        <div>
          <label className="block text-text-muted text-[10px] uppercase tracking-wider mb-1">Location</label>
          <input required placeholder="Anderson Hall 201" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={inputClass} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-text-muted text-[10px] uppercase tracking-wider mb-1">Image URL (optional)</label>
            <input placeholder="https://..." value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-text-muted text-[10px] uppercase tracking-wider mb-1">Capacity (optional)</label>
            <input type="number" min="1" placeholder="Unlimited" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} className={inputClass} />
          </div>
        </div>
        <div>
          <label className="block text-text-muted text-[10px] uppercase tracking-wider mb-1">Luma Event URL (optional)</label>
          <input placeholder="https://lu.ma/..." value={form.lumaUrl} onChange={(e) => setForm({ ...form, lumaUrl: e.target.value })} className={inputClass} />
          <p className="text-text-muted/40 text-[9px] mt-1">If set, visitors register on Luma instead of on-site</p>
        </div>
        <div>
          <label className="block text-text-muted text-[10px] uppercase tracking-wider mb-1">Status</label>
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={inputClass}>
            <option value="UPCOMING">Upcoming</option>
            <option value="PAST">Past</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        {error && <p className="text-negative text-[10px] uppercase tracking-wider">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-accent text-black text-xs font-bold uppercase tracking-wider hover:bg-white disabled:opacity-50"
          style={{ transition: "background 50ms linear" }}
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}
