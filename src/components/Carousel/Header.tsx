"use client";

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import Container from './Container';
import Image from 'next/image';
import { FOOTER_MARKETPLACE } from '../../app/admin/consts';

export default function Header() {
  const ref = useRef(null);
  const [isSticked, setIsSticked] = useState(false);

  useEffect(() => {
    const cachedRef = ref.current,
      observer = new IntersectionObserver(
        ([e]) => setIsSticked(e.intersectionRatio < 1),
        {
          threshold: [1],
        }
      );
    if (cachedRef) observer.observe(cachedRef);
    return () => {
      if (cachedRef) observer.unobserve(cachedRef);
    };
  }, []);

  return (
    <header
      className='sticky -top-[0.1px] z-50 border-b bg-white text-black transition-colors duration-150'
      ref={ref}
    >
      <Container>
        <div className='flex h-[4.25rem] items-center gap-x-2 py-2.5'>
          <ul className='ml-6 gap-x-6 border-l border-slate-200 pl-6 font-semibold flex'>
            {FOOTER_MARKETPLACE.map((item) => (
              <li key={item} className='hover:bg-gray-200 px-2 py-1 rounded'>
                <a href='#'>{item}</a>
              </li>
            ))}
          </ul>
          <div className='relative ml-6 h-full flex-1'>
            <MagnifyingGlassIcon className='absolute inset-y-0 left-3 z-10 my-auto h-5 w-5 stroke-2 text-slate-500' />
            <input
              name='Search'
              type='text'
              className='h-full w-full rounded-xl border border-slate-200 bg-white/10 pl-10 hover:bg-white/20 focus:border-slate-200 focus:ring-0 placeholder:text-slate-500'
              placeholder='Search items, collections, and accounts'
            />
          </div>
        </div>
      </Container>
    </header>
  );
}
