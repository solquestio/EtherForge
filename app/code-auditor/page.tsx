'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuditResult {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  title: string;
  description: string;
  line?: number;
  suggestion: string;
  category: string;
  gasImpact?: string;
}

interface AuditStats {
  totalIssues: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  gasOptimization: number;
  securityScore: number;
}

export default function CodeAuditorUI() {
  const [activeTab, setActiveTab] = useState('upload');
  const [loading, setLoading] = useState(false);
  const [auditResults, setAuditResults] = useState<AuditResult[]>([]);
  const [code, setCode] = useState('');
  const [fileName, setFileName] = useState('');

  const mockAuditResults: AuditResult[] = [
    {
      id: '1',
      severity: 'critical',
      title: 'Reentrancy Vulnerability',
      description: 'External call before state update creates reentrancy risk',
      line: 45,
      suggestion: 'Use ReentrancyGuard from OpenZeppelin or apply checks-effects-interactions pattern',
      category: 'Security',
      gasImpact: '+500 gas'
    },
    {
      id: '2',
      severity: 'high',
      title: 'Integer Overflow Risk',
      description: 'Arithmetic operations without SafeMath protection',
      line: 78,
      suggestion: 'Use OpenZeppelin SafeMath library or Solidity 0.8+ built-in overflow protection',
      category: 'Security'
    },
    {
      id: '3',
      severity: 'medium',
      title: 'Access Control Missing',
      description: 'Critical function lacks proper access control',
      line: 92,
      suggestion: 'Implement OpenZeppelin AccessControl or Ownable pattern',
      category: 'Access Control'
    },
    {
      id: '4',
      severity: 'low',
      title: 'Gas Optimization Opportunity',
      description: 'Storage variable could be packed to save gas',
      line: 23,
      suggestion: 'Reorder struct members to optimize storage slots',
      category: 'Gas Optimization',
      gasImpact: '-2000 gas per deployment'
    },
    {
      id: '5',
      severity: 'info',
      title: 'Documentation Missing',
      description: 'Function lacks NatSpec documentation',
      line: 56,
      suggestion: 'Add @dev, @param, and @return tags for better documentation',
      category: 'Documentation'
    }
  ];

  const auditStats: AuditStats = {
    totalIssues: mockAuditResults.length,
    critical: mockAuditResults.filter(r => r.severity === 'critical').length,
    high: mockAuditResults.filter(r => r.severity === 'high').length,
    medium: mockAuditResults.filter(r => r.severity === 'medium').length,
    low: mockAuditResults.filter(r => r.severity === 'low').length,
    gasOptimization: mockAuditResults.filter(r => r.category === 'Gas Optimization').length,
    securityScore: 7.2
  };

  const runAudit = async () => {
    setLoading(true);
    setActiveTab('results');
    
    // Simulate audit process
    setTimeout(() => {
      setAuditResults(mockAuditResults);
      setLoading(false);
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-900/30 border-red-600/30';
      case 'high': return 'text-orange-400 bg-orange-900/30 border-orange-600/30';
      case 'medium': return 'text-yellow-400 bg-yellow-900/30 border-yellow-600/30';
      case 'low': return 'text-blue-400 bg-blue-900/30 border-blue-600/30';
      case 'info': return 'text-slate-400 bg-slate-900/30 border-slate-600/30';
      default: return 'text-slate-400 bg-slate-900/30 border-slate-600/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">🛡️ AI Code Auditor</h1>
              <span className="text-sm text-slate-400">Powered by OpenZeppelin + VibeCode AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/" className="text-slate-400 hover:text-white transition-colors text-sm">
                ← Back to Generator
              </a>
              <button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-all transform hover:scale-105">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Audit Stats */}
      {auditResults.length > 0 && (
        <div className="bg-slate-800/30 border-b border-slate-700">
          <div className="container mx-auto px-6 py-6">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <motion.div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="text-center">
                  <h3 className="text-sm font-semibold text-white mb-1">Security Score</h3>
                  <div className="text-2xl font-bold text-green-400">{auditStats.securityScore}/10</div>
                </div>
              </motion.div>

              <motion.div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <div className="text-center">
                  <h3 className="text-sm font-semibold text-white mb-1">Critical</h3>
                  <div className="text-2xl font-bold text-red-400">{auditStats.critical}</div>
                </div>
              </motion.div>

              <motion.div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <div className="text-center">
                  <h3 className="text-sm font-semibold text-white mb-1">High</h3>
                  <div className="text-2xl font-bold text-orange-400">{auditStats.high}</div>
                </div>
              </motion.div>

              <motion.div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <div className="text-center">
                  <h3 className="text-sm font-semibold text-white mb-1">Medium</h3>
                  <div className="text-2xl font-bold text-yellow-400">{auditStats.medium}</div>
                </div>
              </motion.div>

              <motion.div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <div className="text-center">
                  <h3 className="text-sm font-semibold text-white mb-1">Low</h3>
                  <div className="text-2xl font-bold text-blue-400">{auditStats.low}</div>
                </div>
              </motion.div>

              <motion.div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <div className="text-center">
                  <h3 className="text-sm font-semibold text-white mb-1">Gas Opts</h3>
                  <div className="text-2xl font-bold text-purple-400">{auditStats.gasOptimization}</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 bg-slate-800/50 rounded-xl p-1 mb-8 max-w-lg mx-auto">
          {['upload', 'results', 'integrations'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all capitalize ${
                activeTab === tab
                  ? 'bg-red-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-2xl font-bold text-white mb-8 text-center">🛡️ Smart Contract Security Audit</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upload Section */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-6">Upload Contract</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Contract File</label>
                      <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-red-500 transition-colors cursor-pointer">
                        <div className="text-4xl mb-4">📄</div>
                        <p className="text-white font-medium mb-2">Drop your Solidity file here</p>
                        <p className="text-slate-400 text-sm">or click to browse</p>
                        <input type="file" className="hidden" accept=".sol" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Or paste your code</label>
                      <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    // Your smart contract code here
}"
                        className="w-full h-64 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white font-mono text-sm focus:ring-2 focus:ring-red-500 resize-none"
                      />
                    </div>

                    <button 
                      onClick={runAudit}
                      disabled={!code.trim()}
                      className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:from-slate-600 disabled:to-slate-600 text-white py-4 rounded-lg font-medium transition-all transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
                    >
                      🛡️ Run Security Audit
                    </button>
                  </div>
                </div>

                {/* Features Section */}
                <div className="space-y-6">
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">🔍 Audit Features</h3>
                    
                    <div className="space-y-4">
                      {[
                        { icon: '🛡️', title: 'Security Vulnerabilities', desc: 'Reentrancy, overflow, access control' },
                        { icon: '⛽', title: 'Gas Optimization', desc: 'Storage packing, function optimization' },
                        { icon: '📋', title: 'Best Practices', desc: 'OpenZeppelin patterns, coding standards' },
                        { icon: '🔗', title: 'Dependency Analysis', desc: 'Library version checks, known issues' },
                        { icon: '📊', title: 'Complexity Analysis', desc: 'Cyclomatic complexity, maintainability' },
                        { icon: '🤖', title: 'AI-Powered Insights', desc: 'Advanced pattern recognition' }
                      ].map((feature, index) => (
                        <motion.div
                          key={feature.title}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <span className="text-2xl">{feature.icon}</span>
                          <div>
                            <h4 className="text-white font-medium">{feature.title}</h4>
                            <p className="text-slate-400 text-sm">{feature.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">🏆 Audit Standards</h3>
                    
                    <div className="space-y-3">
                      {[
                        'OpenZeppelin Security Patterns',
                        'OWASP Smart Contract Top 10',
                        'ConsenSys Best Practices',
                        'SWC Registry Vulnerabilities',
                        'Gas Optimization Techniques'
                      ].map((standard, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <span className="text-green-400">✓</span>
                          <span className="text-slate-300 text-sm">{standard}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-6xl mx-auto"
            >
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-4"></div>
                  <p className="text-white text-lg mb-2">Running comprehensive security audit...</p>
                  <p className="text-slate-400">This may take a few moments</p>
                </div>
              ) : auditResults.length > 0 ? (
                <>
                  <h2 className="text-2xl font-bold text-white mb-8 text-center">📊 Audit Results</h2>
                  
                  <div className="space-y-4">
                    {auditResults.map((result, index) => (
                      <motion.div
                        key={result.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`border rounded-xl p-6 ${getSeverityColor(result.severity)}`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-bold text-white">{result.title}</h3>
                              <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${
                                result.severity === 'critical' ? 'bg-red-600 text-white' :
                                result.severity === 'high' ? 'bg-orange-600 text-white' :
                                result.severity === 'medium' ? 'bg-yellow-600 text-white' :
                                result.severity === 'low' ? 'bg-blue-600 text-white' :
                                'bg-slate-600 text-white'
                              }`}>
                                {result.severity}
                              </span>
                              <span className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs">
                                {result.category}
                              </span>
                            </div>
                            <p className="text-slate-300 text-sm mb-3">{result.description}</p>
                            {result.line && (
                              <p className="text-slate-400 text-xs mb-3">📍 Line {result.line}</p>
                            )}
                          </div>
                          {result.gasImpact && (
                            <div className="text-right">
                              <span className="text-purple-400 text-sm font-medium">{result.gasImpact}</span>
                            </div>
                          )}
                        </div>

                        <div className="bg-slate-900/50 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">💡 Recommendation</h4>
                          <p className="text-slate-300 text-sm">{result.suggestion}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-4 justify-center">
                    <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all">
                      📄 Download Report
                    </button>
                    <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all">
                      🔄 Re-run Audit
                    </button>
                    <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 transition-all">
                      🤖 AI Fix Suggestions
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🛡️</div>
                  <p className="text-white text-lg mb-2">No audit results yet</p>
                  <p className="text-slate-400">Upload and audit a smart contract to see results</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'integrations' && (
            <motion.div
              key="integrations"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-2xl font-bold text-white mb-8 text-center">🔗 Security Integrations</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    name: 'OpenZeppelin',
                    desc: 'Security patterns and contract templates',
                    features: ['AccessControl', 'ReentrancyGuard', 'SafeMath', 'Ownable'],
                    status: 'Active',
                    icon: '🛡️'
                  },
                  {
                    name: 'Slither',
                    desc: 'Static analysis framework for Solidity',
                    features: ['Vulnerability Detection', 'Code Quality', 'Optimization', 'Best Practices'],
                    status: 'Active',
                    icon: '🔍'
                  },
                  {
                    name: 'MythX',
                    desc: 'Security analysis platform for Ethereum',
                    features: ['Deep Analysis', 'SWC Coverage', 'CI/CD Integration', 'Team Collaboration'],
                    status: 'Beta',
                    icon: '🧙‍♂️'
                  },
                  {
                    name: 'Formal Verification',
                    desc: 'Mathematical proof of contract correctness',
                    features: ['Property Verification', 'Invariant Checking', 'Symbolic Execution', 'Model Checking'],
                    status: 'Coming Soon',
                    icon: '📐'
                  }
                ].map((integration, index) => (
                  <motion.div
                    key={integration.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-3xl">{integration.icon}</span>
                      <div>
                        <h3 className="text-lg font-bold text-white">{integration.name}</h3>
                        <p className="text-slate-400 text-sm">{integration.desc}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      {integration.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm">
                          <span className="text-green-400">✓</span>
                          <span className="text-slate-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        integration.status === 'Active' ? 'bg-green-600 text-white' :
                        integration.status === 'Beta' ? 'bg-yellow-600 text-white' :
                        'bg-purple-600 text-white'
                      }`}>
                        {integration.status}
                      </span>
                      <button className="text-red-400 hover:text-red-300 text-sm font-medium">
                        Configure →
                      </button>
                    </div>
                  </motion.div>
                ))}
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
              <span>AI Code Auditor</span>
              <span className="text-red-400">●</span>
              <span>Powered by VibeForge</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 
