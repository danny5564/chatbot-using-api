import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

export default function ChatInput({ onSend, isLoading }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 160) + 'px';
    }
  }, [value]);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    const enterToSend = localStorage.getItem('chatflow-enter-to-send') !== 'false';
    if (e.key === 'Enter' && !e.shiftKey && enterToSend) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isEmpty = !value.trim();

  return (
    <div className="px-4 pb-4 pt-2">
      <div className="relative max-w-3xl mx-auto">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          rows={1}
          disabled={isLoading}
          className="w-full resize-none rounded-2xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 pl-5 pr-14 py-3.5 text-sm text-surface-900 dark:text-surface-100 placeholder:text-surface-400 dark:placeholder:text-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 dark:focus:border-brand-500 transition-all disabled:opacity-50"
        />
        <button
          onClick={handleSubmit}
          disabled={isEmpty || isLoading}
          className="absolute right-2.5 bottom-2.5 w-9 h-9 rounded-xl bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-30 disabled:hover:bg-brand-600 transition-all duration-150 flex items-center justify-center"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
