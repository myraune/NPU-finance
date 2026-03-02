"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "I want to join NPFIS", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
    } catch {
      setError("Something went wrong. Try again.");
      setStatus("error");
    }
  }

  const inputClass =
    "w-full bg-surface-1 border border-white/[0.06] px-4 py-3 focus:border-accent focus:ring-1 focus:ring-accent/20 rounded-lg text-text-primary placeholder:text-text-muted outline-none transition-all duration-300 text-[15px]";

  return (
    <>
      {/* ---- HERO ---- */}
      <section className="bg-base pt-32 md:pt-40 pb-12 px-6 md:px-12">
        <ScrollReveal>
          <p className="text-[11px] tracking-[0.15em] uppercase font-medium text-accent mb-4">
            Contact
          </p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]">
            Let&apos;s talk.
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <div className="w-24 h-0.5 bg-gradient-to-r from-accent to-transparent mt-6" />
        </ScrollReveal>
      </section>

      {/* ---- FORM + INFO ---- */}
      <section className="grid md:grid-cols-2 min-h-[70vh]">
        {/* Left -- form */}
        <div className="bg-base px-6 md:px-12 lg:px-16 py-16">
          {status === "success" ? (
            <ScrollReveal direction="scale">
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div
                  className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    animation: "checkBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                  }}
                >
                  <svg
                    className="w-8 h-8 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                      style={{
                        strokeDasharray: 24,
                        strokeDashoffset: 24,
                        animation: "checkDraw 0.4s ease-out 0.3s forwards",
                      }}
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">Message Sent.</h2>
                <p className="text-text-tertiary">
                  We&apos;ll be in touch soon.
                </p>
              </div>

              <style>{`
                @keyframes checkBounce {
                  0% { transform: scale(0); opacity: 0; }
                  60% { transform: scale(1.15); }
                  100% { transform: scale(1); opacity: 1; }
                }
                @keyframes checkDraw {
                  to { stroke-dashoffset: 0; }
                }
              `}</style>
            </ScrollReveal>
          ) : (
            <ScrollReveal>
              <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
                <div>
                  <label htmlFor="name" className="block text-text-tertiary text-[11px] font-medium tracking-[0.1em] uppercase mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-text-tertiary text-[11px] font-medium tracking-[0.1em] uppercase mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="you@northpark.edu"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-text-tertiary text-[11px] font-medium tracking-[0.1em] uppercase mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className={inputClass}
                  >
                    <option className="bg-surface-1">I want to join NPFIS</option>
                    <option className="bg-surface-1">Question about an event</option>
                    <option className="bg-surface-1">Partnership / Sponsorship</option>
                    <option className="bg-surface-1">General inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-text-tertiary text-[11px] font-medium tracking-[0.1em] uppercase mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    placeholder="Tell us what's on your mind..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {error && <p className="text-negative text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-4 rounded-lg bg-accent text-base font-semibold glow-accent-hover px-8 py-4 transition-all duration-300 hover:bg-accent-light w-full md:w-auto text-sm disabled:opacity-50"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>
              </form>
            </ScrollReveal>
          )}
        </div>

        {/* Right -- info panel */}
        <div className="bg-surface-1 rounded-2xl p-8 md:p-12 m-0 md:m-0 flex flex-col justify-center">
          <ScrollReveal direction="left">
            <div className="space-y-10">
              <div className="border-l-2 border-accent/20 pl-4">
                <p className="text-[11px] tracking-[0.15em] uppercase font-medium text-text-tertiary mb-2">Email</p>
                <a href="mailto:npfis@northpark.edu" className="text-text-primary text-lg hover:text-accent transition-colors duration-300">
                  npfis@northpark.edu
                </a>
              </div>

              <div className="border-l-2 border-accent/20 pl-4">
                <p className="text-[11px] tracking-[0.15em] uppercase font-medium text-text-tertiary mb-2">Location</p>
                <p className="text-text-primary text-lg">North Park University</p>
                <p className="text-text-secondary text-sm mt-1">3225 W Foster Ave, Chicago, IL 60625</p>
              </div>

              <div className="border-l-2 border-accent/20 pl-4">
                <p className="text-[11px] tracking-[0.15em] uppercase font-medium text-text-tertiary mb-2">Meetings</p>
                <p className="text-text-primary text-lg">Wednesdays at 5:00 PM</p>
                <p className="text-text-secondary text-sm mt-1">Location announced via email</p>
              </div>

              <div className="border-l-2 border-accent/20 pl-4">
                <p className="text-[11px] tracking-[0.15em] uppercase font-medium text-text-tertiary mb-2">Follow Us</p>
                <div className="flex gap-3 mt-3">
                  <a href="#" className="rounded-lg bg-surface-2 p-2.5 hover:bg-accent/10 hover:text-accent transition-all duration-300 text-text-secondary" aria-label="Instagram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                  </a>
                  <a href="#" className="rounded-lg bg-surface-2 p-2.5 hover:bg-accent/10 hover:text-accent transition-all duration-300 text-text-secondary" aria-label="LinkedIn">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  </a>
                  <a href="#" className="rounded-lg bg-surface-2 p-2.5 hover:bg-accent/10 hover:text-accent transition-all duration-300 text-text-secondary" aria-label="X">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
