import { motion, useScroll, useTransform } from 'framer-motion';
import { Suspense, lazy, useRef } from 'react';
import { Rocket, ChevronDown } from 'lucide-react';
import { useRegistration } from '../context/RegistrationContext';

const Astronaut3D = lazy(() => import('./Astronaut3D'));

export default function Hero() {
  const { openRegistration } = useRegistration();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col items-center overflow-hidden px-6 pb-10 pt-28 text-center lg:flex-row lg:items-center lg:justify-between lg:px-16 lg:text-left xl:px-24"
      aria-label="Hero: IGNITO 2026, Beyond Infinity"
    >
      {/* Orbiting planets */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-[8%] top-[18%] h-24 w-24 animate-float rounded-full bg-gradient-to-br from-ion to-plasma opacity-70 shadow-glow blur-[0.5px] sm:h-32 sm:w-32" />
        <div className="absolute right-[10%] top-[28%] h-14 w-14 animate-float-delay rounded-full bg-gradient-to-br from-cyan to-ion opacity-60 shadow-glow-cyan sm:h-20 sm:w-20" />
        <div className="absolute bottom-[15%] left-[15%] h-10 w-10 animate-float rounded-full bg-gradient-to-br from-plasma to-cyan opacity-50 shadow-glow-plasma" />

        {/* orbit rings with satellite */}
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 sm:h-[640px] sm:w-[640px] lg:left-[68%]" />
        <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 animate-spin-slow sm:h-[460px] sm:w-[460px] lg:left-[68%]">
          <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-sm bg-cyan shadow-glow-cyan" />
        </div>
        <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 animate-spin-reverse sm:h-[320px] sm:w-[320px] lg:left-[68%]">
          <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-plasma shadow-glow-plasma" />
        </div>
      </div>

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6 lg:mx-0 lg:items-start"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="glass flex items-center gap-2 rounded-full px-4 py-1.5 text-xs tracking-widest text-white/70"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" />
          MISSION WINDOW OPEN &middot; DECEMBER 2026
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-6xl font-black uppercase leading-[0.88] tracking-tight sm:text-7xl md:text-8xl lg:text-[7rem]"
        >
          IGNITO
          <span className="block text-gradient">2026</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="font-display text-sm tracking-widest2 text-white/50 sm:text-base"
        >
          BEYOND INFINITY
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="max-w-xl text-balance text-white/60 sm:text-lg"
        >
          Two days. One national techfest. A crew of builders, hackers and dreamers pushing
          past the edge of what a college fest is supposed to feel like.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-4 flex flex-col items-center gap-4 sm:flex-row"
        >
          <button
            type="button"
            onClick={() => openRegistration()}
            className="btn-glow group flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan via-ion to-plasma px-8 py-4 font-display text-sm font-bold tracking-wide text-void shadow-glow transition hover:scale-105"
          >
            <Rocket className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:rotate-12" />
            Launch Mission
          </button>
          <a
            href="#about"
            className="glass rounded-full px-8 py-4 text-sm font-medium text-white/80 transition hover:text-white"
          >
            View Mission Briefing
          </a>
        </motion.div>
      </motion.div>

      {/* Low-poly 3D astronaut — desktop feature, hidden on small screens for performance */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-10 mt-4 hidden h-[420px] w-full max-w-md shrink-0 lg:mt-0 lg:block xl:h-[520px] xl:max-w-lg"
        aria-hidden="true"
      >
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <div className="h-16 w-16 animate-spin rounded-full border-2 border-white/10 border-t-cyan" />
            </div>
          }
        >
          <Astronaut3D />
        </Suspense>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        aria-label="Scroll to next section"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/40 transition hover:text-cyan lg:left-8 lg:translate-x-0"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.a>
    </section>
  );
}
