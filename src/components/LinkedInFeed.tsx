"use client";

import { useEffect, useState } from "react";

export default function LinkedInFeed() {
  const widgetId = process.env.NEXT_PUBLIC_ELFSIGHT_WIDGET_ID;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!widgetId) return;

    // Check if script already exists
    if (document.querySelector('script[src*="elfsight"]')) {
      setLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    script.onload = () => setLoaded(true);
    document.body.appendChild(script);

    return () => {
      // Cleanup not strictly needed since script persists
    };
  }, [widgetId]);

  // Fallback if no widget ID configured
  if (!widgetId) {
    return (
      <div className="text-center">
        <a
          href="https://www.linkedin.com/company/npfis"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 glass-accent text-sm font-semibold text-accent hover:text-accent-light px-8 py-4 rounded-lg glow-accent-hover transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          Follow NPFIS on LinkedIn
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div
        className={`elfsight-app-${widgetId}`}
        data-elfsight-app-lazy
      />
      {!loaded && (
        <div className="text-center py-8">
          <p className="text-text-muted text-sm">Loading LinkedIn feed...</p>
        </div>
      )}
    </div>
  );
}
