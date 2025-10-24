# Premium Documentation Website

A modern, production-ready documentation website built with **React 18**, **Vite 5**, **TypeScript**, and **Tailwind CSS**.

## ✨ Features

- 🎨 **Premium Design**: Pixel-polished UI inspired by CrudX, Vercel, and Linear
- 🌗 **Dark/Light Mode**: Seamless theme switching with localStorage persistence
- 📱 **Fully Responsive**: Desktop, tablet, and mobile optimized
- ♿ **Accessible**: WCAG compliant with keyboard navigation and ARIA labels
- ⚡ **Performance**: Lazy-loaded components and optimized bundle
- 🎭 **Animations**: Smooth transitions powered by Framer Motion
- 🔍 **Search**: Client-side search with keyboard shortcuts (Cmd/Ctrl+K)
- 📝 **Syntax Highlighting**: Beautiful code blocks with prism-react-renderer
- 🧭 **Navigation**: Sticky sidebar, table of contents, and breadcrumbs

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── MobileDrawer.tsx
│   ├── Footer.tsx
│   ├── ThemeToggle.tsx
│   ├── SearchBox.tsx
│   ├── TOC.tsx
│   ├── CodeBlock.tsx
│   ├── EndpointsTable.tsx
│   └── ...
├── pages/              # Page components
│   ├── Overview.tsx
│   ├── GettingStarted.tsx
│   ├── Annotations.tsx
│   ├── Entities.tsx
│   └── RestEndpoints.tsx
├── hooks/              # Custom React hooks
│   ├── useTheme.ts
│   └── useScrollSpy.ts
├── utils/              # Utility functions
│   ├── cn.ts
│   ├── clipboard.ts
│   └── highlight.ts
├── styles/             # Global styles
│   ├── globals.css
│   └── typography.css
├── data/               # Static data files
│   ├── toc.json
│   └── endpoints.json
└── test/               # Test utilities
    └── setup.ts
```

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.ts` to customize the color palette. The theme uses CSS variables defined in `src/styles/globals.css`.

### Content

- **Navigation**: Update `src/components/Sidebar.tsx` and `src/components/MobileDrawer.tsx`
- **Pages**: Add new pages in `src/pages/` and update routes in `src/App.tsx`
- **Data**: Modify `src/data/toc.json` and `src/data/endpoints.json`

### Typography

Fluid typography is configured in `src/styles/typography.css` using CSS `clamp()` for responsive sizing.

## ♿ Accessibility Features

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support:
  - `Cmd/Ctrl+K` - Open search
  - `Esc` - Close modals/drawers
  - `Tab` - Navigate interactive elements
  - Arrow keys - Navigate tabs and search results
- Visible focus indicators
- Screen reader friendly
- Color contrast compliance

## 🧪 Testing

The project uses Vitest and React Testing Library for testing:

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

Example test file: `src/components/__tests__/ThemeToggle.test.tsx`

## 🔧 Technologies

- **React 18** - UI library
- **Vite 5** - Build tool and dev server
- **TypeScript 5** - Type safety
- **Tailwind CSS 3** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Lucide React** - Icons
- **prism-react-renderer** - Syntax highlighting
- **Vitest** - Testing framework
- **React Testing Library** - Component testing

## 📦 Build Output

The production build is optimized with:

- Code splitting
- Tree shaking
- Minification
- Asset optimization
- Lazy loading

Build output will be in the `dist/` directory.

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

MIT License - feel free to use this project for your own documentation needs!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💡 Tips

- Use the search feature (Cmd/Ctrl+K) to quickly find documentation
- Theme preference is saved in localStorage and persists across sessions
- All code blocks have a copy button for easy copying
- The mobile menu can be closed by clicking outside or pressing Esc
- Use the table of contents on the right to jump to specific sections

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ using modern web technologies
