/**
 * Canonical UTC start/end times for known events.
 * Used by the events list page, home page, and the cron job that
 * auto-marks concluded events as PAST in the DB.
 *
 * All times in compact UTC: YYYYMMDDTHHMMSSZ
 * CDT = UTC−5, CST = UTC−6
 */
export const KNOWN_EVENT_TIMES: Record<
  string,
  { startUtc: string; endUtc: string }
> = {
  "angel-escobedo-april-2026": {
    startUtc: "20260415T170000Z",
    endUtc: "20260415T190000Z",
  },
  "elvin-ahmeti-april-2026": {
    startUtc: "20260430T233000Z", // 6:30 PM CDT
    endUtc: "20260501T023000Z",   // 9:30 PM CDT
  },
};

/** Parse compact UTC (YYYYMMDDTHHMMSSZ) → epoch ms. */
export function utcToMs(utc: string): number {
  const iso = `${utc.slice(0, 4)}-${utc.slice(4, 6)}-${utc.slice(6, 8)}T${utc.slice(9, 11)}:${utc.slice(11, 13)}:${utc.slice(13, 15)}Z`;
  return Date.parse(iso);
}

/**
 * Best-effort fallback when an event has no known start/end time.
 * Parses YYYY-MM-DD or "Mon D" and defaults to 12:00–14:00 CDT (UTC−5).
 */
export function fallbackUtc(
  dateStr: string,
): { startUtc: string; endUtc: string } {
  let year = new Date().getUTCFullYear();
  let month = 1;
  let day = 1;
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (iso) {
    year = Number(iso[1]);
    month = Number(iso[2]);
    day = Number(iso[3]);
  } else {
    const parsed = new Date(`${dateStr}, ${year}`);
    if (!isNaN(parsed.getTime())) {
      year = parsed.getFullYear();
      month = parsed.getMonth() + 1;
      day = parsed.getDate();
    }
  }
  const pad = (n: number) => String(n).padStart(2, "0");
  const base = `${year}${pad(month)}${pad(day)}T`;
  return { startUtc: `${base}170000Z`, endUtc: `${base}190000Z` };
}
