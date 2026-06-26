'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowUp,
  PanelRightOpen,
  Sparkles,
  Trash2,
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

type ChatState = 'pill' | 'compact' | 'expanded' | 'side-panel';

const SUGGESTED_QUESTIONS = [
  'What programs of study does Artemis offer?',
  'How do I apply to Artemis College?',
  'What is the Artemis Project?',
  'Tell me about graduate programs',
  'How does financial aid work?',
  'What is the Collegium Alliance?',
];

const STORAGE_KEY = 'artemis-chat-history';

// Minimal markdown renderer for assistant messages.
// Handles three cases: **bold** -> <strong>, "- " list items -> <ul><li>,
// and line breaks -> <br>. HTML is escaped first so no raw markup can be
// injected from message content (the API is trusted, but defense in depth).
function renderMarkdown(text: string): string {
  const escapeHtml = (s: string) =>
    s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

  const applyInline = (s: string) =>
    escapeHtml(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  const lines = text.split('\n');
  const parts: string[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      parts.push(
        `<ul style="list-style:disc;padding-left:1.25rem;margin:0.25rem 0;">${listItems.join('')}</ul>`,
      );
      listItems = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trim();
    const m = line.match(/^[-*]\s+(.*)$/);
    if (m) {
      listItems.push(`<li style="margin:0.125rem 0;">${applyInline(m[1])}</li>`);
      continue;
    }
    flushList();
    if (line.length > 0) {
      parts.push(applyInline(line));
    }
  }
  flushList();

  return parts.join('<br>');
}

export default function ArtemisChatBot() {
  const [chatState, setChatState] = useState<ChatState>('pill');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [typingIndex, setTypingIndex] = useState<number | null>(null);
  const [revealedLength, setRevealedLength] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Tracks the message count at the last commit so we can detect *newly added*
  // messages (vs. ones restored from localStorage on mount).
  const prevMessageCount = useRef(0);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom, revealedLength]);

  useEffect(() => {
    if (chatState !== 'pill') {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [chatState]);

  // ─── Persistence: load saved conversation on mount ───
  // We intentionally do NOT auto-open the chat — chatState stays 'pill'.
  // Restored messages are simply waiting in state for when the user opens it.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Message[];
        if (Array.isArray(parsed)) {
          setMessages(parsed);
          // Keep prev count in sync so the typing trigger doesn't fire for
          // already-existing messages on first render after hydration.
          prevMessageCount.current = parsed.length;
        }
      }
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  // ─── Persistence: save on every message change ───
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore quota / serialization errors
    }
  }, [messages, hydrated]);

  // ─── Typing animation: trigger when a NEW assistant message arrives ───
  useEffect(() => {
    const count = messages.length;
    if (count > prevMessageCount.current) {
      const last = messages[messages.length - 1];
      // Only animate "real" responses — skip very short ones (< 50 chars).
      if (last && last.role === 'assistant' && last.content.length >= 50) {
        setTypingIndex(messages.length - 1);
        setRevealedLength(0);
      }
    }
    prevMessageCount.current = count;
  }, [messages]);

  // ─── Typing animation: reveal content gradually ───
  useEffect(() => {
    if (typingIndex === null) return;
    const fullText = messages[typingIndex]?.content ?? '';
    if (revealedLength >= fullText.length) {
      // Finished revealing — clear typing state after a brief beat.
      const t = setTimeout(() => {
        setTypingIndex(null);
        setRevealedLength(0);
      }, 100);
      return () => clearTimeout(t);
    }
    // Reveal ~4 chars per 16ms tick ≈ 250 chars/sec → 1–2s for typical replies.
    const timer = setTimeout(() => {
      setRevealedLength((prev) => Math.min(prev + 4, fullText.length));
    }, 16);
    return () => clearTimeout(timer);
  }, [typingIndex, revealedLength, messages]);

  const closeToPill = () => setChatState('pill');

  const clearConversation = () => {
    setMessages([]);
    setTypingIndex(null);
    setRevealedLength(0);
    prevMessageCount.current = 0;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const sendMessage = async (text?: string) => {
    const trimmed = (text || input).trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: 'user', content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    // Auto-advance from compact to expanded
    if (chatState === 'compact') {
      setChatState('expanded');
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) throw new Error('Failed');

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.message }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "I'm sorry, I encountered an error. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Returns the visible slice of an assistant message (during typing animation).
  const getAssistantContent = (msg: Message, index: number) => {
    if (typingIndex === index) {
      return msg.content.slice(0, revealedLength);
    }
    return msg.content;
  };

  // ─── Shared: Question Button ───
  const QuestionBtn = ({ text, onClick }: { text: string; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full px-3.5 py-2 rounded-lg bg-white text-[13px] text-gray-800 hover:bg-gray-50 transition-colors text-left"
      suppressHydrationWarning
    >
      <span>{text}</span>
      <ArrowUp className="h-3 w-3 text-gray-400 shrink-0 ml-2 rotate-45" />
    </button>
  );

  // ─── Shared: Input Bar (borderless, light bg) ───
  const InputBar = () => (
    <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2">
      <Sparkles className="h-3.5 w-3.5 text-gray-400 shrink-0" />
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything about Artemis"
        disabled={isLoading}
        className="flex-1 bg-transparent text-[13px] text-gray-800 placeholder-gray-400 outline-none disabled:opacity-50"
      />
      <button
        onClick={() => sendMessage()}
        disabled={!input.trim() || isLoading}
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-gray-400 transition-colors hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Send"
        suppressHydrationWarning
      >
        <ArrowUp className="h-3.5 w-3.5" />
      </button>
    </div>
  );

  // ─── Thinking Indicator: 3 bouncing dots ───
  const ThinkingIndicator = () => (
    <div
      className="flex items-center gap-1 px-1 py-2"
      aria-label="Assistant is thinking"
      role="status"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-gray-400"
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );

  // ─── Full Chat Content (expanded + side panel) ───
  const fullChatContent = (
    <div className="flex flex-col h-full bg-[#f7f7f7]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-white/80">
        <button
          onClick={() => {
            if (chatState === 'expanded') setChatState('side-panel');
            else if (chatState === 'side-panel') setChatState('expanded');
          }}
          className="flex h-7 w-7 items-center justify-center rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          title={chatState === 'expanded' ? 'Side panel' : 'Expanded view'}
          suppressHydrationWarning
        >
          <PanelRightOpen className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-1">
          <button
            onClick={clearConversation}
            disabled={messages.length === 0}
            className="flex h-7 w-7 items-center justify-center rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-400"
            title="Clear conversation"
            aria-label="Clear conversation"
            suppressHydrationWarning
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={closeToPill}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
            aria-label="Close"
            suppressHydrationWarning
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4" style={{ scrollbarWidth: 'thin' }}>
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-10 h-10 rounded-full bg-gray-200/60 flex items-center justify-center mb-3">
              <Sparkles className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 mb-5">Ask me anything about Artemis College</p>
            <div className="grid grid-cols-2 gap-1.5 w-full">
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <QuestionBtn key={i} text={q} onClick={() => sendMessage(q)} />
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] text-[13px] leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-[#f0f0f0] text-gray-800 rounded-2xl rounded-br-sm px-4 py-2.5'
                  : 'text-gray-800'
              }`}
            >
              {msg.role === 'user' ? (
                msg.content
              ) : (
                <div
                  className="chat-md"
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdown(getAssistantContent(msg, i)),
                  }}
                />
              )}
            </div>
          </div>
        ))}

        {isLoading && <ThinkingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3">
        <InputBar />
        <p className="text-[10px] text-gray-400 text-center mt-1.5">
          AI-generated replies &middot; Powered by Artemis AI
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* ─── PILL — "Ask a question" ─── */}
      <AnimatePresence>
        {chatState === 'pill' && (
          <motion.div
            key="pill"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 lg:bottom-5 left-1/2 -translate-x-1/2 z-40"
          >
            <button
              onClick={() => setChatState('compact')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 bg-white text-[13px] text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
              suppressHydrationWarning
            >
              <ArrowUp className="h-3 w-3" />
              <span>Ask a question</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── COMPACT — Bottom-center rectangle ─── */}
      <AnimatePresence>
        {chatState === 'compact' && (
          <motion.div
            key="compact"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-20 lg:bottom-3 left-1/2 -translate-x-1/2 z-40 w-[35%] min-w-[340px] max-w-[520px]"
          >
            <div className="bg-[#f0f0f0] rounded-xl p-2.5 shadow-lg space-y-1.5">
              {SUGGESTED_QUESTIONS.slice(0, 2).map((q, i) => (
                <QuestionBtn key={i} text={q} onClick={() => sendMessage(q)} />
              ))}
              <InputBar />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── EXPANDED — Centered modal ─── */}
      <AnimatePresence>
        {chatState === 'expanded' && (
          <>
            <motion.div
              key="expanded-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/15"
              onClick={closeToPill}
            />
            <motion.div
              key="expanded"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[50vw] min-w-[400px] max-w-[600px] h-[75vh] bg-white shadow-2xl rounded-2xl overflow-hidden"
            >
              {fullChatContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─── SIDE PANEL — Full height right edge ─── */}
      <AnimatePresence>
        {chatState === 'side-panel' && (
          <motion.div
            key="side-panel"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-0 right-0 h-full w-[25vw] min-w-[360px] max-w-[440px] z-50 bg-[#f7f7f7] shadow-2xl overflow-hidden border-l border-gray-200"
          >
            {fullChatContent}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
