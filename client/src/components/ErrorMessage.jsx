import { AlertCircle, RefreshCw } from 'lucide-react';
import Logo from './Logo';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex items-start gap-3 px-4 py-3">
      <Logo size="sm" className="mt-0.5" />
      <div className="flex-1">
        <div className="inline-flex items-start gap-2.5 px-4 py-3 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50">
          <AlertCircle
            size={16}
            className="text-red-500 mt-0.5 flex-shrink-0"
          />
          <div>
            <p className="text-sm text-red-700 dark:text-red-400">
              {message}
            </p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
              >
                <RefreshCw size={12} />
                Try again
              </button>
            )}
          </div>
        </div>
        <p className="text-2xs text-surface-400 mt-1.5 ml-1">
          {new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
}
