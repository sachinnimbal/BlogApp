import { useEffect, useMemo, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import toc from '../data/toc.json';

interface Props { compact?: boolean }

export default function SearchBox({ compact }: Props) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Simple client-side search across toc titles
  const results = useMemo(() => {
    if (!query) return [] as Array<{ title: string; href: string }>; 
    const q = query.toLowerCase();
    return toc.flatMap((g) => g.items)
      .filter((i) => i.title.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query]);

  // Cmd/Ctrl+K shortcut to focus
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isK = e.key.toLowerCase() === 'k';
      if ((e.metaKey || e.ctrlKey) && isK) {
        e.preventDefault();
        setOpen(true);
        setTimeout(() => inputRef.current?.focus(), 0);
      }
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => { setOpen(false); setQuery(''); }, [location.pathname]);

  if (compact) {
    return (
      <button
        className="w-full flex items-center gap-2 rounded-md border border-gray-200 dark:border-gray-800 px-3 py-2 text-sm text-left text-gray-500"
        onClick={() => setOpen(true)}
        aria-label="Open search"
      >
        <Search size={16} />
        <span className="flex-1">Search docs...</span>
        <kbd className="text-xs">⌘K</kbd>
      </button>
    );
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-2 rounded-md border border-gray-200 dark:border-gray-800 px-3 py-2 text-sm bg-white/70 dark:bg-gray-900/70">
        <Search size={16} className="text-gray-500" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search docs... (⌘K)"
          className="flex-1 bg-transparent outline-none"
          aria-label="Search docs"
          onFocus={() => setOpen(true)}
        />
      </div>
      {open && results.length > 0 && (
        <ul className="absolute mt-2 w-full z-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md shadow-xl overflow-hidden">
          {results.map((r) => (
            <li key={r.href}>
              <button
                className="block w-full text-left px-3 py-2 text-sm hocus:bg-gray-100 dark:hocus:bg-gray-800"
                onClick={() => navigate(r.href)}
              >
                {r.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
