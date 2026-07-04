import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket } from 'lucide-react';

const CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export default function EasterEgg() {
  const [buffer, setBuffer] = useState([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      setBuffer((prev) => {
        const next = [...prev, e.key].slice(-CODE.length);
        if (next.length === CODE.length && next.every((k, i) => k.toLowerCase() === CODE[i].toLowerCase())) {
          setActive(true);
          setTimeout(() => setActive(false), 4000);
          return [];
        }
        return next;
      });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-[300] flex items-center justify-center bg-void/80"
          role="status"
          aria-live="polite"
        >
          <motion.div
            initial={{ scale: 0.7, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            className="glass-strong flex flex-col items-center gap-4 rounded-3xl px-10 py-12 text-center shadow-glow-plasma"
          >
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [0, -6, 6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            >
              <Rocket className="h-14 w-14 text-plasma" />
            </motion.div>
            <h3 className="font-display text-xl font-bold text-gradient">Secret trajectory unlocked</h3>
            <p className="max-w-xs text-sm text-white/60">
              You found mission control's hidden override. Godspeed, crew member.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
