import { Autoplay, Grid, Mousewheel, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Container from './Container';
import React from 'react';
import Image from 'next/image';
import { InferfaceIdea } from '@/lib/interfaces';
import Link from 'next/link';

export default function HeroSection({
  id,
  ideas,
}: {
  id?: string;
  ideas: InferfaceIdea[];
}) {
  return (
    <div className='relative' id={id}>
      <div className='absolute inset-0 z-0' />
      <div className='relative -mt-[4.25rem] pt-[4.25rem]'>
        <Container className='px-0 sm:px-4'>
          <Carousel ideas={ideas} />
        </Container>
      </div>
    </div>
  );
}

function Carousel({ ideas }: { ideas: InferfaceIdea[] }) {
  return (
    <div className='pt-8'>
      <div>
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
          {ideas.map((item, i) => (
            <SwiperSlide key={i}>
              <div
                className='group relative flex aspect-square w-full cursor-pointer overflow-hidden rounded-2xl bg-white/10'
                key={i}
              >
                <Link
                  href={`/admin/ideas/${item._id}`}
                  className='absolute inset-0'
                  title=''
                />
                <Image
                  height={300}
                  width={300}
                  alt=''
                  src={`${item.image.filePublicUrl}`}
                  loading='lazy'
                  className='pointer-events-none absolute h-full w-full origin-center scale-[1.01] select-none object-cover object-center transition-transform duration-500 will-change-transform group-hover:scale-110'
                />
                <div className='pointer-events-none relative mt-auto flex h-1/2 w-full select-none bg-gradient-to-t from-black/80 p-4 text-white'>
                  <div className='relative mt-auto'>
                    <h4 className='font-semibold'>{item.title}</h4>
                    <span className='block text-sm'>
                      Price: {item.nftPrice} Sol
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
