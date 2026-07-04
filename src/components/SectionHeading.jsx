import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  const alignment = align === 'left' ? 'items-start text-left' : 'items-center text-center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`mx-auto mb-14 flex max-w-2xl flex-col gap-4 ${alignment}`}
    >
      {eyebrow && (
        <span className="section-label flex items-center gap-3">
          <span className="h-px w-8 bg-cyan/60" aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {subtitle && <p className="text-balance text-white/60 sm:text-lg">{subtitle}</p>}
    </motion.div>
  );
}
