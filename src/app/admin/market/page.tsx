'use client';

import React from 'react';
import CollectionsSection from '../../../components/Carousel/CollectionsSection';
import HeroSection from '../../../components/Carousel/HeroSection';
import StatsTable from '../../../components/Carousel/StatsTable';
import Header from '../../../components/Carousel/Header';
import 'swiper/css';
import 'swiper/css/navigation';
import '../globals.css';
import { MAIN_TABS } from '../consts';

// Funzione per creare le sezioni di collezione
const createCollectionSections = () => {
  // Parti dall'indice 1 di MAIN_TABS e crea una sezione per ogni elemento
  const collectionSections = MAIN_TABS.slice(1).map((item, index) => (
    <CollectionsSection key={index} title={item} />
  ));

  return collectionSections;
};

export default function Market() {
  return (
    <div className='max-w-2lg mx-auto'>
      <Header/>
      <HeroSection />
      <StatsTable />
      {createCollectionSections()}
    </div>
  );
}
