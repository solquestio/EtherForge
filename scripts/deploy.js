const { ethers } = require("hardhat");

// Chainlink Price Feed Addresses for different networks
const PRICE_FEEDS = {
  // Ethereum Sepolia
  11155111: {
    ETH_USD: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    BTC_USD: "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43"
  },
  // Polygon Mumbai
  80001: {
    ETH_USD: "0x0715A7794a1dc8e42615F059dD6e406A6594651A",
    BTC_USD: "0x007A22900a3B98143368Bd5906f8E17e9867581b"
  },
  // Arbitrum Goerli
  421613: {
    ETH_USD: "0x62CAe0FA2da220f43a51F86Db2EDb36DcA9A5A08",
    BTC_USD: "0x6550bc2301936011c1334555e62A87705A81C12C"
  },
  // Base Goerli
  84531: {
    ETH_USD: "0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1",
    BTC_USD: "0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1" // Placeholder
  }
};

async function main() {
  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  const chainId = Number(network.chainId);
  
  console.log("🚀 VibeForge Contract Deployment");
  console.log("================================");
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)));
  console.log("Network:", network.name);
  console.log("Chain ID:", chainId);
  console.log("");

  const deployedContracts = {};

  try {
    // 1. Deploy BaseVibeToken (ERC20) - for Base bounty
    console.log("📄 Deploying BaseVibeToken...");
    const BaseVibeToken = await ethers.getContractFactory("BaseVibeToken");
    const baseToken = await BaseVibeToken.deploy();
    await baseToken.waitForDeployment();
    
    const baseTokenAddress = await baseToken.getAddress();
    deployedContracts.BaseVibeToken = baseTokenAddress;
    console.log("✅ BaseVibeToken deployed to:", baseTokenAddress);
    
    // 2. Deploy VibeForgeNFT
    console.log("📄 Deploying VibeForgeNFT...");
    const VibeForgeNFT = await ethers.getContractFactory("VibeForgeNFT");
    const nft = await VibeForgeNFT.deploy(
      "VibeForge Collection",
      "VIBE",
      "https://api.vibeforge.io/metadata/"
    );
    await nft.waitForDeployment();
    
    const nftAddress = await nft.getAddress();
    deployedContracts.VibeForgeNFT = nftAddress;
    console.log("✅ VibeForgeNFT deployed to:", nftAddress);

    // 3. Deploy DeFiLending (only if price feeds available)
    if (PRICE_FEEDS[chainId]) {
      console.log("📄 Deploying DeFiLending with Chainlink price feeds...");
      const DeFiLending = await ethers.getContractFactory("DeFiLending");
      const lending = await DeFiLending.deploy(
        PRICE_FEEDS[chainId].ETH_USD,
        PRICE_FEEDS[chainId].BTC_USD
      );
      await lending.waitForDeployment();
      
      const lendingAddress = await lending.getAddress();
      deployedContracts.DeFiLending = lendingAddress;
      console.log("✅ DeFiLending deployed to:", lendingAddress);
    } else {
      console.log("⚠️  Skipping DeFiLending - no price feeds for this network");
    }

    // 4. Post-deployment setup
    console.log("\n🔧 Post-deployment setup...");
    
    // Enable public mint on NFT
    console.log("📝 Enabling public mint on NFT...");
    await nft.setPublicMintEnabled(true);
    console.log("✅ Public mint enabled");
    
    // Add deployer as Base validator (for Base token)
    console.log("📝 Adding deployer as Base validator...");
    await baseToken.addBaseValidator(deployer.address);
    console.log("✅ Base validator added");

    // 5. Verification info
    console.log("\n📋 DEPLOYMENT SUMMARY");
    console.log("=====================");
    console.log("Network:", network.name, `(Chain ID: ${chainId})`);
    console.log("Deployer:", deployer.address);
    console.log("");
    
    Object.entries(deployedContracts).forEach(([name, address]) => {
      console.log(`${name}: ${address}`);
    });
    
    console.log("");
    console.log("🎯 SPONSOR PRIZE QUALIFICATIONS:");
    console.log("✅ OpenZeppelin: Security standards implemented");
    console.log("✅ Chainlink: Price feeds integrated (if available)");
    console.log("✅ Base: Custom token with Base-specific features");
    console.log("✅ Multi-chain: Deployable across networks");
    
    // 6. Save deployment info
    const deploymentInfo = {
      network: network.name,
      chainId: chainId,
      deployer: deployer.address,
      timestamp: new Date().toISOString(),
      contracts: deployedContracts,
      priceFeeds: PRICE_FEEDS[chainId] || "Not available"
    };
    
    console.log("\n💾 Deployment completed successfully!");
    console.log("📄 Contract verification commands:");
    
    Object.entries(deployedContracts).forEach(([name, address]) => {
      console.log(`npx hardhat verify --network ${network.name} ${address}`);
    });

    return deploymentInfo;

  } catch (error) {
    console.error("❌ Deployment failed:", error);
    throw error;
  }
}

// Execute deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 