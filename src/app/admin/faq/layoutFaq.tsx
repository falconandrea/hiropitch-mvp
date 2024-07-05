'use client';

import React, { useState, Dispatch, SetStateAction } from 'react';
import down from '../../../../public/down.svg';
import Image from 'next/image';

type Props = {
  question: string;
  answer: string;
  idx: number;
};

interface LayoutProps {
  handleClick: () => void;
  isSomeActive: boolean;
  turn: boolean[];
  setTurn: Dispatch<SetStateAction<boolean[]>>;
  faqs: Props[];
}

const LayoutFaq = ({
  handleClick,
  isSomeActive,
  faqs: allFaqs,
  turn,
  setTurn,
}: LayoutProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filtra le domande in base alla query di ricerca
  const filteredFaqs = allFaqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='my-5 flex w-full flex-col items-center px-4 lg:mt-7 lg:w-7/12'>
      <span className='mb-6 text-3xl font-bold'>FAQs</span>

      {/* Search bar */}
      <div className='mb-6 w-full'>
        <input
          type='text'
          className='w-full rounded-lg border border-gray-300 px-4 py-2'
          placeholder='Search for a question...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Open all button */}
      <div className='mb-6 flex w-full items-center lg:justify-end'>
        <button
          onClick={handleClick}
          className='mr-3 flex items-center space-x-1 rounded-lg border border-b border-gray-300 bg-white px-4 py-2 text-sm font-bold shadow transition-all duration-300 hover:bg-gray-200 lg:space-x-2 lg:text-base'
        >
          <span className='min-w-fit text-ellipsis text-black'>
            {!isSomeActive ? 'Open All' : 'Close All'}
          </span>
          <div
            className={
              'relative transition-transform duration-300 ease-in-out ' +
              (isSomeActive ? 'rotate-180' : 'rotate-0')
            }
          >
            <Image src={down} alt='' width={20} height={20} />
          </div>
        </button>
      </div>

      {/* Faqs list */}
      <div className='w-full'>
        {filteredFaqs.map((faq, index) => (
          <div key={index} className='mb-6'>
            <div
              className='flex cursor-pointer items-center justify-between rounded-t-lg border border-gray-300 bg-white p-4 shadow transition-all duration-300 hover:bg-gray-100'
              onClick={() =>
                setTurn(turn.map((t, i) => (i === index ? !t : t)))
              }
            >
              <h3 className='text-lg font-semibold'>{faq.question}</h3>
              <div
                className={
                  'transition-transform duration-300 ' +
                  (turn[index] ? 'rotate-180' : 'rotate-0')
                }
              >
                <Image src={down} alt='' width={20} height={20} />
              </div>
            </div>
            {turn[index] && (
              <div className='rounded-b-lg border border-t-0 border-gray-300 bg-gray-100 p-4 shadow'>
                <p className='mt-2'>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
        {filteredFaqs.length === 0 && (
          <p className='text-gray-600'>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default LayoutFaq;
