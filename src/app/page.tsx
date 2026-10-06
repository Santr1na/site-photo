import { Reveal } from "@/components/reveal";
import { formatOrder, sample, services } from "@/lib/card";
import Link from "next/link";

export default function HomePage() {
  return (
    <main id="content">
      <section className="mx-auto grid max-w-[72rem] gap-10 px-5 pt-12 pb-12 md:px-8 md:pt-20 md:pb-16 lg:grid-cols-12 lg:items-end lg:gap-8">
        <Reveal immediate className="lg:col-span-7">
          <p className="text-sm text-stone">
            {sample.role}, {sample.city}
          </p>
          <h1 className="mt-4 font-display text-[clamp(3.4rem,8vw,6.6rem)] leading-[0.9] font-medium tracking-[-0.05em]">
            Мария
            <br />
            Орлова
          </h1>
        </Reveal>

        <Reveal immediate delay={0.08} className="lg:col-span-5 lg:pb-2">
          <p className="max-w-sm text-lg leading-relaxed">{sample.sentence}</p>
          <div className="mt-8 flex flex-col items-start gap-5">
            <Link
              href="/quiz"
              className="border-b border-ink pb-0.5 text-base hover:text-stone"
            >
              Подобрать формат
            </Link>
            <a href={sample.phoneHref} className="text-base tabular-nums hover:text-stone">
              {sample.phone}
            </a>
          </div>
        </Reveal>
      </section>

      <section id="services" className="scroll-mt-20" aria-labelledby="services-title">
        <div className="mx-auto max-w-[72rem] px-5 md:px-8">
          <Reveal>
            <h2 id="services-title" className="pb-4 text-sm text-stone">
              Услуги
            </h2>
          </Reveal>
          <ul>
            {formatOrder.map((id, index) => {
              const service = services[id];
              return (
                <li key={id}>
                  <Reveal delay={0.05 * index}>
                    <article className="rate-row group grid gap-2 py-6 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1.5fr)_auto] md:items-baseline md:gap-10 md:px-4 md:py-7">
                      <h3 className="text-2xl leading-tight font-medium tracking-[-0.03em] md:text-[1.7rem]">
                        {service.name}
                      </h3>
                      <p className="text-sm leading-relaxed text-stone group-hover:text-paper/75 md:text-base">
                        {service.detail}{" "}
                        {service.time[0].toUpperCase()}
                        {service.time.slice(1)}.
                      </p>
                      <p className="text-base tabular-nums md:text-right md:text-lg">{service.price}</p>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-[72rem] gap-6 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-12" aria-labelledby="booking-title">
        <Reveal className="lg:col-span-4">
          <h2 id="booking-title" className="text-sm text-stone">
            Запись
          </h2>
        </Reveal>
        <Reveal delay={0.06} className="lg:col-span-7">
          <p className="max-w-xl text-xl leading-snug tracking-[-0.02em] md:text-2xl">
            Напишите или позвоните. Назовите дату и кого снимаем — в городе, дома или на площадке.
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-stone">
            Я подтверждаю время в тот же день. Готовые фото приходят ссылкой через неделю.
          </p>
          <Link href="/quiz" className="mt-8 inline-block border-b border-ink pb-0.5 hover:text-stone">
            Не знаете формат — четыре вопроса
          </Link>
        </Reveal>
      </section>

      <section id="contact" className="scroll-mt-20 border-t border-ink/15" aria-labelledby="contact-title">
        <div className="mx-auto max-w-[72rem] px-5 py-16 md:px-8 md:py-24">
          <Reveal>
            <h2 id="contact-title" className="text-sm text-stone">
              Контакт
            </h2>
            <a
              href={sample.phoneHref}
              className="mt-4 block font-display text-[clamp(1.8rem,4.4vw,3.25rem)] leading-[1.05] font-medium tracking-[-0.045em] tabular-nums hover:text-stone"
            >
              {sample.phone}
            </a>
            <a
              href={sample.emailHref}
              className="mt-5 inline-block text-xl tracking-[-0.03em] hover:text-stone md:text-2xl"
            >
              {sample.email}
            </a>
            <p className="mt-6 text-sm text-stone">{sample.city}. Отвечаю в тот же день.</p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
