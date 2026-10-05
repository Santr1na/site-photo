import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-6 text-sm text-stone md:flex-row md:items-center md:justify-between md:px-6">
        <p>Образец сайта-визитки. Не настоящий фотограф и не форма заявки.</p>
        <div className="flex gap-4">
          <Link href="/" className="underline-offset-4 hover:text-ink hover:underline">
            Карточка
          </Link>
          <Link href="/quiz" className="underline-offset-4 hover:text-ink hover:underline">
            Опрос
          </Link>
        </div>
      </div>
    </footer>
  );
}
