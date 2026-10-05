const items = [
  "Эксперты",
  "Основатели",
  "Партнёры практик",
  "Авторы методологий",
  "Исследователи",
  "Стратег",
  "Визионер",
  "Наставник",
  "Искатель",
];

export function Marquee() {
  return (
    <div className="overflow-hidden border-y border-ink/10 bg-cinnabar text-ink">
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex" aria-hidden={copy === 1}>
            {items.map((item, index) => (
              <li
                key={`${copy}-${item}-${index}`}
                className="flex items-center gap-6 px-4 py-3 text-[0.75rem] font-semibold tracking-[0.18em] uppercase"
              >
                <span>{item}</span>
                <span className="size-1.5 bg-ink" aria-hidden />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
