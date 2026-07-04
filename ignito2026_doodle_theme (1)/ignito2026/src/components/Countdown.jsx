import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from './SectionHeading';

// Mission launch date — update as needed.
const LAUNCH_DATE = new Date('2026-12-12T09:00:00+05:30');

function getTimeLeft() {
  const diff = LAUNCH_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: false,
  };
}

const UNITS = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
];

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="countdown" className="relative px-6 py-28 sm:px-8">
      <div className="pointer-events-none absolute inset-0 bg-nebula-gradient opacity-40" aria-hidden="true" />
      <div className="relative">
        <SectionHeading
          eyebrow="T-minus"
          title={time.done ? 'We have liftoff.' : 'Ignition sequence in progress'}
          subtitle={
            time.done
              ? 'IGNITO 2026 is live. See you at Mission Control.'
              : 'The countdown clock ticking down to the opening ceremony at Launch Deck A.'
          }
        />

        <div
          className="mx-auto flex max-w-3xl flex-wrap justify-center gap-4 sm:gap-6"
          role="timer"
          aria-live="polite"
          aria-atomic="true"
          aria-label={`Countdown to launch: ${time.days} days, ${time.hours} hours, ${time.minutes} minutes, ${time.seconds} seconds`}
        >
          {UNITS.map((u, i) => (
            <motion.div
              key={u.key}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass relative flex w-24 flex-col items-center gap-2 overflow-hidden rounded-2xl py-6 shadow-glow-cyan sm:w-32"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan/10 to-transparent" />
              <div
                className="relative h-[1em] overflow-hidden font-display text-4xl font-bold tabular-nums sm:text-5xl"
                style={{ perspective: 200 }}
              >
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={time[u.key]}
                    initial={{ rotateX: -90, opacity: 0, y: -8 }}
                    animate={{ rotateX: 0, opacity: 1, y: 0 }}
                    exit={{ rotateX: 90, opacity: 0, y: 8 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="block"
                    style={{ transformOrigin: 'center' }}
                  >
                    {String(time[u.key]).padStart(2, '0')}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="relative text-xs uppercase tracking-widest text-white/50">{u.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
