import { Suspense, lazy, useState } from 'react';
import StarField from './components/StarField';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import LoadingScreen from './components/LoadingScreen';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Countdown from './components/Countdown';
import Cosmo from './components/Cosmo';
import EasterEgg from './components/EasterEgg';
import Footer from './components/Footer';

// Below-the-fold sections are lazy-loaded to keep the initial bundle lean.
const Events = lazy(() => import('./components/Events'));
const Competitions = lazy(() => import('./components/Competitions'));
const Timeline = lazy(() => import('./components/Timeline'));
const Speakers = lazy(() => import('./components/Speakers'));
const Sponsors = lazy(() => import('./components/Sponsors'));
const Gallery = lazy(() => import('./components/Gallery'));
const FAQ = lazy(() => import('./components/FAQ'));
const Contact = lazy(() => import('./components/Contact'));

function SectionFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-cyan" aria-hidden="true" />
      <span className="sr-only">Loading section...</span>
    </div>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}

      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <StarField />
      <CustomCursor />
      <ScrollProgress />
      <EasterEgg />

      <div className={loaded ? 'opacity-100 transition-opacity duration-500' : 'opacity-0'}>
        <AnnouncementBar />
        <Navbar />

        <main id="main-content" className="relative z-10">
          <Hero />
          <About />
          <Countdown />

          <Suspense fallback={<SectionFallback />}>
            <Events />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Competitions />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Timeline />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Speakers />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Sponsors />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Gallery />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <FAQ />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Contact />
          </Suspense>
        </main>

        <Footer />
        <Cosmo />
      </div>
    </>
  );
}
