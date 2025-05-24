'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Integration {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  status: 'active' | 'beta' | 'coming-soon';
  icon: string;
  color: string;
  apiEndpoint?: string;
  documentation?: string;
}

export default function IntegrationsUI() {
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  const integrations: Integration[] = [
    {
      id: 'chainlink',
      name: 'Chainlink Oracles',
      category: 'Oracles',
      description: 'Automatic oracle integration for external data verification in generated dApps',
      features: ['Price Feeds', 'Random Numbers', 'External APIs', 'Cross-chain Communication'],
      status: 'active',
      icon: '🔗',
      color: 'blue',
      apiEndpoint: 'https://api.chain.link',
      documentation: 'https://docs.chain.link'
    },
    {
      id: 'openzeppelin',
      name: 'OpenZeppelin Security',
      category: 'Security',
      description: 'Automated security auditing and contract templates for all generated smart contracts',
      features: ['Security Templates', 'Automated Auditing', 'Gas Optimization', 'Best Practices'],
      status: 'active',
      icon: '🛡️',
      color: 'green',
      documentation: 'https://docs.openzeppelin.com'
    },
    {
      id: 'lens',
      name: 'Lens Protocol',
      category: 'Social',
      description: 'Social identity and community features via Lens Protocol integration',
      features: ['Social Profiles', 'Content Publishing', 'Social Graphs', 'Community Building'],
      status: 'active',
      icon: '👥',
      color: 'purple',
      documentation: 'https://docs.lens.xyz'
    },
    {
      id: 'filecoin',
      name: 'Filecoin Storage',
      category: 'Storage',
      description: 'Permanent decentralized storage for generated dApp assets and metadata',
      features: ['IPFS Integration', 'Permanent Storage', 'Content Addressing', 'Backup Solutions'],
      status: 'active',
      icon: '📁',
      color: 'orange',
      documentation: 'https://docs.filecoin.io'
    },
    {
      id: 'ledger',
      name: 'Ledger Security',
      category: 'Security',
      description: 'Hardware wallet integration for secure signing and key management',
      features: ['Hardware Signing', 'Secure Key Storage', 'Transaction Verification', 'Multi-sig Support'],
      status: 'active',
      icon: '🔐',
      color: 'indigo',
      documentation: 'https://developers.ledger.com'
    },
    {
      id: 'chorus-one',
      name: 'Chorus One Infrastructure',
      category: 'Infrastructure',
      description: 'Cross-chain validator support and infrastructure services',
      features: ['Multi-chain Deployment', 'Validator Services', 'Infrastructure APIs', 'Network Support'],
      status: 'active',
      icon: '🌐',
      color: 'cyan',
      documentation: 'https://docs.chorus.one'
    },
    {
      id: 'olas',
      name: 'Olas Protocol',
      category: 'AI/ML',
      description: 'Information markets and knowledge curation for AI-generated content',
      features: ['Knowledge Markets', 'Content Curation', 'AI Verification', 'Reputation Systems'],
      status: 'beta',
      icon: '🧠',
      color: 'pink',
      documentation: 'https://docs.olas.network'
    },
    {
      id: 'fcat',
      name: 'FCAT Compliance',
      category: 'Compliance',
      description: 'Research frameworks and compliance tools for institutional adoption',
      features: ['Compliance Checking', 'Regulatory Frameworks', 'Institutional Tools', 'Risk Assessment'],
      status: 'beta',
      icon: '📋',
      color: 'yellow',
      documentation: 'https://docs.fcat.network'
    },
    {
      id: 'trrue',
      name: 'Trrue Compliance',
      category: 'Compliance',
      description: 'Enabling compliant, impact-driven solutions for Web3 applications',
      features: ['Impact Measurement', 'ESG Compliance', 'Sustainability Metrics', 'Audit Trails'],
      status: 'beta',
      icon: '🌱',
      color: 'emerald',
      documentation: 'https://docs.trrue.io'
    },
    {
      id: 'figure-markets',
      name: 'Figure Markets',
      category: 'Finance',
      description: 'Decentralized custody marketplace for crypto asset management',
      features: ['Custody Solutions', 'Asset Management', 'Marketplace Integration', 'Institutional Services'],
      status: 'coming-soon',
      icon: '🏦',
      color: 'slate',
      documentation: 'https://docs.figure.com'
    },
    {
      id: 'ninedots',
      name: 'Ninedots AR/VR',
      category: 'XR',
      description: 'Physical-digital experiences and art integration for immersive dApps',
      features: ['AR/VR Templates', 'Physical Integration', 'Art Experiences', 'Immersive UI'],
      status: 'coming-soon',
      icon: '🥽',
      color: 'violet',
      documentation: 'https://docs.ninedots.io'
    },
    {
      id: 'esp',
      name: 'Ethereum Support Program',
      category: 'Core',
      description: 'Core protocol infrastructure and grants for standout projects',
      features: ['Core Integration', 'Grant Opportunities', 'Protocol Support', 'Development Resources'],
      status: 'active',
      icon: '⟠',
      color: 'blue',
      documentation: 'https://esp.ethereum.foundation'
    }
  ];

  const categories = ['all', 'oracles', 'security', 'social', 'storage', 'infrastructure', 'ai/ml', 'compliance', 'finance', 'xr', 'core'];

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading partner integrations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">🤝 Partner Integrations</h1>
              <span className="text-sm text-slate-400">ETH Dublin 2025</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/" className="text-slate-400 hover:text-white transition-colors text-sm">
                ← Back to Generator
              </a>
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-lg font-medium transition-all transform hover:scale-105">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Integration Stats */}
      <div className="bg-slate-800/30 border-b border-slate-700">
        <div className="container mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2">Total Integrations</h3>
                <div className="text-3xl font-bold text-blue-400">{integrations.length}</div>
                <div className="text-xs text-slate-400 mt-1">Partner protocols</div>
              </div>
            </motion.div>

            <motion.div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2">Active</h3>
                <div className="text-3xl font-bold text-green-400">{integrations.filter(i => i.status === 'active').length}</div>
                <div className="text-xs text-slate-400 mt-1">Ready to use</div>
              </div>
            </motion.div>

            <motion.div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2">Beta</h3>
                <div className="text-3xl font-bold text-yellow-400">{integrations.filter(i => i.status === 'beta').length}</div>
                <div className="text-xs text-slate-400 mt-1">Testing phase</div>
              </div>
            </motion.div>

            <motion.div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2">Coming Soon</h3>
                <div className="text-3xl font-bold text-purple-400">{integrations.filter(i => i.status === 'coming-soon').length}</div>
                <div className="text-xs text-slate-400 mt-1">In development</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                activeTab === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations
            .filter(integration => activeTab === 'all' || integration.category.toLowerCase() === activeTab)
            .map((integration, index) => (
              <motion.div
                key={integration.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedIntegration(integration)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-gradient-to-r from-${integration.color}-500 to-${integration.color}-600 rounded-full flex items-center justify-center text-2xl`}>
                      {integration.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{integration.name}</h3>
                      <p className="text-slate-400 text-sm">{integration.category}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    integration.status === 'active' ? 'bg-green-600 text-white' :
                    integration.status === 'beta' ? 'bg-yellow-600 text-white' :
                    'bg-purple-600 text-white'
                  }`}>
                    {integration.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>

                <p className="text-slate-300 text-sm mb-4 leading-relaxed">{integration.description}</p>

                <div className="space-y-2 mb-4">
                  {integration.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm">
                      <span className="text-green-400">✓</span>
                      <span className="text-slate-300">{feature}</span>
                    </div>
                  ))}
                  {integration.features.length > 3 && (
                    <div className="text-slate-400 text-sm">
                      +{integration.features.length - 3} more features
                    </div>
                  )}
                </div>

                <div className="flex space-x-3">
                  <button className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all ${
                    integration.status === 'active' 
                      ? `bg-gradient-to-r from-${integration.color}-600 to-${integration.color}-700 text-white hover:from-${integration.color}-700 hover:to-${integration.color}-800`
                      : 'bg-slate-600 text-slate-300 cursor-not-allowed'
                  }`}>
                    {integration.status === 'active' ? 'Integrate' : 'Coming Soon'}
                  </button>
                  {integration.documentation && (
                    <button className="px-4 py-2 bg-slate-700 text-white rounded-lg font-medium text-sm hover:bg-slate-600 transition-colors">
                      📚 Docs
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
        </div>

        {/* Integration Details Modal */}
        <AnimatePresence>
          {selectedIntegration && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedIntegration(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-r from-${selectedIntegration.color}-500 to-${selectedIntegration.color}-600 rounded-full flex items-center justify-center text-3xl`}>
                      {selectedIntegration.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedIntegration.name}</h2>
                      <p className="text-slate-400">{selectedIntegration.category}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedIntegration(null)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-slate-300 mb-6 leading-relaxed">{selectedIntegration.description}</p>

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-4">Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedIntegration.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <span className="text-green-400">✓</span>
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                    selectedIntegration.status === 'active' 
                      ? `bg-gradient-to-r from-${selectedIntegration.color}-600 to-${selectedIntegration.color}-700 text-white hover:from-${selectedIntegration.color}-700 hover:to-${selectedIntegration.color}-800`
                      : 'bg-slate-600 text-slate-300 cursor-not-allowed'
                  }`}>
                    {selectedIntegration.status === 'active' ? '🚀 Start Integration' : '⏳ Coming Soon'}
                  </button>
                  {selectedIntegration.documentation && (
                    <button className="px-6 py-3 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition-colors">
                      📚 Documentation
                    </button>
                  )}
                </div>
              </motion.div>
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
              <span>Partner Integrations</span>
              <span className="text-blue-400">●</span>
              <span>Powered by VibeCode AI</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 