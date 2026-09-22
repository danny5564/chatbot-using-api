import { useState, useCallback } from 'react';
import ChatHeader from '../components/ChatHeader';
import WelcomeScreen from '../components/WelcomeScreen';
import ChatMessages from '../components/ChatMessages';
import ChatInput from '../components/ChatInput';
import { useChat } from '../context/ChatContext';
import { sendMessage } from '../utils/api';

export default function Chat() {
  const { messages, addMessage, newChat, clearChat } = useChat();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSend = useCallback(
    async (text) => {
      setError(null);
      addMessage('user', text);
      setIsLoading(true);

      const history = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      try {
        const reply = await sendMessage(text, history);
        addMessage('assistant', reply);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, addMessage]
  );

  const handleRetry = useCallback(async () => {
    const lastUser = [...messages].reverse().find((m) => m.role === 'user');
    if (!lastUser) return;

    setError(null);
    setIsLoading(true);

    const lastUserIndex = messages.length - 1 - [...messages].reverse().findIndex((m) => m.role === 'user');
    const history = messages.slice(0, lastUserIndex).map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const reply = await sendMessage(lastUser.content, history);
      addMessage('assistant', reply);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [messages, addMessage]);

  const handleClear = useCallback(() => {
    clearChat();
    setError(null);
    setIsLoading(false);
  }, [clearChat]);

  const hasMessages = messages.length > 0;

  return (
    <div className="flex-1 flex flex-col h-full">
      {hasMessages && (
        <ChatHeader
          hasMessages={hasMessages}
          onNewChat={newChat}
          onClear={handleClear}
        />
      )}

      {!hasMessages && !isLoading ? (
        <WelcomeScreen onSend={handleSend} />
      ) : (
        <ChatMessages
          messages={messages}
          isLoading={isLoading}
          error={error}
          onRetry={handleRetry}
        />
      )}

      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </div>
  );
}
