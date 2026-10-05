import { CtaLink } from "@/components/cta-link";
import { Reveal } from "@/components/reveal";

export function Finale() {
  return (
    <section id="start" className="scroll-mt-24 bg-ivory text-ink">
      <div className="mx-auto grid max-w-[92rem] gap-10 px-5 py-24 md:px-10 md:py-40 lg:grid-cols-12">
        <Reveal className="lg:col-span-8">
          <p className="text-[0.72rem] font-medium tracking-[0.22em] uppercase text-cinnabar">
            07 — Диагностика
          </p>
          <h2 className="mt-6 font-display text-[clamp(3.2rem,7vw,6.4rem)] leading-[0.88] font-medium tracking-[-0.035em]">
            Семь вопросов.
            <br />
            Четыре архетипа.
            <br />
            <span className="text-cinnabar italic">Одна точка старта.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="flex flex-col justify-end lg:col-span-4">
          <p className="text-base leading-relaxed text-stone md:text-lg">
            «Профиль эксперта» — короткий тест о том, как вы выбираете работу,
            говорите о ней и чего не терпите в чужих формулировках. В конце один
            из четырёх профилей и шаг, с которого стоит начать.
          </p>
          <div className="mt-8">
            <CtaLink href="/quiz">Начать диагностику</CtaLink>
          </div>
          <p className="mt-4 text-sm text-stone">
            Около четырёх минут. Без регистрации. Результат остаётся у вас.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
