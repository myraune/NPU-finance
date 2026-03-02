"use client";

import { useState } from "react";

interface Props {
  eventId: string;
  eventTitle: string;
  onClose: () => void;
}

export default function RegistrationModal({ eventId, eventTitle, onClose }: Props) {
  const [form, setForm] = useState({ name: "", email: "", major: "", year: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch(`/api/events/${eventId}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error?.fieldErrors ? "Check your inputs" : "Registration failed");
      }

      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  const inputClass =
    "w-full bg-surface-1 border border-white/[0.06] px-4 py-3 rounded-lg text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all duration-300 text-[15px]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-base/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface-0 border border-white/[0.06] rounded-2xl w-full max-w-md p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-tertiary hover:text-text-primary transition-colors duration-300"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <p className="text-[11px] tracking-[0.15em] uppercase font-medium text-accent mb-1">
          Register
        </p>
        <h3 className="text-xl font-bold tracking-tight mb-6">{eventTitle}</h3>

        {status === "success" ? (
          <div className="py-8 text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-lg font-bold mb-1">You&apos;re in.</p>
            <p className="text-text-tertiary text-sm">See you there.</p>
            <button
              onClick={onClose}
              className="mt-6 rounded-lg bg-accent text-base font-semibold glow-accent-hover px-6 py-2.5 transition-all duration-300 hover:bg-accent-light text-sm"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
            <input type="email" required placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
            <input type="text" placeholder="Major (optional)" value={form.major} onChange={(e) => setForm({ ...form, major: e.target.value })} className={inputClass} />
            <select value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} className={inputClass}>
              <option value="" className="bg-surface-1">Year (optional)</option>
              <option className="bg-surface-1">Freshman</option>
              <option className="bg-surface-1">Sophomore</option>
              <option className="bg-surface-1">Junior</option>
              <option className="bg-surface-1">Senior</option>
              <option className="bg-surface-1">Graduate</option>
            </select>
            <textarea placeholder="Message (optional)" rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputClass} resize-none`} />

            {error && <p className="text-negative text-sm">{error}</p>}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-lg bg-accent text-base font-semibold glow-accent-hover py-3 transition-all duration-300 hover:bg-accent-light text-sm disabled:opacity-50"
            >
              {status === "loading" ? "Submitting..." : "Register"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
