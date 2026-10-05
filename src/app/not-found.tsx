import { CtaLink } from "@/components/cta-link";

export default function NotFound() {
  return (
    <main id="content" className="flex min-h-[100svh] flex-col justify-center bg-ivory px-5 pt-24 pb-16 text-ink md:px-10">
      <p className="text-[0.72rem] font-medium tracking-[0.22em] uppercase text-cinnabar">
        404
      </p>
      <h1 className="mt-4 max-w-3xl font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.9] font-medium tracking-[-0.03em]">
        Такой страницы нет.
      </h1>
      <p className="mt-6 max-w-md text-lg text-stone">
        Позиция начинается с главной — или с семи вопросов диагностики.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <CtaLink href="/" showArrow={false}>
          На главную
        </CtaLink>
        <CtaLink href="/quiz" variant="outline">
          К диагностике
        </CtaLink>
      </div>
    </main>
  );
}
