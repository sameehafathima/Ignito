import { Suspense, lazy, useState } from 'react';
import { motion } from 'framer-motion';
import StarField from './components/StarField';
import DoodleField from './components/DoodleField';
import ScrollProgress from './components/ScrollProgress';
import SideRail from './components/SideRail';
import LoadingScreen from './components/LoadingScreen';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Countdown from './components/Countdown';
import Cosmo from './components/Cosmo';
import EasterEgg from './components/EasterEgg';
import Footer from './components/Footer';
import RegistrationModal from './components/RegistrationModal';
import { RegistrationProvider } from './context/RegistrationContext';

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
    <RegistrationProvider>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}

      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <StarField />
      <DoodleField />
      <ScrollProgress />
      <EasterEgg />
      <RegistrationModal />
      {loaded && <SideRail />}

      <motion.div
        initial={{ opacity: 0, scale: 1.06 }}
        animate={loaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.06 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'center center', pointerEvents: loaded ? 'auto' : 'none' }}
      >
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
      </motion.div>
    </RegistrationProvider>
  );
}
