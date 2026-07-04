import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket } from 'lucide-react';

const STAGES = ['Fueling systems', 'Checking telemetry', 'Sealing hatch', 'Ignition sequence'];

const ORBIT_RADII = [30, 46, 62, 78];

const PLANET_COLORS = ['#22d3ee', '#f97316', '#facc78', '#a78bfa'];

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const [launching, setLaunching] = useState(false);
  const [hide, setHide] = useState(false);

  // Deep background stars — fixed random field, computed once.
  const bgStars = useMemo(
    () =>
      Array.from({ length: 140 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        r: Math.random() * 1.6 + 0.3,
        d: Math.random() * 2.4 + 1.2,
        delay: Math.random() * 3,
      })),
    []
  );

  // Hyperspace warp streaks — precomputed so they don't reshuffle on re-render.
  const streaks = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        angle: (i / 40) * 360 + (i % 2) * 4.5,
        length: 40 + ((i * 41) % 160),
        delay: (i % 12) * 0.06,
        duration: 1.4 + (i % 5) * 0.25,
      })),
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.random() * 8 + 3.5);
        setStage(Math.min(STAGES.length - 1, Math.floor((next / 100) * STAGES.length)));
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setLaunching(true), 550);
        }
        return next;
      });
    }, 190);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!launching) return;
    const t = setTimeout(() => setHide(true), 1450);
    const t2 = setTimeout(() => onDone?.(), 1900);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [launching, onDone]);

  const drawProgress = Math.min(1, progress / 100);
  const nearIgnition = progress > 82;

  return (
    <AnimatePresence>
      {!hide && (
        <motion.div
          exit={
            launching
              ? { opacity: 0, scale: 1.4, transition: { duration: 0.55, ease: [0.7, 0, 1, 1] } }
              : { opacity: 0, transition: { duration: 0.45 } }
          }
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-void"
          role="status"
          aria-live="polite"
          aria-label="Mission systems loading"
        >
          {/* Deep space base + drifting nebula haze */}
          <div className="pointer-events-none absolute inset-0 bg-nebula-gradient opacity-90" />
          <div className="pointer-events-none absolute inset-0 bg-grid-overlay bg-[size:46px_46px] opacity-[0.08]" />

          {/* Distant static star field, twinkling */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            {bgStars.map((s, i) => (
              <motion.span
                key={i}
                className="absolute rounded-full bg-white"
                style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.r, height: s.r }}
                animate={{ opacity: [0.15, 0.9, 0.15] }}
                transition={{ duration: s.d, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
              />
            ))}
          </div>

          {/* Hyperspace warp streaks — radiate gently while fueling, then
              stretch and blast outward at the moment of ignition. */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
            {streaks.map((s, i) => (
              <motion.span
                key={i}
                className="absolute left-1/2 top-1/2 h-[1.5px] origin-left bg-gradient-to-r from-cyan via-ion to-transparent"
                style={{ width: s.length, transform: `rotate(${s.angle}deg)` }}
                initial={{ opacity: 0, scaleX: 0.3 }}
                animate={
                  launching
                    ? { opacity: [0.7, 1, 0], scaleX: [0.5, 4.5, 8] }
                    : nearIgnition
                    ? { opacity: [0.15, 0.55, 0.15], scaleX: [0.4, 1.6, 0.4] }
                    : { opacity: [0, 0.28, 0], scaleX: [0.3, 1, 0.3] }
                }
                transition={
                  launching
                    ? { duration: 0.65, ease: 'easeIn' }
                    : { duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }
                }
              />
            ))}
          </div>

          {/* Ignition flash */}
          <AnimatePresence>
            {launching && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.7, times: [0, 0.15, 1] }}
                className="pointer-events-none absolute inset-0 bg-white"
              />
            )}
          </AnimatePresence>

          <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="section-label"
            >
              Mission Control
            </motion.div>

            {/* Miniature solar system that ignites and forms as fueling
                progresses — the sun brightens, orbit rings draw in one by
                one, and planets snap into orbit and start circling once
                their ring completes. */}
            <div className="relative h-44 w-44 sm:h-52 sm:w-52">
              <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
                <defs>
                  <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fff3c4" />
                    <stop offset="45%" stopColor="#ffb454" />
                    <stop offset="100%" stopColor="#ff8a2b" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <motion.circle
                  cx="100"
                  cy="100"
                  r="26"
                  fill="url(#sunGlow)"
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{
                    opacity: 1,
                    scale: launching ? [1, 2.6] : 0.55 + drawProgress * 0.65,
                  }}
                  transition={launching ? { duration: 0.7, ease: 'easeIn' } : { duration: 0.4 }}
                  style={{ transformOrigin: '100px 100px' }}
                />
                <motion.circle
                  cx="100"
                  cy="100"
                  r="7"
                  fill="#fff3c4"
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
                      stroke="rgba(255,255,255,0.35)"
                      strokeWidth="1.2"
                      strokeDasharray="3 4"
                      strokeLinecap="round"
                      style={{ opacity: ringProgress > 0 ? 1 : 0 }}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: ringProgress }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  );
                })}

                {ORBIT_RADII.map((r, idx) => {
                  const threshold = (idx + 1) / ORBIT_RADII.length;
                  if (drawProgress < threshold - 0.001) return null;
                  const dur = 3 + idx * 1.1;
                  const dir = idx % 2 === 0 ? 1 : -1;
                  return (
                    <circle key={`p-${r}`} cx={100 + r} cy="100" r={3 + idx * 0.4} fill={PLANET_COLORS[idx]}>
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from={dir > 0 ? '0 100 100' : '360 100 100'}
                        to={dir > 0 ? '360 100 100' : '0 100 100'}
                        dur={`${dur}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  );
                })}
              </svg>

              {/* Rocket climbing through the system, launching straight up
                  and out once ignition completes. */}
              <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">
                <AnimatePresence>
                  {launching && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: [0, 0.9, 0], scale: [0.5, 2.6, 3.6] }}
                      transition={{ duration: 0.9, ease: 'easeOut' }}
                      className="absolute -bottom-2 left-1/2 h-16 w-16 -translate-x-1/2 rounded-full bg-cyan/30 blur-xl"
                    />
                  )}
                </AnimatePresence>

                <motion.div
                  animate={
                    launching
                      ? { y: -320, opacity: [1, 1, 0], transition: { duration: 0.9, ease: 'easeIn' } }
                      : { y: [0, -6, 0], transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }
                  }
                >
                  <Rocket className="h-10 w-10 text-cyan drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" strokeWidth={1.5} />
                  <motion.div
                    animate={{ scaleY: [0.6, 1.2, 0.6], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 0.35, repeat: Infinity }}
                    className="mx-auto -mt-1 h-6 w-1.5 origin-top rounded-full bg-gradient-to-b from-cyan via-ion to-transparent blur-[1px]"
                  />
                </motion.div>
              </div>
            </div>

            <div className="w-64 sm:w-80">
              <div className="mb-2 flex items-center justify-between font-display text-xs tracking-widest text-white/70">
                <span>{launching ? 'LIFTOFF' : STAGES[stage]}</span>
                <span>{Math.floor(progress)}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan via-ion to-plasma shadow-glow-cyan"
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Epic title reveal — builds as ignition nears, then rockets
                toward the viewer during the hyperspace jump. */}
            <div className="relative">
              <motion.p
                initial={{ opacity: 0, letterSpacing: '0.1em' }}
                animate={{
                  opacity: nearIgnition || launching ? 1 : 0.55,
                  scale: launching ? 3.4 : 1,
                  letterSpacing: launching ? '0.02em' : '0.35em',
                }}
                transition={launching ? { duration: 0.85, ease: [0.16, 1, 0.3, 1] } : { duration: 0.6 }}
                className="font-display text-lg font-black uppercase tracking-widest2 text-gradient sm:text-2xl"
              >
                Ignito 2026
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: launching ? 0 : 1 }}
                transition={{ duration: 0.4 }}
                className="mt-1 font-display text-[10px] tracking-widest2 text-white/40 sm:text-xs"
              >
                Beyond Infinity
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
