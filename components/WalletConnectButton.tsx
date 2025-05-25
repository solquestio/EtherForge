'use client';

import { useAccount, useDisconnect } from 'wagmi';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export function WalletConnectButton() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const [web3Modal, setWeb3Modal] = useState<any>(null);

  useEffect(() => {
    // Initialize Web3Modal on client side
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID) {
      import('@web3modal/wagmi/react').then(({ createWeb3Modal }) => {
        const modal = createWeb3Modal({
          wagmiConfig: require('../app/config/web3').config,
          projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
          enableAnalytics: true,
          themeMode: 'dark',
          themeVariables: {
            '--w3m-color-mix': '#6366f1',
            '--w3m-font-family': 'Inter, sans-serif',
          },
        });
        setWeb3Modal(modal);
      }).catch(console.error);
    }
  }, []);

  const handleConnect = async () => {
    if (web3Modal) {
      try {
        await web3Modal.open();
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    }
  };

  const handleDisconnect = () => {
    disconnect();
    router.refresh();
  };
  
  // Wallet not configured warning
  if (!process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID) {
    return (
      <button 
        disabled
        className="px-4 py-2 rounded-md bg-yellow-100 text-yellow-800 text-sm font-medium cursor-not-allowed"
        title="WalletConnect not configured. Set NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID in .env.local"
      >
        Wallet Not Configured
      </button>
    );
  }

  if (isConnected && address) {
    const shortenedAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {shortenedAddress}
        </span>
        <button 
          onClick={handleDisconnect}
          className="px-3 py-1.5 text-sm rounded-md border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={handleConnect}
      disabled={!web3Modal}
      className="px-4 py-2 rounded-md bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium hover:from-green-500 hover:to-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {web3Modal ? 'Connect Wallet' : 'Loading...'}
    </button>
  );
}
