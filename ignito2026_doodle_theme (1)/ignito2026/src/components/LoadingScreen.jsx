import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket } from 'lucide-react';

const STAGES = ['Fueling systems', 'Checking telemetry', 'Sealing hatch', 'Ignition sequence'];

// Precomputed hyperspace streak angles so they don't reshuffle on re-render.
const STREAKS = Array.from({ length: 28 }, (_, i) => ({
  angle: (i / 28) * 360 + (i % 2) * 6,
  length: 46 + ((i * 37) % 120),
  delay: (i % 10) * 0.08,
  duration: 1.5 + (i % 5) * 0.3,
}));

const ORBIT_RADII = [30, 46, 62, 78];

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
    const t = setTimeout(() => setHide(true), 950);
    const t2 = setTimeout(() => onDone?.(), 1350);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [launching, onDone]);

  const drawProgress = Math.min(1, progress / 100);

  return (
    <AnimatePresence>
      {!hide && (
        <motion.div
          exit={
            launching
              ? { opacity: 0, scale: 7, transition: { duration: 0.85, ease: [0.7, 0, 1, 1] } }
              : { opacity: 0, transition: { duration: 0.45 } }
          }
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-void"
          role="status"
          aria-live="polite"
          aria-label="Mission systems loading"
        >
          <div className="pointer-events-none absolute inset-0 bg-nebula-gradient opacity-70" />
          <div className="pointer-events-none absolute inset-0 bg-grid-overlay bg-[size:40px_40px] opacity-20" />

          {/* Hyperspace warp streaks — radiate gently while fueling, then
              stretch and blast outward at the moment of ignition, giving the
              "zooming through space" launch effect the site is themed around. */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
            {STREAKS.map((s, i) => (
              <motion.span
                key={i}
                className="absolute left-1/2 top-1/2 h-[1.5px] origin-left bg-ink"
                style={{ width: s.length, transform: `rotate(${s.angle}deg)` }}
                initial={{ opacity: 0, scaleX: 0.3 }}
                animate={
                  launching
                    ? { opacity: [0.55, 0.9, 0], scaleX: [0.4, 3.2, 5.5] }
                    : { opacity: [0, 0.32, 0], scaleX: [0.3, 1, 0.3] }
                }
                transition={
                  launching
                    ? { duration: 0.75, ease: 'easeIn' }
                    : { duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }
                }
              />
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center gap-7 px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="section-label"
            >
              Mission Control
            </motion.div>

            {/* Hand-drawn solar system that sketches itself in as fueling
                progresses — orbit rings draw stroke-by-stroke, then a planet
                starts circling once its ring is complete. */}
            <div className="relative h-40 w-40 sm:h-48 sm:w-48">
              <svg viewBox="0 0 200 200" className="h-full w-full text-ink" aria-hidden="true">
                <motion.circle
                  cx="100"
                  cy="100"
                  r="7"
                  fill="currentColor"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                {ORBIT_RADII.map((r, idx) => {
                  const ringProgress = Math.min(1, Math.max(0, drawProgress * ORBIT_RADII.length - idx));
                  return (
                    <motion.circle
                      key={r}
                      cx="100"
                      cy="100"
                      r={r}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeDasharray="3 4"
                      strokeLinecap="round"
                      style={{ opacity: ringProgress > 0 ? 0.55 : 0 }}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: ringProgress }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  );
                })}
                {drawProgress >= 1 && (
                  <circle cx={100 + ORBIT_RADII[3]} cy="100" r="3.6" fill="currentColor">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 100 100"
                      to="360 100 100"
                      dur="5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
                {drawProgress >= 0.75 && (
                  <circle cx={100 + ORBIT_RADII[2]} cy="100" r="2.6" fill="currentColor" opacity="0.85">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 100 100"
                      to="-360 100 100"
                      dur="3.4s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </svg>

              {/* Rocket climbing through the middle of the system, launching
                  straight up and out once ignition completes. */}
              <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">
                <AnimatePresence>
                  {launching && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: [0, 0.8, 0], scale: [0.5, 2.2, 3] }}
                      transition={{ duration: 0.9, ease: 'easeOut' }}
                      className="absolute -bottom-2 left-1/2 h-16 w-16 -translate-x-1/2 rounded-full bg-ink/20 blur-xl"
                    />
                  )}
                </AnimatePresence>

                <motion.div
                  animate={
                    launching
                      ? { y: -280, opacity: [1, 1, 0], transition: { duration: 0.9, ease: 'easeIn' } }
                      : { y: [0, -6, 0], transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }
                  }
                >
                  <Rocket
                    className="h-10 w-10 text-cyan drop-shadow-[2px_2px_0_rgba(17,17,17,0.5)]"
                    strokeWidth={1.5}
                  />
                  <motion.div
                    animate={{ scaleY: [0.6, 1.2, 0.6], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 0.35, repeat: Infinity }}
                    className="mx-auto -mt-1 h-6 w-1.5 origin-top rounded-full bg-gradient-to-b from-cyan via-ion to-transparent blur-[1px]"
                  />
                </motion.div>
              </div>
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

            <div className="relative">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="font-display text-sm tracking-widest2 text-white/40"
              >
                IGNITO 2026
              </motion.p>
              <svg viewBox="0 0 160 10" className="mx-auto -mt-1 h-2.5 w-32 text-ink/40" aria-hidden="true">
                <motion.path
                  d="M2 6 Q40 2 80 6 T158 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: drawProgress }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </svg>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
