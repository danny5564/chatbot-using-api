import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Chat from './pages/Chat';
import History from './pages/History';
import Settings from './pages/Settings';
import { useChat } from './context/ChatContext';
import { Menu } from 'lucide-react';

export default function App() {
  const { currentPage } = useChat();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'history':
        return <History />;
      case 'settings':
        return <Settings />;
      default:
        return <Chat />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-surface-50 dark:bg-surface-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-surface-200 dark:border-surface-700/50">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
          >
            <Menu size={20} />
          </button>
          <span className="text-sm font-bold text-surface-900 dark:text-white">
            Chat<span className="text-brand-600">Flow</span>
          </span>
        </div>

        {renderPage()}
      </div>
    </div>
  );
}
