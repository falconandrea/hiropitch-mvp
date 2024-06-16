'use client';

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import React, { useState } from 'react';
import ClerkButton from './ClerkButton';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className='flex items-center justify-between p-8'>
      <h1 className='text-3xl font-bold text-white'>
        <Link href='/'>hiropitch</Link>
      </h1>
      <div className='hidden items-center space-x-4 md:flex'>
        <a href='#about' className='text-white'>
          About
        </a>
        <a href='#faqs' className='text-white'>
          FAQs
        </a>
        <a href='#resources' className='text-white'>
          Resources
        </a>
        <ClerkButton className='rounded bg-blue-500 font-bold text-white hover:bg-blue-700' />
      </div>
      <button className='text-white md:hidden' onClick={toggleMenu}>
        <svg
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M4 6h16M4 12h16m-7 6h7'
          />
        </svg>
      </button>
      {isOpen && (
        <div className='absolute right-0 top-0 mr-4 mt-12 flex flex-col items-start space-y-4 rounded-lg bg-white p-5 shadow-lg'>
          <a href='#about' className='hover:text-gray-700'>
            About
          </a>
          <a href='#faqs' className='hover:text-gray-700'>
            FAQs
          </a>
          <a href='#resources' className='hover:text-gray-700'>
            Resources
          </a>
          <ClerkButton className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700' />
        </div>
      )}
    </header>
  );
}
