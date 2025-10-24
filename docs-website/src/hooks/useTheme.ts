import { useEffect, useState } from 'react';

// Persist theme as 'theme-dark' key: '1' or ''
export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem('theme-dark');
    if (stored === '1') return true;
    if (stored === '') return false;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme-dark', '1');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme-dark', '');
    }
  }, [isDark]);

  return { isDark, setIsDark };
}
