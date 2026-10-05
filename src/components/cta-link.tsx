"use client";

import { Button } from "@/components/ui/button";
import { cn } from "cn";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function CtaLink({
  href,
  children,
  variant = "default",
  className,
  showArrow = true,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "outline" | "secondary" | "ghost";
  className?: string;
  showArrow?: boolean;
}) {
  const classNames = cn(
    "h-12 gap-2 px-6 text-[0.72rem] font-semibold tracking-[0.16em] uppercase",
    className,
  );

  if (href.startsWith("/")) {
    return (
      <Button
        nativeButton={false}
        variant={variant}
        className={classNames}
        render={<Link href={href} />}
      >
        {children}
        {showArrow ? <ArrowUpRight /> : null}
      </Button>
    );
  }

  return (
    <Button
      nativeButton={false}
      variant={variant}
      className={classNames}
      render={<a href={href} />}
    >
      {children}
      {showArrow ? <ArrowUpRight /> : null}
    </Button>
  );
}
