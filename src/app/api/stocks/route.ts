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
    // Yahoo's v7 /quote endpoint now requires a crumb (401), so pull each
    // symbol from the public v8 /chart endpoint instead. range=1d makes
    // chartPreviousClose the prior session's close.
    const settled = await Promise.allSettled(
      SYMBOLS.map(async (symbol) => {
        const resp = await fetch(
          `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=1d&interval=1d`,
          {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            },
            signal: AbortSignal.timeout(8000),
          }
        );
        if (!resp.ok) throw new Error(`Yahoo API ${resp.status}`);
        const data = await resp.json();
        const meta = data?.chart?.result?.[0]?.meta;
        const price = meta?.regularMarketPrice;
        const prev = meta?.chartPreviousClose ?? meta?.previousClose;
        if (typeof price !== "number" || typeof prev !== "number" || prev === 0) {
          throw new Error(`No quote for ${symbol}`);
        }
        const change = price - prev;
        const pct = (change / prev) * 100;
        const sign = change >= 0 ? "+" : "";
        return {
          symbol,
          price: price.toFixed(2),
          change: sign + change.toFixed(2),
          pct: sign + pct.toFixed(2) + "%",
          up: change >= 0,
        };
      })
    );

    const results = settled
      .filter((r): r is PromiseFulfilledResult<CachedData["quotes"][number]> => r.status === "fulfilled")
      .map((r) => r.value);

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
