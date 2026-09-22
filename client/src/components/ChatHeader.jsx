import { useState } from 'react';
import { ArrowLeft, Trash2 } from 'lucide-react';
import ClearChatModal from './ClearChatModal';

export default function ChatHeader({ hasMessages, onNewChat, onClear }) {
  const [showClearModal, setShowClearModal] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between px-4 py-3 border-b border-surface-200 dark:border-surface-700/50">
        <button onClick={onNewChat} className="btn-ghost gap-1.5">
          <ArrowLeft size={16} />
          <span>New Chat</span>
        </button>

        {hasMessages && (
          <button
            onClick={() => setShowClearModal(true)}
            className="btn-ghost gap-1.5 text-surface-400 hover:text-red-500 dark:hover:text-red-400"
          >
            <Trash2 size={14} />
            <span>Clear Chat</span>
          </button>
        )}
      </div>

      <ClearChatModal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        onConfirm={() => {
          onClear();
          setShowClearModal(false);
        }}
      />
    </>
  );
}
