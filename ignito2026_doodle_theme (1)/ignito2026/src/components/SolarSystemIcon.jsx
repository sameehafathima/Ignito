/**
 * A small looping animated solar system — a sun with two orbiting planets —
 * used as the mission-assistant avatar/toggle instead of a static bot icon,
 * so even the chat launcher stays on-theme with the rest of the site.
 *
 * Uses native SVG SMIL animation (animateTransform) so the orbit rotation is
 * always centered correctly regardless of how the icon is scaled by CSS.
 */
export default function SolarSystemIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="5.5" fill="currentColor" />

      <g fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5">
        <circle cx="24" cy="24" r="13" />
        <circle cx="24" cy="24" r="20" />
      </g>

      <g>
        <circle cx="24" cy="11" r="2.6" fill="currentColor">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 24 24"
            to="360 24 24"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      <g>
        <circle cx="24" cy="4" r="2" fill="currentColor">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360 24 24"
            to="0 24 24"
            dur="7s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  );
}
