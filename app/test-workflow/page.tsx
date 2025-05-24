'use client';

import React from 'react';
import Link from 'next/link';

export default function TestWorkflowPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">⚡ EtherForge Workflow Test</h1>
          <p className="text-slate-400 mb-6">Test the improved template interaction flow</p>
          <Link href="/" className="inline-block text-blue-400 hover:text-blue-300 underline">
            ← Back to Main Generator
          </Link>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">✨ New Workflow</h2>
          <div className="space-y-4 text-slate-300">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">1️⃣</span>
              <div>
                <div className="font-medium text-white">Click Template Button</div>
                <div className="text-sm text-slate-400">Automatically populates chat input and sends message</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">2️⃣</span>
              <div>
                <div className="font-medium text-white">AI Responds with Preview Link</div>
                <div className="text-sm text-slate-400">Response includes a clickable "📱 Preview UI" button</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">3️⃣</span>
              <div>
                <div className="font-medium text-white">Click Preview Link</div>
                <div className="text-sm text-slate-400">Populates the Live UI Preview box on the right</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">4️⃣</span>
              <div>
                <div className="font-medium text-white">Click "Full Page" Button</div>
                <div className="text-sm text-slate-400">Opens the complete template page in new tab</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-900/30 border border-green-700 rounded-xl p-6">
          <h3 className="text-green-400 font-medium mb-2">✅ Ready to Test!</h3>
          <p className="text-green-300 text-sm mb-4">
            Go back to the main page and try clicking on any template. The workflow should now be:
          </p>
          <ol className="text-green-300 text-sm space-y-1 ml-4">
            <li>• Click template → auto-sends chat message</li>
            <li>• AI responds with preview link</li>
            <li>• Click preview link → shows UI in preview box</li>
            <li>• Click "Full Page" → opens complete template page</li>
          </ol>
        </div>

        <div className="mt-8 text-center">
          <Link 
            href="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105"
          >
            <span>🚀</span>
            <span>Test the New Workflow</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 