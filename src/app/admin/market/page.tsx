"use client";

import { STATS_TABLE } from '../consts'
import { HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import Button from './Button'
import Container from './Container'
import CollectionsSection from './CollectionsSection'
import StatsTable from './StatsTable'
import HeroSection from './Herosection'


export default async function Market() {
  return (
    <div>
      <HeroSection />
      <StatsTable />
      <CollectionsSection title="Notable Collections" />
      <CollectionsSection title="Top Collector Buys Today" />
      <CollectionsSection title="LGBTQIA+ Pride Month Creator Spotlight" />
      <CollectionsSection title="Trending in Art" />
      <CollectionsSection title="Trending in Gaming" />
      <CollectionsSection title="Trending in Memberships" />
    </div>
  );
}
