import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NoiseOverlay from "@/components/NoiseOverlay";
import Providers from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

const siteUrl = "https://www.financeinvestmentsociety.com";

export const metadata: Metadata = {
  title: "NPFIS | North Park Finance & Investment Society",
  description:
    "North Park University's Finance and Investment Society — empowering students with financial literacy, investment knowledge, and professional development.",
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "NPFIS | North Park Finance & Investment Society",
    description:
      "Empowering students with financial literacy, investment knowledge, and professional development.",
    url: siteUrl,
    siteName: "NPFIS",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NPFIS | North Park Finance & Investment Society",
    description:
      "Empowering students with financial literacy, investment knowledge, and professional development.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} min-h-screen bg-base text-text-primary`}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <NoiseOverlay />
        </Providers>
      </body>
    </html>
  );
}
