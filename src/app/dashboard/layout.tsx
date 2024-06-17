import { ClerkProvider } from '@clerk/nextjs';

import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/dashboard/Sidebar';

// Vedere quali varianti usaremo
const outfit = Outfit({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={outfit.className}>
          <Sidebar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
