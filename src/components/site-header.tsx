"use client";

import { cn } from "cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const home = pathname === "/";

  return (
    <header className={cn("sticky top-0 z-40 bg-paper/92 backdrop-blur-md", home && "lg:hidden")}>
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 md:px-8">
        <Link href="/" className="font-display text-base font-medium tracking-[-0.04em]">
          Орлова
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          {home ? null : (
            <Link href="/" className="text-stone hover:text-ink">
              Работы
            </Link>
          )}
          <Link
            href="/quiz"
            aria-current={pathname === "/quiz" ? "page" : undefined}
            className={cn(pathname === "/quiz" ? "underline underline-offset-4" : "hover:underline")}
          >
            Формат
          </Link>
        </nav>
      </div>
    </header>
  );
}
