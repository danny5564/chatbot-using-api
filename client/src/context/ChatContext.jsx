import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

const ChatContext = createContext(null);

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

function deriveTitle(messages) {
  const firstUserMsg = messages.find((m) => m.role === 'user');
  if (!firstUserMsg) return 'New Chat';
  const text = firstUserMsg.content;
  return text.length > 60 ? text.slice(0, 60) + '...' : text;
}

export function ChatProvider({ children }) {
  const [conversations, setConversations] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('chatflow-conversations')) || [];
    } catch {
      return [];
    }
  });

  const [activeId, setActiveId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState('chat');
  const activeIdRef = useRef(null);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    localStorage.setItem('chatflow-conversations', JSON.stringify(conversations));
  }, [conversations]);

  const persistChat = useCallback((id, msgs) => {
    if (!id || msgs.length === 0) return;
    setConversations((prev) => {
      const existing = prev.find((c) => c.id === id);
      const conv = {
        id,
        title: deriveTitle(msgs),
        messages: msgs,
        messageCount: msgs.length,
        createdAt: existing?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      if (existing) {
        return prev.map((c) => (c.id === id ? conv : c));
      }
      return [conv, ...prev];
    });
  }, []);

  const addMessage = useCallback(
    (role, content) => {
      let id = activeIdRef.current;
      if (!id) {
        id = generateId();
        setActiveId(id);
        activeIdRef.current = id;
      }

      const newMsg = { role, content, timestamp: new Date().toISOString() };

      setMessages((prev) => {
        const updated = [...prev, newMsg];
        if (role === 'assistant') {
          persistChat(id, updated);
        }
        return updated;
      });

      return id;
    },
    [persistChat]
  );

  const newChat = useCallback(() => {
    if (activeIdRef.current && messages.length > 0) {
      persistChat(activeIdRef.current, messages);
    }
    setActiveId(null);
    activeIdRef.current = null;
    setMessages([]);
    setCurrentPage('chat');
  }, [messages, persistChat]);

  const loadConversation = useCallback(
    (id) => {
      if (activeIdRef.current && messages.length > 0) {
        persistChat(activeIdRef.current, messages);
      }

      setConversations((prev) => {
        const conv = prev.find((c) => c.id === id);
        if (conv) {
          setActiveId(id);
          activeIdRef.current = id;
          setMessages(conv.messages || []);
          setCurrentPage('chat');
        }
        return prev;
      });
    },
    [messages, persistChat]
  );

  const clearChat = useCallback(() => {
    if (activeIdRef.current) {
      setConversations((prev) => prev.filter((c) => c.id !== activeIdRef.current));
    }
    setActiveId(null);
    activeIdRef.current = null;
    setMessages([]);
  }, []);

  const deleteConversation = useCallback((id) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeIdRef.current === id) {
      setActiveId(null);
      activeIdRef.current = null;
      setMessages([]);
    }
  }, []);

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeId,
        messages,
        currentPage,
        setCurrentPage,
        addMessage,
        newChat,
        loadConversation,
        clearChat,
        deleteConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within ChatProvider');
  return ctx;
}
