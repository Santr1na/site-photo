import Link from "next/link";

export default function NotFound() {
  return (
    <main id="content" className="mx-auto flex min-h-[70svh] max-w-5xl flex-col justify-center px-4 py-16 md:px-6">
      <p className="text-sm font-medium text-pine">404</p>
      <h1 className="mt-3 font-display text-4xl font-medium tracking-[-0.03em] md:text-5xl">
        Такой страницы нет.
      </h1>
      <p className="mt-4 max-w-md text-stone">
        Вернитесь к карточке фотографа или к короткому опросу.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-pine px-5 text-base font-medium text-white"
        >
          К карточке
        </Link>
        <Link
          href="/quiz"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-5 text-base ring-1 ring-border"
        >
          К опросу
        </Link>
      </div>
    </main>
  );
}
