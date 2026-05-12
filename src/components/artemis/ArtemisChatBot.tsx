'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  ChevronDown,
  Maximize2,
  PanelRightOpen,
  Minimize2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

type ViewMode = 'compact' | 'expanded' | 'side-panel';
type ChatState = 'closed' | 'compact' | 'chat';

const SUGGESTED_QUESTIONS = [
  'What programs of study does Artemis offer?',
  'How do I apply to Artemis College?',
  'Tell me about the Collegium Alliance',
];

export default function ArtemisChatBot() {
  const [chatState, setChatState] = useState<ChatState>('closed');
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

  const openCompact = () => setChatState('compact');
  const openChat = () => setChatState('chat');
  const closeAll = () => {
    setChatState('closed');
    setShowModeDropdown(false);
  };

  const switchMode = (mode: ViewMode) => {
    setViewMode(mode);
    setShowModeDropdown(false);
    if (chatState === 'compact' && mode !== 'compact') {
      setChatState('chat');
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

    // Auto-advance to full chat if in compact
    if (chatState === 'compact') {
      setChatState('chat');
      if (viewMode === 'compact') setViewMode('expanded');
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const modeLabel = viewMode === 'expanded' ? 'Expanded View' : viewMode === 'side-panel' ? 'Side Panel' : 'Compact';

  // ─── Chat content (shared across expanded + side panel) ───
  const chatContent = (
    <div className="flex flex-col h-full bg-white">
      {/* Top bar: mode toggle + close */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowModeDropdown(!showModeDropdown)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <span>{modeLabel}</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </button>

          <AnimatePresence>
            {showModeDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden z-50"
              >
                <button
                  onClick={() => switchMode('expanded')}
                  className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors ${
                    viewMode === 'expanded' ? 'bg-gray-50 text-[#8A0000] font-medium' : 'text-gray-700'
                  }`}
                >
                  <Maximize2 className="h-4 w-4" />
                  Expanded View
                </button>
                <button
                  onClick={() => switchMode('side-panel')}
                  className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors ${
                    viewMode === 'side-panel' ? 'bg-gray-50 text-[#8A0000] font-medium' : 'text-gray-700'
                  }`}
                >
                  <PanelRightOpen className="h-4 w-4" />
                  Side Panel
                </button>
                <button
                  onClick={() => switchMode('compact')}
                  className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors ${
                    viewMode === 'compact' ? 'bg-gray-50 text-[#8A0000] font-medium' : 'text-gray-700'
                  }`}
                >
                  <Minimize2 className="h-4 w-4" />
                  Compact
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={closeAll}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
          aria-label="Close chat"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4" style={{ scrollbarWidth: 'thin' }}>
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-10 h-10 rounded-full bg-[#8A0000]/10 flex items-center justify-center mb-3">
              <Sparkles className="h-5 w-5 text-[#8A0000]" />
            </div>
            <p className="text-sm text-gray-500 mb-6">Ask me anything about Artemis College</p>

            {/* Suggested questions */}
            <div className="w-full space-y-2">
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors text-left group"
                >
                  <span>{q}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-gray-400 group-hover:text-[#8A0000] transition-colors shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-[#8A0000] text-white rounded-br-md'
                  : 'bg-gray-100 text-gray-800 rounded-bl-md'
              }`}
            >
              {msg.content}
            </div>
          </motion.div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-gray-100 px-4 py-3">
        <div className="flex items-center gap-2 bg-gray-50 rounded-xl border border-gray-200 px-3 py-2 focus-within:border-[#8A0000]/30 focus-within:ring-1 focus-within:ring-[#8A0000]/10 transition-all">
          <Sparkles className="h-4 w-4 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about Artemis..."
            disabled={isLoading}
            className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none disabled:opacity-50"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || isLoading}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#8A0000' }}
            aria-label="Send message"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
        <p className="text-[10px] text-gray-400 text-center mt-2">
          AI-generated replies &middot; Powered by Artemis AI
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* ─── State: CLOSED — "Ask a question" button centered ─── */}
      <AnimatePresence>
        {chatState === 'closed' && (
          <motion.div
            key="ask-btn"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex items-end justify-center pb-8 pointer-events-none"
          >
            <button
              onClick={openCompact}
              className="pointer-events-auto flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 bg-white text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-800 transition-all shadow-sm"
            >
              <Sparkles className="h-4 w-4" />
              <span>Ask a question</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── State: COMPACT — Small centered chat ─── */}
      <AnimatePresence>
        {chatState === 'compact' && (
          <motion.div
            key="compact"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-40 flex items-end justify-center pb-8"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/5" onClick={closeAll} />

            <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Compact content: suggested questions + input */}
              <div className="p-5">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#8A0000]/10 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-[#8A0000]" />
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {SUGGESTED_QUESTIONS.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(q)}
                      className="flex items-center justify-between w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors text-left group"
                    >
                      <span>{q}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-gray-400 group-hover:text-[#8A0000] transition-colors shrink-0 ml-2" />
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 bg-gray-50 rounded-xl border border-gray-200 px-3 py-2 focus-within:border-[#8A0000]/30 focus-within:ring-1 focus-within:ring-[#8A0000]/10 transition-all">
                  <Sparkles className="h-4 w-4 text-gray-400 shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything about Artemis..."
                    disabled={isLoading}
                    className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none disabled:opacity-50"
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || isLoading}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#8A0000' }}
                    aria-label="Send message"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── State: CHAT — Expanded or Side Panel ─── */}
      <AnimatePresence>
        {chatState === 'chat' && (
          <>
            {/* Backdrop */}
            <motion.div
              key="chat-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`fixed inset-0 z-40 bg-black/20 ${
                viewMode === 'side-panel' ? 'cursor-pointer' : ''
              }`}
              onClick={viewMode === 'side-panel' ? closeAll : undefined}
            />

            {/* Chat container */}
            <motion.div
              key={`chat-${viewMode}`}
              initial={
                viewMode === 'side-panel'
                  ? { opacity: 0, x: 40 }
                  : { opacity: 0, scale: 0.96 }
              }
              animate={
                viewMode === 'side-panel'
                  ? { opacity: 1, x: 0 }
                  : { opacity: 1, scale: 1 }
              }
              exit={
                viewMode === 'side-panel'
                  ? { opacity: 0, x: 40 }
                  : { opacity: 0, scale: 0.96 }
              }
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`fixed z-50 bg-white shadow-2xl border border-gray-200 overflow-hidden ${
                viewMode === 'side-panel'
                  ? 'top-0 right-0 h-full w-full max-w-[480px] rounded-l-2xl'
                  : 'inset-4 sm:inset-8 md:inset-12 lg:inset-16 xl:inset-24 rounded-2xl'
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
