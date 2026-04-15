"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface AddToCalendarProps {
  title: string;
  description: string;
  location: string;
  /** UTC date/time in basic ISO 8601 compact format: YYYYMMDDTHHMMSSZ */
  startUtc: string;
  endUtc: string;
  className?: string;
  label?: string;
  align?: "left" | "right";
}

function escapeIcs(s: string) {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;")
    .replace(/\r?\n/g, "\\n");
}

function compactToIso(utc: string) {
  // 20260415T170000Z -> 2026-04-15T17:00:00Z
  return `${utc.slice(0, 4)}-${utc.slice(4, 6)}-${utc.slice(6, 8)}T${utc.slice(9, 11)}:${utc.slice(11, 13)}:${utc.slice(13, 15)}Z`;
}

const MENU_WIDTH = 240;
const MENU_GAP = 8;
// Approximate final rendered height (4 items × ~44px + borders). Used for
// flip-up fallback when the button sits too close to the viewport bottom.
const MENU_HEIGHT_ESTIMATE = 200;

export default function AddToCalendar({
  title,
  description,
  location,
  startUtc,
  endUtc,
  className,
  label = "Add to Calendar",
  align = "left",
}: AddToCalendarProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Recalculate menu position whenever it opens (or on resize).
  useLayoutEffect(() => {
    if (!open || !buttonRef.current) return;

    const updatePos = () => {
      const btn = buttonRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();

      // Horizontal: anchor to the button's left or right edge depending on `align`.
      let left = align === "right" ? rect.right - MENU_WIDTH : rect.left;
      // Clamp inside viewport with an 8px margin.
      const maxLeft = window.innerWidth - MENU_WIDTH - 8;
      if (left > maxLeft) left = maxLeft;
      if (left < 8) left = 8;

      // Vertical: below the button, but flip above if it would overflow.
      const spaceBelow = window.innerHeight - rect.bottom;
      const top =
        spaceBelow < MENU_HEIGHT_ESTIMATE + MENU_GAP && rect.top > MENU_HEIGHT_ESTIMATE + MENU_GAP
          ? rect.top - MENU_HEIGHT_ESTIMATE - MENU_GAP
          : rect.bottom + MENU_GAP;

      setPos({ top, left });
    };

    updatePos();

    const onScroll = () => setOpen(false);
    const onResize = () => updatePos();
    // Capture-phase scroll so nested scroll containers also trigger close.
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
    };
  }, [open, align]);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        buttonRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      )
        return;
      setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const googleUrl =
    `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=${encodeURIComponent(title)}` +
    `&dates=${startUtc}/${endUtc}` +
    `&details=${encodeURIComponent(description)}` +
    `&location=${encodeURIComponent(location)}`;

  const outlookUrl =
    `https://outlook.live.com/calendar/0/deeplink/compose` +
    `?path=/calendar/action/compose&rru=addevent` +
    `&subject=${encodeURIComponent(title)}` +
    `&body=${encodeURIComponent(description)}` +
    `&location=${encodeURIComponent(location)}` +
    `&startdt=${compactToIso(startUtc)}` +
    `&enddt=${compactToIso(endUtc)}`;

  const downloadIcs = () => {
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//NPFIS//Events//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${startUtc}-${Math.random().toString(36).slice(2, 8)}@npfis.org`,
      `DTSTAMP:${startUtc}`,
      `DTSTART:${startUtc}`,
      `DTEND:${endUtc}`,
      `SUMMARY:${escapeIcs(title)}`,
      `DESCRIPTION:${escapeIcs(description)}`,
      `LOCATION:${escapeIcs(location)}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "npfis-event.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setOpen(false);
  };

  const buttonClass =
    className ??
    "inline-flex items-center gap-2 rounded-lg bg-accent text-base font-semibold glow-accent-hover px-6 py-3 transition-all duration-300 hover:bg-accent-light text-sm";

  const menu =
    open && pos && typeof document !== "undefined"
      ? createPortal(
          <div
            ref={menuRef}
            role="menu"
            style={{
              position: "fixed",
              top: pos.top,
              left: pos.left,
              width: MENU_WIDTH,
              zIndex: 9999,
            }}
            className="rounded-lg bg-surface-1 border border-border-medium shadow-2xl shadow-black/50 overflow-hidden"
          >
            <a
              role="menuitem"
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-text-primary hover:bg-surface-2 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Google Calendar
            </a>
            <button
              type="button"
              role="menuitem"
              onClick={downloadIcs}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-text-primary hover:bg-surface-2 transition-colors border-t border-border-subtle text-left"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Apple Calendar (.ics)
            </button>
            <a
              role="menuitem"
              href={outlookUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-text-primary hover:bg-surface-2 transition-colors border-t border-border-subtle"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Outlook
            </a>
            <button
              type="button"
              role="menuitem"
              onClick={downloadIcs}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-text-primary hover:bg-surface-2 transition-colors border-t border-border-subtle text-left"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Other (.ics)
            </button>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={buttonClass}
      >
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
          />
        </svg>
        {label}
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {menu}
    </>
  );
}
