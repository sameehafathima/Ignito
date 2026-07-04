import { motion } from 'framer-motion';
import { Users, Trophy } from 'lucide-react';
import SectionHeading from './SectionHeading';
import TiltCard from './TiltCard';
import { COMPETITIONS } from '../data/content';

export default function Competitions() {
  return (
    <section id="competitions" className="relative px-6 py-28 sm:px-8">
      <div className="pointer-events-none absolute inset-0 bg-nebula-gradient opacity-30" aria-hidden="true" />
      <div className="relative">
        <SectionHeading
          eyebrow="Competitions"
          title="Mission dossiers"
          subtitle="Six sealed mission briefs. Choose one, assemble your crew, and report to the designated launch pad."
        />

        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COMPETITIONS.map((c, i) => {
            const Icon = c.icon;
            return (
              <TiltCard key={c.id} className="rounded-2xl" max={6}>
                <motion.article
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                  className="glass group relative flex h-full flex-col gap-4 rounded-2xl border-l-2 border-l-plasma/60 p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xs tracking-widest text-white/40">{c.code}</span>
                    <Icon className="h-5 w-5 text-plasma transition group-hover:text-cyan" aria-hidden="true" />
                  </div>

                  <h3 className="font-display text-lg font-bold leading-snug">{c.name}</h3>
                  <p className="flex-1 text-sm text-white/60">{c.brief}</p>

                  <div className="flex items-center justify-between border-t border-white/10 pt-4 text-sm">
                    <span className="flex items-center gap-1.5 text-white/60">
                      <Users className="h-4 w-4" aria-hidden="true" />
                      {c.seats}
                    </span>
                    <span className="flex items-center gap-1.5 font-semibold text-cyan">
                      <Trophy className="h-4 w-4" aria-hidden="true" />
                      {c.prize}
                    </span>
                  </div>
                </motion.article>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
