import { User } from 'lucide-react';
import Logo from './Logo';
import MarkdownRenderer from './MarkdownRenderer';

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';
  const time = message.timestamp
    ? new Date(message.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  if (isUser) {
    return (
      <div className="flex items-start gap-3 px-4 py-3 justify-end">
        <div className="flex flex-col items-end max-w-[75%] lg:max-w-[60%]">
          <div className="px-4 py-2.5 rounded-2xl rounded-tr-md bg-brand-600 text-white">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
          </div>
          {time && (
            <span className="text-2xs text-surface-400 mt-1.5 mr-1">
              {time}
            </span>
          )}
        </div>
        <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0">
          <User size={16} className="text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 px-4 py-3">
      <Logo size="sm" className="mt-0.5 flex-shrink-0" />
      <div className="flex-1 max-w-[85%] lg:max-w-[70%]">
        <div className="text-sm text-surface-800 dark:text-surface-200">
          <MarkdownRenderer content={message.content} />
        </div>
        {time && (
          <span className="text-2xs text-surface-400 mt-1.5 ml-1 block">
            {time}
          </span>
        )}
      </div>
    </div>
  );
}
