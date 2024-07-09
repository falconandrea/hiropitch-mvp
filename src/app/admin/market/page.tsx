'use client';

import CollectionsSection from '../../../components/Carousel/CollectionsSection';
import HeroSection from '../../../components/Carousel/HeroSection';
import StatsTable from '../../../components/Carousel/StatsTable';
import Header from '../../../components/Carousel/Header';
import 'swiper/css';
import 'swiper/css/navigation';
import '../globals.css';

export default function Market() {
  return (
    <div className='max-w-2lg mx-auto'>
      <Header/>
      <HeroSection />
      <StatsTable />
      <CollectionsSection title='Films' />
      <CollectionsSection title='Comics' />
    </div>
  );
}
