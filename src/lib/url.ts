// Ссылка с учётом base (/admin-helper или /admin-helper/pr-preview/pr-N)
export function withBase(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}
