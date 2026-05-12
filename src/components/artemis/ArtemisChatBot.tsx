'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowUp,
  Maximize2,
  Sparkles,
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

type ChatState = 'pill' | 'compact' | 'expanded' | 'side-panel';

const SUGGESTED_QUESTIONS = [
  'What programs of study does Artemis offer?',
  'How do I apply to Artemis College?',
];

export default function ArtemisChatBot() {
  const [chatState, setChatState] = useState<ChatState>('pill');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (chatState === 'compact' || chatState === 'expanded' || chatState === 'side-panel') {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [chatState]);

  const closeToPill = () => setChatState('pill');

  const sendMessage = async (text?: string) => {
    const trimmed = (text || input).trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: 'user', content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    // If in compact, auto-advance to expanded
    if (chatState === 'compact') {
      setChatState('expanded');
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      const assistantMessage: Message = { role: 'assistant', content: data.message };
      setMessages((prev) => [...prev, assistantMessage]);
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

  // ─── Shared: Question Button ───
  const QuestionBtn = ({ text, onClick }: { text: string; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-[13px] text-gray-800 hover:bg-gray-50 transition-colors text-left"
    >
      <span>{text}</span>
      <ArrowUp className="h-3 w-3 text-gray-400 shrink-0 ml-2 rotate-45" />
    </button>
  );

  // ─── Shared: Input Bar ───
  const InputBar = () => (
    <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5">
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
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Send"
      >
        <ArrowUp className="h-3 w-3" />
      </button>
    </div>
  );

  // ─── Full Chat Content (shared by expanded + side panel) ───
  const fullChatContent = (
    <div className="flex flex-col h-full bg-[#f7f7f7]">
      {/* Top bar: arrow to switch mode + X to close */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-gray-100">
        <button
          onClick={() => {
            if (chatState === 'expanded') setChatState('side-panel');
            else if (chatState === 'side-panel') setChatState('expanded');
          }}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
          title={chatState === 'expanded' ? 'Switch to side panel' : 'Switch to expanded view'}
        >
          <Maximize2 className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={closeToPill}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4" style={{ scrollbarWidth: 'thin' }}>
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <Sparkles className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 mb-6">Ask me anything about Artemis College</p>
            <div className="w-full space-y-2">
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
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="text-gray-400 text-[13px]">Generating...</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-100 px-4 py-3">
        <InputBar />
        <p className="text-[10px] text-gray-400 text-center mt-2">
          AI-generated replies &middot; Powered by Artemis AI
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* ─── PILL — "Ask a question" (default state) ─── */}
      <AnimatePresence>
        {chatState === 'pill' && (
          <motion.div
            key="pill"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40"
          >
            <button
              onClick={() => setChatState('compact')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 bg-white text-[13px] text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm"
            >
              <ArrowUp className="h-3 w-3" />
              <span>Ask a question</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── COMPACT — Centered rectangle with questions + input ─── */}
      <AnimatePresence>
        {chatState === 'compact' && (
          <motion.div
            key="compact"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-[500px]"
          >
            <div className="bg-[#f0f0f0] rounded-xl p-3 shadow-lg space-y-2">
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <QuestionBtn key={i} text={q} onClick={() => sendMessage(q)} />
              ))}
              <InputBar />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── EXPANDED — Centered modal chat ─── */}
      <AnimatePresence>
        {chatState === 'expanded' && (
          <>
            <motion.div
              key="expanded-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/20"
              onClick={closeToPill}
            />
            <motion.div
              key="expanded"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-[580px] h-[80vh] bg-white shadow-2xl rounded-2xl overflow-hidden"
            >
              {fullChatContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─── SIDE PANEL — Full height right side, no X ─── */}
      <AnimatePresence>
        {chatState === 'side-panel' && (
          <motion.div
            key="side-panel"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-0 right-0 h-full w-[28vw] min-w-[360px] max-w-[460px] z-50 bg-white shadow-2xl overflow-hidden"
          >
            {fullChatContent}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
