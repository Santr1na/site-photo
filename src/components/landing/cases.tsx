import { Reveal } from "@/components/reveal";

const cases = [
  {
    index: "01",
    field: "Финансовая инфраструктура",
    role: "Партнёр практики",
    before: "Помогаем компаниям с трансформацией",
    after:
      "Собираю операционную модель для финтеха, который вырос быстрее своих процессов.",
    trace:
      "Три якорных мандата за квартал. Входящие сузились до одного профиля.",
  },
  {
    index: "02",
    field: "Образование взрослых",
    role: "Основательница",
    before: "Онлайн-курсы по новой профессии",
    after:
      "Переподготовка для тех, кто уже состоялся и меняет ремесло, а не начинает с нуля.",
    trace: "Средний чек вырос в 2,4 раза. Линейку не расширяли — сузили.",
  },
  {
    index: "03",
    field: "Город и сообщества",
    role: "Независимый исследователь",
    before: "Консультант по развитию территорий",
    after:
      "Помогаю городу договариваться с теми, кто в нём живёт, — методом, а не серией воркшопов.",
    trace:
      "Книга, две ключевые сцены в год и цитирование без вопроса «а чем вы занимаетесь?».",
  },
];

export function Cases() {
  return (
    <section id="cases" className="scroll-mt-24 bg-ivory text-ink">
      <div className="mx-auto max-w-[92rem] px-5 pt-24 md:px-10 md:pt-36">
        <Reveal>
          <p className="text-[0.72rem] font-medium tracking-[0.22em] uppercase text-cinnabar">
            04 — Избранные разборы
          </p>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.95] font-medium tracking-[-0.03em] text-balance">
            Позиции, которые перестали себя объяснять.
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto max-w-[92rem] px-5 md:px-10">
        {cases.map((item, index) => (
          <Reveal key={item.index}>
            <article className="grid gap-8 border-t border-ink/15 py-12 md:grid-cols-12 md:gap-10 md:py-16">
              <div className="md:col-span-4">
                <p className="font-display text-6xl leading-none text-cinnabar italic md:text-7xl">
                  {item.index}
                </p>
                <p className="mt-6 text-[0.72rem] tracking-[0.16em] uppercase text-stone">
                  {item.field}
                </p>
                <p className="mt-2 text-base">{item.role}</p>
              </div>
              <div className="md:col-span-8">
                <p className="text-[0.72rem] tracking-[0.16em] uppercase text-stone">
                  Было
                </p>
                <p className="mt-2 text-lg text-stone line-through decoration-ink/30">
                  {item.before}
                </p>
                <p className="mt-8 text-[0.72rem] tracking-[0.16em] uppercase text-cinnabar">
                  Стало
                </p>
                <blockquote className="mt-3 font-display text-[clamp(1.7rem,3vw,2.8rem)] leading-[1.08] font-medium tracking-[-0.02em]">
                  {item.after}
                </blockquote>
                <p className="mt-8 max-w-xl border-t border-ink/15 pt-5 text-base leading-relaxed">
                  <span className="mr-2 text-[0.72rem] tracking-[0.16em] uppercase text-stone">
                    След
                  </span>
                  {item.trace}
                </p>
              </div>
              <span className="sr-only">Разбор {index + 1}</span>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
