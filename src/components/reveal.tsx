"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  immediate = false,
  shift = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  immediate?: boolean;
  shift?: boolean;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const hidden = shift ? { opacity: 0, y: 22 } : { opacity: 0 };
  const shown = shift ? { opacity: 1, y: 0 } : { opacity: 1 };

  return (
    <motion.div
      className={className}
      initial={hidden}
      animate={immediate ? shown : undefined}
      whileInView={immediate ? undefined : shown}
      viewport={immediate ? undefined : { once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
