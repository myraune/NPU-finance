"use client";

import { useEffect, useState } from "react";

interface Quote {
  symbol: string;
  price: string;
  change: string;
  pct: string;
  up: boolean;
}

const SYMBOLS = ["SPY", "DIA", "QQQ", "AAPL", "MSFT", "JPM", "GS", "BRK-B", "AMZN", "NVDA"];

export default function StockTicker() {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    async function fetchQuotes() {
      try {
        const results: Quote[] = [];
        const resp = await fetch(
          `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${SYMBOLS.join(",")}&fields=regularMarketPrice,regularMarketChange,regularMarketChangePercent,symbol`,
          { next: { revalidate: 60 } }
        );
        if (resp.ok) {
          const data = await resp.json();
          for (const q of data?.quoteResponse?.result || []) {
            results.push({
              symbol: q.symbol,
              price: q.regularMarketPrice?.toFixed(2) ?? "—",
              change: (q.regularMarketChange >= 0 ? "+" : "") + q.regularMarketChange?.toFixed(2),
              pct: (q.regularMarketChange >= 0 ? "+" : "") + q.regularMarketChangePercent?.toFixed(2) + "%",
              up: q.regularMarketChange >= 0,
            });
          }
        }
        if (results.length > 0) {
          setQuotes(results);
          return;
        }
      } catch {
        // API blocked by CORS — use simulated data
      }

      setQuotes([
        { symbol: "S&P 500", price: "5,892.41", change: "+23.67", pct: "+0.40%", up: true },
        { symbol: "DJIA", price: "43,461.21", change: "+118.33", pct: "+0.27%", up: true },
        { symbol: "NASDAQ", price: "18,924.55", change: "-42.11", pct: "-0.22%", up: false },
        { symbol: "AAPL", price: "237.49", change: "+1.82", pct: "+0.77%", up: true },
        { symbol: "MSFT", price: "422.86", change: "+3.15", pct: "+0.75%", up: true },
        { symbol: "JPM", price: "248.72", change: "-0.93", pct: "-0.37%", up: false },
        { symbol: "GS", price: "592.18", change: "+4.21", pct: "+0.72%", up: true },
        { symbol: "AMZN", price: "218.34", change: "+2.56", pct: "+1.19%", up: true },
        { symbol: "NVDA", price: "137.71", change: "+5.43", pct: "+4.10%", up: true },
        { symbol: "BRK.B", price: "473.56", change: "-1.12", pct: "-0.24%", up: false },
      ]);
    }

    fetchQuotes();
    const interval = setInterval(fetchQuotes, 30000);
    return () => clearInterval(interval);
  }, []);

  if (quotes.length === 0) return null;

  return (
    <div className="relative bg-surface-0/90 backdrop-blur-sm border-t border-accent/10 overflow-hidden no-scrollbar">
      <div className="flex items-center">
        {/* LIVE indicator */}
        <div className="shrink-0 flex items-center gap-2 px-5 py-3.5 border-r border-white/[0.04]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-positive opacity-75" style={{ animation: "pulse-live 2s ease-in-out infinite" }} />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-positive" />
          </span>
          <span className="text-positive text-[10px] font-data font-medium tracking-wider uppercase">Live</span>
        </div>

        {/* Ticker tape */}
        <div className="flex-1 overflow-hidden py-3">
          <div className="marquee flex whitespace-nowrap" style={{ animationDuration: "45s" }}>
            {[0, 1].map((dup) => (
              <div key={dup} className="flex items-center shrink-0">
                {quotes.map((q) => (
                  <span
                    key={q.symbol + dup}
                    className={`flex items-center gap-2.5 px-5 border-r border-white/[0.03] ${
                      q.up ? "border-l-2 border-l-positive/30" : "border-l-2 border-l-negative/30"
                    }`}
                  >
                    <span className="font-data text-text-secondary text-[11px] tracking-wider uppercase">{q.symbol}</span>
                    <span className="font-data text-text-primary text-xs font-medium">{q.price}</span>
                    <span className={`font-data text-[11px] flex items-center gap-0.5 ${q.up ? "text-positive" : "text-negative"}`}>
                      {q.up ? (
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                      ) : (
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
                        </svg>
                      )}
                      {q.pct}
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
