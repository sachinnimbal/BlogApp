import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import SearchBox from './SearchBox';
import MobileDrawer from './MobileDrawer';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.svg';

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200/60 dark:border-gray-800/60 header-glass">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-3">
        <button
          className="lg:hidden p-2 rounded-md border border-gray-200 dark:border-gray-800"
          aria-label="Open navigation"
          onClick={() => setOpen(true)}
        >
          <Menu size={20} />
        </button>
        <Link to="/overview" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="Logo" className="h-6 w-6" />
          <div className="leading-tight">
            <div className="font-semibold">Premium Docs</div>
            <div className="text-xs text-gray-500">Fast, beautiful, accessible</div>
          </div>
        </Link>
        <div className="hidden md:block flex-1 max-w-xl mx-auto">
          <SearchBox />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#get-started"
            className="hidden sm:inline-flex items-center rounded-md border border-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-3 py-1.5 text-white text-sm font-medium shadow-soft hocus:opacity-90"
          >
            Get Started
          </a>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <MobileDrawer open={open} onClose={() => setOpen(false)} />
        )}
      </AnimatePresence>
      <div className="md:hidden px-4 pb-3">
        <SearchBox compact />
      </div>
    </header>
  );
}
