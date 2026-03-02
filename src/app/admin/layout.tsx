"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const adminLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/calendar", label: "Calendar" },
  { href: "/admin/contact", label: "Contact" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-base pt-24">
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center gap-0 h-10">
          <span className="text-accent text-[10px] tracking-[0.2em] uppercase font-bold mr-6">[Admin]</span>
          {adminLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-4 py-2 text-[10px] uppercase tracking-wider border-l border-border ${
                (l.href === "/admin" ? pathname === "/admin" : pathname.startsWith(l.href))
                  ? "text-accent"
                  : "text-text-secondary hover:bg-white hover:text-black"
              }`}
              style={{ transition: "all 50ms linear" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/api/auth/signout"
            className="ml-auto px-4 py-2 text-[10px] uppercase tracking-wider text-text-muted hover:text-negative border-l border-border"
            style={{ transition: "color 50ms linear" }}
          >
            Logout
          </Link>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-8">
        {children}
      </div>
    </div>
  );
}
