import { useMemo } from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy';

type TOCItem = { id: string; title: string };

export default function TOC({ items }: { items: TOCItem[] }) {
  const ids = useMemo(() => items.map((i) => i.id), [items]);
  const active = useScrollSpy(ids);

  return (
    <nav aria-label="On this page" className="text-sm">
      <div className="px-2 py-2 text-xs uppercase tracking-wide text-gray-500">On this page</div>
      <ul className="space-y-1">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              className={`block rounded-md px-2 py-1.5 border border-transparent hocus:bg-gray-100 dark:hocus:bg-gray-800 ${active === i.id ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
            >
              {i.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
