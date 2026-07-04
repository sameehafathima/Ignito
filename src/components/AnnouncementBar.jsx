import { useState } from 'react';
import { X, Rss } from 'lucide-react';

const ANNOUNCEMENTS = [
  'Registrations for Hackstellar close in 5 days',
  'Early-bird passes end soon — lock your spot now',
  'Speaker lineup for Day 1 keynote just confirmed',
  'Campus dormitory requests open for outstation teams',
];

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  const feed = [...ANNOUNCEMENTS, ...ANNOUNCEMENTS];

  return (
    <div className="relative z-[65] flex items-center gap-3 overflow-hidden border-b border-white/10 bg-abyss/90 px-4 py-2 text-xs text-white/80">
      <span className="flex shrink-0 items-center gap-1.5 font-display tracking-widest text-cyan">
        <Rss className="h-3.5 w-3.5 animate-pulse" aria-hidden="true" />
        LIVE
      </span>
      <div className="relative flex-1 overflow-hidden">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
          {feed.map((item, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-plasma" />
              {item}
            </span>
          ))}
        </div>
      </div>
      <button
        onClick={() => setVisible(false)}
        aria-label="Dismiss announcement bar"
        className="shrink-0 rounded-full p-1 text-white/50 transition hover:bg-white/10 hover:text-white"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
