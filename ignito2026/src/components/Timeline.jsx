import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Rocket } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { TIMELINE } from '../data/content';

export default function Timeline() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.4'] });
  const rocketY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="timeline" className="relative px-6 py-28 sm:px-8">
      <SectionHeading
        eyebrow="Flight Plan"
        title="Mission timeline"
        subtitle="From ignition to splashdown — the full trajectory of IGNITO 2026, stage by stage."
      />

      <div ref={ref} className="relative mx-auto max-w-3xl">
        {/* track */}
        <div className="absolute left-4 top-0 h-full w-px bg-white/10 sm:left-1/2" aria-hidden="true" />
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-4 top-0 w-px bg-gradient-to-b from-cyan via-ion to-plasma sm:left-1/2"
          aria-hidden="true"
        />
        <motion.div
          style={{ top: rocketY }}
          className="absolute left-4 -translate-x-1/2 -translate-y-1/2 sm:left-1/2"
          aria-hidden="true"
        >
          <div className="rounded-full bg-void p-1.5 shadow-glow-cyan">
            <Rocket className="h-5 w-5 rotate-90 text-cyan sm:rotate-0" />
          </div>
        </motion.div>

        <ol className="flex flex-col gap-12">
          {TIMELINE.map((item, i) => {
            const isRight = i % 2 === 0;
            return (
              <li key={item.stage} className="relative pl-12 sm:pl-0">
                <motion.div
                  initial={{ opacity: 0, x: isRight ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5 }}
                  className={`glass w-full rounded-2xl p-6 sm:w-[45%] ${isRight ? 'sm:ml-auto' : ''}`}
                >
                  <span className="section-label">{item.time}</span>
                  <h3 className="mt-2 font-display text-lg font-bold text-white">{item.stage}</h3>
                  <p className="mt-2 text-sm text-white/60">{item.detail}</p>
                </motion.div>
                <span
                  className="absolute left-4 top-6 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan shadow-glow-cyan sm:left-1/2"
                  aria-hidden="true"
                />
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
