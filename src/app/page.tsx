import { Reveal } from "@/components/reveal";
import { formatOrder, sample, services } from "@/lib/card";
import Link from "next/link";

export default function HomePage() {
  return (
    <main id="content">
      <section className="mx-auto flex min-h-[calc(100svh-3.5rem)] max-w-[86rem] flex-col px-4 pt-5 pb-6 md:min-h-[calc(100svh-4.25rem)] md:px-8 md:pt-8 md:pb-8">
        <div className="grid flex-1 items-end gap-5 lg:grid-cols-12 lg:gap-8">
          <Reveal immediate className="lg:col-span-8">
            <h1 className="font-display text-[clamp(4.7rem,13.2vw,10.8rem)] leading-[0.78] font-medium tracking-[-0.065em]">
              Мария
              <br />
              Орлова
            </h1>
          </Reveal>
          <Reveal immediate delay={0.08} className="lg:col-span-4">
            <Link
              href="/quiz"
              className="flex min-h-56 flex-col justify-between bg-signal p-5 text-ink transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:min-h-72 md:p-6"
            >
              <span className="font-display text-[clamp(2.2rem,4vw,3.5rem)] leading-[0.9] font-medium tracking-[-0.05em]">
                от 8 тысяч
              </span>
              <span>
                <span className="block max-w-[16rem] text-sm leading-snug">
                  Портрет, семья или событие. Четыре вопроса — и понятно, что бронировать.
                </span>
                <span className="mt-4 block text-lg font-medium">Подобрать формат</span>
              </span>
            </Link>
          </Reveal>
        </div>

        <Reveal immediate delay={0.14}>
          <div className="mt-6 grid gap-4 border-t-2 border-ink pt-4 md:mt-8 md:grid-cols-[10rem_1fr_auto] md:items-end md:gap-8 md:pt-5">
            <p className="text-sm leading-snug">
              {sample.role}
              <br />
              {sample.city}
            </p>
            <p className="max-w-xl text-lg leading-snug md:text-2xl">{sample.sentence}</p>
            <a href={sample.phoneHref} className="text-lg tabular-nums hover:text-stone md:text-xl">
              {sample.phone}
            </a>
          </div>
        </Reveal>
      </section>

      <section id="services" className="scroll-mt-20" aria-labelledby="services-title">
        <div className="mx-auto max-w-[86rem] px-4 md:px-8">
          <h2 id="services-title" className="sr-only">
            Услуги
          </h2>
          <ul>
            {formatOrder.map((id, index) => {
              const service = services[id];
              return (
                <li key={id}>
                  <Reveal delay={0.04 * index}>
                    <article className="rate-row group grid gap-3 py-7 transition-colors duration-200 motion-reduce:transition-none hover:bg-ink hover:text-paper md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_auto] md:items-end md:gap-8 md:px-3 md:py-9">
                      <h3 className="font-display text-[clamp(2.1rem,4.2vw,3.6rem)] leading-[0.9] font-medium tracking-[-0.05em]">
                        {service.name}
                      </h3>
                      <p className="max-w-sm text-sm leading-relaxed text-stone group-hover:text-paper/75 md:text-base md:pb-1">
                        {service.detail} {service.time[0].toUpperCase()}
                        {service.time.slice(1)}.
                      </p>
                      <p className="font-display text-[clamp(1.35rem,2.2vw,2rem)] leading-none font-medium tracking-[-0.04em] tabular-nums md:pb-1 md:text-right">
                        {service.price}
                      </p>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="mt-16 bg-signal text-ink md:mt-24" aria-labelledby="booking-title">
        <div className="mx-auto grid max-w-[86rem] gap-8 px-4 py-14 md:px-8 md:py-20 lg:grid-cols-12 lg:items-end">
          <h2 id="booking-title" className="text-sm lg:col-span-3">
            Запись
          </h2>
          <Reveal className="lg:col-span-9">
            <p className="max-w-4xl font-display text-[clamp(2rem,4.6vw,4.15rem)] leading-[0.92] font-medium tracking-[-0.05em]">
              Напишите или позвоните. Назовите дату и кого снимаем.
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed md:text-lg">
              Город, дом или площадка. Время подтверждаю в тот же день, фото приходят ссылкой через неделю.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="scroll-mt-20" aria-labelledby="contact-title">
        <div className="mx-auto max-w-[86rem] px-4 py-16 md:px-8 md:py-24">
          <Reveal>
            <h2 id="contact-title" className="text-sm text-stone">
              Контакт
            </h2>
            <a
              href={sample.phoneHref}
              className="mt-3 block font-display text-[clamp(2.6rem,7vw,6.2rem)] leading-[0.86] font-medium tracking-[-0.06em] tabular-nums hover:text-stone"
            >
              {sample.phone}
            </a>
            <a
              href={sample.emailHref}
              className="mt-6 inline-block text-xl tracking-[-0.03em] underline decoration-2 underline-offset-4 hover:text-stone md:text-3xl"
            >
              {sample.email}
            </a>
            <p className="mt-5 text-sm text-stone">{sample.city}</p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
