import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket } from 'lucide-react';

const STAGES = ['Fueling systems', 'Checking telemetry', 'Sealing hatch', 'Ignition sequence'];

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const [launching, setLaunching] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.random() * 9 + 4);
        setStage(Math.min(STAGES.length - 1, Math.floor((next / 100) * STAGES.length)));
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setLaunching(true), 350);
        }
        return next;
      });
    }, 180);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!launching) return;
    const t = setTimeout(() => setHide(true), 1200);
    const t2 = setTimeout(() => onDone?.(), 1650);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [launching, onDone]);

  return (
    <AnimatePresence>
      {!hide && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-void"
          role="status"
          aria-live="polite"
          aria-label="Mission systems loading"
        >
          <div className="pointer-events-none absolute inset-0 bg-nebula-gradient opacity-70" />
          <div className="pointer-events-none absolute inset-0 bg-grid-overlay bg-[size:40px_40px] opacity-20" />

          <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="section-label"
            >
              Mission Control
            </motion.div>

            <div className="relative h-40 w-16">
              {/* launch smoke */}
              <AnimatePresence>
                {launching && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: [0, 0.8, 0], scale: [0.5, 2.4, 3.2] }}
                    transition={{ duration: 1.1, ease: 'easeOut' }}
                    className="absolute -bottom-4 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-white/30 blur-xl"
                  />
                )}
              </AnimatePresence>

              <motion.div
                animate={
                  launching
                    ? { y: -600, opacity: [1, 1, 0], transition: { duration: 1.1, ease: 'easeIn' } }
                    : { y: [0, -6, 0], transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }
                }
                className="absolute bottom-0 left-1/2 -translate-x-1/2"
              >
                <Rocket className="h-16 w-16 -rotate-0 text-cyan drop-shadow-[0_0_18px_rgba(0,229,255,0.8)]" strokeWidth={1.5} />
                <motion.div
                  animate={{ scaleY: [0.6, 1.2, 0.6], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.35, repeat: Infinity }}
                  className="mx-auto -mt-1 h-8 w-2 origin-top rounded-full bg-gradient-to-b from-cyan via-ion to-transparent blur-[1px]"
                />
              </motion.div>
            </div>

            <div className="w-64 sm:w-80">
              <div className="mb-2 flex items-center justify-between font-display text-xs tracking-widest text-white/60">
                <span>{launching ? 'LIFTOFF' : STAGES[stage]}</span>
                <span>{Math.floor(progress)}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan via-ion to-plasma"
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-display text-sm tracking-widest2 text-white/40"
            >
              IGNITO 2026
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
