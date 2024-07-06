import CollectionsSection from '../../../components/Carousel/CollectionsSection'
import HeroSection from '../../../components/Carousel/HeroSection'
import StatsTable from '../../../components/Carousel/StatsTable'
import BaseLayout from '../../../components/Carousel/baselayout/BaseLayout'

function App() {
  return (
    <BaseLayout>
      <HeroSection />
      <StatsTable />
      <CollectionsSection title="Notable Collections" />
      <CollectionsSection title="Top Collector Buys Today" />
      <CollectionsSection title="LGBTQIA+ Pride Month Creator Spotlight" />
      <CollectionsSection title="Trending in Art" />
      <CollectionsSection title="Trending in Gaming" />
      <CollectionsSection title="Trending in Memberships" />
    </BaseLayout>
  )
}

export default App
