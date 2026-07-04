import { useEffect, useRef, useState } from 'react';

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'Mission' },
  { id: 'countdown', label: 'Countdown' },
  { id: 'events', label: 'Events' },
  { id: 'competitions', label: 'Competitions' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'speakers', label: 'Speakers' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

export default function SideRail() {
  const [active, setActive] = useState('hero');
  const observerRef = useRef(null);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { threshold: [0.2, 0.4, 0.6], rootMargin: '-15% 0px -60% 0px' }
    );

    els.forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* Left rotated brand rail — desktop only, purely presentational chrome */}
      <div
        className="pointer-events-none fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
        aria-hidden="true"
      >
        <span className="block origin-center -rotate-90 whitespace-nowrap font-display text-[0.7rem] tracking-[0.5em] text-white/35">
          IGNITO &middot; 2026
        </span>
      </div>

      {/* Right scroll-spy dot navigation */}
      <nav
        aria-label="Section navigation"
        className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex"
      >
        {SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="group flex items-center gap-3"
              aria-label={`Go to ${s.label}`}
              aria-current={isActive ? 'true' : undefined}
            >
              <span
                className={`whitespace-nowrap font-display text-[0.65rem] tracking-[0.3em] transition-all duration-300 ${
                  isActive
                    ? 'translate-x-0 text-cyan opacity-100'
                    : 'translate-x-2 text-white/40 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                }`}
              >
                {s.label.toUpperCase()}
              </span>
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? 'h-2.5 w-2.5 bg-cyan shadow-glow-cyan'
                    : 'h-1.5 w-1.5 bg-white/30 group-hover:bg-white/60'
                }`}
              />
            </button>
          );
        })}
      </nav>
    </>
  );
}
