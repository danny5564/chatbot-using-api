import Logo from './Logo';

export default function LoadingMessage() {
  return (
    <div className="flex items-start gap-3 px-4 py-3">
      <Logo size="sm" className="mt-0.5" />
      <div className="flex-1 pt-1">
        <p className="text-sm text-surface-500 dark:text-surface-400 mb-2">
          Thinking...
        </p>
        <div className="flex gap-1.5">
          <span
            className="w-2 h-2 rounded-full bg-brand-500 animate-bounce-dot"
            style={{ animationDelay: '0s' }}
          />
          <span
            className="w-2 h-2 rounded-full bg-brand-500 animate-bounce-dot"
            style={{ animationDelay: '0.2s' }}
          />
          <span
            className="w-2 h-2 rounded-full bg-brand-500 animate-bounce-dot"
            style={{ animationDelay: '0.4s' }}
          />
        </div>
      </div>
    </div>
  );
}
