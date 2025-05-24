// AI Service for generating Web3 project files and UI

import { ProjectTemplate, getTemplateById } from './templates';

type ProjectType = 'dapp' | 'nft' | 'defi' | 'dao' | 'game' | 'marketplace' | 'learning';

interface CodeFile {
  name: string;
  content: string;
  language: string;
}

interface GeneratedUI {
  html: string;
  css: string;
  projectType: ProjectType;
  description: string;
}

interface GenerationResult {
  files: CodeFile[];
  ui: GeneratedUI;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  loading?: boolean;
  files?: GeneratedFile[];
  deploymentInfo?: DeploymentInfo;
}

export interface GeneratedFile {
  name: string;
  content: string;
  language: string;
  path?: string;
}

export interface DeploymentInfo {
  network: string;
  contractAddress: string;
  transactionHash: string;
  verified: boolean;
  gasUsed: string;
}

// Keyword mapping for intelligent responses
const KEYWORD_RESPONSES = {
  'nft marketplace': {
    templateId: 'nft-marketplace',
    response: `I'll create a complete NFT marketplace with advanced features for you! This will include:

• **ERC-721 & ERC-1155 support** for all NFT types
• **Built-in royalty system** for creators
• **Dutch & English auctions** for maximum price discovery  
• **Lazy minting** to save gas costs
• **Advanced search & filtering** for great UX
• **Mobile-responsive design** with dark/light themes

Generating smart contracts and UI now...

[📱 Preview UI: NFT Marketplace](nft-marketplace)`,
    estimatedTime: 120000 // 2 minutes
  },
  'defi lending': {
    templateId: 'defi-lending',
    response: `Perfect! I'm building an advanced DeFi lending protocol with institutional-grade features:

• **Multi-asset lending pools** (ETH, USDC, DAI, WBTC)
• **Dynamic interest rates** that adjust to market conditions
• **Liquidation protection** with early warning systems
• **Yield optimization** strategies built-in
• **Flash loan capabilities** for arbitrage
• **Governance integration** for protocol upgrades

This is a sophisticated protocol - generating contracts now...

[📱 Preview UI: DeFi Lending Protocol](defi-lending)`,
    estimatedTime: 300000 // 5 minutes
  },
  'dao governance': {
    templateId: 'dao-governance',
    response: `Excellent choice! Building a comprehensive DAO governance platform:

• **Proposal creation & voting** with multiple voting mechanisms
• **Treasury management** with multi-sig security
• **Delegation system** for liquid democracy
• **Quadratic voting** to prevent whale dominance
• **Time-locked execution** for security
• **Cross-chain governance** capabilities

Creating governance contracts and admin dashboard...

[📱 Preview UI: DAO Governance Platform](dao-governance)`,
    estimatedTime: 180000 // 3 minutes
  },
  'token launch': {
    templateId: 'token-launch',
    response: `Great! Creating a professional token launch platform with everything you need:

• **ERC-20 token with advanced features** (burn, pause, permit)
• **Vesting schedules** for team and advisors
• **Staking rewards system** with configurable APY
• **Liquidity pool management** with DEX integration
• **Anti-bot protection** and whale limits
• **Real-time tokenomics dashboard**

Generating tokenomics and contracts now...

[📱 Preview UI: Token Launch Platform](token-launch)`,
    estimatedTime: 240000 // 4 minutes
  },
  'gamefi': {
    templateId: 'gamefi-project',
    response: `Amazing! Building a complete GameFi ecosystem with play-to-earn mechanics:

• **NFT character system** with RPG stats and progression
• **Tournament management** with automated brackets
• **Leaderboards & rankings** for competitive play
• **Play-to-earn mechanics** with sustainable tokenomics
• **Cross-game asset portability**
• **Battle system with fair RNG**

This is going to be epic - generating game contracts...

[📱 Preview UI: GameFi Platform](gamefi-project)`,
    estimatedTime: 240000 // 4 minutes
  },
  'social dapp': {
    templateId: 'social-dapp',
    response: `Fantastic! Creating a decentralized social platform with Web3 features:

• **Decentralized identity** with ENS integration
• **Creator monetization** through NFTs and tips
• **Community governance** with token-based voting
• **Content ownership** stored on IPFS
• **Cross-platform compatibility** with existing social media
• **Privacy-first architecture** with user control

Building the social revolution...

[📱 Preview UI: Social dApp Platform](social-dapp)`,
    estimatedTime: 240000 // 4 minutes
  },
  'cross-chain bridge': {
    templateId: 'cross-chain-bridge',
    response: `Excellent! Building a secure cross-chain bridge infrastructure:

• **Multi-chain support** (Ethereum, Polygon, Arbitrum, Optimism)
• **Asset bridging** with security validations
• **Liquidity optimization** for minimal fees
• **Real-time transaction tracking** across chains
• **Emergency pause mechanisms** for security
• **MEV protection** and sandwich attack prevention

Creating secure bridge contracts...

[📱 Preview UI: Cross-Chain Bridge](cross-chain-bridge)`,
    estimatedTime: 360000 // 6 minutes
  },
  'prediction market': {
    templateId: 'prediction-market',
    response: `Great choice! Building a decentralized prediction market platform:

• **Oracle integration** with Chainlink and other providers
• **Market creation** for any event or outcome
• **Automated resolution** with dispute mechanisms
• **Liquidity pools** for efficient price discovery
• **Risk management** and position limits
• **Mobile-optimized interface** for easy betting

Generating prediction contracts...

[📱 Preview UI: Prediction Market](prediction-market)`,
    estimatedTime: 300000 // 5 minutes
  },
  'multi-sig wallet': {
    templateId: 'multi-sig-wallet',
    response: `Perfect! Creating a secure multi-signature wallet solution:

• **Multi-signature security** with configurable thresholds
• **Team treasury management** with spending controls
• **Approval workflows** for transparent operations
• **Transaction batching** for gas efficiency
• **Emergency recovery** mechanisms
• **Mobile and hardware wallet support**

Building secure wallet infrastructure...

[📱 Preview UI: Multi-Sig Wallet](multi-sig-wallet)`,
    estimatedTime: 240000 // 4 minutes
  },
  'yield farming': {
    templateId: 'yield-farming',
    response: `Awesome! Creating an automated yield farming platform:

• **Strategy optimization** with automated rebalancing
• **Multi-protocol integration** (Uniswap, Aave, Compound)
• **Risk assessment** and position monitoring
• **Reward distribution** with fair allocation
• **Impermanent loss protection** strategies
• **Gas optimization** for maximum profits

Generating yield strategies...

[📱 Preview UI: Yield Farming Platform](yield-farming)`,
    estimatedTime: 300000 // 5 minutes
  },
  'ai marketplace': {
    templateId: 'ai-marketplace',
    response: `Innovative! Building a decentralized AI model marketplace:

• **Model marketplace** with quality assurance
• **Usage tracking** and fair payment distribution
• **Developer tools** for easy integration
• **Performance benchmarking** and reviews
• **Royalty distribution** for model creators
• **Compute resource management** with optimization

Creating the future of AI commerce...

[📱 Preview UI: AI Model Marketplace](ai-marketplace)`,
    estimatedTime: 300000 // 5 minutes
  }
};

