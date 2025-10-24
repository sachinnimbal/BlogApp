import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import TOC from './components/TOC';
import Breadcrumbs from './components/Breadcrumbs';
import Pagination from './components/Pagination';
import { useTheme } from './hooks/useTheme';
import toc from './data/toc.json';

// Lazy load code highlighter to keep bundle small
const CodeBlock = lazy(() => import('./components/CodeBlock'));

// Pages
import Overview from './pages/Overview';
import GettingStarted from './pages/GettingStarted';
import Annotations from './pages/Annotations';
import Entities from './pages/Entities';
import RestEndpoints from './pages/RestEndpoints';

export default function App() {
  // Apply theme class on first paint (read from localStorage or system)
  useTheme();
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen grid grid-rows-[auto,1fr,auto]">
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-[260px,1fr,280px] gap-6 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <aside className="hidden lg:block sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pr-2">
          <Sidebar />
        </aside>
        <main className="min-w-0">
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <Breadcrumbs />
            <Routes>
              <Route path="/" element={<Navigate to="/overview" replace />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/getting-started" element={<GettingStarted />} />
              <Route path="/annotations" element={<Annotations />} />
              <Route path="/entities" element={<Entities />} />
              <Route path="/rest-endpoints" element={<RestEndpoints />} />
              <Route path="*" element={<Navigate to="/overview" replace />} />
            </Routes>
            <div className="mt-10">
              <Pagination />
            </div>
            {/* Suspense boundary for any lazily imported sections */}
            <Suspense fallback={null}>
              <CodeBlock language="tsx" value={`console.log('hello')`} />
            </Suspense>
          </motion.div>
        </main>
        <aside className="hidden xl:block sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pl-2">
          <TOC items={toc} />
        </aside>
      </div>
      <Footer />
    </div>
  );
}
