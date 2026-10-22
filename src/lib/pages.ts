import { getCollection, type CollectionEntry } from 'astro:content';

export type Page = CollectionEntry<'pages'>;

// id файла -> адрес: index.md -> '', lechenie.md -> 'lechenie.html'
export function pageHref(id: string): string {
  return id === 'index' ? '' : `${id}.html`;
}

// Страницы в порядке меню (nav.order, затем заголовок)
export async function getNavPages(): Promise<Page[]> {
  const pages = await getCollection('pages', ({ data }) => !data.nav.hidden);
  return pages.sort((a, b) => a.data.nav.order - b.data.nav.order || a.data.title.localeCompare(b.data.title, 'ru'));
}
