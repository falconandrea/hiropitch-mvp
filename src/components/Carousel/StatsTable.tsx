import { HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import Container from './Container';
import Image from 'next/image';
import Link from 'next/link';
import { InferfaceIdea } from '@/lib/interfaces';

export default function StatsTable({ ideas }: { ideas: InferfaceIdea[] }) {
  return (
    <Container className='pt-12'>
      <div className='flex justify-between border-b'>
        <ul className='font-poppins mt-auto flex gap-x-8 text-base font-semibold lg:text-2xl'>
          <li>
            <button className='border-b-2 border-slate-900 pb-4 text-slate-900'>
              Trending
            </button>
          </li>
          {/*
          <li>
            <button className='pb-4 transition-colors duration-300 hover:text-slate-900'>
              Top
            </button>
          </li>
          */}
        </ul>
        {/*
        <div className='flex gap-x-2 pb-2 lg:gap-x-4'>
          <div className='hidden sm:flex'>
            <DurationButton className='cursor-default rounded-l-xl border-l bg-slate-100 text-slate-900'>
              1h
            </DurationButton>
            <DurationButton>6h</DurationButton>
            <DurationButton>24h</DurationButton>
            <DurationButton className='rounded-r-xl border-r'>
              7d
            </DurationButton>
          </div>
          <Button>View All</Button>
        </div>
        */}
      </div>
      <div className='gg overflow-auto py-4'>
        <div className='flex'>
          <table className='w-full flex-1'>
            <thead>
              <tr className='text-left [&>th]:px-4 [&>th]:pb-4 [&>th]:text-xs [&>th]:font-normal first:[&>th]:pl-2 lg:[&>th]:text-sm'>
                <th className='w-1'>#</th>
                <th>Collection</th>
                <th>Category</th>
                <th className='text-right'>Nr. NFTs</th>
                <th className='text-right'>Price</th>
              </tr>
            </thead>
            <tbody className='text-left text-sm font-semibold text-black md:text-base'>
              {ideas.map((item, i) => (
                <tr
                  className='cursor-pointer hover:bg-slate-100 [&>td]:px-4 [&>td]:py-3 first:[&>td]:pl-2'
                  key={i + 1}
                >
                  <td className='w-1'>{i + 1}</td>
                  <td>
                    <div className='relative flex items-center gap-x-3 pr-6 md:gap-x-6'>
                      <Link
                        href={`/admin/ideas/${item._id}`}
                        className='absolute inset-0 z-10'
                        title=''
                      />
                      <div className='relative aspect-square w-14 overflow-hidden rounded-xl border lg:w-[4.25rem]'>
                        <Image
                          width={300}
                          height={300}
                          alt=''
                          src={`${item.image.filePublicUrl}`}
                          className='absolute inset-0 h-full w-full object-cover object-center'
                        />
                      </div>
                      <div>
                        <p>{item.title}</p>
                        <p className='text-xs font-normal text-slate-500 md:hidden'>
                          Floor:{' '}
                          <span className='font-semibold'>
                            {item.nftPrice} Sol
                          </span>
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className='text-left'>{item.category}</td>
                  <td className='text-right'>{item.nftQty}</td>
                  <td className='text-right'>{item.nftPrice} Sol</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
}

function DurationButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: HTMLAttributes<HTMLButtonElement>['className'];
}) {
  return (
    <button
      className={twMerge(
        'h-fit border-y px-3 py-2 text-sm font-semibold lg:px-4 lg:py-3 lg:text-base',
        className
      )}
    >
      {children}
    </button>
  );
}
