import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@libsql/client";
import { KNOWN_EVENT_TIMES, utcToMs, fallbackUtc } from "@/lib/event-times";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  // Verify Vercel cron secret so this can't be triggered by anyone else.
  const authHeader = req.headers.get("authorization");
  const expected = process.env.CRON_SECRET
    ? `Bearer ${process.env.CRON_SECRET}`
    : null;
  if (expected && authHeader !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = process.env.DATABASE_URL;
  const authToken = process.env.DATABASE_AUTH_TOKEN;
  if (!url) {
    return NextResponse.json({ error: "DATABASE_URL not set" }, { status: 500 });
  }

  const client = createClient({ url, authToken });
  const now = Date.now();

  // Fetch all events still marked UPCOMING.
  const { rows } = await client.execute(
    "SELECT id, date FROM Event WHERE status = 'UPCOMING'",
  );

  const markedPast: string[] = [];

  for (const row of rows) {
    const id = String(row.id);
    const dateStr = String(row.date ?? "");
    const known = KNOWN_EVENT_TIMES[id];
    const { endUtc } = known ?? fallbackUtc(dateStr);
    const endMs = utcToMs(endUtc);

    if (Number.isFinite(endMs) && endMs < now) {
      await client.execute({
        sql: "UPDATE Event SET status = 'PAST', updatedAt = ? WHERE id = ?",
        args: [new Date().toISOString(), id],
      });
      markedPast.push(id);
    }
  }

  return NextResponse.json({
    checked: rows.length,
    markedPast,
    ts: new Date().toISOString(),
  });
}
