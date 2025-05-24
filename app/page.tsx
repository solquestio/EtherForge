'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TypingEffect from './components/TypingEffect';
import LoadingSpinner from './components/LoadingSpinner';
import { aiService, ChatMessage } from './utils/aiService';
import { projectTemplates, ProjectTemplate } from './utils/templates';
import UIPreview from './components/UIPreview';

// Function to map template IDs to route paths
const getTemplateRoute = (templateId: string | null): string => {
  if (!templateId) return '/marketplace';
  
  const routeMap: { [key: string]: string } = {
    'nft-marketplace': '/marketplace',
    'defi-lending': '/defi-lending',
    'dao-governance': '/dao-governance',
    'token-launch': '/token-launch',
    'gamefi-project': '/gamefi-project',
    'social-dapp': '/social-dapp',
    'cross-chain-bridge': '/cross-chain-bridge',
    'prediction-market': '/prediction-market',
    'multi-sig-wallet': '/multi-sig-wallet',
    'yield-farming': '/yield-farming',
    'ai-marketplace': '/ai-marketplace',
  };
  
  return routeMap[templateId] || '/marketplace';
};

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [activeTemplate, setActiveTemplate] = useState<ProjectTemplate | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [currentUIPreview, setCurrentUIPreview] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize with welcome message
    setMessages(aiService.getConversationHistory());
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom of chat
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Handle ESC key for fullscreen
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    setIsLoading(true);
    try {
      const updatedMessages = await aiService.sendMessage(inputValue);
      setMessages(updatedMessages);
      
      // Check if the latest message has files and set UI preview
      const latestMessage = updatedMessages[updatedMessages.length - 1];
      if (latestMessage?.files && latestMessage.files.length > 0) {
        // Determine template type from the input or files
        const input = inputValue.toLowerCase();
        if (input.includes('nft') || input.includes('marketplace')) {
          setCurrentUIPreview('nft-marketplace');
        } else if (input.includes('defi') || input.includes('lending')) {
          setCurrentUIPreview('defi-lending');
        } else if (input.includes('dao') || input.includes('governance')) {
          setCurrentUIPreview('dao-governance');
        } else if (input.includes('token') || input.includes('launch')) {
          setCurrentUIPreview('token-launch');
        } else if (input.includes('game') || input.includes('gamefi')) {
          setCurrentUIPreview('gamefi-project');
        } else {
          setCurrentUIPreview('nft-marketplace'); // Default
        }
      }
      
      setInputValue('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTemplateSelect = async (template: ProjectTemplate) => {
    setActiveTemplate(template);
    
    // Set the input and automatically send the message
    const message = `Create ${template.name.toLowerCase()}`;
    setInputValue(message);
    setShowTemplates(false);
    
    // Automatically trigger the AI conversation
    setIsLoading(true);
    try {
      const updatedMessages = await aiService.sendMessage(message);
      setMessages(updatedMessages);
      setInputValue('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUIPreviewLink = (templateId: string) => {
    setCurrentUIPreview(templateId);
    setActiveTemplate(projectTemplates.find(t => t.id === templateId) || null);
  };

  const formatMessage = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\•/g, '→')
      .split('\n')
      .map((line, index) => {
        // Check for UI preview links
        const uiLinkMatch = line.match(/\[📱 Preview UI: (.*?)\]\((.*?)\)/);
        if (uiLinkMatch) {
          const linkText = uiLinkMatch[1];
          const templateId = uiLinkMatch[2];
          return (
            <div key={index} className="mb-2">
              <button
                onClick={() => handleUIPreviewLink(templateId)}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105"
              >
                <span>📱</span>
                <span>{linkText}</span>
              </button>
            </div>
          );
        }
        
        return (
          <div key={index} className="mb-1">
            <span dangerouslySetInnerHTML={{ __html: line }} />
          </div>
        );
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-3xl">🚀</div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  EtherForge
                </h1>
                <p className="text-sm text-slate-400">Where Smart Contracts Are Born</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center space-x-4"
            >
              <div className="text-sm text-slate-300">
                <span className="text-green-400">●</span> ETH Dublin 2025
              </div>
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-lg font-medium transition-all transform hover:scale-105">
                Connect Wallet
              </button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 h-[calc(100vh-200px)]">
          
          {/* Chat Interface */}
          <motion.div 
            className="lg:col-span-3 flex flex-col bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Chat Header */}
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">AI Assistant</h2>
                  <p className="text-sm text-slate-400">Describe your Web3 project and I'll build it!</p>
                </div>
                <button
                  onClick={() => setShowTemplates(!showTemplates)}
                  className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  📱 Templates
                </button>
              </div>
              
              {/* Template Gallery */}
              <AnimatePresence>
                {showTemplates && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3"
                  >
                    {projectTemplates.map((template) => (
                      <motion.button
                        key={template.id}
                        onClick={() => handleTemplateSelect(template)}
                        className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-600 text-left transition-all group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-xl">{template.icon}</span>
                          <span className="text-sm font-medium text-white group-hover:text-blue-400">
                            {template.name}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2">{template.description}</p>
                        <div className="mt-2 text-xs text-green-400">⚡ {template.estimatedTime}</div>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                          : 'bg-slate-800 text-slate-100'
                      }`}
                    >
                      {message.loading ? (
                        <LoadingSpinner stage="thinking" />
                      ) : (
                        <div className="text-sm">
                          {formatMessage(message.content)}
                          
                          {/* Show generated files */}
                          {message.files && message.files.length > 0 && (
                            <div className="mt-4 space-y-2">
                              <div className="text-xs text-slate-400 font-medium">Generated Files:</div>
                              {message.files.slice(0, 3).map((file, index) => (
                                <motion.button
                                  key={index}
                                  onClick={() => setSelectedFiles([...selectedFiles, file.name])}
                                  className="flex items-center space-x-2 w-full p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-left transition-colors"
                                  whileHover={{ scale: 1.02 }}
                                >
                                  <span className="text-blue-400">📄</span>
                                  <span className="text-xs font-mono">{file.name}</span>
                                  <span className="text-xs text-slate-400 ml-auto">
                                    {file.language}
                                  </span>
                                </motion.button>
                              ))}
                              

                            </div>
                          )}

                          {/* Show deployment info */}
                          {message.deploymentInfo && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-4 p-3 bg-green-900/30 border border-green-700 rounded-lg"
                            >
                              <div className="text-xs font-medium text-green-400 mb-2">🚀 Deployment Successful</div>
                              <div className="space-y-1 text-xs">
                                <div><span className="text-slate-400">Network:</span> {message.deploymentInfo.network}</div>
                                <div><span className="text-slate-400">Contract:</span> 
                                  <span className="font-mono text-blue-400 ml-1">
                                    {message.deploymentInfo.contractAddress.slice(0, 10)}...
                                  </span>
                                </div>
                                <div><span className="text-slate-400">Gas Used:</span> {message.deploymentInfo.gasUsed}</div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-6 border-t border-slate-700">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                  placeholder="Describe your Web3 project... (e.g., 'NFT marketplace with auctions')"
                  className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-medium transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLoading ? '⚡' : '🚀'}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* UI Preview / Project Workspace */}
          <motion.div
            className="lg:col-span-2 bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700 overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">Live UI Preview</h3>
                  <p className="text-sm text-slate-400">Real-time interface generation</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors"
                    title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                  >
                    {isFullscreen ? "🗗" : "⛶"}
                  </button>
                  {currentUIPreview && (
                    <a
                      href={getTemplateRoute(currentUIPreview)}
                      target="_blank"
                      className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-xs transition-colors"
                    >
                      🚀 Full Page
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* UI Preview Component - Much Larger */}
              <div className="h-[600px]">
                <UIPreview 
                  templateType={currentUIPreview} 
                  isVisible={currentUIPreview !== null} 
                />
              </div>

              {/* Fullscreen Modal */}
              <AnimatePresence>
                {isFullscreen && currentUIPreview && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
                    onClick={() => setIsFullscreen(false)}
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="w-full max-w-6xl h-full max-h-[90vh] bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Fullscreen Header */}
                      <div className="p-4 border-b border-slate-700 bg-slate-800/50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">🚀</span>
                            <div>
                              <h3 className="text-xl font-bold text-white">Live UI Preview</h3>
                              <p className="text-slate-400 text-sm">Full-screen view of your generated dApp</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="text-sm text-slate-400">Press ESC or click outside to close</span>
                            <button
                              onClick={() => setIsFullscreen(false)}
                              className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Fullscreen Preview */}
                      <div className="h-[calc(100%-80px)]">
                        <UIPreview 
                          templateType={currentUIPreview} 
                          isVisible={true} 
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-slate-800 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">11</div>
                  <div className="text-xs text-slate-400">Templates Ready</div>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">{'< 5min'}</div>
                  <div className="text-xs text-slate-400">Deploy Time</div>
                </div>
              </div>

              {/* Live Demo Badge */}
              <motion.div 
                className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/30 rounded-lg p-4 text-center mt-4"
                animate={{ 
                  boxShadow: [
                    '0 0 0 0 rgba(147, 51, 234, 0.4)',
                    '0 0 0 10px rgba(147, 51, 234, 0)',
                    '0 0 0 0 rgba(147, 51, 234, 0)'
                  ] 
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="text-purple-400 font-medium text-sm">🏆 ETH Dublin 2025</div>
                <div className="text-xs text-slate-400 mt-1">Live Demo Ready</div>
              </motion.div>

              {/* Example Projects */}
              <div className="space-y-2 mt-4">
                <h4 className="text-sm font-medium text-white">🚀 Try These:</h4>
                {[
                  'NFT marketplace with royalties',
                  'DeFi lending protocol',
                  'DAO governance platform',
                  'Cross-chain bridge for ETH to Polygon',
                  'Social dApp with creator rewards',
                  'AI model marketplace',
                  'Prediction market for crypto prices',
                  'Multi-sig wallet for teams',
                  'Yield farming platform'
                ].map((example, index) => (
                  <button
                    key={example}
                    onClick={() => setInputValue(example)}
                    className="w-full text-left p-2 text-xs text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded transition-colors"
                  >
                    💡 "{example}"
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/30 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm text-slate-400">
            <div>Built for ETH Dublin 2025 🇮🇪</div>
            <div className="flex items-center space-x-4">
              <span>Democratizing Web3 Development</span>
              <span className="text-green-400">●</span>
              <span>Powered by EtherForge</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}