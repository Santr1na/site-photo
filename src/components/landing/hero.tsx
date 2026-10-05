import { CtaLink } from "@/components/cta-link";
import { Reveal } from "@/components/reveal";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-ivory">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(880px 520px at 88% -10%, rgba(255,69,24,0.28), transparent 58%)",
        }}
      />
      <p
        aria-hidden
        className="pointer-events-none absolute -right-[0.08em] bottom-[-0.18em] font-display text-[28vw] leading-none font-medium text-transparent select-none"
        style={{ WebkitTextStroke: "1px rgba(243,238,228,0.14)" }}
      >
        N
      </p>

      <div className="relative mx-auto flex w-full max-w-[92rem] flex-1 flex-col justify-end px-5 pt-28 pb-8 md:px-10 md:pt-32">
        <Reveal immediate>
          <p className="text-[0.72rem] font-medium tracking-[0.22em] uppercase text-cinnabar">
            01 — Бюро личного позиционирования
          </p>
        </Reveal>

        <div className="mt-6 grid items-end gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal immediate delay={0.08} className="lg:col-span-8">
            <h1 className="font-display text-[clamp(3.5rem,8.4vw,7.5rem)] leading-[0.86] font-medium tracking-[-0.035em]">
              <span className="block">Вас должны</span>
              <span className="block">узнавать</span>
              <span className="block">с первой</span>
              <span className="block text-cinnabar italic">фразы.</span>
            </h1>
          </Reveal>
          <Reveal immediate delay={0.18} className="max-w-md lg:col-span-4 lg:pb-3">
            <p className="text-base leading-relaxed text-ivory/75 md:text-lg">
              NORDA помогает экспертам и основателям найти позицию — формулировку,
              по которой их выбирают, рекомендуют и перестают путать с рынком.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="relative z-10 border-t border-ivory/15 bg-ink">
        <div className="mx-auto flex w-full max-w-[92rem] flex-col gap-5 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-10">
          <p className="text-[0.72rem] tracking-[0.18em] uppercase text-ivory/55">
            Москва · с 2019
          </p>
          <div className="hidden items-center gap-3 md:flex" aria-hidden>
            <span className="text-[0.68rem] tracking-[0.2em] uppercase text-ivory/45">
              Листайте
            </span>
            <span className="relative h-px w-16 overflow-hidden bg-ivory/20">
              <span className="scrollcue absolute inset-y-0 left-0 w-1/2 bg-ivory" />
            </span>
          </div>
          <CtaLink href="/quiz">Пройти диагностику</CtaLink>
        </div>
      </div>
    </section>
  );
}
