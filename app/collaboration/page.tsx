'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CollaborationRoom {
  id: string;
  name: string;
  type: 'dapp-generator' | 'code-review' | 'brainstorm' | 'audit';
  participants: Participant[];
  maxParticipants: number;
  isLive: boolean;
  project: string;
  createdBy: string;
  timeAgo: string;
  tags: string[];
}

interface Participant {
  id: string;
  name: string;
  avatar: string;
  role: 'owner' | 'collaborator' | 'viewer';
  isOnline: boolean;
  lensHandle?: string;
}

interface Message {
  id: string;
  user: string;
  avatar: string;
  message: string;
  timestamp: string;
  type: 'message' | 'code' | 'system';
  code?: string;
}

export default function CollaborationUI() {
  const [activeTab, setActiveTab] = useState('rooms');
  const [selectedRoom, setSelectedRoom] = useState<CollaborationRoom | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const mockRooms: CollaborationRoom[] = [
    {
      id: '1',
      name: 'NFT Marketplace Build',
      type: 'dapp-generator',
      participants: [
        { id: '1', name: 'Alice.eth', avatar: '👩‍💻', role: 'owner', isOnline: true, lensHandle: 'alice.lens' },
        { id: '2', name: 'Bob.dev', avatar: '👨‍💻', role: 'collaborator', isOnline: true, lensHandle: 'bob.lens' },
        { id: '3', name: 'Carol', avatar: '👩‍🎨', role: 'viewer', isOnline: false }
      ],
      maxParticipants: 5,
      isLive: true,
      project: 'Digital Art Marketplace',
      createdBy: 'Alice.eth',
      timeAgo: '2h ago',
      tags: ['NFT', 'Marketplace', 'Frontend']
    },
    {
      id: '2',
      name: 'DeFi Security Review',
      type: 'code-review',
      participants: [
        { id: '4', name: 'Dave.audit', avatar: '🔍', role: 'owner', isOnline: true },
        { id: '5', name: 'Eve.security', avatar: '🛡️', role: 'collaborator', isOnline: true },
        { id: '6', name: 'Frank.dev', avatar: '👨‍💼', role: 'collaborator', isOnline: false }
      ],
      maxParticipants: 4,
      isLive: true,
      project: 'Yield Farming Contract',
      createdBy: 'Dave.audit',
      timeAgo: '1h ago',
      tags: ['DeFi', 'Security', 'Audit']
    },
    {
      id: '3',
      name: 'GameFi Brainstorm',
      type: 'brainstorm',
      participants: [
        { id: '7', name: 'Grace.game', avatar: '🎮', role: 'owner', isOnline: false },
        { id: '8', name: 'Henry.design', avatar: '🎨', role: 'collaborator', isOnline: true }
      ],
      maxParticipants: 8,
      isLive: false,
      project: 'Play-to-Earn RPG',
      createdBy: 'Grace.game',
      timeAgo: '30m ago',
      tags: ['GameFi', 'P2E', 'Tokenomics']
    }
  ];

  const mockMessages: Message[] = [
    {
      id: '1',
      user: 'Alice.eth',
      avatar: '👩‍💻',
      message: 'Hey team! Let\'s start building our NFT marketplace. I\'ve set up the basic structure.',
      timestamp: '2:34 PM',
      type: 'message'
    },
    {
      id: '2',
      user: 'Bob.dev',
      avatar: '👨‍💻',
      message: 'Great! I can handle the smart contract integration. Should we use OpenZeppelin templates?',
      timestamp: '2:35 PM',
      type: 'message'
    },
    {
      id: '3',
      user: 'Alice.eth',
      avatar: '👩‍💻',
      message: 'Absolutely! Here\'s a quick contract draft:',
      timestamp: '2:36 PM',
      type: 'code',
      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarketplace is ERC721, Ownable {
    uint256 public nextTokenId;
    
    constructor() ERC721("MarketplaceNFT", "MNFT") {}
    
    function mint(address to) external onlyOwner {
        _safeMint(to, nextTokenId);
        nextTokenId++;
    }
}`
    },
    {
      id: '4',
      user: 'System',
      avatar: '🤖',
      message: 'Carol joined the room',
      timestamp: '2:37 PM',
      type: 'system'
    },
    {
      id: '5',
      user: 'Bob.dev',
      avatar: '👨‍💻',
      message: 'Perfect! I\'ll add the marketplace functionality. Carol, welcome!',
      timestamp: '2:38 PM',
      type: 'message'
    }
  ];

  const joinRoom = (room: CollaborationRoom) => {
    setSelectedRoom(room);
    setMessages(mockMessages);
    setActiveTab('chat');
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      user: 'You',
      avatar: '🧑‍💻',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'message'
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };

  const getRoomTypeIcon = (type: string) => {
    switch (type) {
      case 'dapp-generator': return '🚀';
      case 'code-review': return '🔍';
      case 'brainstorm': return '💡';
      case 'audit': return '🛡️';
      default: return '💬';
    }
  };

  const getRoomTypeColor = (type: string) => {
    switch (type) {
      case 'dapp-generator': return 'bg-blue-600';
      case 'code-review': return 'bg-purple-600';
      case 'brainstorm': return 'bg-yellow-600';
      case 'audit': return 'bg-red-600';
      default: return 'bg-slate-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">👥 Collaboration Hub</h1>
              <span className="text-sm text-slate-400">Powered by Lens Protocol + VibeCode AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/" className="text-slate-400 hover:text-white transition-colors text-sm">
                ← Back to Generator
              </a>
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-lg font-medium transition-all transform hover:scale-105">
                Connect Lens
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="bg-slate-800/30 border-b border-slate-700">
        <div className="container mx-auto px-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">156</div>
              <div className="text-sm text-slate-400">Active Rooms</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">2.4K</div>
              <div className="text-sm text-slate-400">Online Developers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">847</div>
              <div className="text-sm text-slate-400">Projects Created</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">1.2K</div>
              <div className="text-sm text-slate-400">Lens Profiles</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-slate-800/50 rounded-xl p-1 mb-8 max-w-2xl mx-auto">
          {[
            { id: 'rooms', label: '🏠 Rooms', desc: 'Browse collaboration rooms' },
            { id: 'chat', label: '💬 Chat', desc: 'Real-time collaboration' },
            { id: 'social', label: '🌐 Social', desc: 'Lens integration' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <div>{tab.label}</div>
              <div className="text-xs opacity-60">{tab.desc}</div>
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'rooms' && (
            <motion.div
              key="rooms"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-6xl mx-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">🏠 Collaboration Rooms</h2>
                <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 transition-all">
                  + Create Room
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {mockRooms.map((room, index) => (
                  <motion.div
                    key={room.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 ${getRoomTypeColor(room.type)} rounded-full flex items-center justify-center text-2xl`}>
                          {getRoomTypeIcon(room.type)}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{room.name}</h3>
                          <p className="text-slate-400 text-sm capitalize">{room.type.replace('-', ' ')}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {room.isLive && (
                          <span className="px-2 py-1 bg-green-600 text-white rounded text-xs font-medium animate-pulse">
                            LIVE
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-slate-300 mb-4">{room.project}</p>

                    {/* Participants */}
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex -space-x-2">
                        {room.participants.slice(0, 4).map((participant) => (
                          <div
                            key={participant.id}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 border-slate-800 ${
                              participant.isOnline ? 'bg-green-600' : 'bg-slate-600'
                            }`}
                            title={participant.name}
                          >
                            {participant.avatar}
                          </div>
                        ))}
                        {room.participants.length > 4 && (
                          <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-xs text-white border-2 border-slate-800">
                            +{room.participants.length - 4}
                          </div>
                        )}
                      </div>
                      <span className="text-slate-400 text-sm">
                        {room.participants.length}/{room.maxParticipants} participants
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {room.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-slate-400 text-sm">
                        Created by {room.createdBy} • {room.timeAgo}
                      </div>
                      <button
                        onClick={() => joinRoom(room)}
                        className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg font-medium text-sm hover:from-purple-700 hover:to-purple-800 transition-all"
                      >
                        Join Room
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-6xl mx-auto"
            >
              {selectedRoom ? (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
                  {/* Chat Area */}
                  <div className="lg:col-span-3 bg-slate-800/50 border border-slate-700 rounded-xl flex flex-col">
                    {/* Chat Header */}
                    <div className="border-b border-slate-700 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 ${getRoomTypeColor(selectedRoom.type)} rounded-full flex items-center justify-center text-xl`}>
                            {getRoomTypeIcon(selectedRoom.type)}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white">{selectedRoom.name}</h3>
                            <p className="text-slate-400 text-sm">{selectedRoom.project}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 bg-green-600 text-white rounded text-xs font-medium">
                            {selectedRoom.participants.filter(p => p.isOnline).length} online
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                      {messages.map((message, index) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`flex space-x-3 ${
                            message.type === 'system' ? 'justify-center' : ''
                          }`}
                        >
                          {message.type !== 'system' && (
                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-700 text-sm">
                              {message.avatar}
                            </div>
                          )}
                          <div className={`flex-1 ${message.type === 'system' ? 'text-center' : ''}`}>
                            {message.type !== 'system' && (
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-white font-medium text-sm">{message.user}</span>
                                <span className="text-slate-400 text-xs">{message.timestamp}</span>
                              </div>
                            )}
                            
                            {message.type === 'system' ? (
                              <div className="text-slate-400 text-sm italic">{message.message}</div>
                            ) : message.type === 'code' ? (
                              <div className="space-y-2">
                                <p className="text-slate-300 text-sm">{message.message}</p>
                                <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-3">
                                  <pre className="text-green-400 text-xs overflow-x-auto">
                                    <code>{message.code}</code>
                                  </pre>
                                </div>
                              </div>
                            ) : (
                              <p className="text-slate-300 text-sm">{message.message}</p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="border-t border-slate-700 p-4">
                      <div className="flex space-x-3">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                          placeholder="Type your message..."
                          className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white text-sm focus:ring-2 focus:ring-purple-500"
                        />
                        <button
                          onClick={sendMessage}
                          className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 transition-all"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Participants Sidebar */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                    <h3 className="text-lg font-bold text-white mb-4">Participants</h3>
                    
                    <div className="space-y-3">
                      {selectedRoom.participants.map((participant) => (
                        <div key={participant.id} className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                            participant.isOnline ? 'bg-green-600' : 'bg-slate-600'
                          }`}>
                            {participant.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="text-white text-sm font-medium">{participant.name}</div>
                            {participant.lensHandle && (
                              <div className="text-purple-400 text-xs">@{participant.lensHandle}</div>
                            )}
                            <div className="text-slate-400 text-xs capitalize">{participant.role}</div>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${
                            participant.isOnline ? 'bg-green-400' : 'bg-slate-500'
                          }`}></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">💬</div>
                  <p className="text-white text-lg mb-2">No room selected</p>
                  <p className="text-slate-400">Join a collaboration room to start chatting</p>
                  <button
                    onClick={() => setActiveTab('rooms')}
                    className="mt-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 transition-all"
                  >
                    Browse Rooms
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'social' && (
            <motion.div
              key="social"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-2xl font-bold text-white mb-8 text-center">🌐 Lens Protocol Integration</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Social Profiles',
                    desc: 'Connect your Lens profile to showcase your Web3 development portfolio',
                    features: ['NFT Profile Pictures', 'Web3 Credentials', 'Developer Reputation', 'Project Showcase'],
                    icon: '👤',
                    status: 'Active'
                  },
                  {
                    title: 'Content Publishing',
                    desc: 'Share your generated dApps and collaborate with the community',
                    features: ['Project Sharing', 'Code Snippets', 'Development Logs', 'Community Feedback'],
                    icon: '📝',
                    status: 'Active'
                  },
                  {
                    title: 'Social Graphs',
                    desc: 'Discover and follow other Web3 developers in your network',
                    features: ['Developer Discovery', 'Skill Matching', 'Collaboration Requests', 'Mentorship'],
                    icon: '🕸️',
                    status: 'Beta'
                  },
                  {
                    title: 'Community Building',
                    desc: 'Create and join developer communities around specific technologies',
                    features: ['Developer DAOs', 'Skill-based Groups', 'Project Teams', 'Knowledge Sharing'],
                    icon: '🏗️',
                    status: 'Coming Soon'
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-3xl">{feature.icon}</span>
                      <div>
                        <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                        <p className="text-slate-400 text-sm">{feature.desc}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      {feature.features.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm">
                          <span className="text-green-400">✓</span>
                          <span className="text-slate-300">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        feature.status === 'Active' ? 'bg-green-600 text-white' :
                        feature.status === 'Beta' ? 'bg-yellow-600 text-white' :
                        'bg-purple-600 text-white'
                      }`}>
                        {feature.status}
                      </span>
                      <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
                        Learn More →
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105">
                  🌐 Connect Lens Profile
                </button>
                <p className="text-slate-400 text-sm mt-4">
                  Connect your Lens profile to unlock social collaboration features
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/30 backdrop-blur-xl mt-12">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm text-slate-400">
            <div>Built for ETH Dublin 2025 🇮🇪</div>
            <div className="flex items-center space-x-4">
              <span>Collaboration Hub</span>
              <span className="text-purple-400">●</span>
              <span>Powered by VibeForge</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 
