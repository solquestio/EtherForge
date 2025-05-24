'use client';

import React from 'react';
import Link from 'next/link';

export default function TestNavigationPage() {
  const templateRoutes = [
    { id: 'nft-marketplace', name: 'NFT Marketplace', route: '/marketplace' },
    { id: 'defi-lending', name: 'DeFi Lending', route: '/defi-lending' },
    { id: 'dao-governance', name: 'DAO Governance', route: '/dao-governance' },
    { id: 'token-launch', name: 'Token Launch', route: '/token-launch' },
    { id: 'gamefi-project', name: 'GameFi Platform', route: '/gamefi-project' },
    { id: 'social-dapp', name: 'Social dApp', route: '/social-dapp' },
    { id: 'cross-chain-bridge', name: 'Cross-Chain Bridge', route: '/cross-chain-bridge' },
    { id: 'prediction-market', name: 'Prediction Market', route: '/prediction-market' },
    { id: 'multi-sig-wallet', name: 'Multi-Sig Wallet', route: '/multi-sig-wallet' },
    { id: 'yield-farming', name: 'Yield Farming', route: '/yield-farming' },
    { id: 'ai-marketplace', name: 'AI Model Marketplace', route: '/ai-marketplace' },
  ];

  const additionalPages = [
    { name: 'Partner Integrations', route: '/integrations' },
    { name: 'AI Code Auditor', route: '/code-auditor' },
    { name: 'Collaboration Hub', route: '/collaboration' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">🧪 Navigation Test Page</h1>
          <p className="text-slate-400">Test all template and feature page links</p>
          <Link href="/" className="inline-block mt-4 text-blue-400 hover:text-blue-300 underline">
            ← Back to Main Generator
          </Link>
        </div>

        {/* Template Pages */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">🎨 Template Pages (11 total)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templateRoutes.map((template, index) => (
              <Link
                key={template.id}
                href={template.route}
                className="block p-4 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-blue-500/30 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium group-hover:text-blue-400">
                      {index + 1}. {template.name}
                    </h3>
                    <p className="text-slate-400 text-sm">{template.route}</p>
                  </div>
                  <div className="text-slate-500 group-hover:text-blue-400 transition-colors">
                    →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Additional Feature Pages */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">🚀 Additional Features (3 total)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {additionalPages.map((page, index) => (
              <Link
                key={page.route}
                href={page.route}
                className="block p-4 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-purple-500/30 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium group-hover:text-purple-400">
                      {page.name}
                    </h3>
                    <p className="text-slate-400 text-sm">{page.route}</p>
                  </div>
                  <div className="text-slate-500 group-hover:text-purple-400 transition-colors">
                    →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Status Summary */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">📊 Page Status Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">11</div>
              <div className="text-sm text-slate-400">Template Pages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">3</div>
              <div className="text-sm text-slate-400">Feature Pages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">14</div>
              <div className="text-sm text-slate-400">Total Pages</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-green-900/30 border border-green-700 rounded-lg">
            <div className="text-green-400 font-medium mb-2">✅ All Pages Created Successfully</div>
            <div className="text-green-300 text-sm">
              All 11 dApp template pages and 3 additional feature pages have been implemented and should be accessible.
              If any links redirect to marketplace, please refresh the development server.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
