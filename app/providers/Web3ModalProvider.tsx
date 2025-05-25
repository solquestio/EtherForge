'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import * as ethers from 'ethers';
import { config } from '../config/web3';

interface Web3ContextType {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  provider: any;
  signer: any;
}

const Web3Context = createContext<Web3ContextType>({
  isConnected: false,
  address: null,
  chainId: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  provider: null,
  signer: null,
});

export const useWeb3 = () => useContext(Web3Context);

export const Web3ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [provider, setProvider] = useState<any>(null);
  const [signer, setSigner] = useState<any>(null);

  const connectWallet = async (): Promise<void> => {
    try {
      // This is handled by wagmi hooks in the main component
      console.log('Connect wallet called - handled by wagmi');
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setIsConnected(false);
      setAddress(null);
      setChainId(null);
      setProvider(null);
      setSigner(null);
    }
  };

  const disconnectWallet = () => {
    // This is handled by wagmi hooks in the main component
    console.log('Disconnect wallet called - handled by wagmi');
    setIsConnected(false);
    setAddress(null);
    setChainId(null);
    setProvider(null);
    setSigner(null);
  };

  // Check if wallet is already connected on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if there's a cached provider in localStorage
      const cachedProvider = localStorage.getItem('WEB3_CONNECT_CACHED_PROVIDER');
      if (cachedProvider) {
        connectWallet();
      }
    }
  }, []);

  // Setup event listeners for wallet changes
  useEffect(() => {
    if (provider && provider.provider && typeof provider.provider.on === 'function') {
      // Subscribe to accounts change
      provider.provider.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setAddress(accounts[0]);
          connectWallet();
        }
      });

      // Subscribe to chainId change
      provider.provider.on('chainChanged', (chainId: string) => {
        setChainId(parseInt(chainId, 16));
        connectWallet();
      });

      // Subscribe to provider disconnection
      provider.provider.on('disconnect', () => {
        disconnectWallet();
      });

      return () => {
        if (provider?.provider?.removeListener) {
          provider.provider.removeListener('accountsChanged', () => {});
          provider.provider.removeListener('chainChanged', () => {});
          provider.provider.removeListener('disconnect', () => {});
        }
      };
    }
  }, [provider]);

  return (
    <Web3Context.Provider
      value={{
        isConnected,
        address,
        chainId,
        connectWallet,
        disconnectWallet,
        provider,
        signer,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
