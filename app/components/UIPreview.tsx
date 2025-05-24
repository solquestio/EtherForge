'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface UIPreviewProps {
  templateType?: string;
  isVisible: boolean;
}

export default function UIPreview({ templateType, isVisible }: UIPreviewProps) {
  if (!isVisible || !templateType) {
    return (
      <div className="h-full bg-slate-800/30 rounded-lg border border-slate-700 flex items-center justify-center">
        <div className="text-center text-slate-400">
          <div className="text-4xl mb-2">👁️</div>
          <p className="text-sm">UI Preview</p>
          <p className="text-xs">Generate a project to see live preview</p>
        </div>
      </div>
    );
  }

  const renderNFTMarketplace = () => (
    <div className="h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-lg overflow-hidden">
      {/* Mini Header */}
      <div className="bg-slate-900/50 border-b border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🎨</span>
            <div>
              <span className="text-white font-semibold text-lg">NFT Marketplace</span>
              <p className="text-slate-400 text-xs">Powered by VibeForge</p>
            </div>
          </div>
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Connect Wallet
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-slate-800/30 border-b border-slate-700 p-4">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-blue-400">10,000</div>
            <div className="text-xs text-slate-400">Total Items</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-400">2,456</div>
            <div className="text-xs text-slate-400">Owners</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-400">0.05</div>
            <div className="text-xs text-slate-400">Floor Price</div>
          </div>
          <div>
            <div className="text-lg font-bold text-orange-400">156.7</div>
            <div className="text-xs text-slate-400">Volume (ETH)</div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex gap-3">
          <select className="bg-slate-800 text-white border border-slate-600 rounded-lg px-3 py-2 text-sm">
            <option>All Items</option>
            <option>Auctions</option>
            <option>Fixed Price</option>
          </select>
          <select className="bg-slate-800 text-white border border-slate-600 rounded-lg px-3 py-2 text-sm">
            <option>Newest First</option>
            <option>Price: Low to High</option>
            <option>Ending Soon</option>
          </select>
          <div className="flex-1">
            <input 
              type="text" 
              placeholder="Search NFTs..." 
              className="w-full bg-slate-800 text-white border border-slate-600 rounded-lg px-3 py-2 text-sm placeholder-slate-400"
            />
          </div>
        </div>
      </div>

      {/* NFT Grid */}
      <div className="p-4 grid grid-cols-2 gap-4 h-[400px] overflow-y-auto">
        {[
          { id: 1, name: 'Cosmic Wanderer #1234', price: '2.5', isAuction: false },
          { id: 2, name: 'Digital Dreams #567', price: '1.8', isAuction: true, bid: '1.2' },
          { id: 3, name: 'Neon Genesis #890', price: '3.2', isAuction: false },
          { id: 4, name: 'Abstract Emotions #456', price: '1.5', isAuction: true, bid: '0.8' },
          { id: 5, name: 'Pixel Adventure #123', price: '4.1', isAuction: false },
          { id: 6, name: 'Cyber Punk #789', price: '2.9', isAuction: true, bid: '2.1' }
        ].map((nft) => (
          <motion.div
            key={nft.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: nft.id * 0.1 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden hover:border-purple-500 transition-all duration-300 group cursor-pointer"
          >
            <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-500 relative">
              {nft.isAuction && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  🔥 Live
                </div>
              )}
              <div className="absolute bottom-2 left-2 text-white text-xs bg-slate-900/80 px-2 py-1 rounded">
                #{nft.id}
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-white font-medium text-sm truncate mb-2">{nft.name}</h3>
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-slate-400 text-xs">{nft.isAuction ? 'Current Bid' : 'Price'}</p>
                  <p className="text-white font-bold text-sm">
                    {nft.isAuction ? nft.bid : nft.price} ETH
                  </p>
                </div>
                {nft.isAuction && (
                  <div className="text-right">
                    <p className="text-slate-400 text-xs">Time Left</p>
                    <p className="text-orange-400 text-xs font-medium">2h 15m</p>
                  </div>
                )}
              </div>
              <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105">
                {nft.isAuction ? 'Place Bid' : 'Buy Now'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderDeFiLending = () => (
    <div className="h-full bg-gradient-to-br from-slate-900 to-blue-900 rounded-lg overflow-hidden">
      <div className="bg-slate-900/50 border-b border-slate-700 p-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">💰</span>
          <div>
            <span className="text-white font-semibold text-lg">DeFi Lending Protocol</span>
            <p className="text-slate-400 text-xs">Advanced yield optimization</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Portfolio Overview */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <h3 className="text-white font-semibold text-base mb-4">Portfolio Overview</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/50 rounded-lg p-3">
              <p className="text-slate-400 text-sm">Total Supplied</p>
              <p className="text-green-400 font-bold text-xl">$12,450.67</p>
              <p className="text-green-300 text-xs">+5.2% this week</p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3">
              <p className="text-slate-400 text-sm">Total Borrowed</p>
              <p className="text-orange-400 font-bold text-xl">$3,200.45</p>
              <p className="text-slate-400 text-xs">Health Factor: 2.1</p>
            </div>
          </div>
          
          {/* Health Factor Bar */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white text-sm">Health Factor</span>
              <span className="text-green-400 text-sm font-medium">2.1 (Safe)</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full" style={{width: '75%'}}></div>
            </div>
          </div>
        </div>

        {/* Asset List */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold text-base">Available Assets</h4>
          {[
            { symbol: 'ETH', name: 'Ethereum', apy: '4.2', supplied: '2.5', color: 'from-blue-400 to-purple-400' },
            { symbol: 'USDC', name: 'USD Coin', apy: '5.8', supplied: '1,200', color: 'from-green-400 to-blue-400' },
            { symbol: 'DAI', name: 'Dai Stablecoin', apy: '6.1', supplied: '0', color: 'from-yellow-400 to-orange-400' }
          ].map((asset, i) => (
            <div key={asset.symbol} className="bg-slate-800/30 border border-slate-700 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-gradient-to-r ${asset.color} rounded-full flex items-center justify-center`}>
                    <span className="text-white font-bold text-sm">{asset.symbol[0]}</span>
                  </div>
                  <div>
                    <span className="text-white font-medium text-sm">{asset.symbol}</span>
                    <p className="text-slate-400 text-xs">{asset.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    <div>
                      <p className="text-green-400 text-sm font-medium">{asset.apy}% APY</p>
                      <p className="text-slate-400 text-xs">Supply APY</p>
                    </div>
                    <div>
                      <p className="text-white text-sm">{asset.supplied}</p>
                      <p className="text-slate-400 text-xs">Supplied</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition-colors">
                      Supply
                    </button>
                    <button className="bg-slate-600 hover:bg-slate-500 text-white px-3 py-1 rounded text-xs transition-colors">
                      Borrow
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-lg font-medium text-sm transition-all">
            💰 Earn Yield
          </button>
          <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-lg font-medium text-sm transition-all">
            🏦 Get Loan
          </button>
        </div>
      </div>
    </div>
  );

  const renderDAOGovernance = () => (
    <div className="h-full bg-gradient-to-br from-slate-900 to-purple-900 rounded-lg overflow-hidden">
      <div className="bg-slate-900/50 border-b border-slate-700 p-3">
        <div className="flex items-center space-x-2">
          <span className="text-lg">🏛️</span>
          <span className="text-white font-medium text-sm">DAO Governance</span>
        </div>
      </div>

      <div className="p-3 space-y-3">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-800/50 border border-slate-700 rounded p-2 text-center">
            <p className="text-purple-400 font-bold text-lg">24</p>
            <p className="text-slate-400 text-xs">Active Proposals</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded p-2 text-center">
            <p className="text-green-400 font-bold text-lg">$2.1M</p>
            <p className="text-slate-400 text-xs">Treasury</p>
          </div>
        </div>

        {/* Recent Proposals */}
        <div className="space-y-2">
          {['Increase rewards', 'Protocol upgrade', 'Treasury allocation'].map((proposal, i) => (
            <div key={i} className="bg-slate-800/30 border border-slate-700 rounded p-2">
              <h4 className="text-white text-sm font-medium">{proposal}</h4>
              <div className="flex justify-between items-center mt-1">
                <div className="flex space-x-1">
                  <span className="text-green-400 text-xs">72% For</span>
                  <span className="text-red-400 text-xs">28% Against</span>
                </div>
                <button className="bg-purple-500 text-white px-2 py-1 rounded text-xs">Vote</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTokenLaunch = () => (
    <div className="h-full bg-gradient-to-br from-slate-900 to-orange-900 rounded-lg overflow-hidden">
      <div className="bg-slate-900/50 border-b border-slate-700 p-3">
        <div className="flex items-center space-x-2">
          <span className="text-lg">🚀</span>
          <span className="text-white font-medium text-sm">Token Launch</span>
        </div>
      </div>

      <div className="p-3 space-y-3">
        {/* Token Info */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mx-auto mb-2"></div>
          <h3 className="text-white font-bold">VIBE Token</h3>
          <p className="text-slate-400 text-xs">Governance & Utility Token</p>
        </div>

        {/* Launch Progress */}
        <div className="bg-slate-800/30 border border-slate-700 rounded p-2">
          <div className="flex justify-between mb-1">
            <span className="text-white text-sm">Launch Progress</span>
            <span className="text-orange-400 text-sm">68%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-orange-400 to-red-400 h-2 rounded-full" style={{width: '68%'}}></div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded font-medium text-sm">
            Buy Tokens
          </button>
          <button className="w-full bg-slate-700 text-white py-2 rounded text-sm">
            Stake Tokens
          </button>
        </div>
      </div>
    </div>
  );

  const renderGameFi = () => (
    <div className="h-full bg-gradient-to-br from-slate-900 to-green-900 rounded-lg overflow-hidden">
      <div className="bg-slate-900/50 border-b border-slate-700 p-3">
        <div className="flex items-center space-x-2">
          <span className="text-lg">🎮</span>
          <span className="text-white font-medium text-sm">GameFi Platform</span>
        </div>
      </div>

      <div className="p-3 space-y-3">
        {/* Player Stats */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3">
          <h3 className="text-white font-medium text-sm mb-2">Your Character</h3>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg"></div>
            <div>
              <p className="text-white font-medium text-sm">Warrior #1234</p>
              <p className="text-green-400 text-xs">Level 15</p>
            </div>
          </div>
        </div>

        {/* Active Battles */}
        <div className="space-y-2">
          <h4 className="text-white font-medium text-sm">Active Battles</h4>
          {[1, 2].map((battle) => (
            <div key={battle} className="bg-slate-800/30 border border-slate-700 rounded p-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white text-sm">Battle #{battle}</p>
                  <p className="text-slate-400 text-xs">Reward: {battle * 10} tokens</p>
                </div>
                <button className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // NEW: Social dApp Platform
  const renderSocialDApp = () => (
    <div className="h-full bg-gradient-to-br from-slate-900 to-pink-900 rounded-lg overflow-hidden">
      <div className="bg-slate-900/50 border-b border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">📱</span>
            <div>
              <span className="text-white font-semibold text-lg">Web3 Social</span>
              <p className="text-slate-400 text-xs">Decentralized Social Network</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
              Online
            </div>
            <button className="bg-pink-500 text-white px-3 py-2 rounded-lg text-sm">
              Post
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* User Profile Card */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">You</span>
            </div>
            <div>
              <span className="text-white font-medium">@crypto_builder</span>
              <p className="text-slate-400 text-xs">1.2K followers • 850 following</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-pink-400 font-bold text-lg">42</p>
              <p className="text-slate-400 text-xs">Posts</p>
            </div>
            <div>
              <p className="text-purple-400 font-bold text-lg">156</p>
              <p className="text-slate-400 text-xs">NFTs</p>
            </div>
            <div>
              <p className="text-blue-400 font-bold text-lg">12.5</p>
              <p className="text-slate-400 text-xs">ETH Earned</p>
            </div>
          </div>
        </div>

        {/* Feed */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold text-base">Latest Posts</h4>
          {[
            { user: 'alice.eth', content: 'Just minted my first AI-generated NFT! 🎨', likes: 23, tips: '0.1' },
            { user: 'bob_dev', content: 'New DeFi protocol launches tonight 🚀', likes: 45, tips: '0.3' },
            { user: 'crypto_queen', content: 'Best Web3 social features ever! Love this platform', likes: 12, tips: '0.05' }
          ].map((post, i) => (
            <div key={i} className="bg-slate-800/30 border border-slate-700 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                <span className="text-white font-medium text-sm">{post.user}</span>
                <span className="text-slate-400 text-xs">• 2h ago</span>
              </div>
              <p className="text-slate-200 text-sm mb-3">{post.content}</p>
              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <button className="flex items-center space-x-1 text-slate-400 hover:text-pink-400">
                    <span>❤️</span>
                    <span className="text-xs">{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-slate-400 hover:text-blue-400">
                    <span>💬</span>
                    <span className="text-xs">3</span>
                  </button>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-green-400 text-xs">💰 {post.tips} ETH</span>
                  <button className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                    Tip
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // NEW: Cross-Chain Bridge
  const renderCrossChainBridge = () => (
    <div className="h-full bg-gradient-to-br from-slate-900 to-indigo-900 rounded-lg overflow-hidden">
      <div className="bg-slate-900/50 border-b border-slate-700 p-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">🌉</span>
          <div>
            <span className="text-white font-semibold text-lg">Cross-Chain Bridge</span>
            <p className="text-slate-400 text-xs">Bridge assets across multiple chains</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Bridge Interface */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <h3 className="text-white font-semibold text-base mb-4">Bridge Assets</h3>
          
          {/* From Chain */}
          <div className="space-y-3">
            <div>
              <label className="text-slate-400 text-sm">From</label>
              <div className="flex items-center space-x-3 bg-slate-900/50 rounded-lg p-3 mt-1">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">ETH</span>
                </div>
                <div className="flex-1">
                  <span className="text-white font-medium">Ethereum</span>
                  <p className="text-slate-400 text-xs">Balance: 2.45 ETH</p>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="bg-slate-700 p-2 rounded-full">
                <span className="text-indigo-400">⬇️</span>
              </div>
            </div>

            {/* To Chain */}
            <div>
              <label className="text-slate-400 text-sm">To</label>
              <div className="flex items-center space-x-3 bg-slate-900/50 rounded-lg p-3 mt-1">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">POL</span>
                </div>
                <div className="flex-1">
                  <span className="text-white font-medium">Polygon</span>
                  <p className="text-slate-400 text-xs">Est. receive: 0.98 ETH</p>
                </div>
              </div>
            </div>

            {/* Amount Input */}
            <div>
              <label className="text-slate-400 text-sm">Amount</label>
              <div className="flex space-x-2 mt-1">
                <input 
                  type="text" 
                  placeholder="1.0" 
                  className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white"
                />
                <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm">
                  Max
                </button>
              </div>
            </div>
          </div>

          {/* Bridge Stats */}
          <div className="bg-slate-900/50 rounded-lg p-3 mt-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-indigo-400 font-bold">~15 min</p>
                <p className="text-slate-400 text-xs">Bridge Time</p>
              </div>
              <div>
                <p className="text-green-400 font-bold">$12.50</p>
                <p className="text-slate-400 text-xs">Bridge Fee</p>
              </div>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-3 rounded-lg font-medium transition-all">
            🌉 Start Bridge
          </button>
        </div>

        {/* Supported Chains */}
        <div className="space-y-2">
          <h4 className="text-white font-medium text-sm">Supported Chains</h4>
          <div className="grid grid-cols-4 gap-2">
            {['ETH', 'POL', 'BSC', 'AVAX'].map((chain) => (
              <div key={chain} className="bg-slate-800/30 border border-slate-700 rounded p-2 text-center">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mb-1"></div>
                <span className="text-white text-xs">{chain}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // NEW: Yield Farming Platform
  const renderYieldFarming = () => (
    <div className="h-full bg-gradient-to-br from-slate-900 to-green-900 rounded-lg overflow-hidden">
      <div className="bg-slate-900/50 border-b border-slate-700 p-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">🌾</span>
          <div>
            <span className="text-white font-semibold text-lg">Yield Farming</span>
            <p className="text-slate-400 text-xs">Maximize your DeFi returns</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Portfolio Summary */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <h3 className="text-white font-semibold text-base mb-3">Farm Portfolio</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-slate-400 text-sm">Total Value Locked</p>
              <p className="text-green-400 font-bold text-xl">$8,450.32</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Pending Rewards</p>
              <p className="text-yellow-400 font-bold text-xl">156.7 FARM</p>
            </div>
          </div>
          <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 rounded-lg mt-3 font-medium text-sm">
            🌾 Harvest All
          </button>
        </div>

        {/* Active Farms */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold text-base">Active Farms</h4>
          {[
            { pair: 'ETH-USDC', apy: '145.2', tvl: '$2.1M', earned: '45.2', multiplier: '2x' },
            { pair: 'WBTC-ETH', apy: '89.7', tvl: '$850K', earned: '23.1', multiplier: '1.5x' },
            { pair: 'DAI-USDT', apy: '67.3', tvl: '$1.8M', earned: '12.8', multiplier: '1x' }
          ].map((farm, i) => (
            <div key={i} className="bg-slate-800/30 border border-slate-700 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-1">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-2 border-slate-900"></div>
                    <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-400 rounded-full border-2 border-slate-900"></div>
                  </div>
                  <span className="text-white font-medium text-sm">{farm.pair}</span>
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
                    {farm.multiplier}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-bold text-sm">{farm.apy}% APY</p>
                  <p className="text-slate-400 text-xs">TVL: {farm.tvl}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-400 text-xs">Earned</p>
                  <p className="text-yellow-400 text-sm font-medium">{farm.earned} FARM</p>
                </div>
                <div className="flex space-x-2">
                  <button className="bg-green-500 text-white px-3 py-1 rounded text-xs">
                    Stake
                  </button>
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded text-xs">
                    Harvest
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // NEW: AI Marketplace
  const renderAIMarketplace = () => (
    <div className="h-full bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 rounded-lg overflow-hidden">
      <div className="bg-slate-900/50 border-b border-slate-700 p-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">🤖</span>
          <div>
            <span className="text-white font-semibold text-lg">AI Marketplace</span>
            <p className="text-slate-400 text-xs">Trade AI models & services</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Categories */}
        <div className="flex space-x-2 overflow-x-auto">
          {['🎨 Art', '💬 Chat', '📊 Analysis', '🔮 Prediction'].map((category) => (
            <button key={category} className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap">
              {category}
            </button>
          ))}
        </div>

        {/* Featured AI Models */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold text-base">Featured AI Models</h4>
          {[
            { name: 'ArtGenerator v2', type: 'Image Generation', price: '0.1', rating: '4.9', uses: '15.2K' },
            { name: 'MarketPredictor', type: 'Financial Analysis', price: '0.05', rating: '4.7', uses: '8.9K' },
            { name: 'CodeAssistant Pro', type: 'Development', price: '0.15', rating: '4.8', uses: '22.1K' }
          ].map((model, i) => (
            <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h5 className="text-white font-medium text-sm">{model.name}</h5>
                  <p className="text-cyan-400 text-xs">{model.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-sm">{model.price} ETH</p>
                  <p className="text-slate-400 text-xs">per use</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400 text-xs">⭐</span>
                    <span className="text-white text-xs">{model.rating}</span>
                  </div>
                  <span className="text-slate-400 text-xs">{model.uses} uses</span>
                </div>
                <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 rounded text-xs">
                  Try Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-3">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-cyan-400 font-bold">2,156</p>
              <p className="text-slate-400 text-xs">AI Models</p>
            </div>
            <div>
              <p className="text-green-400 font-bold">45.2K</p>
              <p className="text-slate-400 text-xs">Daily Uses</p>
            </div>
            <div>
              <p className="text-purple-400 font-bold">890</p>
              <p className="text-slate-400 text-xs">Developers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // NEW: Prediction Market
  const renderPredictionMarket = () => (
    <div className="h-full bg-gradient-to-br from-slate-900 to-red-900 rounded-lg overflow-hidden">
      <div className="bg-slate-900/50 border-b border-slate-700 p-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">🔮</span>
          <div>
            <span className="text-white font-semibold text-lg">Prediction Market</span>
            <p className="text-slate-400 text-xs">Bet on future events</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Trending Markets */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold text-base">🔥 Trending Markets</h4>
          {[
            { question: `ETH ${'>'}$5000 by Jan 2025?`, yesPrice: '0.67', noPrice: '0.33', volume: '$125K', ends: '45d' },
            { question: `BTC dominance ${'>'}60%?`, yesPrice: '0.45', noPrice: '0.55', volume: '$89K', ends: '12d' },
            { question: 'New DeFi protocol launch?', yesPrice: '0.78', noPrice: '0.22', volume: '$67K', ends: '7d' }
          ].map((market, i) => (
            <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-lg p-3">
              <h5 className="text-white font-medium text-sm mb-2">{market.question}</h5>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button className="bg-green-500/20 border border-green-500 text-green-400 py-2 rounded text-center hover:bg-green-500/30">
                  <div className="text-sm font-medium">YES</div>
                  <div className="text-xs">{market.yesPrice} ETH</div>
                </button>
                <button className="bg-red-500/20 border border-red-500 text-red-400 py-2 rounded text-center hover:bg-red-500/30">
                  <div className="text-sm font-medium">NO</div>
                  <div className="text-xs">{market.noPrice} ETH</div>
                </button>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Volume: {market.volume}</span>
                <span>Ends: {market.ends}</span>
              </div>
            </div>
          ))}
        </div>

        {/* My Positions */}
        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-3">
          <h4 className="text-white font-medium text-sm mb-2">📊 My Positions</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-300 text-sm">ETH Price {'>'}$4000</span>
              <span className="text-green-400 text-sm">+$45.20</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300 text-sm">BTC Halving Impact</span>
              <span className="text-red-400 text-sm">-$12.50</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // NEW: Multi-Sig Wallet
  const renderMultiSigWallet = () => (
    <div className="h-full bg-gradient-to-br from-slate-900 to-amber-900 rounded-lg overflow-hidden">
      <div className="bg-slate-900/50 border-b border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🔐</span>
            <div>
              <span className="text-white font-semibold text-lg">Multi-Sig Wallet</span>
              <p className="text-slate-400 text-xs">Enterprise Security</p>
            </div>
          </div>
          <div className="bg-amber-500/20 text-amber-400 px-2 py-1 rounded text-xs">
            3/5 Required
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Wallet Balance */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <div className="text-center mb-4">
            <p className="text-slate-400 text-sm">Total Balance</p>
            <p className="text-white font-bold text-2xl">$145,678.90</p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-blue-400 font-bold">12.5</p>
              <p className="text-slate-400 text-xs">ETH</p>
            </div>
            <div>
              <p className="text-green-400 font-bold">85,000</p>
              <p className="text-slate-400 text-xs">USDC</p>
            </div>
            <div>
              <p className="text-orange-400 font-bold">2.1</p>
              <p className="text-slate-400 text-xs">BTC</p>
            </div>
          </div>
        </div>

        {/* Pending Transactions */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="text-white font-semibold text-base">⏳ Pending Transactions</h4>
            <span className="bg-amber-500/20 text-amber-400 px-2 py-1 rounded text-xs">2 pending</span>
          </div>
          
          {[
            { to: '0x742d...35Cc', amount: '5.0 ETH', type: 'Transfer', approvals: '2/3', id: 1 },
            { to: 'Uniswap V3', amount: '10,000 USDC', type: 'DeFi', approvals: '1/3', id: 2 }
          ].map((tx) => (
            <div key={tx.id} className="bg-slate-800/30 border border-slate-700 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-white font-medium text-sm">{tx.type}</p>
                  <p className="text-slate-400 text-xs">To: {tx.to}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-sm">{tx.amount}</p>
                  <p className="text-amber-400 text-xs">{tx.approvals} approvals</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded text-sm">
                  ✓ Approve
                </button>
                <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded text-sm">
                  ✗ Reject
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Signers */}
        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-3">
          <h4 className="text-white font-medium text-sm mb-2">👥 Signers</h4>
          <div className="space-y-1">
            {['alice.eth', 'bob.eth', 'charlie.eth', 'diana.eth', 'eve.eth'].map((signer, i) => (
              <div key={signer} className="flex justify-between items-center">
                <span className="text-slate-300 text-sm">{signer}</span>
                <span className={`w-2 h-2 rounded-full ${i < 3 ? 'bg-green-400' : 'bg-slate-600'}`}></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Render appropriate UI based on template type
  const renderPreview = () => {
    switch (templateType) {
      case 'nft-marketplace':
        return renderNFTMarketplace();
      case 'defi-lending':
        return renderDeFiLending();
      case 'dao-governance':
        return renderDAOGovernance();
      case 'token-launch':
        return renderTokenLaunch();
      case 'gamefi-project':
        return renderGameFi();
      case 'social-dapp':
        return renderSocialDApp();
      case 'cross-chain-bridge':
        return renderCrossChainBridge();
      case 'yield-farming':
        return renderYieldFarming();
      case 'ai-marketplace':
        return renderAIMarketplace();
      case 'prediction-market':
        return renderPredictionMarket();
      case 'multisig-wallet':
        return renderMultiSigWallet();
      default:
        return renderNFTMarketplace(); // Default fallback
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      {renderPreview()}
    </motion.div>
  );
} 
