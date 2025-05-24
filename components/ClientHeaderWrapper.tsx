'use client';

import dynamic from 'next/dynamic';

// Dynamically import ClientHeader with SSR turned off
const ClientHeader = dynamic(
  () => import('./ClientHeader').then(mod => mod.ClientHeader),
  { ssr: false }
);

export function ClientHeaderWrapper() {
  return <ClientHeader />;
}
