import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import BrandLogo from "@/components/layout/BrandLogo";
import Navigation from "@/components/layout/Navigation";
import ForestOverlay from "@/components/layout/ForestOverlay";
import ProgressBar from "@/components/layout/ProgressBar";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-sans-next",
  display: "swap",
});
const serif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif-next",
  display: "swap",
});
const mono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-next",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050505",
};

export const metadata: Metadata = {
  title: "CAIPORA · Vigilância acústica para a Amazônia",
  description:
    "Sistema autônomo de monitoramento ambiental — IoT, IA de borda e bioacústica para combater desmatamento e caça ilegal em tempo real.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
    >
      <body>
        <ForestOverlay />
        <ProgressBar />
        <BrandLogo />
        <Navigation />
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
