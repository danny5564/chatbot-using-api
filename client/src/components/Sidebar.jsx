import { Home, Clock, Settings, X, Sun, Moon, User } from 'lucide-react';
import Logo from './Logo';
import { useChat } from '../context/ChatContext';
import { useTheme } from '../context/ThemeContext';

export default function Sidebar({ isOpen, onClose }) {
  const { currentPage, setCurrentPage, newChat } = useChat();
  const { theme, setTheme } = useTheme();

  const navItems = [
    { id: 'chat', label: 'Home', icon: Home },
    { id: 'history', label: 'Chat History', icon: Clock },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNav = (id) => {
    if (id === 'chat') {
      newChat();
    } else {
      setCurrentPage(id);
    }
    onClose();
  };

  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-[260px] bg-brand-950 text-white flex flex-col transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <span className="text-lg font-bold tracking-tight">
              Chat<span className="text-brand-300">Flow</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-1">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-white/15 text-white'
                    : 'text-white/60 hover:bg-white/10 hover:text-white/90'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="px-5 py-3">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/10">
            <button
              onClick={() => setTheme('light')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium transition-all ${
                !isDark
                  ? 'bg-white text-brand-950 shadow-sm'
                  : 'text-white/60 hover:text-white/80'
              }`}
            >
              <Sun size={14} />
              Light
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium transition-all ${
                isDark
                  ? 'bg-white text-brand-950 shadow-sm'
                  : 'text-white/60 hover:text-white/80'
              }`}
            >
              <Moon size={14} />
              Dark
            </button>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-700 flex items-center justify-center">
              <User size={16} />
            </div>
            <div>
              <p className="text-sm font-medium">Guest User</p>
              <p className="text-xs text-white/50">Start chatting</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
