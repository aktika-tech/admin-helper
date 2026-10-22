// Проверяет, что в Markdown-контенте нет собственной разметки и стилей:
// оформление задаётся только глобальным стилем (src/styles/global.css).
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = 'src/content';
const rules = [
  [/\bclass\s*=/i, 'атрибут class'],
  [/\bstyle\s*=/i, 'атрибут style'],
  [/<(div|section|span|br|font|center)\b/i, 'HTML-разметка'],
  // у заголовков разрешён только якорь {#id}, без {.class} и прочих атрибутов
  [/^#{1,6} .*\{(?![ ]*#[\w-]+[ ]*\}\s*$)[^}]*\}\s*$/, 'атрибуты заголовка кроме {#id}'],
];

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (entry.name.endsWith('.md')) yield path;
  }
}

let errors = 0;
for (const file of walk(root)) {
  // комментарии <!-- --> не попадают на страницу, их не проверяем (переводы строк сохраняем для номеров)
  const text = readFileSync(file, 'utf8').replace(/<!--[\s\S]*?-->/g, (c) => c.replace(/[^\n]/g, ''));
  text.split('\n').forEach((line, i) => {
    for (const [re, what] of rules) {
      if (re.test(line)) {
        console.error(`${file}:${i + 1}: ${what}: ${line.trim()}`);
        errors++;
      }
    }
  });
}

if (errors) {
  console.error(`\nНайдено нарушений: ${errors}. Используйте только Markdown, без классов, стилей и HTML-обёрток.`);
  process.exit(1);
}
console.log('Контент в порядке: только Markdown.');
