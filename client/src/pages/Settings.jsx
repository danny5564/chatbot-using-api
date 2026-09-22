import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [enterToSend, setEnterToSend] = useState(() => {
    return localStorage.getItem('chatflow-enter-to-send') !== 'false';
  });

  const handleEnterToSend = (val) => {
    setEnterToSend(val);
    localStorage.setItem('chatflow-enter-to-send', String(val));
  };

  const themes = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'system', label: 'System', icon: Monitor },
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-lg mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-8">
          Settings
        </h1>

        <section className="mb-8">
          <h2 className="text-sm font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider mb-4">
            Appearance
          </h2>
          <div className="flex gap-2">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  theme === t.id
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700'
                }`}
              >
                <t.icon size={16} />
                {t.label}
              </button>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider mb-4">
            Chat
          </h2>
          <div className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
            <div>
              <p className="text-sm font-medium text-surface-800 dark:text-surface-200">
                Enter to send
              </p>
              <p className="text-xs text-surface-500 mt-0.5">
                Press Enter to send messages, Shift+Enter for new line
              </p>
            </div>
            <button
              onClick={() => handleEnterToSend(!enterToSend)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                enterToSend
                  ? 'bg-brand-600'
                  : 'bg-surface-300 dark:bg-surface-600'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                  enterToSend ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider mb-4">
            About
          </h2>
          <div className="p-4 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
            <p className="text-sm font-medium text-surface-800 dark:text-surface-200">
              ChatFlow
            </p>
            <p className="text-xs text-surface-500 mt-1">Version 1.0.0</p>
            <p className="text-xs text-surface-400 mt-2">
              Powered by GPT-6 Astra through KIE.ai
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
