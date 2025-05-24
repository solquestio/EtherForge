# 🔗 Wallet Connection Setup for VibeForge

## Quick Fix for Connect Wallet Issue

The wallet connection requires a WalletConnect Project ID. Here's how to set it up:

### Option 1: Quick Test (Recommended)
Create a `.env.local` file in the project root with this content:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=2f5a0ed7b044bf1e46cf7e52c58eb7e4
```

### Option 2: Your Own Project ID
1. Go to [https://cloud.walletconnect.com/](https://cloud.walletconnect.com/)
2. Create a free account
3. Create a new project
4. Copy your Project ID
5. Create `.env.local` file:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_actual_project_id_here
```

### After Setup:
1. Save the `.env.local` file
2. Restart the development server: `npm run dev`
3. The "Connect Wallet" button should now work!

## Supported Wallets
- MetaMask
- WalletConnect compatible wallets
- Coinbase Wallet
- And many more!

## Troubleshooting
- Make sure `.env.local` is in the project root (same level as `package.json`)
- Restart the dev server after creating the env file
- Check browser console for any error messages 