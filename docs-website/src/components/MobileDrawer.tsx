import { X } from 'lucide-react';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';

interface Props { open: boolean; onClose: () => void }

export default function MobileDrawer({ open, onClose }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div aria-hidden={!open} className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <motion.aside
        initial={{ x: -320, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -320, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 30 }}
        className="absolute left-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl p-4 overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        <button aria-label="Close" className="p-2 rounded-md border mb-4" onClick={onClose}>
          <X size={20} />
        </button>
        <Sidebar />
      </motion.aside>
    </div>
  );
}
