import { Mousewheel, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from './Button';
import Container from './Container';
import Image from 'next/image';
import { InferfaceIdea } from '@/lib/interfaces';
import Link from 'next/link';

const commonBiggerScreen = {
  centeredSlides: false,
  centeredSlidesBounds: false,
  spaceBetween: 15,
  slidesOffsetBefore: 0,
  slidesOffsetAfter: 0,
};

export default function CollectionsSection({
  title,
  id,
  ideas,
}: {
  title: string;
  id?: string;
  ideas: InferfaceIdea[];
}) {
  return (
    <Container className='pt-16' id={id}>
      <div className='flex items-center justify-between'>
        <span className='font-poppins text-lg font-semibold text-slate-900 md:text-2xl'>
          {title}
        </span>
        {/*
        <Button>View All</Button>
        */}
      </div>

      <div className='-mx-4 sm:mx-0'>
        <Swiper
          modules={[Navigation, Mousewheel]}
          mousewheel={{ invert: false, forceToAxis: true }}
          breakpoints={{
            0: {
              slidesPerView: 'auto',
              slidesPerGroup: 1,
              centeredSlides: true,
              centeredSlidesBounds: true,
              spaceBetween: 8,
              slidesOffsetBefore: 16,
              slidesOffsetAfter: 16,
            },
            600: { slidesPerView: 2, slidesPerGroup: 2, ...commonBiggerScreen },
            768: { slidesPerView: 3, slidesPerGroup: 3, ...commonBiggerScreen },
            1024: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              ...commonBiggerScreen,
            },
            1200: {
              slidesPerView: 5,
              slidesPerGroup: 5,
              ...commonBiggerScreen,
            },
            1600: {
              slidesPerView: 6,
              slidesPerGroup: 6,
              ...commonBiggerScreen,
            },
          }}
          navigation
          className='collections-slide'
        >
          {ideas.map((item, i) => (
            <SwiperSlide key={i}>
              <div
                className='relative cursor-pointer overflow-hidden rounded-2xl shadow duration-200 will-change-transform hover:-translate-y-1 hover:shadow-md sm:w-full'
                key={i}
              >
                <Link
                  href={`/admin/ideas/${item._id}`}
                  className='absolute inset-0 z-10'
                  title=''
                />
                <div className='relative aspect-video'>
                  <Image
                    height={300}
                    width={300}
                    alt=''
                    src={`${item.image.filePublicUrl}`}
                    className='absolute inset-0 h-full w-full object-cover object-top'
                  />
                </div>
                <div className='p-4'>
                  <p className='font-semibold text-slate-900'>{item.title}</p>

                  <div className='mt-4'>
                    <div className='flex w-full'>
                      <div className='w-1/2'>
                        <p className='text-sm'>
                          Price
                          <br />
                          <span className='font-semibold text-slate-900'>
                            {item.nftPrice} Sol
                          </span>
                        </p>
                      </div>
                      <div className='w-1/2'>
                        <p className='text-sm'>
                          Nr. NFTs
                          <br />
                          <span className='font-semibold text-slate-900'>
                            {item.nftQty}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
}
