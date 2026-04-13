import { NextResponse } from "next/server";

const SYMBOLS = ["SPY", "DIA", "QQQ", "AAPL", "MSFT", "JPM", "GS", "BRK-B", "AMZN", "NVDA"];
const CACHE_TTL = 30_000; // 30 seconds

interface CachedData {
  quotes: Array<{
    symbol: string;
    price: string;
    change: string;
    pct: string;
    up: boolean;
  }>;
  timestamp: number;
}

let cache: CachedData | null = null;

export async function GET() {
  const now = Date.now();

  // Return cached data if fresh
  if (cache && now - cache.timestamp < CACHE_TTL) {
    return NextResponse.json({ quotes: cache.quotes, timestamp: cache.timestamp });
  }

  try {
    const resp = await fetch(
      `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${SYMBOLS.join(",")}&fields=regularMarketPrice,regularMarketChange,regularMarketChangePercent,symbol`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        signal: AbortSignal.timeout(8000),
      }
    );

    if (!resp.ok) throw new Error(`Yahoo API ${resp.status}`);

    const data = await resp.json();
    const results = (data?.quoteResponse?.result || []).map(
      (q: { symbol: string; regularMarketPrice: number; regularMarketChange: number; regularMarketChangePercent: number }) => ({
        symbol: q.symbol,
        price: q.regularMarketPrice?.toFixed(2) ?? "—",
        change: (q.regularMarketChange >= 0 ? "+" : "") + q.regularMarketChange?.toFixed(2),
        pct: (q.regularMarketChange >= 0 ? "+" : "") + q.regularMarketChangePercent?.toFixed(2) + "%",
        up: q.regularMarketChange >= 0,
      })
    );

    if (results.length > 0) {
      cache = { quotes: results, timestamp: now };
      return NextResponse.json({ quotes: results, timestamp: now });
    }

    throw new Error("Empty results");
  } catch {
    // Return stale cache if available
    if (cache) {
      return NextResponse.json({
        quotes: cache.quotes,
        timestamp: cache.timestamp,
        stale: true,
      });
    }

    return NextResponse.json({ quotes: [], timestamp: now, error: true }, { status: 502 });
  }
}
