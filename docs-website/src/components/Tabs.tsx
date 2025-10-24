import { useEffect, useRef, useState } from 'react';

interface Tab { id: string; label: string; content: React.ReactNode }

export default function Tabs({ tabs, initialId }: { tabs: Tab[]; initialId?: string }) {
  const [active, setActive] = useState(initialId ?? tabs[0]?.id);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!listRef.current) return;
      const idx = tabs.findIndex((t) => t.id === active);
      if (e.key === 'ArrowRight') setActive(tabs[(idx + 1) % tabs.length].id);
      if (e.key === 'ArrowLeft') setActive(tabs[(idx - 1 + tabs.length) % tabs.length].id);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active, tabs]);

  return (
    <div>
      <div ref={listRef} role="tablist" aria-label="Tabs" className="flex gap-2 border-b border-gray-200 dark:border-gray-800">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === t.id}
            className={`px-3 py-2 text-sm rounded-t-md border-b-2 ${active === t.id ? 'border-brand text-brand' : 'border-transparent text-gray-500'}`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="p-4 border border-t-0 rounded-b-md border-gray-200 dark:border-gray-800">
        {tabs.find((t) => t.id === active)?.content}
      </div>
    </div>
  );
}
