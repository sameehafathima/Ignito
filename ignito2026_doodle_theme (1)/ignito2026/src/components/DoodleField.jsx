import { motion } from 'framer-motion';

/**
 * A handful of loosely-sketched space doodles (ringed planet, UFO, comet,
 * rocket) that drift slowly across the whole page as a persistent ambient
 * layer — reinforcing the ink-doodle space theme beyond just the hero.
 * Purely decorative, ignored by assistive tech and pointer events.
 */
function DoodlePlanet(props) {
  return (
    <svg viewBox="0 0 100 100" {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <circle cx="50" cy="50" r="22" />
        <ellipse cx="50" cy="50" rx="40" ry="10" transform="rotate(-16 50 50)" />
      </g>
    </svg>
  );
}

function DoodleUFO(props) {
  return (
    <svg viewBox="0 0 100 60" {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <ellipse cx="50" cy="38" rx="34" ry="8" />
        <path d="M28 38 Q50 14 72 38" />
        <path d="M40 30 L37 15 M50 28 L50 12 M60 30 L63 15" />
      </g>
    </svg>
  );
}

function DoodleComet(props) {
  return (
    <svg viewBox="0 0 100 40" {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <circle cx="82" cy="20" r="6" />
        <path d="M76 20 Q40 22 6 8" />
        <path d="M76 24 Q44 30 12 26" opacity="0.6" />
      </g>
    </svg>
  );
}

const ITEMS = [
  { El: DoodlePlanet, top: '8%', left: '4%', size: 90, duration: 22, opacity: 0.16 },
  { El: DoodleUFO, top: '22%', left: '88%', size: 110, duration: 18, opacity: 0.15 },
  { El: DoodlePlanet, top: '62%', left: '92%', size: 70, duration: 26, opacity: 0.14 },
  { El: DoodleComet, top: '78%', left: '2%', size: 130, duration: 20, opacity: 0.16 },
  { El: DoodleUFO, top: '45%', left: '6%', size: 80, duration: 24, opacity: 0.12 },
];

export default function DoodleField() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden" aria-hidden="true">
      {ITEMS.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-ink"
          style={{ top: item.top, left: item.left, width: item.size, opacity: item.opacity }}
          animate={{ y: [0, -22, 0], rotate: [0, 3, -3, 0] }}
          transition={{ duration: item.duration, repeat: Infinity, ease: 'easeInOut' }}
        >
          <item.El className="h-auto w-full" />
        </motion.div>
      ))}
    </div>
  );
}
