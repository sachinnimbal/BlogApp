import { useState } from 'react';
import { copyToClipboard } from '../utils/clipboard';

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative">
      <button
        aria-live="polite"
        className="text-xs px-2 py-1 rounded-md border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 hocus:bg-gray-100 dark:hocus:bg-gray-800"
        onClick={async () => {
          const ok = await copyToClipboard(text);
          if (ok) { setCopied(true); setTimeout(() => setCopied(false), 1200); }
        }}
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}
