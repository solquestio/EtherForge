'use client';

import React, { useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useAccount } from 'wagmi';
import dynamic from 'next/dynamic';

// Import WalletConnectButton with SSR disabled
const WalletConnectButton = dynamic(
  () => import('./WalletConnectButton').then((mod) => mod.WalletConnectButton),
  { ssr: false }
);

interface HeaderProps {
  isConnected: boolean;
  address?: string;
  onConnect: () => void;
}

export function Header({ isConnected, address, onConnect }: HeaderProps) {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 relative flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="currentColor"/>
                  </svg>
                </div>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                VibeCode
              </span>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <a href="#" className="text-green-500 border-b-2 border-green-500 px-3 py-1 text-sm font-medium hover:bg-green-500/10 rounded-lg transition-colors">
                Home
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium rounded-lg transition-colors">
                Features
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium rounded-lg transition-colors">
                Documentation
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium rounded-lg transition-colors">
                Pricing
              </a>
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              {darkMode ? (
                <SunIcon className="h-5 w-5" aria-hidden="true" />
              ) : (
                <MoonIcon className="h-5 w-5" aria-hidden="true" />
              )}
              <span className="sr-only">Toggle dark mode</span>
            </button>

            <div className="ml-4">
              <WalletConnectButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
