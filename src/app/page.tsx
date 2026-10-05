import { Reveal } from "@/components/reveal";
import { sample, services, formatOrder } from "@/lib/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main
      id="content"
      className="bg-[radial-gradient(ellipse_at_top_left,rgba(31,106,98,0.13),transparent_46%)]"
    >
      <section className="mx-auto max-w-5xl px-4 pt-8 pb-4 md:px-6 md:pt-12">
        <Reveal immediate>
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm text-pine ring-1 ring-border">
            <span className="size-1.5 rounded-full bg-pine" aria-hidden />
            Образец
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(1.7rem,3.6vw,2.7rem)] leading-[1.18] font-medium tracking-[-0.03em]">
            Это пример сайта-визитки с коротким опросом.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone md:text-lg">
            Карточка одного фотографа: имя, город, три услуги с ценами и контакт.
            Четыре вопроса помогают выбрать формат съёмки. Это демонстрация для
            клиента, не настоящая студия.
          </p>
        </Reveal>

        <Reveal immediate delay={0.08}>
          <article className="mt-8 rounded-3xl bg-white p-5 shadow-[0_20px_50px_-32px_rgba(28,40,50,0.45)] ring-1 ring-black/5 md:p-8">
            <div className="flex items-start gap-4">
              <span
                aria-hidden
                className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-accent font-display text-base text-pine"
              >
                МО
              </span>
              <div>
                <p className="text-sm text-stone">
                  {sample.role} · {sample.city}
                </p>
                <h2 className="mt-1 font-display text-[clamp(2rem,5vw,3.15rem)] leading-[1.05] font-medium tracking-[-0.03em]">
                  {sample.name}
                </h2>
              </div>
            </div>
            <p className="mt-3 max-w-xl text-base leading-relaxed md:text-lg">
              {sample.sentence}
            </p>
            <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Link
                href="/quiz"
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-pine px-5 text-base font-medium text-white transition-colors hover:bg-pine/90 focus-visible:ring-3 focus-visible:ring-pine/40 focus-visible:outline-none"
              >
                Пройти короткий опрос
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <p className="text-sm text-stone">
                Четыре вопроса. В конце — какой формат ближе и что делать дальше.
              </p>
            </div>
          </article>
        </Reveal>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12" aria-labelledby="services-title">
        <Reveal>
          <h2 id="services-title" className="font-display text-2xl font-medium tracking-[-0.03em] md:text-3xl">
            Услуги и цены
          </h2>
          <p className="mt-2 max-w-xl text-stone">
            Диапазоны в образце, не прайс настоящей студии.
          </p>
        </Reveal>
        <ul className="mt-5 grid gap-3 md:grid-cols-3">
          {formatOrder.map((id, index) => {
            const service = services[id];
            return (
              <li key={id} className="h-full">
                <Reveal delay={0.06 * index} className="h-full">
                  <article className="flex h-full flex-col rounded-2xl bg-white p-5 ring-1 ring-black/5">
                    <p className="text-xs font-medium text-pine">0{index + 1}</p>
                    <h3 className="mt-3 font-display text-xl font-medium tracking-[-0.03em]">
                      {service.name}
                    </h3>
                    <p className="mt-2 font-display text-lg text-pine">{service.price}</p>
                    <p className="mt-3 text-sm leading-relaxed text-stone">
                      {service.detail} {service.time[0].toUpperCase()}
                      {service.time.slice(1)}.
                    </p>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mx-auto max-w-5xl px-4 pt-2 pb-12 md:px-6 md:pb-16" aria-labelledby="contact-title">
        <Reveal>
          <div className="rounded-3xl border border-dashed border-pine/40 bg-white p-5 md:p-8">
            <p className="text-sm font-medium text-pine">Образец контакта</p>
            <h2 id="contact-title" className="mt-2 font-display text-2xl font-medium tracking-[-0.03em]">
              Сообщения никуда не отправляются
            </h2>
            <p className="mt-3 max-w-xl text-stone">
              Это не форма заявки. Номер и почта выдуманы, чтобы было видно, где на
              такой странице стоит контакт.
            </p>
            <p className="mt-5 font-display text-lg md:text-xl">
              {sample.phone}
              <span className="text-stone"> · </span>
              {sample.email}
            </p>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
