"use client";

import { CtaLink } from "@/components/cta-link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "cn";
import { motion, useScroll, useSpring } from "framer-motion";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const links = [
  { href: "#about", label: "О бюро" },
  { href: "#services", label: "Услуги" },
  { href: "#cases", label: "Кейсы" },
  { href: "#method", label: "Метод" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  const onScroll = useCallback((scroll: number) => {
    const next = scroll > window.innerHeight * 0.45;
    setSolid((prev) => (prev === next ? prev : next));
  }, []);

  useLenis((instance) => {
    onScroll(instance.scroll);
  }, [onScroll]);

  useEffect(() => {
    const update = () => onScroll(window.scrollY);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [onScroll, pathname]);

  useEffect(() => {
    if (window.location.hash && pathname === "/") return;
    const instance = lenisRef.current;
    if (instance) instance.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const transparent = pathname === "/" && !solid && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[60] transition-colors duration-500 motion-reduce:transition-none",
        transparent
          ? "bg-transparent text-ivory"
          : "border-b border-ink/10 bg-ivory/95 text-ink backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[92rem] items-center justify-between gap-4 px-5 md:h-[4.5rem] md:px-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 text-[0.92rem] font-semibold tracking-[0.28em]"
        >
          <span className="size-2 bg-cinnabar" aria-hidden />
          NORDA
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Разделы">
          {links.map((link) => (
            <a
              key={link.href}
              href={pathname === "/" ? link.href : `/${link.href}`}
              className="text-[0.72rem] font-medium tracking-[0.16em] uppercase opacity-75 transition-opacity hover:opacity-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CtaLink href="/quiz" className="hidden md:inline-flex" showArrow={false}>
            Диагностика
          </CtaLink>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  className="h-11 rounded-none px-3 text-[0.72rem] font-semibold tracking-[0.16em] uppercase lg:hidden"
                />
              }
            >
              Меню
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full border-ivory/10 bg-ink text-ivory sm:max-w-md"
            >
              <SheetHeader className="px-6 pt-8">
                <SheetTitle className="font-display text-5xl font-medium text-ivory">
                  NORDA
                </SheetTitle>
                <SheetDescription className="text-ivory/60">
                  Бюро личного позиционирования
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-2 px-6" aria-label="Разделы">
                {links.map((link) => (
                  <SheetClose
                    key={link.href}
                    nativeButton={false}
                    render={
                      <a
                        href={pathname === "/" ? link.href : `/${link.href}`}
                        className="font-display py-1 text-[2.7rem] leading-none font-medium text-ivory"
                      />
                    }
                  >
                    {link.label}
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto px-6 pb-8">
                <CtaLink href="/quiz" className="w-full">
                  Пройти диагностику
                </CtaLink>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function ScrollProgress() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  if (pathname !== "/") return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-cinnabar"
      style={{ scaleX }}
    />
  );
}
