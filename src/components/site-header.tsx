import Link from "next/link";
import { sample } from "@/lib/card";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4 md:h-16 md:px-6">
        <Link href="/" className="min-w-0 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-pine/40">
          <span className="text-xs font-medium text-pine">Образец</span>
          <span className="mt-0.5 block truncate font-display text-sm leading-none font-medium">
            {sample.name}
          </span>
        </Link>
        <Link
          href="/quiz"
          className="inline-flex h-10 shrink-0 items-center rounded-xl bg-pine px-3.5 text-sm font-medium text-white transition-colors hover:bg-pine/90 focus-visible:ring-3 focus-visible:ring-pine/40 focus-visible:outline-none"
        >
          <span className="sm:hidden">Опрос</span>
          <span className="hidden sm:inline">Короткий опрос</span>
        </Link>
      </div>
    </header>
  );
}
