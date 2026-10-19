import React from 'react';
import Hero from '../components/sections/Hero';
import FeatureTicker from '../components/sections/FeatureTicker';
import ComparisonTable from '../components/product/ComparisonTable';
import FeaturedProductSection from '../components/product/FeaturedProductSection';
import FeaturesGrid from '../components/sections/FeaturesGrid';
import FullPageMedia from '../components/sections/FullPageMedia';
import MarqueeCards from '../components/sections/MarqueeCards';
import InstaFeed from '../components/sections/InstaFeed';
import styles from './Home.module.css';

const Home = () => {
  return (
    <main id="MainContent" className={styles.mainContent} tabIndex={-1}>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Logos Marquee */}
      <FeatureTicker />

      {/* 3. Comparison Section (Kiss Your Jar Goodbye) */}
      <ComparisonTable />

      {/* 4. Featured Product Buy Box & Media Gallery */}
      <FeaturedProductSection />

      {/* 5. Image with Text (Peanut Butter Needed This) */}
      <FeaturesGrid />

      {/* 6. Full Page Media (Texas Quality Story & Video) */}
      <FullPageMedia />

      {/* 7. Marquee Cards (Life's Better With Drizzy) */}
      <MarqueeCards />

      {/* 8. Instagram Community Feed */}
      <InstaFeed />
    </main>
  );
};

export default Home;
