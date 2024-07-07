import { CAROUSEL_ITEMS, MAIN_TABS } from '../../app/admin/consts';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  Autoplay,
  FreeMode,
  Grid,
  Mousewheel,
  Navigation,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Container from './Container';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { Libre_Barcode_128 } from 'next/font/google';

export default function HeroSection() {
  return (
    <div className='relative'>
      <div className='absolute inset-0 z-0' />
      <div className='relative z-10 -mt-[4.25rem] pt-[4.25rem]'>
        {/*
        <Container>
          <Tabs />
        </Container>
        */}
        <Container className='px-0 sm:px-4'>
          <Carousel />
        </Container>
      </div>
    </div>
  );
}

function Carousel() {
  return (
    <div className='pt-8'>
      <div className='mb-8 flex justify-between border-b'>
        <ul className='font-poppins mt-auto flex gap-x-8 text-base font-semibold lg:text-2xl'>
          <li>
            <button className='border-b-2 border-slate-900 pb-4 text-slate-900'>
              Featured
            </button>
          </li>
        </ul>
      </div>
      <Swiper
        id='carousel'
        modules={[Navigation, Autoplay, Mousewheel, Grid]}
        pagination={false}
        loop={true}
        autoplay={false}
        mousewheel={{ invert: false, forceToAxis: true }}
        slidesPerView={4}
        grid={{
          rows: 1,
          fill: 'column',
        }}
        slidesPerGroup={4}
        centeredSlides={false}
        spaceBetween={15}
      >
        {CAROUSEL_ITEMS.map((item, i) => (
          <SwiperSlide key={i}>
            <div
              className='group relative flex aspect-square w-full cursor-pointer overflow-hidden rounded-2xl bg-white/10'
              key={i}
            >
              <Image
                height={300}
                width={300}
                alt=''
                src={`/carousel/${item.image}`}
                loading='lazy'
                className='pointer-events-none absolute h-full w-full origin-center scale-[1.01] select-none object-cover object-center transition-transform duration-500 will-change-transform group-hover:scale-110'
              />
              <div className='pointer-events-none relative mt-auto flex h-1/2 w-full select-none bg-gradient-to-t from-black/80 p-4 text-white'>
                <div className='relative mt-auto'>
                  <h4 className='font-semibold'>{item.name}</h4>
                  <span className='block text-sm'>
                    To pay to be part: {item.floor} Sol
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function Tabs() {
  return (
    <div className='pt-8 sm:px-0'>
      <nav id='main-tabs'>
        <ul className='flex'>
          {MAIN_TABS.map((tab) => (
            <li key={tab} className='rounded-lg first:bg-green-400'>
              <a
                href='#'
                className='block px-4 py-2 text-sm font-semibold text-black md:text-base'
              >
                {tab}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
