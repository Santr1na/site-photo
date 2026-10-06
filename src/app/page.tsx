import { assetSrc } from "@/lib/asset";
import { Reveal } from "@/components/reveal";
import { WorkCarousel } from "@/components/work-carousel";
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
            src={assetSrc("/work/hero-portrait.jpg")}
            alt="Женщина в белой рубашке стоит у окна, дневной свет сбоку"
            className="h-[78vh] min-h-[28rem] lg:h-full lg:min-h-svh"
            position="object-[center_40%]"
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

      <WorkCarousel />

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
