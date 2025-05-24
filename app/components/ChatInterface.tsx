'use client';

import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  hasAction?: boolean;
  action?: string;
}

interface ChatInterfaceProps {
  messages: Message[];
  input: string;
  setInput: (input: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isGenerating: boolean;
  isConnected: boolean;
  onViewCode?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  input,
  setInput,
  handleSubmit,
  isGenerating,
  isConnected,
  onViewCode
}) => {
  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="p-3 border-b border-slate-800 bg-slate-900 flex items-center">
        <div className="h-2 w-2 bg-green-400 rounded-full mr-2"></div>
        <span className="text-xs font-medium text-slate-300">AI Assistant</span>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-950">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-2.5 rounded ${
                message.role === 'user'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-slate-800 text-slate-200 border border-slate-700'
              }`}
            >
              <div className="text-sm whitespace-pre-wrap">{message.content}</div>
              
              {message.hasAction && message.action === 'view-code' && (
                <button
                  onClick={onViewCode}
                  className="mt-2 px-2 py-1 bg-indigo-600 hover:bg-indigo-700 rounded text-xs transition-colors"
                >
                  View Code
                </button>
              )}
            </div>
          </div>
        ))}
        
        {isGenerating && (
          <div className="flex justify-start">
            <div className="max-w-[85%] p-2.5 rounded bg-slate-800 border border-slate-700">
              <div className="flex space-x-1.5">
                <div className="h-1.5 w-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                <div className="h-1.5 w-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="h-1.5 w-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Input area */}
      <div className="p-3 border-t border-slate-800 bg-slate-900">
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isConnected ? "SolQuest.io gamifies Solana blockchain education through interactive quests..." : "Connect wallet to start..."}
            className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-l text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-slate-500"
            disabled={!isConnected || isGenerating}
          />
          <button
            type="submit"
            disabled={!isConnected || isGenerating || !input.trim()}
            className={`px-3 rounded-r border-y border-r ${
              !isConnected || isGenerating || !input.trim()
                ? 'bg-slate-700 border-slate-700 cursor-not-allowed'
                : 'bg-indigo-500 hover:bg-indigo-600 border-indigo-500 hover:border-indigo-600'
            }`}
          >
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
