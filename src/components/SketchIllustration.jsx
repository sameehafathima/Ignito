import { motion } from 'framer-motion';

/**
 * Hand-drawn, monochrome line-art illustration in the style of editorial
 * space-blog covers — astronaut, ringed planet, UFO and stars sketched
 * with loose strokes. Pure inline SVG, animates in on scroll.
 */
export default function SketchIllustration({ className = '' }) {
  return (
    <motion.svg
      viewBox="0 0 500 340"
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7 }}
      aria-hidden="true"
    >
      <defs>
        <filter id="sketchy" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" />
        </filter>
      </defs>

      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#sketchy)"
        opacity="0.85"
      >
        {/* ringed planet */}
        <circle cx="380" cy="90" r="34" />
        <ellipse cx="380" cy="90" rx="58" ry="16" transform="rotate(-18 380 90)" />
        <circle cx="368" cy="82" r="3" fill="currentColor" stroke="none" />

        {/* stars */}
        {[
          [40, 30], [90, 60], [150, 20], [250, 40], [440, 200], [30, 220], [460, 60], [200, 260],
        ].map(([x, y], i) => (
          <path
            key={i}
            d={`M${x} ${y - 6} L${x} ${y + 6} M${x - 6} ${y} L${x + 6} ${y}`}
            strokeWidth="1.6"
          />
        ))}

        {/* moon (bottom left) */}
        <circle cx="70" cy="250" r="26" />
        <circle cx="60" cy="242" r="4" />
        <circle cx="80" cy="258" r="3" />

        {/* UFO */}
        <ellipse cx="150" cy="290" rx="46" ry="10" />
        <path d="M120 290 Q150 260 180 290" />
        <path d="M136 280 L132 262 M150 278 L150 258 M164 280 L168 262" />

        {/* astronaut floating, tumbling */}
        <g transform="translate(300,230) rotate(18)">
          <circle cx="0" cy="0" r="26" />
          <path d="M-16 -8 Q0 4 16 -8" opacity="0.6" />
          <path d="M-26 4 Q-40 20 -30 44" />
          <path d="M26 4 Q42 -4 46 20" />
          <path d="M-10 22 Q-16 46 -6 62" />
          <path d="M8 22 Q18 44 10 64" />
          <rect x="-14" y="18" width="28" height="26" rx="8" />
        </g>

        {/* alien, small */}
        <g transform="translate(60,110)">
          <ellipse cx="0" cy="-4" rx="14" ry="18" />
          <circle cx="-6" cy="-6" r="4" fill="currentColor" stroke="none" />
          <circle cx="6" cy="-6" r="4" fill="currentColor" stroke="none" />
          <path d="M-8 20 L-14 34 M8 20 L14 34 M0 20 L0 36" />
        </g>
      </g>
    </motion.svg>
  );
}
