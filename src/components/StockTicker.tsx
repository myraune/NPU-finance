"use client";

import { useEffect, useState, useRef } from "react";

interface Quote {
  symbol: string;
  price: string;
  change: string;
  pct: string;
  up: boolean;
}

const FUN_FACTS: Record<string, string> = {
  "SPY": "Chicago's CME Group is the world's largest derivatives exchange, handling 3 billion contracts/year.",
  "S&P 500": "Chicago's CME Group is the world's largest derivatives exchange, handling 3 billion contracts/year.",
  "DIA": "The Chicago Board of Trade, founded in 1848, is one of the oldest futures exchanges in the world.",
  "DJIA": "The Chicago Board of Trade, founded in 1848, is one of the oldest futures exchanges in the world.",
  "QQQ": "Chicago is home to Citadel, one of the most powerful hedge funds and market makers globally.",
  "NASDAQ": "Chicago is home to Citadel, one of the most powerful hedge funds and market makers globally.",
  "AAPL": "North Park University is just 8 miles from Chicago's financial district on LaSalle Street.",
  "MSFT": "Chicago's fintech scene is booming — the city ranks #3 in the US for financial technology jobs.",
  "JPM": "JPMorgan Chase has a major presence in Chicago, with offices in the iconic Chase Tower on Madison St.",
  "GS": "Chicago's LaSalle Street has been the heart of Midwest finance since the 1800s.",
  "BRK-B": "Warren Buffett started his career in Omaha, just a short drive from Chicago's trading floors.",
  "BRK.B": "Warren Buffett started his career in Omaha, just a short drive from Chicago's trading floors.",
  "AMZN": "Illinois is the #1 state for corporate relocations, with Chicago attracting major HQs like Boeing and Citadel.",
  "NVDA": "The University of Chicago produced 33 Nobel laureates in Economics — more than any other institution.",
};

export default function StockTicker() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [stale, setStale] = useState(false);
  const [activeFact, setActiveFact] = useState<string | null>(null);
  const factTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function fetchQuotes() {
      try {
        const resp = await fetch("/api/stocks");
        if (!resp.ok) return;
        const data = await resp.json();
        if (data.quotes?.length > 0) {
          setQuotes(data.quotes);
          setStale(!!data.stale);
        }
      } catch {
        // Network error — keep existing quotes
      }
    }

    fetchQuotes();
    const interval = setInterval(fetchQuotes, 30000);
    return () => clearInterval(interval);
  }, []);

  function handleSymbolClick(symbol: string) {
    const fact = FUN_FACTS[symbol];
    if (!fact) return;
    if (factTimer.current) clearTimeout(factTimer.current);
    setActiveFact(activeFact === fact ? null : fact);
    factTimer.current = setTimeout(() => setActiveFact(null), 5000);
  }

  if (quotes.length === 0) return null;

  return (
    <div className="relative bg-surface-0/90 backdrop-blur-sm border-t border-accent/10 overflow-hidden no-scrollbar">
      <div className="flex items-center">
        {/* Status indicator */}
        <div className="shrink-0 flex items-center gap-2 px-5 py-3.5 border-r border-border-subtle">
          <span className="relative flex h-2 w-2">
            <span
              className={`absolute inset-0 rounded-full opacity-75 ${stale ? "bg-amber-400" : "bg-positive"}`}
              style={{ animation: "pulse-live 2s ease-in-out infinite" }}
            />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${stale ? "bg-amber-400" : "bg-positive"}`} />
          </span>
          <span className={`text-[10px] font-data font-medium tracking-wider uppercase ${stale ? "text-amber-400" : "text-positive"}`}>
            {stale ? "Delayed" : "Live"}
          </span>
        </div>

        {/* Ticker tape */}
        <div className="flex-1 overflow-hidden py-3">
          <div className="marquee flex whitespace-nowrap" style={{ animationDuration: "45s" }}>
            {[0, 1].map((dup) => (
              <div key={dup} className="flex items-center shrink-0">
                {quotes.map((q) => (
                  <span
                    key={q.symbol + dup}
                    onClick={() => handleSymbolClick(q.symbol)}
                    className={`flex items-center gap-2.5 px-5 border-r border-white/[0.03] cursor-pointer hover:bg-border-subtle/50 transition-colors duration-200 ${
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

      {/* Fun fact tooltip */}
      {activeFact && (
        <div
          className="absolute bottom-full left-1/2 mb-2 z-50"
          style={{ animation: "toastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
        >
          <div className="glass-accent rounded-lg px-4 py-2.5 max-w-sm text-center">
            <p className="text-accent text-[11px] font-medium leading-relaxed">{activeFact}</p>
          </div>
        </div>
      )}
    </div>
  );
}
