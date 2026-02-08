"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Logo from "./Logo";

const links = [
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6">
        <div
          className={`mx-auto mt-4 max-w-5xl rounded-2xl transition-all duration-500 ${
            scrolled
              ? "bg-surface-1/80 backdrop-blur-xl shadow-2xl shadow-black/20 border border-white/[0.06]"
              : "bg-surface-0/40 backdrop-blur-md border border-white/[0.04]"
          }`}
        >
          {/* Main bar */}
          <div className="flex items-center justify-between px-5 md:px-6 h-16">
            {/* Logo + wordmark */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <Logo size={22} className="transition-all duration-300 group-hover:drop-shadow-[0_0_6px_rgba(212,168,67,0.4)]" />
              <span className="text-text-primary font-bold tracking-widest text-sm">NPFIS</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative text-[13px] tracking-wide transition-colors duration-300 ${
                    pathname === l.href
                      ? "text-accent font-medium"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {l.label}
                  {pathname === l.href && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                  )}
                </Link>
              ))}
              <Link
                href="/contact"
                className="ml-2 text-[13px] font-semibold text-base bg-accent hover:bg-accent-light rounded-lg px-5 py-2 transition-all duration-300 glow-accent-hover"
              >
                Join Us
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button onClick={() => setOpen(!open)} className="md:hidden text-text-primary p-1" aria-label="Menu">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                {open
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />}
              </svg>
            </button>
          </div>

          {/* Golden accent line at bottom */}
          <div className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        </div>
      </nav>

      {/* Mobile overlay menu */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-base/95 backdrop-blur-xl" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`text-3xl font-semibold tracking-tight transition-all duration-500 ${
                  pathname === l.href ? "text-accent" : "text-text-primary hover:text-accent"
                }`}
                style={{
                  opacity: 1,
                  animation: `reveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s both`,
                }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-4 text-sm font-semibold text-base bg-accent hover:bg-accent-light rounded-lg px-8 py-3.5 transition-all duration-300 glow-accent"
              style={{ animation: `reveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both` }}
            >
              Join Us
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
