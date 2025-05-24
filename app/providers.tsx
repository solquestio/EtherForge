'use client';

import React, { useEffect, useState } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config, projectId } from './config/web3';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

interface Web3ModalProviderProps {
  children: React.ReactNode;
}

export function Web3ModalProvider({ 
  children, 
}: Web3ModalProviderProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // If not mounted on client, don't render anything
  // This ensures all children (including ClientHeader) and context providers
  // are only rendered client-side after this component has mounted.
  if (!mounted) {
    return null; 
  }

  // Once mounted, render the providers and children
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children} {/* Children are now guaranteed to render after mount */}

        {/* Display a warning if projectId is missing, but only after mount */}
        {!projectId && (
          <div style={{position: 'fixed', bottom: '10px', left: '10px', background: '#ef4444', color: 'white', padding: '10px', borderRadius: '6px', zIndex: 1000, fontSize: '12px'}}>
            ⚠️ Missing WalletConnect Project ID. Get one at cloud.walletconnect.com
          </div>
        )}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
