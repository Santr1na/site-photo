"use client";

import { cn } from "cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const home = pathname === "/";

  return (
    <header
      className={cn(
        "z-40 flex h-14 items-center justify-between px-5 md:px-10",
        home
          ? "sticky bg-paper lg:absolute lg:top-0 lg:right-auto lg:left-0 lg:w-1/3 lg:bg-transparent"
          : "sticky bg-paper/92 backdrop-blur-md",
      )}
    >
      <Link href="/" className={cn("font-display text-base font-medium tracking-[-0.04em]", home && "lg:invisible")}>
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
    </header>
  );
}
