import { motion } from 'framer-motion';
import { Handshake } from 'lucide-react';
import SectionHeading from './SectionHeading';
import TiltCard from './TiltCard';
import { SPONSORS } from '../data/content';
import { useRegistration } from '../context/RegistrationContext';

function Tier({ title, items, size }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <span className="section-label">{title}</span>
      <div className="flex flex-wrap justify-center gap-5">
        {items.map((s, i) => (
          <TiltCard key={s.name} className="rounded-xl" max={8}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`glass flex items-center justify-center rounded-xl px-8 font-display font-semibold text-white/70 transition hover:text-white hover:shadow-glow ${size}`}
            >
              {s.name}
            </motion.div>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}

export default function Sponsors() {
  const { openRegistration } = useRegistration();

  return (
    <section id="sponsors" className="relative px-6 py-28 sm:px-8">
      <SectionHeading
        eyebrow="Ground Support"
        title="Powered by our mission partners"
        subtitle="IGNITO 2026 is made possible by organizations that fuel student-built ideas."
      />

      <div className="mx-auto flex max-w-5xl flex-col gap-14">
        <Tier title="Title Sponsor" items={SPONSORS.title} size="h-24 text-xl" />
        <Tier title="Platinum" items={SPONSORS.platinum} size="h-20 text-lg" />
        <Tier title="Gold" items={SPONSORS.gold} size="h-16 text-base" />
        <Tier title="Community Partners" items={SPONSORS.community} size="h-14 text-sm" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="mx-auto mt-16 flex max-w-lg flex-col items-center gap-4 text-center"
      >
        <p className="text-sm text-white/60">
          Want your organization on this list? Partner with IGNITO 2026 and reach 5,000+ builders.
        </p>
        <button
          type="button"
          onClick={() => openRegistration('Sponsorship Enquiry')}
          className="btn-glow flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-display text-xs font-bold uppercase tracking-widest text-paper transition hover:scale-105"
        >
          <Handshake className="h-4 w-4" />
          Become a mission partner
        </button>
      </motion.div>
    </section>
  );
}
