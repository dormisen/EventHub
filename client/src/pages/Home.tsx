import { Hero } from '../components/home/Hero';
import { Features } from '../components/home/Features';
import { Categories } from '../components/home/Categories';
import { FeaturedEvents } from '../components/home/FeaturedEvents';
import { TrendingEvents } from '../components/home/TrendingEvents';
import { HowItWorks } from '../components/home/HowItWorks';
import { Testimonials } from '../components/home/Twstimonials';
import { FAQ } from '../components/home/FAQ';
import { Newsletter } from '../components/home/NewSletter';
import ClickSpark from '../components/home/comps/ClickSpark';
import LoadingSpinner from '../components/AD_co/LoadingSpinner';
import { Suspense } from 'react';
const Home = () => {
  return (
    <ClickSpark
      sparkColor='#fff'
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div className="overflow-hidden font-sans bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
        <Suspense fallback={<LoadingSpinner />}>
          <Hero />
          <Features />
          <Categories />
          <FeaturedEvents />
          <TrendingEvents />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <Newsletter />
        </Suspense>
      </div>
    </ClickSpark>
  );
};

export default Home;