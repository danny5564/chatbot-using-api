import { Trash2, X } from 'lucide-react';

export default function ClearChatModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white dark:bg-surface-800 rounded-2xl shadow-modal w-full max-w-sm p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
            <Trash2 size={20} className="text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-2">
            Clear Chat
          </h3>
          <p className="text-sm text-surface-500 dark:text-surface-400 mb-6">
            Are you sure you want to clear all messages? This action cannot be
            undone.
          </p>
          <div className="flex gap-3 w-full">
            <button onClick={onClose} className="flex-1 btn-secondary">
              Cancel
            </button>
            <button onClick={onConfirm} className="flex-1 btn-danger">
              Clear Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
