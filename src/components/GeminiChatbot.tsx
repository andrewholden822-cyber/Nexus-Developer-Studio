import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import {
  MessageSquare,
  X,
  Send,
  Minimize2,
  Maximize2,
  Sparkles,
  RefreshCw,
  Trash2,
  Zap,
  Terminal,
  Calendar,
  AlertCircle,
  CheckCircle,
  Copy,
  Check,
  Bot,
  User,
  ArrowRight
} from 'lucide-react';

interface GeminiChatbotProps {
  onOpenInquiry?: (data: { projectType?: string; budget?: string; message?: string }) => void;
  onOpenGitHubAudit?: (repo: string) => void;
}

const QUICK_PROMPTS = [
  { label: 'Xbox App Publishing', prompt: 'What is the process and timeline to develop and publish an app on Xbox Series X|S and Xbox One via Microsoft Store?' },
  { label: 'Book Discovery Call', prompt: 'I would like to book a technical discovery consultation for a new project.' },
  { label: 'Web Dev Scope', prompt: 'What is the standard architecture and timeline for a Web Development project?' },
  { label: 'Audit GitHub Repo', prompt: 'How does NEXUS analyze and audit GitHub repositories?' },
];

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({ onOpenInquiry, onOpenGitHubAudit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'model',
      content: "Hello! I'm NEXUS AI, your studio solutions architect powered by Gemini 3.1 Flash-Lite for sub-150ms real-time responses. I can assist you with web platforms, native Xbox app development & Microsoft Store publishing, cross-platform mobile apps, and technical scoping. What are you building today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      metadata: {
        model: 'gemini-3.1-flash-lite',
        latencyMs: 95,
      },
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage.trim();
    if (!text || isStreaming) return;

    const userTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      role: 'user',
      content: text,
      timestamp: userTimestamp,
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputMessage('');
    setIsStreaming(true);

    const modelMsgId = 'model-' + Date.now();
    const startTime = performance.now();

    // Placeholder model message
    setMessages((prev) => [
      ...prev,
      {
        id: modelMsgId,
        role: 'model',
        content: '',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isStreaming: true,
      },
    ]);

    try {
      // Stream with SSE
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role === 'model' ? 'model' : 'user',
            content: m.content,
          })),
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';
      let latencyMeasured = false;
      let latencyMs = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.replace('data: ', '').trim();
            if (dataStr === '[DONE]') {
              continue;
            }

            try {
              const data = JSON.parse(dataStr);
              if (data.text) {
                if (!latencyMeasured) {
                  latencyMs = Math.round(performance.now() - startTime);
                  latencyMeasured = true;
                }
                accumulatedText += data.text;

                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === modelMsgId
                      ? {
                          ...msg,
                          content: accumulatedText,
                          metadata: {
                            model: 'gemini-3.1-flash-lite',
                            latencyMs: latencyMs || Math.round(performance.now() - startTime),
                          },
                        }
                      : msg
                  )
                );
              }
            } catch (e) {
              // Non-JSON SSE line
            }
          }
        }
      }

      // Mark streaming done
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === modelMsgId
            ? {
                ...msg,
                isStreaming: false,
                content: accumulatedText || 'I have analyzed your request. Let me know if you would like to proceed with booking or deeper architectural scoping.',
              }
            : msg
        )
      );
    } catch (err) {
      console.error('Chat streaming failed, falling back to non-stream:', err);
      // Fallback
      try {
        const fallbackRes = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: newMessages.map((m) => ({
              role: m.role === 'model' ? 'model' : 'user',
              content: m.content,
            })),
          }),
        });
        const data = await fallbackRes.json();

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === modelMsgId
              ? {
                  ...msg,
                  isStreaming: false,
                  content: data.content || 'NEXUS Studio AI is standing by. How can we assist your project development?',
                  metadata: { model: data.model || 'gemini-3.1-flash-lite', latencyMs: Math.round(performance.now() - startTime) },
                }
              : msg
          )
        );
      } catch (fallbackErr) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === modelMsgId
              ? {
                  ...msg,
                  isStreaming: false,
                  isError: true,
                  content: 'Connection interrupted. Please check your network or transmit a direct inquiry via the Contact form.',
                }
              : msg
          )
        );
      }
    } finally {
      setIsStreaming(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'model',
        content: "Conversation history cleared. I'm ready to help scope a new engagement or troubleshoot system architecture.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        metadata: { model: 'gemini-3.1-flash-lite', latencyMs: 45 },
      },
    ]);
  };

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chatbot Launcher Button */}
      {!isOpen && (
        <button
          id="nexus-chatbot-launcher"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-white text-black hover:bg-zinc-200 shadow-2xl transition-all duration-200 flex items-center gap-2.5 group cursor-pointer border border-zinc-300"
          aria-label="Open NEXUS Engineering AI Support"
        >
          <div className="relative">
            <Bot className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse ring-2 ring-white"></span>
          </div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider pr-1 hidden sm:inline-block">
            Gemini Assistant
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-100 hidden md:inline-block">
            Flash-Lite
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          id="nexus-chatbot-window"
          className={`fixed z-50 transition-all duration-300 flex flex-col bg-[#0D0D0D] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden ${
            isExpanded
              ? 'inset-4 sm:inset-10 md:inset-16'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[92vw] sm:w-[440px] h-[580px] max-h-[85vh]'
          }`}
        >
          {/* Top Bar */}
          <div className="px-4 py-3 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-750 flex items-center justify-center text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase text-white tracking-wider">
                    NEXUS AI Support
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-mono">
                    Flash-Lite Live
                  </span>
                </div>
                <div className="text-[10px] text-zinc-400 font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Context-Aware Memory Active</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-zinc-400">
              <button
                onClick={handleClearHistory}
                title="Clear Conversation"
                className="p-1.5 hover:text-white hover:bg-zinc-800 rounded transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Restore Size' : 'Expand View'}
                className="p-1.5 hover:text-white hover:bg-zinc-800 rounded transition-colors cursor-pointer hidden sm:block"
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Assistant"
                className="p-1.5 hover:text-white hover:bg-zinc-800 rounded transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-zinc-950/70 border-b border-zinc-850/60 overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider shrink-0 pl-1">
              Quick:
            </span>
            {QUICK_PROMPTS.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(qp.prompt)}
                disabled={isStreaming}
                className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:text-white text-zinc-300 whitespace-nowrap transition-colors cursor-pointer disabled:opacity-50"
              >
                {qp.label}
              </button>
            ))}
          </div>

          {/* Message Stream Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {messages.map((msg, index) => {
              const isModel = msg.role === 'model';
              return (
                <div
                  key={msg.id || index}
                  className={`flex items-start gap-2.5 ${isModel ? 'justify-start' : 'justify-end'}`}
                >
                  {isModel && (
                    <div className="w-6 h-6 rounded-full bg-zinc-850 border border-zinc-700 flex items-center justify-center shrink-0 text-white mt-0.5">
                      <Sparkles className="w-3 h-3 text-zinc-300" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-xl p-3.5 relative group ${
                      isModel
                        ? 'bg-zinc-900 border border-zinc-800 text-zinc-200'
                        : 'bg-white text-black border border-white font-medium'
                    }`}
                  >
                    {/* Header with Timestamp & Model Latency */}
                    <div className="flex items-center justify-between gap-3 text-[10px] mb-1.5 pb-1 border-b border-zinc-800/40">
                      <span className={isModel ? 'font-mono text-zinc-400 uppercase tracking-wider' : 'font-mono text-zinc-600'}>
                        {isModel ? 'NEXUS Studio AI' : 'You'}
                      </span>
                      <div className="flex items-center gap-1.5 font-mono text-[9px]">
                        {msg.metadata?.latencyMs && (
                          <span className="text-emerald-400 flex items-center gap-0.5">
                            <Zap className="w-2.5 h-2.5" />
                            {msg.metadata.latencyMs}ms
                          </span>
                        )}
                        <span className={isModel ? 'text-zinc-500' : 'text-zinc-500'}>
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="leading-relaxed font-sans whitespace-pre-wrap">
                      {msg.content || (msg.isStreaming && (
                        <span className="inline-flex items-center gap-1 text-zinc-400 font-mono text-[11px]">
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          <span>Thinking with Flash-Lite...</span>
                        </span>
                      ))}
                    </div>

                    {/* Model message actions */}
                    {isModel && !msg.isStreaming && (
                      <div className="mt-2.5 pt-2 border-t border-zinc-800/60 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                        <span className="text-zinc-500">model: gemini-3.1-flash-lite</span>
                        <button
                          onClick={() => copyToClipboard(msg.content, index)}
                          className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          {copiedIndex === index ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {!isModel && (
                    <div className="w-6 h-6 rounded-full bg-zinc-200 border border-white flex items-center justify-center shrink-0 text-black mt-0.5">
                      <User className="w-3 h-3" />
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Chat Input Form */}
          <div className="p-3 bg-zinc-950 border-t border-zinc-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-end gap-2 bg-zinc-900 border border-zinc-800 focus-within:border-zinc-600 rounded-xl p-2 transition-colors"
            >
              <textarea
                ref={inputRef}
                rows={1}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about architecture, multi-step booking, or debugging..."
                className="flex-1 bg-transparent border-0 focus:outline-none text-xs text-zinc-100 placeholder:text-zinc-500 resize-none max-h-24 leading-relaxed font-sans px-1"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isStreaming}
                className="p-2 rounded-lg bg-white text-black hover:bg-zinc-200 disabled:opacity-40 disabled:hover:bg-white transition-colors cursor-pointer shrink-0"
              >
                {isStreaming ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
              </button>
            </form>
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mt-2 px-1">
              <span>Shift+Enter for newline</span>
              <span className="flex items-center gap-1">
                <Zap className="w-2.5 h-2.5 text-emerald-400" />
                Flash-Lite Low Latency Streaming
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
