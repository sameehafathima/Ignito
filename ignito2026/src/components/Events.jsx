import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import TiltCard from './TiltCard';
import { EVENTS } from '../data/content';

const ORBIT_OFFSET = { inner: 'lg:translate-y-0', mid: 'lg:translate-y-8', outer: 'lg:-translate-y-4' };

export default function Events() {
  return (
    <section id="events" className="relative px-6 py-28 sm:px-8">
      <SectionHeading
        eyebrow="Featured Events"
        title="Pick your orbit"
        subtitle="Six flagship events, each its own planet in the IGNITO system. Land on the one that matches your crew's specialty."
      />

      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {EVENTS.map((ev, i) => {
          const Icon = ev.icon;
          return (
            <TiltCard key={ev.id} className={`rounded-3xl ${ORBIT_OFFSET[ev.orbit] ?? ''}`}>
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.1 }}
                className="glass relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl p-8"
              >
                {/* planet glow */}
                <div
                  className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${ev.color} opacity-25 blur-2xl transition-opacity duration-500 group-hover:opacity-50`}
                  aria-hidden="true"
                />
                <div
                  className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${ev.color} shadow-glow animate-float`}
                >
                  <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>

                <div className="relative">
                  <h3 className="font-display text-xl font-bold">{ev.name}</h3>
                  <p className="mt-1 text-sm font-medium text-cyan">{ev.tagline}</p>
                </div>

                <p className="relative flex-1 text-sm text-white/60">{ev.description}</p>

                <a
                  href="#register"
                  className="relative mt-2 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-white transition group-hover:gap-2.5"
                >
                  Enter orbit
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </motion.article>
            </TiltCard>
          );
        })}
      </div>
    </section>
  );
}
