'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowUp,
  ChevronDown,
  Maximize2,
  PanelRightOpen,
  Sparkles,
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

type ViewMode = 'expanded' | 'side-panel';
type ChatState = 'compact' | 'ask-btn' | 'chat';

const SUGGESTED_QUESTIONS = [
  'What programs of study does Artemis offer?',
  'How do I apply to Artemis College?',
];

export default function ArtemisChatBot() {
  const [chatState, setChatState] = useState<ChatState>('compact');
  const [viewMode, setViewMode] = useState<ViewMode>('expanded');
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (chatState === 'chat') {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [chatState]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowModeDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const closeChat = () => {
    // If user has chatted before, show "Ask a question" pill; otherwise show compact widget
    setChatState(messages.length > 0 ? 'ask-btn' : 'compact');
    setShowModeDropdown(false);
  };

  const switchMode = (mode: ViewMode) => {
    setViewMode(mode);
    setShowModeDropdown(false);
  };

  const sendMessage = async (text?: string, fromCompact?: boolean) => {
    const trimmed = (text || input).trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: 'user', content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    // Auto-advance from compact to full chat
    if (fromCompact || chatState === 'compact') {
      setChatState('chat');
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
        {
          role: 'assistant',
          content: "I'm sorry, I encountered an error. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, fromCompact?: boolean) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(undefined, fromCompact);
    }
  };

  const modeLabel = viewMode === 'expanded' ? 'Expanded View' : 'Side Panel';

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
  const InputBar = ({ refArg, fromCompact }: { refArg?: React.RefObject<HTMLInputElement | null>; fromCompact?: boolean }) => (
    <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5">
      <Sparkles className="h-3.5 w-3.5 text-gray-400 shrink-0" />
      <input
        ref={refArg || inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, fromCompact)}
        placeholder="Ask anything about Artemis"
        disabled={isLoading}
        className="flex-1 bg-transparent text-[13px] text-gray-800 placeholder-gray-400 outline-none disabled:opacity-50"
      />
      <button
        onClick={() => sendMessage(undefined, fromCompact)}
        disabled={!input.trim() || isLoading}
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gray-100 text-gray-500 transition-all hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Send message"
      >
        <ArrowUp className="h-3 w-3" />
      </button>
    </div>
  );

  // ─── Chat Content (expanded + side panel) ───
  const chatContent = (
    <div className="flex flex-col h-full bg-[#f7f7f7]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-gray-100">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowModeDropdown(!showModeDropdown)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-gray-200 bg-white text-[12px] font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <span>{modeLabel}</span>
            <ChevronDown className="h-3 w-3" />
          </button>

          <AnimatePresence>
            {showModeDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.12 }}
                className="absolute top-full left-0 mt-1 w-40 bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden z-50"
              >
                <button
                  onClick={() => switchMode('expanded')}
                  className={`flex items-center gap-2 w-full px-3 py-2 text-[12px] text-left hover:bg-gray-50 transition-colors ${
                    viewMode === 'expanded' ? 'bg-gray-50 text-gray-900 font-medium' : 'text-gray-600'
                  }`}
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  Expanded View
                </button>
                <button
                  onClick={() => switchMode('side-panel')}
                  className={`flex items-center gap-2 w-full px-3 py-2 text-[12px] text-left hover:bg-gray-50 transition-colors ${
                    viewMode === 'side-panel' ? 'bg-gray-50 text-gray-900 font-medium' : 'text-gray-600'
                  }`}
                >
                  <PanelRightOpen className="h-3.5 w-3.5" />
                  Side Panel
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={closeChat}
          className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
          aria-label="Close chat"
        >
          <X className="h-3 w-3" />
        </button>
      </div>

      {/* Messages area */}
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
          <div className="flex justify-start text-gray-400 text-[13px]">Generating...</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
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
      {/* ─── COMPACT — Auto-shown widget at bottom center ─── */}
      <AnimatePresence>
        {chatState === 'compact' && (
          <motion.div
            key="compact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-[520px]"
          >
            <div className="bg-[#f0f0f0] rounded-xl p-3 shadow-lg space-y-2">
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <QuestionBtn key={i} text={q} onClick={() => sendMessage(q, true)} />
              ))}
              <InputBar fromCompact />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── ASK-BTN — "Ask a question" pill after close ─── */}
      <AnimatePresence>
        {chatState === 'ask-btn' && (
          <motion.div
            key="ask-btn"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40"
          >
            <button
              onClick={() => setChatState('chat')}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white text-[13px] text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm"
            >
              <ArrowUp className="h-3 w-3" />
              <span>Ask a question</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── CHAT — Expanded or Side Panel ─── */}
      <AnimatePresence>
        {chatState === 'chat' && (
          <>
            {/* Backdrop only for expanded */}
            {viewMode === 'expanded' && (
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-40 bg-black/20"
              />
            )}

            {/* Chat container */}
            <motion.div
              key={`chat-${viewMode}`}
              initial={
                viewMode === 'side-panel'
                  ? { opacity: 0, x: 60 }
                  : { opacity: 0, scale: 0.97 }
              }
              animate={
                viewMode === 'side-panel'
                  ? { opacity: 1, x: 0 }
                  : { opacity: 1, scale: 1 }
              }
              exit={
                viewMode === 'side-panel'
                  ? { opacity: 0, x: 60 }
                  : { opacity: 0, scale: 0.97 }
              }
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`fixed z-50 bg-white shadow-2xl overflow-hidden ${
                viewMode === 'side-panel'
                  ? 'top-0 right-0 h-full w-[28vw] min-w-[360px] max-w-[460px]'
                  : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[580px] h-[80vh] rounded-2xl'
              }`}
            >
              {chatContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
