import { Reveal } from "@/components/reveal";
import { formatOrder, sample, services } from "@/lib/card";
import Image from "next/image";
import Link from "next/link";

function Shot({
  src,
  alt,
  className,
  position,
  priority = false,
  sizes,
}: {
  src: string;
  alt: string;
  className: string;
  position: string;
  priority?: boolean;
  sizes: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-ink/5 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover transition-transform duration-[1.2s] ease-out hover:scale-[1.035] motion-reduce:transition-none motion-reduce:hover:scale-100 ${position}`}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <main id="content">
      <section className="lg:grid lg:min-h-svh lg:grid-cols-12">
        <div className="flex flex-col justify-between px-5 py-8 md:px-10 lg:col-span-4 lg:min-h-svh lg:py-12 lg:pt-20 lg:pr-8">
          <Reveal immediate>
            <p className="text-sm text-stone">{sample.city}</p>
            <h1 className="mt-5 font-display text-[clamp(3.4rem,5.4vw,5.6rem)] leading-[0.86] font-medium tracking-[-0.055em]">
              Мария
              <br />
              Орлова
            </h1>
            <p className="mt-3 text-sm text-stone">{sample.role}</p>
          </Reveal>
          <Reveal immediate delay={0.08} className="mt-12 max-w-sm lg:mt-0">
            <p className="text-lg leading-snug md:text-xl">{sample.sentence}</p>
            <Link
              href="/quiz"
              className="mt-6 inline-block border-b border-ink pb-0.5 text-base hover:text-stone"
            >
              Подобрать формат
            </Link>
          </Reveal>
        </div>
        <Reveal immediate shift={false} className="lg:col-span-8">
          <Shot
            src="/work/portrait.jpg"
            alt="Портрет женщины в белой рубашке, мягкий свет, взгляд в камеру"
            className="h-[78vh] min-h-[28rem] lg:h-full lg:min-h-svh"
            position="object-[center_22%]"
            priority
            sizes="(min-width: 1024px) 66vw, 100vw"
          />
        </Reveal>
      </section>

      <section id="services" className="scroll-mt-16 border-y border-ink/15" aria-labelledby="services-title">
        <h2 id="services-title" className="sr-only">
          Услуги
        </h2>
        <ul className="grid md:grid-cols-3">
          {formatOrder.map((id, index) => {
            const service = services[id];
            return (
              <li
                key={id}
                className="border-b border-ink/15 px-5 py-8 last:border-b-0 md:border-b-0 md:border-l md:px-8 md:py-12 md:first:border-l-0"
              >
                <Reveal delay={0.05 * index}>
                  <h3 className="font-display text-[clamp(1.8rem,2.6vw,2.7rem)] leading-none font-medium tracking-[-0.045em]">
                    {service.name}
                  </h3>
                  <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-stone">
                    {service.detail} {service.time[0].toUpperCase()}
                    {service.time.slice(1)}.
                  </p>
                  <p className="mt-8 text-lg tabular-nums">{service.price}</p>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-28" aria-labelledby="family-caption">
        <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-8">
          <div className="lg:col-span-7">
            <Reveal shift={false}>
              <figure>
                <Shot
                  src="/work/family.jpg"
                  alt="Семья из четырёх человек идёт по полю в тёплом свете"
                  className="aspect-[4/3]"
                  position="object-[center_42%]"
                  sizes="(min-width: 1024px) 54vw, 100vw"
                />
                <figcaption id="family-caption" className="mt-3 flex items-baseline justify-between gap-6 text-sm">
                  <span>Семья</span>
                  <span className="text-right text-stone">
                    {services.family.time}, {services.family.price}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
          <div className="mt-8 ml-auto w-[72%] sm:w-[58%] lg:col-span-4 lg:col-start-9 lg:mt-36 lg:w-auto">
            <Reveal shift={false}>
              <Shot
                src="/work/family-field.jpg"
                alt="Ребёнок бежит по высокой траве на закате"
                className="aspect-[4/5]"
                position="object-[center_55%]"
                sizes="(min-width: 1024px) 30vw, 70vw"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-28" aria-labelledby="event-caption">
        <div className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <div className="order-2 mt-10 w-[74%] px-5 sm:w-[52%] lg:order-1 lg:col-span-3 lg:mt-0 lg:w-auto lg:px-10">
            <Reveal shift={false}>
              <Shot
                src="/work/event-dinner.jpg"
                alt="Люди за длинным столом на ужине, тёплый свет"
                className="aspect-[3/4]"
                position="object-center"
                sizes="(min-width: 1024px) 22vw, 70vw"
              />
            </Reveal>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-9">
            <Reveal shift={false}>
              <figure>
                <Shot
                  src="/work/event.jpg"
                  alt="Пара танцует, платье крутится в движении"
                  className="aspect-[4/5] sm:aspect-[3/2]"
                  position="object-[center_40%]"
                  sizes="(min-width: 1024px) 72vw, 100vw"
                />
                <figcaption
                  id="event-caption"
                  className="mt-3 flex items-baseline justify-between gap-6 px-5 text-sm lg:px-0 lg:pr-10"
                >
                  <span>Съёмка события</span>
                  <span className="text-right text-stone">
                    {services.event.time}, {services.event.price}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/15 px-5 py-16 md:px-10 md:py-24">
        <Reveal>
          <p className="text-sm text-stone">Запись</p>
          <Link
            href="/quiz"
            className="mt-4 block max-w-4xl font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.9] font-medium tracking-[-0.05em] hover:text-stone"
          >
            Подобрать формат
          </Link>
          <a
            href={sample.phoneHref}
            className="mt-8 block text-2xl tabular-nums tracking-[-0.03em] hover:text-stone md:text-3xl"
          >
            {sample.phone}
          </a>
          <a href={sample.emailHref} className="mt-2 inline-block text-stone hover:text-ink">
            {sample.email}
          </a>
        </Reveal>
      </section>
    </main>
  );
}
