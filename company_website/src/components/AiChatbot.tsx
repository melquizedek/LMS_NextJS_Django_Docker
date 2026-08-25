'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ChevronDown,
  Maximize2,
  Minimize2,
  RefreshCw,
  Copy,
  Check,
  Calculator,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  FileText,
  Percent,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { formatCurrency } from '@/utils/formatters';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  quickActions?: Array<{ label: string; action: string; payload?: any }>;
}

interface AiChatbotProps {
  onNavigateToTab?: (tab: string) => void;
  onOpenCallback?: () => void;
  isOpenExternal?: boolean;
  onCloseExternal?: () => void;
}

const QUICK_STARTERS = [
  {
    icon: <Percent className="w-3.5 h-3.5 text-teal-600" />,
    label: 'Pension Loan requirements',
    prompt: 'What are the eligibility requirements, rates, and documents needed for an SSS or GSIS Pension Loan?',
  },
  {
    icon: <Calculator className="w-3.5 h-3.5 text-blue-600" />,
    label: 'Calculate ₱100k amortization',
    prompt: 'Can you simulate and calculate the monthly amortization, interest, and fees for a ₱100,000 personal loan across 12, 24, and 36 months?',
  },
  {
    icon: <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />,
    label: 'What is DTI & how does it affect me?',
    prompt: 'Explain the Debt-to-Income (DTI) ratio, how lending underwriters calculate it, and what target percentage I should aim for.',
  },
  {
    icon: <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />,
    label: 'Debt consolidation strategy',
    prompt: 'How does consolidating high-interest credit card debts into a single ZedLendingCorp fixed term loan save money and improve cash flow?',
  },
  {
    icon: <FileText className="w-3.5 h-3.5 text-indigo-600" />,
    label: 'SME Working Capital vs Business Loan',
    prompt: 'Compare SME Working Capital loans with Business Expansion financing. Which one fits short-term inventory vs long-term equipment acquisition?',
  },
];

