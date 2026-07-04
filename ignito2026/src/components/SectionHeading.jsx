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
      {eyebrow && <span className="section-label">{eyebrow}</span>}
      <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">{title}</h2>
      {subtitle && <p className="text-balance text-white/60 sm:text-lg">{subtitle}</p>}
    </motion.div>
  );
}
