'use client';

import { useState } from 'react';
import LayoutFaq from './layoutFaq';
import Head from 'next/head';
import faqs from '../../../../public/faqs.json';

export default function Faqpage() {
  const initialActiveState = Array(faqs.length).fill(false);
  const [active, setActive] = useState(initialActiveState);
  const isSomeActive = active.some((element) => element);

  const handleClick = () => {
    const newActiveState = Array(faqs.length).fill(isSomeActive ? false : true);
    setActive(newActiveState);
  };

  return (
    <>
      <Head>
        <title>FAQs</title>
      </Head>
      <div className='grid w-full place-items-center'>
        <LayoutFaq
          handleClick={handleClick}
          isSomeActive={isSomeActive}
          faqs={faqs}
          turn={active}
          setTurn={setActive}
        />
      </div>
    </>
  );
}
