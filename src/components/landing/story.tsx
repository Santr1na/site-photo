import { Reveal } from "@/components/reveal";

const notes = [
  {
    index: "01",
    title: "Чужие слова",
    text: "О вас говорят «консультант», «эксперт», «помогаем бизнесу». Так можно сказать о тысяче других — и рынок так и делает.",
  },
  {
    index: "02",
    title: "Широкий оффер",
    text: "Чем больше вы умеете, тем слабее звучит приглашение. Репутация уже уже, чем прайс, но прайс кричит громче.",
  },
  {
    index: "03",
    title: "Разные голоса",
    text: "Пост, биография, выступление и коммерческое письмо рассказывают четыре истории. Клиент не обязан собирать их в одну.",
  },
];

export function Story() {
  return (
    <section id="about" className="scroll-mt-24 bg-ivory text-ink">
      <div className="mx-auto max-w-[92rem] px-5 py-24 md:px-10 md:py-36">
        <Reveal>
          <p className="text-[0.72rem] font-medium tracking-[0.22em] uppercase text-cinnabar">
            02 — Зачем это нужно
          </p>
        </Reveal>
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <h2 className="font-display text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.95] font-medium tracking-[-0.03em] text-balance">
              Экспертиза уже есть. Не хватает линии, которая её держит.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5 lg:pt-4">
            <p className="text-base leading-relaxed text-stone md:text-lg">
              Сильного специалиста редко путают в работе. Его путают в разговоре
              о работе. Позиционирование в NORDA — не слоган для шапки и не
              упаковка личности. Это решение: с кем вы работаете, чего не делаете
              и какую фразу человек уносит с собой.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <blockquote className="mt-16 max-w-4xl border-l-2 border-cinnabar pl-6 font-display text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.12] font-medium italic md:mt-24">
            «Пока вас описывают списком услуг, вас сравнивают по цене.»
          </blockquote>
        </Reveal>

        <div className="mt-16 grid gap-px bg-ink/10 md:mt-24 md:grid-cols-3">
          {notes.map((note, index) => (
            <Reveal key={note.index} delay={index * 0.06} className="bg-ivory">
              <article className="h-full border-t border-ink/15 pt-6 pr-6 pb-2">
                <p className="font-display text-3xl text-cinnabar italic">{note.index}</p>
                <h3 className="mt-4 font-display text-3xl font-medium">{note.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-stone md:text-base">
                  {note.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
