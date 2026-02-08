"use client";

interface Building {
  id: string;
  name: string;
  desc: string;
  events: string[];
}

const buildings: Building[] = [
  { id: "anderson", name: "Anderson Hall", desc: "Home of the School of Business. Our primary meeting location.", events: ["Investment Workshops", "Weekly Meetings"] },
  { id: "burgh", name: "Burgh Hall", desc: "Academic building hosting competitions and guest lectures.", events: ["Stock Pitch Competition", "Speaker Series"] },
  { id: "magnuson", name: "Magnuson Campus Center", desc: "Student life hub. Large panels and networking events.", events: ["Alumni Panels", "Networking Events"] },
  { id: "johnson", name: "Johnson Center", desc: "Modern science & community building. Special event venue.", events: ["Financial Literacy Week", "Career Workshops"] },
  { id: "oldmain", name: "Old Main", desc: "The iconic heart of campus. Historic landmark since 1894.", events: ["Campus Tours", "Welcome Events"] },
];

export default function CampusMap() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 px-6 md:px-12 pb-12">
      {buildings.map((b) => (
        <div
          key={b.id}
          className="group rounded-xl bg-surface-0 border border-white/[0.06] p-6 hover:border-accent/20 hover:bg-surface-1 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20"
        >
          {/* Icon + name */}
          <div className="flex items-start gap-3 mb-3">
            <div className="shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <h3 className="text-text-primary font-semibold text-sm group-hover:text-accent transition-colors duration-300">
              {b.name}
            </h3>
          </div>

          {/* Description */}
          <p className="text-text-tertiary text-xs leading-relaxed mb-4 ml-7">
            {b.desc}
          </p>

          {/* Event tags */}
          <div className="flex flex-wrap gap-2 ml-7">
            {b.events.map((e) => (
              <span
                key={e}
                className="text-[10px] font-medium text-accent/80 bg-accent/[0.08] border border-accent/10 rounded-full px-3 py-1 tracking-wide"
              >
                {e}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
