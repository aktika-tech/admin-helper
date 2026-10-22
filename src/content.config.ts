import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Страницы сайта: src/content/pages/<имя>.md -> <имя>.html
const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    // вводный абзац под заголовком
    description: z.string().optional(),
    nav: z
      .object({
        label: z.string().optional(),
        order: z.number().default(100),
        hidden: z.boolean().default(false),
      })
      .default({ order: 100, hidden: false }),
  }),
});

// Врачи: src/content/doctors/<id>.md, id становится якорем на странице врачей
const doctors = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/doctors' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      photo: image(),
      order: z.number(),
      // абзац со ссылкой на «ПроДокторов» в конце карточки
      prodoctorov: z.boolean().default(true),
    }),
});

export const collections = { pages, doctors };