const FALLBACK_RESPONSES = [
  `I understand you want to build something amazing! Let me suggest some popular Web3 project templates:

• **NFT Marketplace** - Complete marketplace with auctions & royalties
• **DeFi Lending** - Advanced lending protocol with yield optimization  
• **DAO Governance** - Decentralized governance with treasury management
• **Token Launch** - Professional token launch with vesting & staking
• **GameFi Platform** - Play-to-earn gaming with NFT rewards

Which one interests you most?`,

  `Great idea! I can help you build that. For the best results, try describing your project using specific keywords like:

• "NFT marketplace with auctions"
• "DeFi lending protocol"  
• "DAO governance platform"
• "Token launch with vesting"
• "GameFi platform"

This helps me generate the most accurate smart contracts and UI for your needs!`,

  `I'm excited to help you build this Web3 project! To give you the most relevant code generation, could you be more specific about:

• What type of Web3 application? (DeFi, NFT, DAO, Gaming, etc.)
• Key features you want included?
• Target blockchain? (Ethereum, Polygon, Arbitrum, etc.)

The more details you provide, the better I can customize the generated code!`
];

export class AIService {
  private conversationHistory: ChatMessage[] = [];

  constructor() {
    // Add welcome message
    this.conversationHistory.push({
      id: 'welcome',
      role: 'assistant',
      content: `🚀 **Welcome to VibeCode AI!** 

I'm your AI-powered Web3 development assistant. I can generate complete dApps with beautiful UIs in minutes!

**Popular Templates:**
• 🎨 **NFT Marketplace** - Complete with auctions & royalties (2 min)
• 💰 **DeFi Lending** - Advanced lending protocol (5 min)  
• 🏛️ **DAO Governance** - Decentralized governance platform (3 min)
• 🚀 **Token Launch** - Professional token launch suite (4 min)
• 🎮 **GameFi Platform** - Play-to-earn gaming platform (4 min)

Just describe what you want to build and I'll generate the smart contracts, UI, and deployment scripts for you!`,
      timestamp: new Date()
    });
  }

