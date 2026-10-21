# Стоматологическая клиника

Статический сайт стоматологической клиники, размещённый на [GitHub Pages](https://aktika-tech.github.io/admin-helper/).

## Живая версия

[https://aktika-tech.github.io/admin-helper/](https://aktika-tech.github.io/admin-helper/)

## Разделы сайта

- [Главная](index.html)
- [Врачи](prezentaciavrachi.html)
- [Анестезия и седация](anestezia.html)
- [Лечение во сне](narkoz.html)
- [Ортодонтия](breketi.html)
- [Имплантация](implantasia.html)
- [Протезирование](protezirovanie.html)
- [Снимки](ssnimki.html)

## Структура

- `index.html` — главная страница (точка входа сайта)
- `*.html` — страницы разделов
- `style.css` — стили
- `common.js` — меню и подвал, подставляемые на каждой странице
- `.nojekyll` — отключает Jekyll, чтобы статические файлы публиковались как есть

## Локальный запуск

```bash
python3 -m http.server
```

Затем откройте <http://localhost:8000/>.

## Публикация

Сайт публикуется автоматически через GitHub Actions в ветку `gh-pages`:

- пуш в `main` обновляет основной сайт (`.github/workflows/deploy.yml`);
- каждый пул-реквест получает превью по адресу `/pr-preview/pr-N/`, ссылка появляется комментарием в PR (`.github/workflows/preview.yml`).

В настройках Pages источником должна быть ветка `gh-pages`. Файл `.nojekyll` гарантирует, что файлы отдаются без обработки Jekyll.
