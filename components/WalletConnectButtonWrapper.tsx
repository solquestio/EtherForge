'use client';

import dynamic from 'next/dynamic';

// Dynamically import WalletConnectButton with SSR turned off
const WalletConnectButton = dynamic(
  () => import('./WalletConnectButton').then(mod => mod.WalletConnectButton),
  { ssr: false }
);

export function WalletConnectButtonWrapper() {
  return <WalletConnectButton />;
}
