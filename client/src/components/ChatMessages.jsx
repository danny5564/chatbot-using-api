import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import LoadingMessage from './LoadingMessage';
import ErrorMessage from './ErrorMessage';

export default function ChatMessages({ messages, isLoading, error, onRetry }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto py-4">
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}
        {isLoading && <LoadingMessage />}
        {error && <ErrorMessage message={error} onRetry={onRetry} />}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
