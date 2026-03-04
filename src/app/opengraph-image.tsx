import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "NPFIS — North Park Finance & Investment Society";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#06090f",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Gold accent line at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(to right, transparent, #d4a843, transparent)",
          }}
        />

        {/* Logo */}
        <img
          src="https://www.financeinvestmentsociety.com/images/logo.png"
          width={140}
          height={140}
          style={{ marginBottom: 32 }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: "#eaedf2",
            letterSpacing: "-0.02em",
            marginBottom: 12,
          }}
        >
          North Park Finance &amp; Investment Society
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 22,
            color: "#8a95a8",
            maxWidth: 700,
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          Empowering students with financial literacy, investment knowledge, and professional development.
        </div>

        {/* URL badge */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: "#d4a843",
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
              fontWeight: 600,
            }}
          >
            financeinvestmentsociety.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
