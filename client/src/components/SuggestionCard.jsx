export default function SuggestionCard({ icon: Icon, text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800/80 text-left hover:border-brand-300 dark:hover:border-brand-600 hover:shadow-soft transition-all duration-200 group"
    >
      <div className="p-2 rounded-lg bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 transition-colors flex-shrink-0">
        <Icon size={18} />
      </div>
      <span className="text-sm text-surface-600 dark:text-surface-300 leading-snug">
        {text}
      </span>
    </button>
  );
}
