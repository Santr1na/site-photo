import { Reveal } from "@/components/reveal";

const services = [
  {
    index: "01",
    title: "Диагностика",
    time: "10 дней",
    text: "Как вас читают клиенты, коллеги, поиск и ваши тексты за последний год. На выходе — карта разрыва между тем, кем вы являетесь, и тем, кем вас считают.",
  },
  {
    index: "02",
    title: "Ядро",
    time: "3 недели",
    text: "Аудитория, отличие, обещание, границы. Формула, которую можно сказать за двадцать секунд и не захотеть тут же пояснить.",
  },
  {
    index: "03",
    title: "Язык",
    time: "4 недели",
    text: "Биография, речь для сцены, первая страница, письмо, которым открывается разговор. Всё держит одну линию.",
  },
  {
    index: "04",
    title: "Проявление",
    time: "6 недель",
    text: "Первый публичный цикл: серия текстов или одно сильное выступление и оффер, собранный под новую позицию.",
  },
];

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-ink text-ivory">
      <div className="mx-auto max-w-[92rem] px-5 pt-24 pb-8 md:px-10 md:pt-36">
        <Reveal>
          <p className="text-[0.72rem] font-medium tracking-[0.22em] uppercase text-cinnabar">
            03 — Чем занимается бюро
          </p>
          <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.95] font-medium tracking-[-0.03em]">
            Четыре такта. Одна позиция.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/65 md:text-lg">
            Мы не ведём рекламу и не собираем бренд под ключ. Мы находим
            формулировку и доводим язык, которым она звучит.
          </p>
        </Reveal>
      </div>

      <div className="border-t border-ivory/15">
        {services.map((service) => (
          <article
            key={service.index}
            className="group border-b border-ivory/15 transition-colors duration-300 motion-reduce:transition-none hover:border-cinnabar hover:bg-cinnabar"
          >
            <div className="mx-auto grid max-w-[92rem] gap-4 px-5 py-8 md:grid-cols-12 md:items-baseline md:gap-6 md:px-10 md:py-11">
              <p className="font-display text-3xl text-cinnabar italic transition-colors duration-300 group-hover:text-ink md:col-span-1">
                {service.index}
              </p>
              <h3 className="font-display text-[2.4rem] leading-none font-medium tracking-[-0.03em] transition-colors duration-300 group-hover:text-ink md:col-span-3 md:text-5xl">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-ivory/70 transition-colors duration-300 group-hover:text-ink/80 md:col-span-6 md:text-base">
                {service.text}
              </p>
              <p className="text-[0.72rem] tracking-[0.16em] uppercase text-ivory/45 transition-colors duration-300 group-hover:text-ink/70 md:col-span-2 md:text-right">
                {service.time}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
