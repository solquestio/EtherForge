import { createConfig, http } from 'wagmi';
import { mainnet, sepolia, polygon, optimism, arbitrum } from 'viem/chains';

// 1. Get project ID from environment variables with debug logging
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

// Debug logging to help diagnose the issue
console.log('Environment check:');
console.log('- process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID:', process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID);
console.log('- projectId:', projectId);
console.log('- projectId length:', projectId.length);

// 2. Configure supported chains
const appChains = [mainnet, sepolia, polygon, optimism, arbitrum] as const;

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

export { projectId };

// Export the chains for use in the app
export const chains = [...appChains] as const;
