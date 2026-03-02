"use client";

import { useEffect, useState } from "react";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminContact() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/contact").then((r) => r.json()).then(setSubmissions);
  }, []);

  async function markRead(id: string) {
    await fetch(`/api/admin/contact/${id}`, { method: "PATCH" });
    setSubmissions(submissions.map((s) => s.id === id ? { ...s, read: true } : s));
  }

  return (
    <div>
      <p className="text-text-muted text-[10px] tracking-[0.2em] uppercase font-bold mb-1">[Contact]</p>
      <h1 className="text-xl font-bold uppercase tracking-tight mb-8">
        Messages ({submissions.filter((s) => !s.read).length} unread)
      </h1>

      <div className="border border-border">
        {submissions.length === 0 ? (
          <div className="px-4 py-8 text-center text-text-muted text-xs uppercase tracking-wider">No messages</div>
        ) : (
          submissions.map((s) => (
            <div key={s.id} className="border-b border-border last:border-b-0">
              <div
                className={`px-4 py-3 cursor-pointer hover:bg-surface flex items-center justify-between ${!s.read ? "border-l-2 border-l-accent" : ""}`}
                onClick={() => { setSelected(selected === s.id ? null : s.id); if (!s.read) markRead(s.id); }}
                style={{ transition: "background 50ms linear" }}
              >
                <div>
                  <p className={`text-xs font-bold uppercase ${!s.read ? "text-accent" : "text-text-primary"}`}>{s.name}</p>
                  <p className="text-text-muted text-[10px]">{s.subject}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-text-muted text-[10px] tabular-nums">{new Date(s.createdAt).toLocaleDateString()}</span>
                  <span className="text-text-muted text-[10px]">[{selected === s.id ? "−" : "+"}]</span>
                </div>
              </div>

              {selected === s.id && (
                <div className="px-4 py-4 border-t border-border bg-surface">
                  <p className="text-text-muted text-[10px] uppercase tracking-wider mb-1">From: {s.email}</p>
                  <p className="text-text-secondary text-xs leading-relaxed mt-2">{s.message}</p>
                  <a href={`mailto:${s.email}`} className="inline-block mt-3 text-[10px] uppercase tracking-wider text-accent border border-accent px-3 py-1 hover:bg-accent hover:text-black" style={{ transition: "all 50ms linear" }}>
                    Reply →
                  </a>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
