'use client';

import CollectionsSection from './CollectionsSection';
import HeroSection from './HeroSection';
import StatsTable from './StatsTable';
import Header from './Header';
import './index.css';

export default function Market() {
  return (
    <div>
      <Header />
      <HeroSection />
      <StatsTable />
      <CollectionsSection title='Notable Collections' />
      {
        //<CollectionsSection title="Top Collector Buys Today" />
        //<CollectionsSection title="LGBTQIA+ Pride Month Creator Spotlight" />
        //<CollectionsSection title="Trending in Art" />
        //<CollectionsSection title="Trending in Gaming" />
        //<CollectionsSection title="Trending in Memberships" />
      }
    </div>
  );
}
