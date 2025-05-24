import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAddress(address: string, start = 6, end = 4): string {
  if (!address) return '';
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

export function isAddressEqual(a: string, b: string): boolean {
  return a?.toLowerCase() === b?.toLowerCase();
}

export function shortenTransactionHash(hash: string, start = 6, end = 4): string {
  if (!hash) return '';
  return `${hash.slice(0, start)}...${hash.slice(-end)}`;
}

export function formatEtherscanLink(
  type: 'tx' | 'address' | 'token',
  data: string,
  chainId: number = 1
): string {
  const prefix = chainId === 1 ? '' : `${getNetworkName(chainId)}.`;
  return `https://${prefix}etherscan.io/${type}/${data}`;
}

function getNetworkName(chainId: number): string {
  switch (chainId) {
    case 1:
      return '';
    case 5:
      return 'goerli';
    case 11155111:
      return 'sepolia';
    case 137:
      return 'polygon';
    case 10:
      return 'optimistic';
    case 42161:
      return 'arbiscan';
    default:
      return 'goerli';
  }
}
