import { AlertTriangle, Info } from 'lucide-react';
import { cn } from '../utils/cn';

export default function Alert({ type = 'info', title, children }: { type?: 'info' | 'warning'; title: string; children?: React.ReactNode }) {
  const isInfo = type === 'info';
  return (
    <div className={cn('rounded-md border p-4', isInfo ? 'border-blue-200 dark:border-blue-900/40 bg-blue-50/50 dark:bg-blue-900/20' : 'border-yellow-200 dark:border-yellow-900/40 bg-yellow-50/50 dark:bg-yellow-900/20')}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{isInfo ? <Info size={18} /> : <AlertTriangle size={18} />}</div>
        <div>
          <div className="font-medium mb-1">{title}</div>
          {children && <div className="text-sm text-gray-600 dark:text-gray-300">{children}</div>}
        </div>
      </div>
    </div>
  );
}
