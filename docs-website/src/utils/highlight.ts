import React from 'react';
import type { PrismTheme } from 'prism-react-renderer';

// Lazy theme import to keep bundle small
export async function getPrismTheme(): Promise<PrismTheme> {
  const theme = await import('prism-react-renderer/themes/vsDark');
  return theme.default;
}

export const languageLabel: Record<string, string> = {
  tsx: 'TSX',
  ts: 'TS',
  js: 'JavaScript',
  bash: 'bash',
  json: 'JSON',
  sh: 'Shell',
};
