import { Inter } from 'next/font/google';
import { Web3ModalProvider } from './providers';
import { ThemeWrapper } from '../components/ThemeWrapper';
import { ClientHeaderWrapper } from '../components/ClientHeaderWrapper';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Web3 Project Generator',
  description: 'Generate and deploy Web3 projects with a single prompt',
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
            <ClientHeaderWrapper />
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
