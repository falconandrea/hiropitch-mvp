import { ClerkProvider } from '@clerk/nextjs';

import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/admin/Sidebar';
import { Suspense } from 'react';
import Loading from './loading';

// Vedere quali varianti usaremo
const outfit = Outfit({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'Admin area',
  description: 'Admin area',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={`${outfit.className} flex`}>
          <Suspense fallback={<Loading />}>
            <Sidebar />
            <div className='flex-1 px-8 py-16'>{children}</div>
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  );
}
