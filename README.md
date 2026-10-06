# Мария Орлова

Сайт частного фотографа в Казани: имя, услуги с ценами, контакт и короткий подбор формата съёмки. Интерфейс на русском. Ответы опроса считаются в браузере.

Стек: Next.js, TypeScript, Tailwind, shadcn/ui, Framer Motion.

## Локальный запуск

```bash
npm install
npm run dev
```

Сервер слушает `0.0.0.0:43123`. Откройте [http://127.0.0.1:43123](http://127.0.0.1:43123).

- `/` — страница фотографа
- `/quiz` — подбор формата

## Скрипты

- `npm run dev` — разработка
- `npm run build` — сборка
- `npm run start` — продакшен на порту 43123
- `npm run lint` — ESLint

Секреты и внешние сервисы не нужны.

## GitHub Pages

Сборка статическая: `npm run build` пишет сайт в `out/`.

В репозитории GitHub в Settings → Pages выберите источник **GitHub Actions**. Workflow `.github/workflows/pages.yml` публикует сайт при пуше в `main` или `cursor/norda-studio-site-e0a6`. Адрес будет `https://<user>.github.io/<repo>/`.
