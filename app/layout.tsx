import { Inter } from 'next/font/google';
import { Web3ModalProvider } from './providers';
import { ThemeWrapper } from '../components/ThemeWrapper';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'VibeForge - Where Smart Contracts Are Born',
  description: 'Transform your ideas into production-ready dApps with VibeForge. Generate complete Next.js Web3 applications with smart contracts, frontend interfaces, and deployment configurations.',
  keywords: ['Web3', 'dApp', 'Smart Contracts', 'Ethereum', 'Blockchain', 'Next.js', 'AI', 'VibeForge'],
  authors: [{ name: 'VibeForge Team' }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/logo-dark.svg', type: 'image/svg+xml', sizes: '32x32' }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background`}>
        <Web3ModalProvider>
          <div className="relative flex min-h-screen flex-col">
            <ThemeWrapper>
              <div className="flex-1">
                {children}
              </div>
            </ThemeWrapper>
          </div>
        </Web3ModalProvider>
      </body>
    </html>
  );
}
