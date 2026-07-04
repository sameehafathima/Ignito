import { motion } from 'framer-motion';
import { Rocket, Users, Trophy, Globe2 } from 'lucide-react';
import SectionHeading from './SectionHeading';
import TiltCard from './TiltCard';
import SketchIllustration from './SketchIllustration';

const STATS = [
  { icon: Users, value: '5,000+', label: 'Crew members' },
  { icon: Trophy, value: '\u20b9 10L+', label: 'Prize pool' },
  { icon: Rocket, value: '40+', label: 'Missions & events' },
  { icon: Globe2, value: '120+', label: 'Institutions' },
];

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 sm:px-8">
      <SectionHeading
        eyebrow="Mission Briefing"
        title="Every fest launches. Few reach orbit."
        subtitle="IGNITO began as a single department showcase and has grown into a national mission — where students don't just attend talks, they build, break, defend and ship things that matter, on the clock."
      />

      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <TiltCard key={s.label} className="rounded-2xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass relative flex flex-col items-center gap-3 rounded-2xl px-6 py-10 text-center shadow-inner-glass"
            >
              <s.icon className="h-7 w-7 text-cyan" aria-hidden="true" />
              <span className="font-display text-3xl font-bold">{s.value}</span>
              <span className="text-sm text-white/60">{s.label}</span>
            </motion.div>
          </TiltCard>
        ))}
      </div>

      {/* Editorial illustrated panel — sketched line-art in the vein of a mission dispatch */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="glass relative mx-auto mt-16 max-w-6xl overflow-hidden rounded-3xl p-8 sm:p-12"
      >
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="relative z-10 text-left">
            <span className="section-label">Dispatch 001</span>
            <h3 className="mt-3 font-display text-2xl font-bold leading-tight sm:text-3xl">
              What does it take to launch past the edge of a normal fest?
            </h3>
            <p className="mt-4 max-w-md text-white/60">
              Every crew member who's flown with IGNITO before will tell you: it isn't the
              prize money that pulls people back, it's the 48 hours where an idea sketched on
              a napkin turns into something that actually works.
            </p>
          </div>
          <SketchIllustration className="relative z-10 h-auto w-full text-cyan/70" />
        </div>
      </motion.div>

      <div className="mx-auto mt-16 grid max-w-6xl gap-6 lg:grid-cols-3">
        {[
          {
            title: 'The Objective',
            body: 'Give every participant a real problem, a real deadline, and a real panel of engineers to answer to — not a mock exercise.',
          },
          {
            title: 'The Crew',
            body: 'Students from over a hundred institutions form cross-disciplinary teams: hardware, software, design and strategy, together.',
          },
          {
            title: 'The Trajectory',
            body: 'Two days of workshops, competitions and talks that end with a working demo, a published repo, or a signed term sheet.',
          },
        ].map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass rounded-2xl p-8"
          >
            <h3 className="mb-3 font-display text-lg font-semibold text-cyan">{card.title}</h3>
            <p className="text-white/60">{card.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
