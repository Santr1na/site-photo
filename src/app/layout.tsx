import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Providers } from "@/components/providers";
import { ScrollProgress, SiteHeader } from "@/components/site-header";
import "./globals.css";

const sans = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const display = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NORDA — бюро личного позиционирования",
    template: "%s — NORDA",
  },
  description:
    "NORDA помогает экспертам и основателям найти профессиональную позицию: формулировку, по которой их выбирают и не путают с рынком. Диагностика «Профиль эксперта».",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${sans.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ivory text-ink">
        <Providers>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-ivory focus:px-4 focus:py-2"
          >
            К содержанию
          </a>
          <ScrollProgress />
          <SiteHeader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
