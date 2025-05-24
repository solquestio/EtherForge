import { createConfig, http } from 'wagmi';
import { mainnet, sepolia, polygon, optimism, arbitrum } from 'viem/chains';

// 1. Get project ID from environment variables
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

// 2. Configure supported chains
const appChains = [mainnet, sepolia, polygon, optimism, arbitrum] as const;
type Chain = typeof appChains[number];

// 3. Create wagmi config
export const config = createConfig({
  chains: [...appChains],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
  },
  ssr: false,
});

// 4. Only set up Web3Modal on client side and if projectId exists
let web3Modal: any = null;

if (typeof window !== 'undefined' && projectId) {
  // Dynamic import to avoid SSR issues
  import('@web3modal/wagmi/react').then(({ createWeb3Modal }) => {
    web3Modal = createWeb3Modal({
      wagmiConfig: config,
      projectId,
      enableAnalytics: true,
      themeMode: 'dark',
      themeVariables: {
        '--w3m-color-mix': '#6366f1',
        '--w3m-font-family': 'Inter, sans-serif',
      },
    });
  }).catch(console.error);
}

// Export the web3Modal instance
export { web3Modal };

// Wallet connection functions
export const connectWallet = async () => {
  if (web3Modal) {
    try {
      await web3Modal.open();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  }
};

export const disconnectWallet = async () => {
  if (web3Modal) {
    try {
      await web3Modal.close();
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  }
};

export { projectId };

// Export the chains for use in the app
export const chains = [...appChains] as const;