export function AiChatbot({
  onNavigateToTab,
  onOpenCallback,
  isOpenExternal,
  onCloseExternal,
}: AiChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Quick simulation state inside chatbot
  const [showSim, setShowSim] = useState(false);
  const [simAmount, setSimAmount] = useState(50000);
  const [simMonths, setSimMonths] = useState(24);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `### 🌟 Kumusta! I am **ZedAI**, your AI Financial & Lending Intelligence Specialist.

I can assist you with:
- 💡 **Financing Solutions & Eligibility** (Personal, SSS/GSIS Pension, SME, Business, Emergency, Auto, Real Estate)
- 🧮 **Instant Amortization & Repayment Simulations**
- 📊 **Credit Assessment & Debt-to-Income (DTI) Analysis**
- 🛡️ **Debt Consolidation & Prudent Borrowing Strategies**

How can I help power your financial goals today? Feel free to ask any question or select a topic below.`,
      timestamp: new Date(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpenExternal !== undefined) {
      setIsOpen(isOpenExternal);
    }
  }, [isOpenExternal]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, messages]);

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (!nextState && onCloseExternal) {
      onCloseExternal();
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatPayload = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatPayload }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'I apologize, but I could not formulate a response. Please try again.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const fallbackMessage: Message = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `### ℹ️ Financial Guidance Notice\n\nI was unable to complete the live server AI call, but here is immediate advice:\n\n- **Personal/Pension Inquiries:** Reach our loan officers directly at **(02) 8876-1920**.\n- **Eligibility Criteria:** Borrowers need 2 valid IDs and proof of monthly income (min. ₱15,000/mo).\n- **Instant Callback:** You can click **"Request Callback"** on our portal to have a dedicated lending specialist contact you within 24 hours.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: `### 🔄 Chat Reset\n\nHow can I assist you with your loan computation, credit analysis, or borrowing plan today?`,
        timestamp: new Date(),
      },
    ]);
  };

  const handleSimulateSubmit = () => {
    const prompt = `Can you analyze a loan of ${formatCurrency(simAmount)} over a tenure of ${simMonths} months? Provide estimated monthly amortization, interest rate comparison, and tips to get approved.`;
    setShowSim(false);
    handleSendMessage(prompt);
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <div id="ai-chat-trigger" className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-slate-900 text-white text-xs font-medium px-3.5 py-2 rounded-full shadow-lg border border-slate-700 animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Need loan advice? Ask ZedAI</span>
          </div>

          <button
            onClick={handleToggle}
            aria-label="Open AI Lending Expert Chat"
            className="relative group flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white rounded-full shadow-xl hover:shadow-teal-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 rounded-full bg-teal-400 opacity-20 animate-ping" />
            <Bot className="w-7 h-7 relative z-10" />
            <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full" />
          </button>
        </div>
      )}

      {/* Main Chat Interface Modal/Drawer */}
      {isOpen && (
        <div
          id="ai-chat-modal"
          className={`fixed z-50 transition-all duration-300 ease-out flex flex-col bg-white shadow-2xl border border-slate-200 overflow-hidden ${
            isExpanded
              ? 'inset-4 md:inset-10 rounded-2xl'
              : 'bottom-4 right-4 w-[95vw] sm:w-[440px] h-[640px] max-h-[90vh] rounded-2xl'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white px-5 py-4 flex items-center justify-between border-b border-slate-700/50 select-none">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 text-teal-300">
                <Bot className="w-6 h-6" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-900 rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm tracking-wide text-white">ZedAI Lending Advisor</h3>
                  <span className="bg-teal-500/20 text-teal-300 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border border-teal-500/30">
                    Finance AI
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-normal">
                  Expert on Philippine Lending & Credit Strategy
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-slate-400">
              <button
                onClick={() => setShowSim(!showSim)}
                title="Quick Amortization Calculator"
                className={`p-1.5 rounded-lg hover:bg-slate-700/60 hover:text-teal-300 transition-colors ${
                  showSim ? 'bg-teal-600/30 text-teal-300' : ''
                }`}
              >
                <Calculator className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetChat}
                title="Restart Conversation"
                className="p-1.5 rounded-lg hover:bg-slate-700/60 hover:text-white transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Minimize Window' : 'Maximize Window'}
                className="p-1.5 rounded-lg hover:bg-slate-700/60 hover:text-white transition-colors hidden sm:block"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={handleToggle}
                title="Close Chat"
                className="p-1.5 rounded-lg hover:bg-rose-500/20 hover:text-rose-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Simulation Drawer / Accordion */}
          {showSim && (
            <div className="bg-slate-50 p-4 border-b border-slate-200 transition-all text-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-teal-600" />
                  Quick Loan Simulation Assistant
                </span>
                <button
                  onClick={() => setShowSim(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">
                    Amount: <strong className="text-teal-700">{formatCurrency(simAmount)}</strong>
                  </label>
                  <input
                    type="range"
                    min={10000}
                    max={1000000}
                    step={10000}
                    value={simAmount}
                    onChange={(e) => setSimAmount(Number(e.target.value))}
                    className="w-full accent-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">
                    Tenure: <strong className="text-teal-700">{simMonths} Months</strong>
                  </label>
                  <input
                    type="range"
                    min={6}
                    max={60}
                    step={6}
                    value={simMonths}
                    onChange={(e) => setSimMonths(Number(e.target.value))}
                    className="w-full accent-teal-600"
                  />
                </div>
              </div>

              <button
                onClick={handleSimulateSubmit}
                className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Analyze Amortization with ZedAI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((msg) => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  {isAssistant && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-tr from-teal-700 to-teal-900 text-teal-200 flex items-center justify-center text-xs font-bold shadow-sm">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm relative group ${
                      isAssistant
                        ? 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-sm'
                        : 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-tr-sm'
                    }`}
                  >
                    {isAssistant ? (
                      <div className="prose prose-sm prose-slate max-w-none prose-headings:font-semibold prose-headings:text-slate-900 prose-p:leading-relaxed prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5 prose-table:text-xs">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                    )}

                    {/* Timestamp and Copy Action */}
                    <div
                      className={`flex items-center justify-between gap-2 mt-2 pt-1 border-t text-[10px] ${
                        isAssistant
                          ? 'border-slate-100 text-slate-400'
                          : 'border-white/20 text-white/75'
                      }`}
                    >
                      <span>
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>

                      {isAssistant && (
                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-slate-100 text-slate-500 flex items-center gap-1"
                          title="Copy text"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          <span className="text-[10px]">
                            {copiedId === msg.id ? 'Copied' : 'Copy'}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>

                  {!isAssistant && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold shadow-sm">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-8 h-8 rounded-full bg-teal-700 text-teal-200 flex items-center justify-center text-xs">
                  <Bot className="w-4 h-4 animate-pulse" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-teal-600 animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-2 h-2 rounded-full bg-teal-600 animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-2 h-2 rounded-full bg-teal-600 animate-bounce" />
                  <span className="text-xs text-slate-500 font-medium ml-1.5">
                    ZedAI is analyzing lending formulas & credit guidelines...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="bg-slate-100/80 px-4 py-2 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex-shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-teal-600" />
              Topics:
            </span>
            {QUICK_STARTERS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q.prompt)}
                disabled={isLoading}
                className="flex-shrink-0 flex items-center gap-1 text-[11px] font-medium bg-white hover:bg-teal-50 text-slate-700 hover:text-teal-800 border border-slate-200 hover:border-teal-300 px-2.5 py-1 rounded-full shadow-2xs transition-all"
              >
                {q.icon}
                <span>{q.label}</span>
              </button>
            ))}
          </div>

          {/* Input Footer Area */}
          <div className="p-3.5 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about loan terms, DTI ratios, SSS pension loans, or amortizations..."
                  disabled={isLoading}
                  className="w-full text-xs sm:text-sm pl-3.5 pr-9 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-900 placeholder:text-slate-400 disabled:opacity-60"
                />
              </div>

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white rounded-xl shadow-sm transition-all duration-150 flex items-center justify-center flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-slate-400">
              <span>ZedLendingCorp AI Advisory • SEC Compliant</span>
              {onOpenCallback && (
                <button
                  type="button"
                  onClick={() => {
                    handleToggle();
                    onOpenCallback();
                  }}
                  className="text-teal-600 hover:text-teal-700 font-semibold hover:underline"
                >
                  Speak with human officer →
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AiChatbot;
