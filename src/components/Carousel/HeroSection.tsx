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

export default function HeroSection() {
  return (
    <div className='relative'>
      <div className='absolute inset-0 z-0 bg-cover bg-top bg-no-repeat transition-[background] duration-500 after:absolute after:inset-0 after:z-10 after:backdrop-blur-xl after:[background:linear-gradient(0deg,rgb(255,255,255)_5%,rgba(0,0,0,0)_60%)_rgba(0,0,0,0.5)]' />
      <div className='relative z-10 -mt-[4.25rem] pt-[4.25rem]'>
        <Container>
          <Tabs />
        </Container>
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
      <Swiper
        id='carousel'
        modules={[Navigation, Autoplay, Mousewheel, Grid]}
        pagination={false}
        loop={true}
        autoplay={{ delay: 1235000, disableOnInteraction: false }}
        mousewheel={{ invert: false, forceToAxis: true }}
        navigation
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
              <img
                src={`/carousel/${item.image}`}
                loading='lazy'
                className='pointer-events-none absolute h-full w-full origin-center scale-[1.01] select-none object-cover object-center transition-transform duration-500 will-change-transform group-hover:scale-110'
              />
              <div className='pointer-events-none relative mt-auto flex h-1/2 w-full select-none bg-gradient-to-t from-black/80 p-4 text-white'>
                <div className='relative mt-auto'>
                  <h4 className='font-semibold'>{item.name}</h4>
                  <span className='block text-sm'>Floor: {item.floor}</span>
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
      <nav className='scroll-mask' id='main-tabs'>
        <Swiper
          spaceBetween={16}
          slidesPerView={'auto'}
          freeMode={true}
          navigation
          modules={[FreeMode, Navigation]}
          tag='ul'
        >
          {MAIN_TABS.map((tab) => (
            <SwiperSlide
              key={tab}
              tag='li'
              className='rounded-lg first:bg-white/10 hover:bg-white/10'
            >
              <a
                href='#'
                className='block w-fit px-4 py-2 text-sm font-semibold text-white md:text-base'
              >
                {tab}
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </nav>
    </div>
  );
}
