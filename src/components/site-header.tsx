"use client";

import { cn } from "cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const onQuiz = pathname === "/quiz";

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper">
      <div className="mx-auto flex h-14 max-w-[86rem] items-center justify-between gap-4 px-4 md:h-[4.25rem] md:px-8">
        <Link href="/" className="font-display text-lg leading-none font-medium tracking-[-0.05em] md:text-xl">
          Орлова
        </Link>
        <nav className="flex items-center gap-5 text-sm md:gap-7 md:text-base">
          <Link href="/#services" className="hover:underline">
            Услуги
          </Link>
          <Link
            href="/quiz"
            aria-current={onQuiz ? "page" : undefined}
            className={cn(
              "bg-signal px-3 py-2 font-medium text-ink",
              onQuiz && "outline outline-2 outline-offset-2 outline-ink",
            )}
          >
            Формат
          </Link>
        </nav>
      </div>
    </header>
  );
}
