'use client';

import React, { useEffect, useState } from 'react';
import CollectionsSection from '../../../components/Carousel/CollectionsSection';
import HeroSection from '../../../components/Carousel/HeroSection';
import StatsTable from '../../../components/Carousel/StatsTable';
import Header from '../../../components/Carousel/Header';
import 'swiper/css';
import 'swiper/css/navigation';
import '../globals.css';
import { MAIN_TABS } from '../consts';
import { getIdeas } from '@/lib/actions/idea.actions';
import { InferfaceIdea } from '@/lib/interfaces';
import Loading from '@/components/Loading';

export default function Market() {
  const [ideas, setIdeas] = useState<InferfaceIdea[]>([]);
  const [loading, setLoading] = useState(false);

  // Get Ideas for featured
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const data = await getIdeas({}, {}, 999);
        setIdeas(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching idea:', error);
        setLoading(false);
      }
    };

    setLoading(true);
    fetchIdeas();
  }, []);

  const getRandomIdeas = (arr: InferfaceIdea[], numItems: number) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numItems);
  };

  return (
    <div className='max-w-2lg mx-auto'>
      {loading && <Loading />}

      {!loading && ideas && (
        <div>
          <Header />
          <HeroSection id='hero-section' ideas={getRandomIdeas(ideas, 4)} />
          <StatsTable ideas={getRandomIdeas(ideas, 5)} />
          {MAIN_TABS.slice(1).map((item, index) => (
            <CollectionsSection
              key={index}
              title={item}
              ideas={getRandomIdeas(ideas, 4)}
              id={item.toLowerCase().replace(/\s/g, '-')}
            />
          ))}
        </div>
      )}
    </div>
  );
}
