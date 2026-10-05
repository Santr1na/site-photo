import { Reveal } from "@/components/reveal";

const steps = [
  {
    index: "01",
    title: "Встреча",
    text: "Девяносто минут без презентации. Слушаем, как вы рассказываете о работе, когда вас не просят упаковаться.",
  },
  {
    index: "02",
    title: "Чтение",
    text: "Тексты, выступления, отзывы, отказы, чужие формулировки. Ищем, где линия рвётся.",
  },
  {
    index: "03",
    title: "Формула",
    text: "Одна позиция: коротко, произносимо, с границами. Вы проверяете её в живых разговорах, мы правим по слуху.",
  },
  {
    index: "04",
    title: "Проявление",
    text: "Первые тексты и оффер. Не кампания — доказательство, что позиция выдерживает встречу с рынком.",
  },
];

export function Method() {
  return (
    <section id="method" className="scroll-mt-24 bg-ivory text-ink">
      <div className="mx-auto grid max-w-[92rem] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
        <div className="md:col-span-5">
          <div className="bg-ink p-8 text-ivory md:sticky md:top-28 md:p-12">
            <p className="text-[0.72rem] font-medium tracking-[0.22em] uppercase text-cinnabar">
              05 — Как устроена работа
            </p>
            <h2 className="mt-6 font-display text-[clamp(2.4rem,4vw,3.8rem)] leading-[0.95] font-medium tracking-[-0.03em]">
              Сначала слух. Потом формула. Потом всё, что вы говорите вслух.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-ivory/65 md:text-base">
              Работа короткая и плотная. Мы не остаёмся на сопровождении бренда
              на годы. Мы оставляем позицию, которую вы можете нести сами.
            </p>
          </div>
        </div>
        <ol className="md:col-span-7">
          {steps.map((step, index) => (
            <li key={step.index} className="border-t border-ink/15">
              <Reveal delay={index * 0.04}>
                <div className="grid grid-cols-[auto_1fr] gap-6 py-8 md:gap-10 md:py-10">
                  <span className="font-display text-4xl text-cinnabar italic md:text-5xl">
                    {step.index}
                  </span>
                  <div>
                    <h3 className="font-display text-4xl font-medium tracking-[-0.03em] md:text-5xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-lg text-base leading-relaxed text-stone">
                      {step.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
