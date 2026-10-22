import { useEffect, useState } from 'react';
import { navItems } from '../lib/nav';

interface Props {
  base: string;
  // имя файла текущей страницы: '' для главной, 'chistka.html' и т. п.
  page: string;
}

export default function Nav({ base, page }: Props) {
  // hash известен только в браузере, поэтому на сервере рендерим без него
  const [hash, setHash] = useState('');

  useEffect(() => {
    const update = () => setHash(window.location.hash);
    update();
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);

  const current = page === 'chistka.html' && hash === '#otbelivanie' ? 'chistka.html#otbelivanie' : page;

  return (
    <nav>
      {navItems.map(([href, label]) => (
        <a key={href} href={`${base}/${href}`} className={href === current ? 'active' : undefined}>
          {label}
        </a>
      ))}
    </nav>
  );
}
