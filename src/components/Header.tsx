'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import ClerkButton from './ClerkButton';
import { useUser } from '@clerk/clerk-react';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const { isSignedIn } = useUser();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className='flex items-center justify-between p-8'>
      <h1 className='text-3xl font-bold text-white'>
        <Link href='/'>hiropitch</Link>
      </h1>
      <div className='flex items-center space-x-4'>
        <ClerkButton
          className={`${isSignedIn ? '' : 'rounded bg-blue-500 font-bold text-white hover:bg-blue-700'}`}
        />
      </div>
    </header>
  );
}
