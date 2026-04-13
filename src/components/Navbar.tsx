"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useSession } from "next-auth/react";
import { useTheme } from "./ThemeProvider";
import Logo from "./Logo";
import { cn } from "@/lib/utils";
import {
  Info,
  Users,
  Mail,
  Sun,
  Moon,
  Menu,
  X,
  LogIn,
  LayoutDashboard,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ── Nav link config ───────────────────────────────────── */
interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

const links: NavLink[] = [
  { href: "/about", label: "About", icon: Info },
  { href: "/team", label: "Team", icon: Users },
  { href: "/contact", label: "Contact", icon: Mail },
];

/* ── Easter egg config ─────────────────────────────────── */
const MODES = ["neutral", "bull", "bear"] as const;
type Mode = (typeof MODES)[number];

/* ── Tubelight lamp glow ───────────────────────────────── */
function TubelightGlow() {
  return (
    <motion.div
      layoutId="tubelight"
      className="absolute inset-0 rounded-full -z-10"
      initial={false}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
    >
      {/* Glow background behind active item */}
      <div className="absolute inset-0 rounded-full bg-accent/[0.08]" />
      {/* Gold bar at top */}
      <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-8 h-[3px] bg-accent rounded-full">
        {/* Outer glow */}
        <div className="absolute w-12 h-5 bg-accent/25 rounded-full blur-md -top-2 -left-2" />
        {/* Mid glow */}
        <div className="absolute w-8 h-4 bg-accent/20 rounded-full blur-md -top-1 left-0" />
        {/* Inner glow */}
        <div className="absolute w-4 h-3 bg-accent/15 rounded-full blur-sm top-0 left-2" />
      </div>
    </motion.div>
  );
}

/* ── Main Navbar ───────────────────────────────────────── */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mode, setMode] = useState<Mode>("neutral");
  const [modeToast, setModeToast] = useState<string | null>(null);
  const clickCount = useRef(0);
  const clickTimer = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();

  /* Easter egg: 7 rapid logo clicks cycles bull/bear mode */
  const handleLogoClick = useCallback((e: React.MouseEvent) => {
    clickCount.current++;
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      clickCount.current = 0;
    }, 3000);

    if (clickCount.current >= 7) {
      e.preventDefault();
      e.stopPropagation();
      clickCount.current = 0;
      setMode((prev) => {
        const next = MODES[(MODES.indexOf(prev) + 1) % MODES.length];
        if (next === "bull") setModeToast("Bull Mode Activated");
        else if (next === "bear") setModeToast("Bear Mode Activated");
        else setModeToast(null);
        return next;
      });
    }
  }, []);

  useEffect(() => {
    if (modeToast) {
      const t = setTimeout(() => setModeToast(null), 2500);
      return () => clearTimeout(t);
    }
  }, [modeToast]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Determine if a link matches the current path */
  const isActive = (href: string) => pathname === href;
  const hasActiveLink = links.some((l) => isActive(l.href));

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6">
        <motion.div
          className={cn(
            "mx-auto mt-4 max-w-5xl rounded-2xl transition-[background,box-shadow,border-color] duration-500",
            scrolled
              ? "bg-surface-1/80 backdrop-blur-xl shadow-2xl shadow-black/20 border border-border-subtle"
              : "bg-surface-0/40 backdrop-blur-md border border-border-subtle"
          )}
        >
          {/* Main bar */}
          <div className="flex items-center justify-between px-5 md:px-6 h-16">
            {/* Logo + wordmark */}
            <Link
              href="/"
              onClick={handleLogoClick}
              className="flex items-center gap-2.5 group"
            >
              <Logo
                size={36}
                className="transition-all duration-300 group-hover:drop-shadow-[0_0_6px_rgba(212,168,67,0.4)]"
              />
              <span className="text-text-primary font-bold tracking-widest text-sm">
                NPFIS
              </span>
            </Link>

            {/* ── Desktop nav ── */}
            <div className="hidden md:flex items-center gap-1">
              <LayoutGroup>
                {/* Tubelight nav links */}
                <div className="flex items-center gap-0.5 mr-3">
                  {links.map((l) => {
                    const active = isActive(l.href);
                    return (
                      <Link
                        key={l.href}
                        href={l.href}
                        className={cn(
                          "relative px-5 py-2 rounded-full text-[13px] tracking-wide transition-colors duration-300",
                          active
                            ? "text-accent font-medium"
                            : "text-text-secondary hover:text-text-primary"
                        )}
                      >
                        {l.label}
                        {active && <TubelightGlow />}
                      </Link>
                    );
                  })}
                </div>
              </LayoutGroup>

              {/* Divider */}
              <div className="w-px h-5 bg-border-subtle mx-2" />

              {/* Theme toggle */}
              <motion.button
                onClick={toggleTheme}
                className="p-2.5 rounded-full text-text-secondary hover:text-accent hover:bg-surface-2/50 transition-all duration-300"
                aria-label="Toggle theme"
                whileTap={{ scale: 0.9, rotate: 15 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ scale: 0, rotate: -90, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0, rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    {theme === "dark" ? (
                      <Sun size={16} strokeWidth={1.5} />
                    ) : (
                      <Moon size={16} strokeWidth={1.5} />
                    )}
                  </motion.span>
                </AnimatePresence>
              </motion.button>

              {/* Auth button */}
              <Link
                href={session ? "/portal" : "/login"}
                className="text-[13px] font-semibold text-base bg-accent hover:bg-accent-light rounded-lg px-5 py-2 transition-all duration-300 glow-accent-hover ml-2"
              >
                {session ? "Portal" : "Sign In"}
              </Link>
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-text-primary p-1.5 rounded-lg hover:bg-surface-2/50 transition-colors"
              aria-label="Menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "close" : "open"}
                  initial={{ scale: 0, rotate: -90, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0, rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  {open ? (
                    <X size={20} strokeWidth={1.5} />
                  ) : (
                    <Menu size={20} strokeWidth={1.5} />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>

          {/* Golden accent line at bottom */}
          <div className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        </motion.div>
      </nav>

      {/* ── Mobile overlay menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="absolute inset-0 bg-base/95 backdrop-blur-xl" />
            <div className="relative z-10 flex flex-col items-center justify-center h-full gap-6">
              {links.map((l, i) => {
                const Icon = l.icon;
                const active = isActive(l.href);
                return (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      delay: i * 0.06,
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 text-2xl font-semibold tracking-tight transition-colors duration-300",
                        active
                          ? "text-accent"
                          : "text-text-primary hover:text-accent"
                      )}
                    >
                      <Icon
                        size={22}
                        strokeWidth={active ? 2.5 : 1.5}
                        className={cn(
                          "transition-all",
                          active && "drop-shadow-[0_0_6px_rgba(212,168,67,0.5)]"
                        )}
                      />
                      {l.label}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Mobile theme toggle */}
              <motion.button
                onClick={toggleTheme}
                className="flex items-center gap-2.5 text-text-secondary hover:text-accent transition-colors duration-300 mt-4"
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: links.length * 0.06 + 0.04,
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {theme === "dark" ? (
                  <Sun size={20} strokeWidth={1.5} />
                ) : (
                  <Moon size={20} strokeWidth={1.5} />
                )}
                <span className="text-sm">
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </span>
              </motion.button>

              {/* Mobile auth button */}
              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: links.length * 0.06 + 0.1,
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={session ? "/portal" : "/login"}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 mt-4 text-sm font-semibold text-base bg-accent hover:bg-accent-light rounded-lg px-8 py-3.5 transition-all duration-300 glow-accent"
                >
                  {session ? (
                    <>
                      <LayoutDashboard size={16} strokeWidth={2} />
                      Portal
                    </>
                  ) : (
                    <>
                      <LogIn size={16} strokeWidth={2} />
                      Sign In
                    </>
                  )}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bull/Bear mode overlay ── */}
      <AnimatePresence>
        {mode !== "neutral" && (
          <motion.div
            className={cn(
              "fixed inset-0 pointer-events-none z-30",
              mode === "bull" ? "bg-positive/[0.04]" : "bg-negative/[0.04]"
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          />
        )}
      </AnimatePresence>

      {/* ── Mode toast ── */}
      <AnimatePresence>
        {modeToast && (
          <motion.div
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[60]"
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass-accent rounded-lg px-5 py-2.5 flex items-center gap-2">
              <span className="text-lg">
                {mode === "bull" ? "\u{1F402}" : "\u{1F43B}"}
              </span>
              <span className="text-accent text-sm font-semibold">
                {modeToast}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
