import Link from "next/link";

const links = [
  { href: "/#about", label: "О бюро" },
  { href: "/#services", label: "Услуги" },
  { href: "/#cases", label: "Кейсы" },
  { href: "/#method", label: "Метод" },
  { href: "/quiz", label: "Диагностика" },
];

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ivory">
      <div className="mx-auto grid max-w-[92rem] gap-12 px-5 py-16 md:grid-cols-12 md:px-10 md:py-20">
        <div className="md:col-span-5">
          <p className="text-[0.92rem] font-semibold tracking-[0.28em]">NORDA</p>
          <p className="mt-4 max-w-sm font-display text-3xl leading-[1.05] font-medium md:text-4xl">
            Бюро личного позиционирования.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="text-[0.72rem] tracking-[0.18em] uppercase text-ivory/45">
            Навигация
          </p>
          <ul className="mt-4 space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-ivory/80 transition-colors hover:text-cinnabar"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="text-[0.72rem] tracking-[0.18em] uppercase text-ivory/45">
            Письмо
          </p>
          <a
            href="mailto:hello@norda.studio"
            className="mt-4 inline-block font-display text-3xl font-medium italic transition-colors hover:text-cinnabar"
          >
            hello@norda.studio
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/60">
            Москва. Работаем с теми, у кого уже есть ремесло и не хватает линии.
          </p>
        </div>
      </div>
      <div className="mx-auto flex max-w-[92rem] flex-col gap-2 border-t border-ivory/10 px-5 py-5 text-[0.72rem] tracking-[0.08em] text-ivory/45 md:flex-row md:items-center md:justify-between md:px-10">
        <p>© 2026 NORDA</p>
        <p>Позиция — единственный продукт бюро.</p>
      </div>
    </footer>
  );
}
