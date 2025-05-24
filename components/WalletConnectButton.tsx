'use client';

import { useAccount, useDisconnect } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react'; // Import useWeb3Modal
import { useRouter } from 'next/navigation';

export function WalletConnectButton() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal(); // Use the hook
  const router = useRouter();

  const handleDisconnect = () => {
    disconnect();
    router.refresh();
  };
  
  // Wallet not configured warning (can remain as is, or be handled by Web3Modal's UI if preferred)
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
      onClick={() => open()} // Call open to trigger Web3Modal
      className="px-4 py-2 rounded-md bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium hover:from-green-500 hover:to-blue-600 transition-colors"
    >
      Connect Wallet
    </button>
  );
}
