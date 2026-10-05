import { Reveal } from "@/components/reveal";

const voices = [
  {
    quote:
      "Я два года расширяла список услуг — казалось, так понятнее. Стало только тише. В NORDA мы убрали лишнее, и меня начали приводить те, с кем я действительно хочу работать.",
    name: "Ася Корнеева",
    role: "методолог корпоративного обучения",
  },
  {
    quote:
      "Мне не сочинили биографию. Мне вернули границу: с кем я работаю и чего не берусь делать. Переговоры стали короче примерно на треть — люди приходят уже согласные с рамкой.",
    name: "Лев Игнатьев",
    role: "основатель индустриального бюро",
  },
  {
    quote:
      "Самое ценное оказалось не текстом на сайте, а фразой, с которой я открываю встречу. Дальше разговор идёт о деле, а не о том, кто я такая.",
    name: "Нина Вереск",
    role: "партнёр юридической практики",
  },
];

export function Voices() {
  return (
    <section id="voices" className="scroll-mt-24 bg-ink text-ivory">
      <div className="mx-auto max-w-[92rem] px-5 pt-24 md:px-10 md:pt-36">
        <Reveal>
          <p className="text-[0.72rem] font-medium tracking-[0.22em] uppercase text-cinnabar">
            06 — После работы
          </p>
          <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.95] font-medium tracking-[-0.03em]">
            Фраза, которую уносят с собой.
          </h2>
        </Reveal>
      </div>
      <div className="mx-auto max-w-[92rem] px-5 md:px-10">
        {voices.map((voice) => (
          <Reveal key={voice.name}>
            <figure className="border-t border-ivory/15 py-12 md:py-20">
              <blockquote className="max-w-5xl font-display text-[clamp(1.7rem,3.6vw,3.15rem)] leading-[1.12] font-medium tracking-[-0.02em]">
                «{voice.quote}»
              </blockquote>
              <figcaption className="mt-8 text-sm text-ivory/60">
                <span className="text-ivory">{voice.name}</span>
                <span> · {voice.role}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
