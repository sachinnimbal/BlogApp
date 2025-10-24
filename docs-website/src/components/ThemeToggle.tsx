import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const { isDark, setIsDark } = useTheme();
  return (
    <button
      aria-label="Toggle theme"
      className="inline-flex items-center justify-center rounded-md border border-gray-200 dark:border-gray-800 p-2 hocus:bg-gray-100 dark:hocus:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
      onClick={() => setIsDark((v) => !v)}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
