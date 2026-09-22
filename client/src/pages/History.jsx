import { useState } from 'react';
import { Search, MessageSquare, ChevronRight, Trash2 } from 'lucide-react';
import { useChat } from '../context/ChatContext';

function groupByDate(conversations) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);

  const groups = { today: [], yesterday: [], week: [], older: [] };

  for (const conv of conversations) {
    const date = new Date(conv.updatedAt || conv.createdAt);
    if (date >= today) groups.today.push(conv);
    else if (date >= yesterday) groups.yesterday.push(conv);
    else if (date >= weekAgo) groups.week.push(conv);
    else groups.older.push(conv);
  }

  return groups;
}

export default function History() {
  const { conversations, loadConversation, deleteConversation } = useChat();
  const [search, setSearch] = useState('');

  const filtered = search.trim()
    ? conversations.filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase())
      )
    : conversations;

  const groups = groupByDate(filtered);

  const renderGroup = (title, items) => {
    if (items.length === 0) return null;
    return (
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-surface-400 dark:text-surface-500 uppercase tracking-wider mb-3 px-1">
          {title}
        </h3>
        <div className="space-y-1">
          {items.map((conv) => (
            <div
              key={conv.id}
              className="group flex items-center gap-3 p-3 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 cursor-pointer transition-colors"
              onClick={() => loadConversation(conv.id)}
            >
              <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/40 flex items-center justify-center flex-shrink-0">
                <MessageSquare
                  size={18}
                  className="text-brand-600 dark:text-brand-400"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-surface-800 dark:text-surface-200 truncate">
                  {conv.title}
                </p>
                <p className="text-xs text-surface-400 dark:text-surface-500 mt-0.5">
                  {conv.messageCount} messages &middot;{' '}
                  {new Date(
                    conv.updatedAt || conv.createdAt
                  ).toLocaleDateString([], {
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteConversation(conv.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-surface-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
              >
                <Trash2 size={14} />
              </button>
              <ChevronRight
                size={16}
                className="text-surface-300 dark:text-surface-600 flex-shrink-0"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-6">
          Chat History
        </h1>

        <div className="relative mb-6">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400"
          />
          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-sm text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare
              size={40}
              className="mx-auto text-surface-300 dark:text-surface-600 mb-3"
            />
            <p className="text-sm text-surface-500">
              {search ? 'No conversations found.' : 'No chat history yet.'}
            </p>
          </div>
        ) : (
          <>
            {renderGroup('Today', groups.today)}
            {renderGroup('Yesterday', groups.yesterday)}
            {renderGroup('Previous 7 Days', groups.week)}
            {renderGroup('Older', groups.older)}
          </>
        )}
      </div>
    </div>
  );
}
