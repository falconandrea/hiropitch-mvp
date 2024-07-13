'use client';

import Link from 'next/link';
import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { usePathname } from 'next/navigation';
import { SignOutButton } from '@clerk/nextjs';

export function Sidebar() {
  const { user } = useUser();
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href ? 'bg-gray-700' : '';
  };

  return (
    <div className='sticky top-0 h-screen min-h-screen w-64 bg-gray-800'>
      <div className='flex h-full flex-col justify-between'>
        <div>
          <h1 className='px-4 py-4 text-3xl font-bold text-white'>hiropitch</h1>
          <h4 className='px-4 text-white'>Hi, {user?.firstName}</h4>
          <div className='mt-16'>
            <Link
              href='/admin/dashboard'
              className={`block rounded px-4 py-2 font-bold text-white hover:bg-gray-600 ${isActive('/admin/dashboard')}`}
            >
              Dashboard
            </Link>
            <Link
              href='/admin/ideas'
              className={`block rounded px-4 py-2 font-bold text-white hover:bg-gray-600 ${isActive('/admin/ideas')}`}
            >
              IDEAs
            </Link>
            <Link
              href='/admin/transactions'
              className={`block rounded px-4 py-2 font-bold text-white hover:bg-gray-600 ${isActive('/admin/transactions')}`}
            >
              Your transactions
            </Link>
            <Link
              href='/admin/market'
              className={`block rounded px-4 py-2 font-bold text-white hover:bg-gray-600 ${isActive('/admin/market')}`}
            >
              Market
            </Link>
            <Link
              href='/admin/faq'
              className={`block rounded px-4 py-2 font-bold text-white hover:bg-gray-600 ${isActive('/admin/faq')}`}
            >
              FAQ
            </Link>
          </div>
        </div>
        <div className='mt-auto'>
          <Link
            href='/admin/profile'
            className={`block rounded px-4 py-2 font-bold text-white hover:bg-gray-600 ${isActive('/admin/profile')}`}
          >
            Profile
          </Link>
          <div className='block cursor-pointer rounded px-4 py-2 font-bold text-white hover:bg-gray-600'>
            <SignOutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
