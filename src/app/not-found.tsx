import Link from "next/link";

export default function NotFound() {
  return (
    <main id="content" className="mx-auto flex min-h-[70svh] max-w-[72rem] flex-col justify-center px-5 py-16 md:px-8">
      <p className="text-sm text-stone">404</p>
      <h1 className="mt-4 font-display text-[clamp(3rem,8vw,5.5rem)] leading-[0.92] font-medium tracking-[-0.05em]">
        Такой страницы нет.
      </h1>
      <div className="mt-8 flex gap-8">
        <Link href="/" className="border-b border-ink pb-0.5">
          На главную
        </Link>
        <Link href="/quiz" className="border-b border-ink/40 pb-0.5 text-stone hover:text-ink">
          Формат съёмки
        </Link>
      </div>
    </main>
  );
}
