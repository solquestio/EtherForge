// WalletConnect project ID
export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

// Default chain ID for the application
export const DEFAULT_CHAIN_ID = 11155111; // Sepolia testnet

// Contract addresses (add your contract addresses here)
export const CONTRACT_ADDRESSES = {
  // Example:
  // MY_CONTRACT: '0x1234...'
};

// API endpoints
export const API_ENDPOINTS = {
  ALCHEMY_SEPOLIA: `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
};

// Application metadata
export const APP_METADATA = {
  name: 'Web3 AI Platform',
  description: 'Build and deploy smart contracts with AI assistance',
  url: 'https://your-website.com',
  icons: ['https://your-website.com/logo.png']
};
