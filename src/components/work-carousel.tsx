"use client";

import { services } from "@/lib/card";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useState, type PointerEvent } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

function sentence(detail: string, time: string) {
  return `${detail} ${time[0].toUpperCase()}${time.slice(1)}.`;
}

const slides = [
  {
    src: "/work/portrait.jpg",
    alt: "Портрет женщины в белой рубашке, мягкий свет, взгляд в камеру",
    label: "Портрет",
    detail: sentence(services.portrait.detail, services.portrait.time),
    price: services.portrait.price,
    position: "object-[center_22%]",
  },
  {
    src: "/work/plate-family.jpg",
    alt: "Семья из четырёх человек идёт по полю в тёплом свете",
    label: "Семья",
    detail: sentence(services.family.detail, services.family.time),
    price: services.family.price,
    position: "object-[center_42%]",
  },
  {
    src: "/work/plate-table.jpg",
    alt: "Люди за столом в тёплом свете ресторана",
    label: "Событие",
    detail: sentence(services.event.detail, services.event.time),
    price: services.event.price,
    position: "object-[center_46%]",
  },
] as const;

export function WorkCarousel() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState<number | null>(null);
  const count = slides.length;
  const slide = slides[index];

  const go = useCallback(
    (next: number) => {
      setIndex((next + count) % count);
    },
    [count],
  );

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    setDragX(event.clientX);
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (dragX === null) return;
    const delta = event.clientX - dragX;
    setDragX(null);
    if (delta > 48) go(index - 1);
    if (delta < -48) go(index + 1);
  };

  return (
    <section
      className="border-b border-ink/15 lg:grid lg:min-h-[78vh] lg:grid-cols-12"
      aria-roledescription="карусель"
      aria-label="Работы"
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") go(index + 1);
        if (event.key === "ArrowLeft") go(index - 1);
      }}
    >
      <div className="flex flex-col justify-between gap-8 px-5 py-8 md:px-10 lg:col-span-4 lg:py-12 lg:pr-8">
        <p className="text-sm tabular-nums text-stone">
          {String(index + 1).padStart(2, "0")}
          <span className="text-ink/30"> / {String(count).padStart(2, "0")}</span>
        </p>

        <div aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slide.label}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease }}
            >
              <h2 className="font-display text-[clamp(3.2rem,5.2vw,5rem)] leading-[0.86] font-medium tracking-[-0.05em]">
                {slide.label}
              </h2>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone">{slide.detail}</p>
              <p className="mt-5 text-lg tabular-nums">{slide.price}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div>
          <div className="flex items-center gap-4">
            <button type="button" className="text-lg leading-none" onClick={() => go(index - 1)} aria-label="Предыдущий кадр">
              ←
            </button>
            <div className="relative h-px flex-1 bg-ink/15" aria-hidden>
              <div
                className="absolute inset-y-0 left-0 bg-ink transition-[width] duration-500 ease-out motion-reduce:transition-none"
                style={{ width: `${((index + 1) / count) * 100}%` }}
              />
            </div>
            <button type="button" className="text-lg leading-none" onClick={() => go(index + 1)} aria-label="Следующий кадр">
              →
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {slides.map((item, itemIndex) => {
              const active = itemIndex === index;
              return (
                <button
                  key={item.label}
                  type="button"
                  aria-current={active ? "true" : undefined}
                  onClick={() => setIndex(itemIndex)}
                  className={active ? "border-b border-ink pb-0.5 text-sm" : "pb-0.5 text-sm text-stone hover:text-ink"}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className="relative min-h-[68vh] touch-pan-y lg:col-span-8 lg:min-h-full"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => setDragX(null)}
      >
        {reduce ? (
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            className={`object-cover ${slide.position}`}
          />
        ) : (
          <AnimatePresence initial={false}>
            <motion.div
              key={slide.src}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                className={`object-cover ${slide.position}`}
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
