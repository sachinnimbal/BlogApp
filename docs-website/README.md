# Premium Docs Website

A premium, production-ready documentation website built with React 18, Vite 5, TypeScript, Tailwind CSS, and Framer Motion. Accessible, responsive, and fast.

## Tech
- React 18 + Vite 5
- TypeScript
- Tailwind CSS 3
- Framer Motion, Lucide icons
- prism-react-renderer (lazy-loaded theme)

## Setup
```bash
npm install
npm run dev
```

If you are on macOS Apple Silicon and see an SWC error, this project uses Babel-only Vite plugin (no SWC), so you should not hit native binding issues.

## Accessibility notes
- Keyboard navigation supported (Esc to close mobile drawer/accordion, Arrow keys for Tabs, focus-visible rings).
- Semantic landmarks: `header`, `nav`, `main`, `footer`.
- ARIA: `aria-live` for copy feedback, `aria-modal` dialog roles.

## Structure
- `src/components` — UI components
- `src/pages` — Docs pages
- `src/styles` — Tailwind + typography
- `src/data` — TOC and endpoints data

## Build
```bash
npm run build
npm run preview
```
