"use client";

import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
} from "date-fns";

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: string; // YYYY-MM-DD
  time: string;
  location: string;
  status: string;
  capacity?: number | null;
  _count?: { registrations: number };
}

interface CalendarProps {
  events: CalendarEvent[];
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  renderDayExtra?: (date: Date, dayEvents: CalendarEvent[]) => React.ReactNode;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar({
  events,
  currentMonth,
  onMonthChange,
  selectedDate,
  onDateSelect,
  renderDayExtra,
}: CalendarProps) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  function getEventsForDay(date: Date) {
    const dateStr = format(date, "yyyy-MM-dd");
    return events.filter((e) => e.date === dateStr);
  }

  return (
    <div>
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onMonthChange(subMonths(currentMonth, 1))}
          className="p-2 text-text-secondary hover:text-accent transition-colors duration-200"
          aria-label="Previous month"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex items-center gap-3">
          <h2 className="text-lg md:text-xl font-bold tracking-tight">
            {format(currentMonth, "MMMM yyyy")}
          </h2>
          {!isSameMonth(currentMonth, new Date()) && (
            <button
              onClick={() => {
                onMonthChange(new Date());
                onDateSelect(new Date());
              }}
              className="text-[10px] tracking-wider uppercase text-accent hover:text-accent-light transition-colors duration-200 border border-accent/20 rounded px-2 py-0.5"
            >
              Today
            </button>
          )}
        </div>
        <button
          onClick={() => onMonthChange(addMonths(currentMonth, 1))}
          className="p-2 text-text-secondary hover:text-accent transition-colors duration-200"
          aria-label="Next month"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 border-b border-white/[0.06] mb-1">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="py-2 text-center text-[10px] tracking-[0.15em] uppercase font-medium text-text-muted"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7">
        {days.map((day) => {
          const dayEvents = getEventsForDay(day);
          const inMonth = isSameMonth(day, currentMonth);
          const today = isToday(day);
          const selected = selectedDate && isSameDay(day, selectedDate);

          return (
            <button
              key={day.toISOString()}
              onClick={() => onDateSelect(day)}
              className={`
                relative min-h-[80px] md:min-h-[100px] p-1.5 md:p-2 border border-white/[0.03] text-left
                transition-all duration-200 group
                ${inMonth ? "bg-transparent" : "bg-white/[0.01]"}
                ${selected ? "bg-accent/[0.08] border-accent/30" : "hover:bg-white/[0.03]"}
                ${today ? "ring-1 ring-inset ring-accent/40" : ""}
              `}
            >
              <span
                className={`
                  text-xs font-medium tabular-nums
                  ${!inMonth ? "text-text-muted/40" : today ? "text-accent" : "text-text-secondary"}
                  ${selected ? "text-accent" : ""}
                `}
              >
                {format(day, "d")}
              </span>

              {/* Event dots / pills */}
              {dayEvents.length > 0 && (
                <div className="mt-1 space-y-0.5">
                  {dayEvents.slice(0, 3).map((evt) => (
                    <div
                      key={evt.id}
                      className={`
                        flex items-center gap-1 text-[9px] md:text-[10px] leading-tight px-1 py-0.5 rounded
                        ${evt.status === "CANCELLED"
                          ? "bg-negative/10 text-negative/70 line-through"
                          : evt.status === "PAST"
                            ? "bg-white/[0.04] text-text-tertiary"
                            : "bg-accent/10 text-accent"
                        }
                      `}
                    >
                      <span className="truncate">{evt.title}</span>
                      {(evt._count?.registrations ?? 0) > 0 && (
                        <span className="shrink-0 opacity-60">
                          {evt._count?.registrations}
                        </span>
                      )}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <p className="text-[9px] text-text-muted px-1">
                      +{dayEvents.length - 3} more
                    </p>
                  )}
                </div>
              )}

              {renderDayExtra?.(day, dayEvents)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