  async sendMessage(userMessage: string): Promise<ChatMessage[]> {
    // Add user message
    const userChatMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };
    
    this.conversationHistory.push(userChatMessage);

    // Add loading message
    const loadingMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      loading: true
    };
    
    this.conversationHistory.push(loadingMessage);

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Remove loading message
    this.conversationHistory.pop();

    // Generate response based on keywords
    const response = this.generateResponse(userMessage.toLowerCase());
    
    const assistantMessage: ChatMessage = {
      id: (Date.now() + 2).toString(),
      role: 'assistant',
      content: response.content,
      timestamp: new Date(),
      files: response.files,
      deploymentInfo: response.deploymentInfo
    };

    this.conversationHistory.push(assistantMessage);

    return [...this.conversationHistory];
  }

  private generateResponse(message: string): {
    content: string;
    files?: GeneratedFile[];
    deploymentInfo?: DeploymentInfo;
  } {
    // Check for keyword matches
    for (const [keyword, responseData] of Object.entries(KEYWORD_RESPONSES)) {
      if (message.includes(keyword)) {
        const template = getTemplateById(responseData.templateId);
        if (template) {
          return {
            content: responseData.response,
            files: this.generateFakeFiles(template.id),
            deploymentInfo: this.generateFakeDeployment()
          };
        }
      }
    }

    // Check for alternative keywords
    const altKeywords = {
      'gamefi platform': 'gamefi',
      'gaming': 'gamefi',
      'play to earn': 'gamefi',
      'social platform': 'social dapp',
      'social network': 'social dapp',
      'bridge': 'cross-chain bridge',
      'cross chain': 'cross-chain bridge',
      'betting': 'prediction market',
      'oracle': 'prediction market',
      'multisig': 'multi-sig wallet',
      'multi sig': 'multi-sig wallet',
      'farming': 'yield farming',
      'liquidity': 'yield farming',
      'artificial intelligence': 'ai marketplace',
      'machine learning': 'ai marketplace'
    };

    for (const [altKeyword, mainKeyword] of Object.entries(altKeywords)) {
      if (message.includes(altKeyword)) {
        const responseData = KEYWORD_RESPONSES[mainKeyword];
        if (responseData) {
          const template = getTemplateById(responseData.templateId);
          if (template) {
            return {
              content: responseData.response,
              files: this.generateFakeFiles(template.id),
              deploymentInfo: this.generateFakeDeployment()
            };
          }
        }
      }
    }

    // Check for specific deployment commands
    if (message.includes('deploy') || message.includes('launch')) {
      return {
        content: `🚀 **Deploying to Polygon Mainnet...**

✅ Smart contracts compiled successfully
✅ Gas estimation complete: ~0.08 MATIC
✅ Contracts deployed and verified
✅ Frontend deployed to IPFS
✅ Metadata uploaded to decentralized storage

Your dApp is now live! You can interact with it immediately.`,
        deploymentInfo: this.generateFakeDeployment()
      };
    }

    // Return fallback response
    const randomIndex = Math.floor(Math.random() * FALLBACK_RESPONSES.length);
    return {
      content: FALLBACK_RESPONSES[randomIndex]
    };
  }

  private generateFakeDeployment(): DeploymentInfo {
    const networks = ['Polygon', 'Ethereum', 'Arbitrum', 'Optimism'];
    const randomNetwork = networks[Math.floor(Math.random() * networks.length)];
    
    return {
      network: randomNetwork,
      contractAddress: this.generateFakeAddress(),
      transactionHash: this.generateFakeHash(),
      verified: true,
      gasUsed: (Math.random() * 0.5 + 0.02).toFixed(4) + ' MATIC'
    };
  }

  private generateFakeAddress(): string {
    const chars = '0123456789abcdef';
    let result = '0x';
    for (let i = 0; i < 40; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }

  private generateFakeHash(): string {
    const chars = '0123456789abcdef';
    let result = '0x';
    for (let i = 0; i < 64; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }

  private generateFakeFiles(templateId: string): GeneratedFile[] {
    const baseFiles: GeneratedFile[] = [
      {
        name: 'package.json',
        language: 'json',
        content: `{
  "name": "${templateId}-dapp",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@openzeppelin/contracts": "^4.8.0",
    "ethers": "^5.7.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "next": "^13.4.1",
    "typescript": "^4.9.4"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}`
      },
      {
        name: 'README.md',
        language: 'markdown',
        content: `# ${templateId.charAt(0).toUpperCase() + templateId.slice(1)} dApp

Built with VibeCode AI for ETH Dublin 2025

## Features
- Web3 Integration
- Modern UI/UX
- Smart Contract Integration
- Responsive Design

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Deploy

\`\`\`bash
npm run build
\`\`\`
`
      }
    ];

    // Add template-specific files
    switch (templateId) {
      case 'nft-marketplace':
        baseFiles.push({
          name: 'contracts/NFTMarketplace.sol',
          language: 'solidity',
          content: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTMarketplace is ReentrancyGuard {
    struct Listing {
        address seller;
        uint256 price;
        bool active;
    }
    
    mapping(address => mapping(uint256 => Listing)) public listings;
    
    event Listed(address indexed nft, uint256 indexed tokenId, uint256 price);
    event Sold(address indexed nft, uint256 indexed tokenId, address buyer);
    
    function listItem(address nftAddress, uint256 tokenId, uint256 price) external {
        IERC721(nftAddress).transferFrom(msg.sender, address(this), tokenId);
        listings[nftAddress][tokenId] = Listing(msg.sender, price, true);
        emit Listed(nftAddress, tokenId, price);
    }
}`
        });
        break;
      case 'defi-lending':
        baseFiles.push({
          name: 'contracts/LendingProtocol.sol',
          language: 'solidity',
          content: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LendingProtocol {
    mapping(address => uint256) public deposits;
    mapping(address => uint256) public borrows;
    
    uint256 public constant INTEREST_RATE = 500; // 5%
    
    function deposit(address token, uint256 amount) external {
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        deposits[msg.sender] += amount;
    }
    
    function borrow(address token, uint256 amount) external {
        require(deposits[msg.sender] * 2 >= amount, "Insufficient collateral");
        IERC20(token).transfer(msg.sender, amount);
        borrows[msg.sender] += amount;
    }
}`
        });
        break;
      default:
        baseFiles.push({
          name: `components/${templateId}UI.tsx`,
          language: 'typescript',
          content: `'use client';

import React from 'react';

export default function ${templateId.charAt(0).toUpperCase() + templateId.slice(1)}UI() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">
          ${templateId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} dApp
        </h1>
        <p className="text-slate-400">
          Generated by VibeCode AI - Ready for customization
        </p>
      </div>
    </div>
  );
}`
        });
        break;
    }

    return baseFiles;
  }

  getConversationHistory(): ChatMessage[] {
    return [...this.conversationHistory];
  }

  clearHistory(): void {
    this.conversationHistory = [];
  }
}

// Singleton instance
export const aiService = new AIService();

/**
 * Generate project files and UI based on user input
 */
export async function generateProjectFiles(
  userInput: string,
  projectType: ProjectType,
  projectName: string
): Promise<GenerationResult> {
  // In a real implementation, this would call an AI service
  // For now, we'll simulate the response with predefined templates
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate files based on project type
  const files = generateCodeFiles(projectType, projectName);
  
  // Generate UI based on project type
  const ui = generateUI(projectType, projectName);
  
  return { files, ui };
}

/**
 * Generate code files based on project type
 */
function generateCodeFiles(projectType: ProjectType, projectName: string): CodeFile[] {
  const files: CodeFile[] = [];
  
  // Common package.json file
  files.push({
    name: 'package.json',
    language: 'json',
    content: `{
  "name": "${projectName}",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@openzeppelin/contracts": "^4.8.0",
    "ethers": "^5.7.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "next": "^13.4.1",
    "typescript": "^4.9.4"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}`
  });
  
  // Add smart contract based on project type
  if (projectType === 'learning') {
    files.push({
      name: 'LearningPlatform.sol',
      language: 'solidity',
      content: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LearningPlatform is ERC721, Ownable {
    struct Quest {
        string title;
        string description;
        uint256 rewardPoints;
        bool active;
    }
    
    struct User {
        uint256 points;
        uint256[] completedQuests;
    }
    
    mapping(address => User) public users;
    mapping(uint256 => Quest) public quests;
    uint256 public questCounter;
    
    event QuestCompleted(address indexed user, uint256 questId, uint256 points);
    event UserRegistered(address indexed user);
    
    constructor() ERC721("Learning Completion", "LEARN") {}
    
    function register() external {
        require(users[msg.sender].points == 0, "User already registered");
        users[msg.sender].points = 0;
        emit UserRegistered(msg.sender);
    }
    
    function createQuest(
        string memory title,
        string memory description,
        uint256 rewardPoints
    ) external onlyOwner {
        quests[questCounter] = Quest({
            title: title,
            description: description,
            rewardPoints: rewardPoints,
            active: true
        });
        questCounter++;
    }
    
    function completeQuest(uint256 questId) external {
        require(users[msg.sender].points > 0, "Not registered");
        require(quests[questId].active, "Quest is not active");
        require(!hasCompletedQuest(msg.sender, questId), "Quest already completed");
        
        users[msg.sender].completedQuests.push(questId);
        users[msg.sender].points += quests[questId].rewardPoints;
        
        // Mint an NFT as a reward
        _mint(msg.sender, questId);
        
        emit QuestCompleted(msg.sender, questId, quests[questId].rewardPoints);
    }
    
    function hasCompletedQuest(address user, uint256 questId) public view returns (bool) {
        uint256[] memory completedQuests = users[user].completedQuests;
        for (uint256 i = 0; i < completedQuests.length; i++) {
            if (completedQuests[i] == questId) {
                return true;
            }
        }
        return false;
    }
}`
    });
  } else if (projectType === 'nft') {
    files.push({
      name: 'NFTCollection.sol',
      language: 'solidity',
      content: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NFTCollection is ERC721Enumerable, Ownable {
    using Strings for uint256;
    
    uint256 public constant MAX_SUPPLY = 10000;
    uint256 public mintPrice = 0.05 ether;
    string public baseURI;
    bool public saleIsActive = false;
    
    constructor(string memory _name, string memory _symbol, string memory _baseURI) ERC721(_name, _symbol) {
        baseURI = _baseURI;
    }
    
    function mintNFT(uint256 _count) external payable {
        require(saleIsActive, "Sale is not active");
        require(_count > 0 && _count <= 10, "Can mint between 1 and 10 NFTs");
        require(totalSupply() + _count <= MAX_SUPPLY, "Would exceed max supply");
        require(msg.value >= mintPrice * _count, "Insufficient payment");
        
        for (uint256 i = 0; i < _count; i++) {
            uint256 tokenId = totalSupply() + 1;
            _safeMint(msg.sender, tokenId);
        }
    }
    
    function setMintPrice(uint256 _mintPrice) external onlyOwner {
        mintPrice = _mintPrice;
    }
    
    function setSaleState(bool _saleIsActive) external onlyOwner {
        saleIsActive = _saleIsActive;
    }
    
    function setBaseURI(string memory _baseURI) external onlyOwner {
        baseURI = _baseURI;
    }
    
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }
    
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}`
    });
  } else {
    // Default dApp contract
    files.push({
      name: `${capitalize(projectName)}.sol`,
      language: 'solidity',
      content: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ${capitalize(projectName)} is Ownable {
    string public projectName;
    uint256 public projectValue;
    
    event ValueUpdated(uint256 newValue);
    
    constructor(string memory _name) {
        projectName = _name;
        projectValue = 0;
    }
    
    function updateValue(uint256 _newValue) external onlyOwner {
        projectValue = _newValue;
        emit ValueUpdated(_newValue);
    }
    
    function getProjectInfo() external view returns (string memory, uint256) {
        return (projectName, projectValue);
    }
}`
    });
  }
  
  // Add React component
  files.push({
    name: 'App.tsx',
    language: 'typescript',
    content: `import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const CONTRACT_ADDRESS = '0x...'; // Your deployed contract address

function App() {
  const [provider, setProvider] = useState<any>(null);
  const [signer, setSigner] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);
  const [account, setAccount] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  // Connect wallet function
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        setProvider(provider);
        setSigner(signer);
        setAccount(address);
        setIsConnected(true);
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    } else {
      alert('Please install MetaMask to use this dApp');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="bg-slate-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-400">${capitalize(projectName)}</h1>
          <button 
            onClick={connectWallet}
            className="px-4 py-2 bg-indigo-600 rounded-md"
          >
            {isConnected ? \`\${account.substring(0, 6)}...\${account.substring(account.length - 4)}\` : 'Connect Wallet'}
          </button>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <h2 className="text-xl mb-4">Welcome to ${capitalize(projectName)}</h2>
        <p>This is a Web3 project built with Ethereum smart contracts</p>
      </main>
    </div>
  );
}

export default App;`
  });
  
  return files;
}

/**
 * Generate UI preview based on project type
 */
function generateUI(projectType: ProjectType, projectName: string): GeneratedUI {
  // Basic CSS for all project types
  const css = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    
    body {
      background-color: #0f172a;
      color: #f8fafc;
    }
    
    header {
      background-color: #1e293b;
      padding: 1rem;
      border-bottom: 1px solid #334155;
    }
    
    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: #818cf8;
    }
    
    .connect-button {
      background-color: #4f46e5;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    .connect-button:hover {
      background-color: #4338ca;
    }
    
    main {
      padding: 2rem 1rem;
    }
    
    .card {
      background-color: #1e293b;
      border-radius: 0.5rem;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      border: 1px solid #334155;
    }
    
    .card-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #e2e8f0;
    }
    
    .button {
      background-color: #4f46e5;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    .button:hover {
      background-color: #4338ca;
    }
    
    .input {
      width: 100%;
      padding: 0.5rem;
      background-color: #0f172a;
      border: 1px solid #334155;
      border-radius: 0.375rem;
      color: #e2e8f0;
      margin-bottom: 1rem;
    }
  `;
  
  // Generate HTML based on project type
  let html = '';
  let description = '';
  
  switch (projectType) {
    case 'learning':
      html = `
        <header>
          <div class="container header-content">
            <div class="logo">${capitalize(projectName)}</div>
            <button class="connect-button">Connect Wallet</button>
          </div>
        </header>
        <main class="container">
          <h1 style="font-size: 1.75rem; margin-bottom: 1rem;">Learning Platform</h1>
          <p style="margin-bottom: 2rem;">Complete quests to earn points and NFT rewards</p>
          
          <div class="card">
            <div class="card-title">Available Quests</div>
            <div style="margin-bottom: 1rem;">
              <div style="padding: 1rem; border: 1px solid #334155; border-radius: 0.375rem; margin-bottom: 0.5rem;">
                <h3 style="font-weight: 600; margin-bottom: 0.5rem;">Introduction to Web3</h3>
                <p style="font-size: 0.875rem; color: #94a3b8; margin-bottom: 0.5rem;">Learn the basics of Web3 and blockchain technology</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 0.75rem; color: #818cf8;">10 points</span>
                  <button class="button">Start Quest</button>
                </div>
              </div>
              
              <div style="padding: 1rem; border: 1px solid #334155; border-radius: 0.375rem;">
                <h3 style="font-weight: 600; margin-bottom: 0.5rem;">Smart Contract Development</h3>
                <p style="font-size: 0.875rem; color: #94a3b8; margin-bottom: 0.5rem;">Build your first Ethereum smart contract</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 0.75rem; color: #818cf8;">25 points</span>
                  <button class="button">Start Quest</button>
                </div>
              </div>
            </div>
          </div>
          
          <div class="card">
            <div class="card-title">Your Progress</div>
            <div style="display: flex; align-items: center; margin-bottom: 1rem;">
              <div style="width: 3rem; height: 3rem; border-radius: 50%; background-color: #4f46e5; display: flex; align-items: center; justify-content: center; margin-right: 1rem;">0</div>
              <div>
                <div style="font-weight: 600;">Completed Quests</div>
                <div style="font-size: 0.875rem; color: #94a3b8;">Start learning to earn points</div>
              </div>
            </div>
          </div>
        </main>
      `;
      description = "A learning platform for Web3 education with gamified quests and NFT rewards";
      break;
      
    case 'nft':
      html = `
        <header>
          <div class="container header-content">
            <div class="logo">${capitalize(projectName)}</div>
            <button class="connect-button">Connect Wallet</button>
          </div>
        </header>
        <main class="container">
          <h1 style="font-size: 1.75rem; margin-bottom: 1rem;">NFT Collection</h1>
          <p style="margin-bottom: 2rem;">Mint and collect unique digital assets</p>
          
          <div class="card">
            <div class="card-title">Available NFTs</div>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
              <div style="border: 1px solid #334155; border-radius: 0.375rem; overflow: hidden;">
                <div style="height: 200px; background-color: #4f46e5; display: flex; align-items: center; justify-content: center;">
                  <span style="font-size: 3rem;">#1</span>
                </div>
                <div style="padding: 0.75rem;">
                  <h3 style="font-weight: 600; margin-bottom: 0.5rem;">${capitalize(projectName)} #1</h3>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 0.75rem; color: #818cf8;">0.05 ETH</span>
                    <button class="button">Mint</button>
                  </div>
                </div>
              </div>
              
              <div style="border: 1px solid #334155; border-radius: 0.375rem; overflow: hidden;">
                <div style="height: 200px; background-color: #8b5cf6; display: flex; align-items: center; justify-content: center;">
                  <span style="font-size: 3rem;">#2</span>
                </div>
                <div style="padding: 0.75rem;">
                  <h3 style="font-weight: 600; margin-bottom: 0.5rem;">${capitalize(projectName)} #2</h3>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 0.75rem; color: #818cf8;">0.05 ETH</span>
                    <button class="button">Mint</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="card">
            <div class="card-title">Collection Details</div>
            <div style="font-size: 0.875rem; color: #94a3b8; margin-bottom: 0.5rem;">
              <p>Max Supply: 10,000</p>
              <p>Mint Price: 0.05 ETH</p>
              <p>Minted: 0/10,000</p>
            </div>
          </div>
        </main>
      `;
      description = "An NFT collection with minting functionality and collection details";
      break;
      
    default:
      html = `
        <header>
          <div class="container header-content">
            <div class="logo">${capitalize(projectName)}</div>
            <button class="connect-button">Connect Wallet</button>
          </div>
        </header>
        <main class="container">
          <h1 style="font-size: 1.75rem; margin-bottom: 1rem;">${capitalize(projectName)}</h1>
          <p style="margin-bottom: 2rem;">A Web3 project built with Ethereum smart contracts</p>
          
          <div class="card">
            <div class="card-title">Project Details</div>
            <p style="margin-bottom: 1rem;">This is a decentralized application that demonstrates the power of blockchain technology.</p>
            <button class="button">Interact with Contract</button>
          </div>
          
          <div class="card">
            <div class="card-title">Contract Interaction</div>
            <div>
              <input type="text" class="input" placeholder="Enter value..." />
              <button class="button">Submit Transaction</button>
            </div>
          </div>
        </main>
      `;
      description = "A Web3 dApp with smart contract interaction capabilities";
      break;
  }
  
  return {
    html,
    css,
    projectType,
    description
  };
}

// Helper function to capitalize first letter of a string
function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
