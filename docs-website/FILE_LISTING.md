# Complete File Listing - Premium Documentation Website

## Configuration Files

### `package.json`
```json
{
  "name": "premium-docs-website",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.2",
    "framer-motion": "^11.5.4",
    "lucide-react": "^0.445.0",
    "prism-react-renderer": "^2.4.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.2"
  },
  "devDependencies": {
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react-swc": "^3.7.0",
    "typescript": "^5.6.2",
    "vite": "^5.4.6",
    "tailwindcss": "^3.4.12",
    "postcss": "^8.4.47",
    "autoprefixer": "^10.4.20",
    "vitest": "^2.1.1",
    "@testing-library/react": "^16.0.1",
    "@testing-library/jest-dom": "^6.5.0",
    "@testing-library/user-event": "^14.5.2",
    "jsdom": "^25.0.0"
  }
}
```

### `vite.config.ts`
### `tsconfig.json`
### `tsconfig.node.json`
### `tailwind.config.ts`
### `postcss.config.cjs`
### `.eslintrc.cjs`
### `.gitignore`

## Entry Files

### `index.html` - Main HTML file with SEO meta tags
### `src/main.tsx` - React application entry point
### `src/App.tsx` - Main application component with routing

## Styles

### `src/styles/globals.css` - Global styles, theme variables, utilities
### `src/styles/typography.css` - Fluid typography with clamp()

## Utilities

### `src/utils/cn.ts` - Class name merger utility
### `src/utils/clipboard.ts` - Clipboard operations and toast notifications
### `src/utils/highlight.ts` - Syntax highlighting utilities

## Hooks

### `src/hooks/useTheme.ts` - Theme management with localStorage
### `src/hooks/useScrollSpy.ts` - Active section detection for TOC

## Components

### Core Layout
- `src/components/Header.tsx` - Top navigation with search and theme toggle
- `src/components/Sidebar.tsx` - Desktop navigation sidebar
- `src/components/MobileDrawer.tsx` - Mobile navigation drawer
- `src/components/Footer.tsx` - Site footer with links

### UI Components
- `src/components/Badge.tsx` - Colored badge component
- `src/components/Card.tsx` - Card container component
- `src/components/Alert.tsx` - Alert/notification component
- `src/components/CopyButton.tsx` - Copy-to-clipboard button
- `src/components/ThemeToggle.tsx` - Dark/light mode toggle
- `src/components/SearchBox.tsx` - Search modal with keyboard navigation
- `src/components/Tabs.tsx` - Tabbed interface component
- `src/components/Accordion.tsx` - Collapsible accordion component
- `src/components/CodeBlock.tsx` - Syntax-highlighted code blocks
- `src/components/SyntaxHighlighter.tsx` - Lazy-loaded syntax highlighter
- `src/components/Breadcrumbs.tsx` - Breadcrumb navigation
- `src/components/Pagination.tsx` - Previous/Next page navigation
- `src/components/TOC.tsx` - Table of contents with scroll spy
- `src/components/EndpointsTable.tsx` - API endpoints table

## Pages

- `src/pages/Overview.tsx` - Homepage/overview
- `src/pages/GettingStarted.tsx` - Getting started guide
- `src/pages/Annotations.tsx` - Annotations documentation
- `src/pages/Entities.tsx` - Entities documentation
- `src/pages/RestEndpoints.tsx` - REST API documentation

## Data

- `src/data/toc.json` - Table of contents data
- `src/data/endpoints.json` - API endpoints data

## Assets

- `public/favicon.svg` - Site favicon
- `public/logo.svg` - Site logo

## Tests

- `src/test/setup.ts` - Test environment setup
- `src/components/__tests__/ThemeToggle.test.tsx` - Example test

## Documentation

- `README.md` - Project documentation
- `FILE_LISTING.md` - This file

---

## Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Lint code
npm run lint
```

## Key Features Implemented

✅ React 18 + Vite 5 + TypeScript + Tailwind CSS
✅ Dark/Light mode with localStorage persistence
✅ Fully responsive (desktop, tablet, mobile)
✅ Keyboard navigation (Cmd/Ctrl+K, Esc, Tab, arrows)
✅ Accessibility (ARIA, semantic HTML, focus rings)
✅ Framer Motion animations
✅ Lazy-loaded syntax highlighting
✅ Client-side search
✅ ScrollSpy for active sections
✅ Copy-to-clipboard functionality
✅ Premium design with fluid typography
✅ Test setup with Vitest
✅ SEO meta tags
✅ Custom SVG logo and favicon

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

All modern browsers with ES2020+ support.
