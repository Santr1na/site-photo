import type { Metadata } from "next";
import { Golos_Text, Unbounded } from "next/font/google";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const sans = Golos_Text({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-golos",
  display: "swap",
});

const display = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-unbounded",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Мария Орлова — фотограф, Казань",
    template: "%s — Мария Орлова",
  },
  description:
    "Частный фотограф в Казани: портрет, семейная съёмка и небольшие события. Цены, запись и короткий подбор формата.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${sans.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink">
        <Providers>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2"
          >
            К содержанию
          </a>
          <SiteHeader />
          {children}
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
