# Стоматологическая клиника

Статический сайт стоматологической клиники, размещённый на [GitHub Pages](https://aktika-tech.github.io/admin-helper/).

## Живая версия

[https://aktika-tech.github.io/admin-helper/](https://aktika-tech.github.io/admin-helper/)

## Структура

Сайт собран на [Astro](https://astro.build) и полностью статический; интерактивные части пишутся на React.

- `src/pages/*.astro` — страницы; имя файла становится адресом (`anestezia.astro` → `anestezia.html`)
- `src/layouts/Layout.astro` — общий каркас страницы: `<head>`, меню, подвал
- `src/components/Nav.tsx` — меню (React-остров, подсвечивает текущий раздел, в т. ч. `#otbelivanie`)
- `src/components/DoctorCard.astro` — карточка врача
- `src/lib/nav.ts` — пункты меню
- `src/lib/url.ts` — `withBase()`: ссылки с учётом подпапки на GitHub Pages
- `src/styles/global.css` — стили
- `public/` — файлы, которые копируются как есть (`images/`, `.nojekyll`)

Картинки кладите в `public/images/`; в разметке ссылайтесь через `withBase('images/имя.jpg')`, в CSS — `url('/images/имя.jpg')`.

## Локальный запуск

Нужен Node.js 22.23+ (в CI используется Node 24).

```bash
npm install
npm run dev      # http://localhost:4321/admin-helper/
npm run build    # сборка в dist/
npm run preview  # просмотр собранного сайта
```

## Публикация

Сайт собирается и публикуется GitHub Actions в ветку `gh-pages`:

- пуш в `main` собирает сайт и выкладывает `dist/` в корень (`.github/workflows/deploy.yml`);
- каждый пул-реквест получает превью по адресу `/pr-preview/pr-N/`, ссылка появляется комментарием в PR (`.github/workflows/preview.yml`). Для превью базовый путь задаётся переменной `BASE_PATH`.

В настройках Pages источником должна быть ветка `gh-pages`. Файл `public/.nojekyll` нужен, чтобы GitHub не прятал папку `_astro/`.
