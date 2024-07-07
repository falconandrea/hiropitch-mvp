'use client';

import CollectionsSection from '../../../components/Carousel/CollectionsSection';
import HeroSection from '../../../components/Carousel/HeroSection';
import StatsTable from '../../../components/Carousel/StatsTable';
import 'swiper/css';
import 'swiper/css/navigation';
import '../globals.css';

export default function Market() {
  return (
    <div className='max-w-2lg mx-auto'>
      <HeroSection />
      <StatsTable />
      <CollectionsSection title='Films' />
      <CollectionsSection title='Comics' />
    </div>
  );
}
