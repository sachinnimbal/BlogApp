import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../../components/ThemeToggle';

// Minimal mount wrapper to provide documentElement for classList
function Wrapper() {
  return <ThemeToggle />;
}

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('toggles dark mode and persists to localStorage', () => {
    render(<Wrapper />);
    const btn = screen.getByRole('button', { name: /toggle theme/i });

    // initial
    expect(localStorage.getItem('theme-dark') ?? '').toBe('');
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    // click -> dark
    fireEvent.click(btn);
    expect(localStorage.getItem('theme-dark')).toBe('1');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    // click -> light
    fireEvent.click(btn);
    expect(localStorage.getItem('theme-dark')).toBe('');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
