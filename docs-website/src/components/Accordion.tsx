import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') setOpen(false); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-md">
      <button
        className="w-full flex items-center justify-between px-3 py-2 text-left hocus:bg-gray-50 dark:hocus:bg-gray-900"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="font-medium">{title}</span>
        <ChevronDown size={18} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-3 pb-3 text-sm text-gray-600 dark:text-gray-300">{children}</div>
      )}
    </div>
  );
}
