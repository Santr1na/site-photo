"use client";

import { cn } from "cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/#services", label: "Услуги", match: null },
  { href: "/quiz", label: "Формат", match: "/quiz" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/88 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[72rem] items-center justify-between px-5 md:h-[4.25rem] md:px-8">
        <Link
          href="/"
          className="font-display text-[0.95rem] leading-none font-medium tracking-[-0.04em]"
        >
          Орлова
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          {links.map((link) => {
            const active = link.match !== null && pathname === link.match;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "underline-offset-4 hover:underline",
                  active && "underline",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
