'use client';

import { useAccount } from 'wagmi';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { WalletConnectButtonWrapper } from './WalletConnectButtonWrapper';

export function ClientHeader() {
  const { theme, setTheme } = useTheme();
  const { isConnected, address } = useAccount();
  // const { connect, connectors } = useConnect(); // connect and connectors not used directly, WalletConnectButton handles connection

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // The `useTheme` hook might return `undefined` for `theme` until mounted.
  // We need to ensure we don't pass undefined to class comparisons or button logic.
  // A simple way is to pick a default or not render the theme toggle until theme is defined.
  // For simplicity, let's assume 'light' if theme is undefined during initial render phases.
  const currentTheme = theme || 'light';

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Web3 Project Generator
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {currentTheme === 'dark' ? (
                <SunIcon className="h-5 w-5 text-yellow-400" />
              ) : (
                <MoonIcon className="h-5 w-5 text-gray-600" />
              )}
            </button>
            <WalletConnectButtonWrapper />
          </div>
        </div>
      </div>
    </header>
  );
}
