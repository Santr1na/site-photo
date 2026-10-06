import { Reveal } from "@/components/reveal";
import { formatOrder, sample, services } from "@/lib/card";
import Image from "next/image";
import Link from "next/link";

const frames = [
  {
    src: "/work/portrait.jpg",
    alt: "Женщина в белой рубашке стоит у окна, дневной свет сбоку",
    caption: "Портрет",
    note: "Естественный свет",
    aspect: "aspect-[3/2]",
    position: "object-[center_35%]",
    width: "w-full",
    priority: true,
  },
  {
    src: "/work/family.jpg",
    alt: "Пара держится за руки в тёплом свете",
    caption: "Семья",
    note: "Пара",
    aspect: "aspect-[4/5]",
    position: "object-[center_62%]",
    width: "w-full sm:w-[86%] lg:w-[74%]",
    priority: false,
  },
  {
    src: "/work/event.jpg",
    alt: "Двое идут по улице, снято со спины",
    caption: "Событие",
    note: "Город",
    aspect: "aspect-[3/2]",
    position: "object-[center_42%]",
    width: "w-full",
    priority: false,
  },
] as const;

export default function HomePage() {
  return (
    <main id="content" className="mx-auto max-w-[1400px] px-4 md:px-8 lg:px-10">
      <div className="lg:grid lg:grid-cols-[minmax(16.5rem,23rem)_minmax(0,1fr)] lg:gap-x-16 xl:gap-x-24">
        <aside className="border-b border-ink/10 py-8 lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:overflow-y-auto lg:border-b-0 lg:py-8 lg:pr-2">
          <div>
            <p className="text-sm text-stone">{sample.role}</p>
            <h1 className="mt-3 font-display text-[2.7rem] leading-[0.92] font-medium tracking-[-0.045em] md:text-[3.15rem]">
              Мария
              <br />
              Орлова
            </h1>
            <p className="mt-4 max-w-xs text-[0.95rem] leading-relaxed text-stone">{sample.sentence}</p>
          </div>

          <ul className="mt-8 border-t border-ink/15 lg:mt-10">
            {formatOrder.map((id) => {
              const service = services[id];
              return (
                <li key={id} className="border-b border-ink/15 py-3.5">
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="text-[0.95rem] font-medium">{service.name}</h2>
                    <p className="shrink-0 text-sm tabular-nums text-stone">{service.price}</p>
                  </div>
                  <p className="mt-1 text-sm text-stone">
                    {service.detail} {service.time[0].toUpperCase()}
                    {service.time.slice(1)}.
                  </p>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 lg:mt-auto lg:pt-8">
            <Link href="/quiz" className="text-[0.95rem] underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
              Подобрать формат
            </Link>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-stone">
              Четыре вопроса, если не ясно, что бронировать.
            </p>
            <a href={sample.phoneHref} className="mt-6 block text-[0.95rem] tabular-nums hover:text-stone">
              {sample.phone}
            </a>
            <a href={sample.emailHref} className="mt-1 block text-sm text-stone hover:text-ink">
              {sample.email}
            </a>
          </div>
        </aside>

        <div className="flex flex-col gap-14 py-8 md:gap-20 lg:py-8">
          {frames.map((frame, index) => (
            <Reveal key={frame.src} immediate={index === 0} delay={index === 0 ? 0.05 : 0}>
              <figure className={frame.width}>
                <div className={`relative overflow-hidden ${frame.aspect}`}>
                  <Image
                    src={frame.src}
                    alt={frame.alt}
                    fill
                    priority={frame.priority}
                    sizes="(min-width: 1024px) 62vw, 100vw"
                    className={`object-cover transition-transform duration-700 ease-out motion-reduce:transition-none motion-reduce:hover:scale-100 hover:scale-[1.03] ${frame.position}`}
                  />
                </div>
                <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-sm">
                  <span>{frame.caption}</span>
                  <span className="text-stone">{frame.note}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
