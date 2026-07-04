import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';
import SectionHeading from './SectionHeading';
import TiltCard from './TiltCard';
import { GALLERY } from '../data/content';

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null);

  const close = () => setActiveIndex(null);
  const next = () => setActiveIndex((i) => (i + 1) % GALLERY.length);
  const prev = () => setActiveIndex((i) => (i - 1 + GALLERY.length) % GALLERY.length);

  const onKeyDown = (e) => {
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  };

  return (
    <section id="gallery" className="relative px-6 py-28 sm:px-8">
      <SectionHeading
        eyebrow="Mission Log"
        title="Moments from past launches"
        subtitle="A visual log from previous editions of IGNITO — snapshots we'll be adding to this year."
      />

      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {GALLERY.map((g, i) => (
          <TiltCard key={g.id} className="rounded-xl" max={10}>
            <motion.button
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
              onClick={() => setActiveIndex(i)}
              className={`group relative aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-br ${g.hue} text-left`}
              aria-label={`Open image: ${g.caption}`}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition group-hover:opacity-100">
                <ImageIcon className="h-6 w-6 text-paper" />
              </div>
              <span className="absolute bottom-0 left-0 right-0 translate-y-full bg-black/60 p-2 text-xs text-paper transition group-hover:translate-y-0">
                {g.caption}
              </span>
            </motion.button>
          </TiltCard>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onKeyDown={onKeyDown}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Gallery viewer"
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black/85 p-6"
            ref={(node) => node?.focus()}
          >
            <button
              onClick={close}
              aria-label="Close gallery"
              className="absolute right-6 top-6 rounded-full p-2 text-paper/70 transition hover:bg-paper/10 hover:text-paper"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-4 rounded-full p-2 text-paper/70 transition hover:bg-paper/10 hover:text-paper sm:left-8"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex aspect-video w-full max-w-3xl flex-col items-center justify-center gap-3 rounded-2xl bg-gradient-to-br p-8 ${GALLERY[activeIndex].hue}`}
            >
              <ImageIcon className="h-10 w-10 text-paper/70" />
              <p className="font-display text-paper">{GALLERY[activeIndex].caption}</p>
            </motion.div>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-4 rounded-full p-2 text-paper/70 transition hover:bg-paper/10 hover:text-paper sm:right-8"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
