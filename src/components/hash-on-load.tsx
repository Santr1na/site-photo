"use client";

import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";

export function HashOnLoad() {
  const lenis = useLenis();
  const done = useRef(false);

  useEffect(() => {
    if (!lenis || done.current) return;
    const hash = window.location.hash;
    if (!hash || hash === "#") {
      done.current = true;
      return;
    }
    const el = document.querySelector(hash);
    if (!(el instanceof HTMLElement)) return;
    const timer = window.setTimeout(() => {
      lenis.scrollTo(el, { offset: -84 });
      done.current = true;
    }, 80);
    return () => window.clearTimeout(timer);
  }, [lenis]);

  return null;
}
