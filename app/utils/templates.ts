export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  estimatedTime: string;
  category: string;
  tags: string[];
  complexity: 'Beginner' | 'Intermediate' | 'Advanced';
  features: string[];
}

export const projectTemplates: ProjectTemplate[] = [
  {
    id: 'nft-marketplace',
    name: 'NFT Marketplace',
    description: 'Complete marketplace with minting, trading, and royalties. Includes auction features and creator tools.',
    icon: '🎨',
    estimatedTime: '3-5 min',
    category: 'NFT',
    tags: ['ERC-721', 'Marketplace', 'Auctions', 'Royalties'],
    complexity: 'Intermediate',
    features: [
      'NFT Minting & Trading',
      'Auction System',
      'Royalty Distribution',
      'Creator Dashboard',
      'Collection Management'
    ]
  },
  {
    id: 'defi-lending',
    name: 'DeFi Lending',
    description: 'Decentralized lending protocol with collateral management, yield farming, and liquidity pools.',
    icon: '🏦',
    estimatedTime: '4-6 min',
    category: 'DeFi',
    tags: ['Lending', 'Borrowing', 'Yield', 'Collateral'],
    complexity: 'Advanced',
    features: [
      'Lending & Borrowing',
      'Collateral Management',
      'Yield Farming',
      'Liquidity Pools',
      'Risk Assessment'
    ]
  },
  {
    id: 'dao-governance',
    name: 'DAO Governance',
    description: 'Decentralized governance platform with proposal creation, voting mechanisms, and treasury management.',
    icon: '🗳️',
    estimatedTime: '3-4 min',
    category: 'Governance',
    tags: ['DAO', 'Voting', 'Treasury', 'Proposals'],
    complexity: 'Intermediate',
    features: [
      'Proposal System',
      'Token-based Voting',
      'Treasury Management',
      'Member Management',
      'Execution Framework'
    ]
  },
  {
    id: 'token-launch',
    name: 'Token Launch',
    description: 'Complete token launch platform with vesting schedules, airdrops, and tokenomics dashboard.',
    icon: '🚀',
    estimatedTime: '2-3 min',
    category: 'Token',
    tags: ['ERC-20', 'Vesting', 'Airdrop', 'Launch'],
    complexity: 'Beginner',
    features: [
      'Token Creation',
      'Vesting Schedules',
      'Airdrop System',
      'Tokenomics Dashboard',
      'Distribution Tools'
    ]
  },
  {
    id: 'gamefi-project',
    name: 'GameFi Platform',
    description: 'Play-to-earn gaming platform with NFT rewards, leaderboards, and in-game economy.',
    icon: '🎮',
    estimatedTime: '5-7 min',
    category: 'Gaming',
    tags: ['GameFi', 'P2E', 'NFT', 'Gaming'],
    complexity: 'Advanced',
    features: [
      'Game Mechanics',
      'NFT Rewards',
      'Leaderboards',
      'In-game Currency',
      'Player Progression'
    ]
  },
  {
    id: 'social-dapp',
    name: 'Social dApp',
    description: 'Decentralized social platform with creator monetization, NFT profiles, and community features.',
    icon: '👥',
    estimatedTime: '4-5 min',
    category: 'Social',
    tags: ['Social', 'Creator', 'Community', 'Monetization'],
    complexity: 'Intermediate',
    features: [
      'User Profiles',
      'Creator Monetization',
      'Community Features',
      'NFT Integration',
      'Decentralized Identity'
    ]
  },
  {
    id: 'cross-chain-bridge',
    name: 'Cross-Chain Bridge',
    description: 'Multi-chain bridge for asset transfers between Ethereum, Polygon, Arbitrum, and Optimism.',
    icon: '🌉',
    estimatedTime: '6-8 min',
    category: 'Infrastructure',
    tags: ['Bridge', 'Multi-chain', 'Interoperability'],
    complexity: 'Advanced',
    features: [
      'Asset Bridging',
      'Multi-chain Support',
      'Security Validation',
      'Fee Optimization',
      'Transaction Tracking'
    ]
  },
  {
    id: 'prediction-market',
    name: 'Prediction Market',
    description: 'Decentralized prediction market for crypto prices, sports, and events with oracle integration.',
    icon: '🔮',
    estimatedTime: '4-6 min',
    category: 'DeFi',
    tags: ['Prediction', 'Oracle', 'Betting', 'Market'],
    complexity: 'Advanced',
    features: [
      'Market Creation',
      'Oracle Integration',
      'Betting Mechanics',
      'Result Resolution',
      'Payout System'
    ]
  },
  {
    id: 'multi-sig-wallet',
    name: 'Multi-Sig Wallet',
    description: 'Team treasury management with multi-signature security, spending limits, and approval workflows.',
    icon: '🔐',
    estimatedTime: '3-4 min',
    category: 'Security',
    tags: ['Multi-sig', 'Security', 'Treasury', 'Team'],
    complexity: 'Intermediate',
    features: [
      'Multi-signature Security',
      'Spending Limits',
      'Approval Workflows',
      'Team Management',
      'Transaction History'
    ]
  },
  {
    id: 'yield-farming',
    name: 'Yield Farming',
    description: 'Automated yield farming platform with strategy optimization and reward distribution.',
    icon: '🌾',
    estimatedTime: '5-6 min',
    category: 'DeFi',
    tags: ['Yield', 'Farming', 'Strategy', 'Rewards'],
    complexity: 'Advanced',
    features: [
      'Strategy Optimization',
      'Automated Farming',
      'Reward Distribution',
      'Risk Management',
      'Portfolio Tracking'
    ]
  },
  {
    id: 'ai-marketplace',
    name: 'AI Model Marketplace',
    description: 'Decentralized marketplace for AI models with usage tracking, payments, and quality assurance.',
    icon: '🤖',
    estimatedTime: '4-5 min',
    category: 'AI',
    tags: ['AI', 'Marketplace', 'Models', 'Innovation'],
    complexity: 'Advanced',
    features: [
      'Model Marketplace',
      'Usage Tracking',
      'Payment Integration',
      'Quality Assurance',
      'Developer Tools'
    ]
  }
];

// Helper functions
export const getTemplateById = (id: string): ProjectTemplate | undefined => {
  return projectTemplates.find(template => template.id === id);
};

export const getTemplatesByCategory = (category: string): ProjectTemplate[] => {
  return projectTemplates.filter(template => template.category === category);
};

export const getTemplatesByComplexity = (complexity: ProjectTemplate['complexity']): ProjectTemplate[] => {
  return projectTemplates.filter(template => template.complexity === complexity);
};

export const getFeaturedTemplates = (): ProjectTemplate[] => {
  // Return the most popular/featured templates
  return projectTemplates.slice(0, 6);
}; 