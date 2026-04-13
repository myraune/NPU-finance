"use client";

import { useState } from "react";
import Image from "next/image";

interface Member {
  name: string;
  role: string;
  major: string;
  year?: string;
  bio: string;
  linkedin?: string;
  image?: string;
}

export default function TeamCard({ member, variant = "board" }: { member: Member; variant?: "board" | "director" }) {
  const [expanded, setExpanded] = useState(false);
  const isBoard = variant === "board";

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className={`relative cursor-pointer overflow-hidden rounded-xl border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        bg-surface-0 border-border-subtle
        ${expanded ? "bg-surface-1 border-accent/20 shadow-xl shadow-black/20" : "hover:bg-surface-1 hover:border-border-medium hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20"}
      `}
    >
      {/* Main content */}
      <div className={`px-7 ${isBoard ? "py-10" : "py-8"}`}>
        {/* Avatar */}
        {member.image ? (
          <div className={`${isBoard ? "w-20 h-20" : "w-16 h-16"} relative rounded-full overflow-hidden mb-5 ring-2 transition-all duration-500 ${expanded ? "ring-accent/50 scale-110" : "ring-accent/20"}`}>
            <Image src={member.image} alt={member.name} fill className="object-cover" sizes="80px" />
          </div>
        ) : (
          <div className={`${isBoard ? "w-20 h-20" : "w-16 h-16"} rounded-full bg-gradient-to-br from-surface-2 to-surface-3 flex items-center justify-center text-accent ${isBoard ? "text-xl" : "text-lg"} font-semibold mb-5 transition-transform duration-500 ${expanded ? "scale-110" : ""}`}>
            {member.name.split(" ").map((n) => n[0]).join("")}
          </div>
        )}

        {/* Info */}
        <h3 className={`${isBoard ? "text-lg" : "text-base"} font-semibold text-text-primary transition-colors duration-500 ${expanded ? "text-accent" : ""}`}>
          {member.name}
        </h3>
        <p className={`text-sm mt-1 transition-colors duration-500 ${expanded ? "text-accent" : "text-accent/70"}`}>{member.role}</p>
        <p className="text-text-tertiary text-xs mt-3">{member.major}{member.year ? ` \u00B7 ${member.year}` : ""}</p>

        {/* Expandable section */}
        <div
          className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ maxHeight: expanded ? "250px" : "0", opacity: expanded ? 1 : 0, marginTop: expanded ? "16px" : "0" }}
        >
          <div className="rounded-lg bg-surface-1/50 backdrop-blur-sm p-4 border border-border-subtle">
            <p className="text-text-secondary text-sm leading-relaxed mb-4">{member.bio}</p>
            {member.linkedin && member.linkedin !== "#" && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 rounded-md bg-accent/10 text-accent text-xs px-3 py-1.5 hover:bg-accent/20 transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Click hint — chevron */}
      <div className={`absolute top-5 right-5 text-text-muted transition-all duration-300 ${expanded ? "rotate-180 text-accent/40" : ""}`}>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </div>
  );
}
