import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages: сайт живёт в подпапке репозитория.
// Для превью PR базовый путь подменяется через BASE_PATH (см. .github/workflows/preview.yml).
export default defineConfig({
  site: 'https://aktika-tech.github.io',
  base: process.env.BASE_PATH ?? '/admin-helper',
  // lechenie.md -> lechenie.html, чтобы старые ссылки продолжали работать
  build: { format: 'file' },
  trailingSlash: 'ignore',
  integrations: [react()],
  // Tailwind нужен только компонентам shadcn/ui (src/components/ui)
  vite: { plugins: [tailwindcss()] },
  markdown: {
    // `## Для детей {#deti}` задаёт якорь заголовка явно
    processor: satteri({ features: { headingAttributes: true } }),
  },
});
