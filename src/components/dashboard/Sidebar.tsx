'use client';

import Link from 'next/link';
import React from 'react';
import { useUser } from '@clerk/clerk-react';

export function Sidebar() {
  const { user } = useUser();

  return (
    <div className='min-h-screen w-64 bg-gray-800'>
      <div className='flex h-full flex-col justify-between'>
        <div>
          <h1 className='px-4 py-4 text-3xl font-bold text-white'>hiropitch</h1>
          <h4 className='px-4 text-white'>Hi, {user?.firstName}</h4>
          <div className='mt-16'>
            <Link
              href='/dashboard'
              className='block rounded bg-gray-700 px-4 py-2 font-bold text-white hover:bg-gray-600'
            >
              Dashboard
            </Link>
            <Link
              href='/ideas'
              className='block rounded bg-gray-700 px-4 py-2 font-bold text-white hover:bg-gray-600'
            >
              IDEAs
            </Link>
            <Link
              href='/market'
              className='block rounded bg-gray-700 px-4 py-2 font-bold text-white hover:bg-gray-600'
            >
              Market
            </Link>
            <Link
              href='/scribo'
              className='block rounded bg-gray-700 px-4 py-2 font-bold text-white hover:bg-gray-600'
            >
              Scribo
            </Link>
            <Link
              href='/faq'
              className='block rounded bg-gray-700 px-4 py-2 font-bold text-white hover:bg-gray-600'
            >
              FAQ
            </Link>
          </div>
        </div>
        <div className='mt-auto'>
          <Link
            href='/profile'
            className='block rounded bg-gray-700 px-4 py-2 font-bold text-white hover:bg-gray-600'
          >
            Profile
          </Link>
          <Link
            href='/logout'
            className='block rounded bg-gray-700 px-4 py-2 font-bold text-white hover:bg-gray-600'
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}
