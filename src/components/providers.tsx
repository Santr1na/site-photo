"use client";

import { MotionConfig } from "framer-motion";
import { ReactLenis } from "lenis/react";
import { useEffect, useMemo, useState } from "react";
import "lenis/dist/lenis.css";

export function Providers({ children }: { children: React.ReactNode }) {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  const options = useMemo(
    () => ({
      lerp: reduce ? 1 : 0.085,
      smoothWheel: !reduce,
      syncTouch: false,
      autoRaf: true,
      anchors: { offset: -84 },
    }),
    [reduce],
  );

  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis root options={options}>
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}
