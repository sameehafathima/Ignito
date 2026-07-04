import { motion } from 'framer-motion';
import { Link2, MessageCircle } from 'lucide-react';
import SectionHeading from './SectionHeading';
import TiltCard from './TiltCard';
import { SPEAKERS } from '../data/content';

const INITIAL_COLORS = ['from-cyan to-ion', 'from-ion to-plasma', 'from-plasma to-cyan', 'from-cyan to-plasma'];

export default function Speakers() {
  return (
    <section id="speakers" className="relative px-6 py-28 sm:px-8">
      <SectionHeading
        eyebrow="Mission Specialists"
        title="Meet the crew leading the briefings"
        subtitle="Engineers and researchers from across the industry, dropping in to share what they've learned at the frontier."
      />

      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SPEAKERS.map((s, i) => (
          <TiltCard key={s.name} className="rounded-2xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass flex flex-col items-center gap-3 rounded-2xl p-7 text-center"
            >
              <div
                className={`flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${INITIAL_COLORS[i % INITIAL_COLORS.length]} font-display text-xl font-bold text-void shadow-glow`}
                aria-hidden="true"
              >
                {s.name
                  .split(' ')
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join('')}
              </div>
              <h3 className="font-display text-base font-bold">{s.name}</h3>
              <p className="text-xs text-white/50">{s.role}</p>
              <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] text-cyan">{s.focus}</span>
              <div className="mt-1 flex gap-3 text-white/40">
                <a href="#" aria-label={`${s.name} on LinkedIn`} className="transition hover:text-cyan">
                  <Link2 className="h-4 w-4" />
                </a>
                <a href="#" aria-label={`${s.name} on Twitter`} className="transition hover:text-cyan">
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
