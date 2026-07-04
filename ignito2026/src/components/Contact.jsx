import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle2 } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { submitTransmission } from '../lib/firebase';

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [sent, setSent] = useState(false);

  const onSubmit = async (data) => {
    await submitTransmission(data);
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="relative px-6 py-28 sm:px-8">
      <div id="register" className="absolute -top-24" aria-hidden="true" />
      <SectionHeading
        eyebrow="Mission Control"
        title="Open a channel with us"
        subtitle="Questions, sponsorships, or ready to register your crew — send a transmission and we'll respond within 24 hours."
      />

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-5">
        <div className="glass flex flex-col gap-6 rounded-2xl p-8 lg:col-span-2">
          <h3 className="font-display text-lg font-bold">Ground station</h3>
          <div className="flex items-start gap-3 text-sm text-white/70">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-cyan" />
            <span>contact@ignito2026.tech</span>
          </div>
          <div className="flex items-start gap-3 text-sm text-white/70">
            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-cyan" />
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-start gap-3 text-sm text-white/70">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-cyan" />
            <span>Department of Engineering, Launch Campus, Kochi, India</span>
          </div>
          <div className="mt-4 aspect-video overflow-hidden rounded-xl bg-nebula">
            <div className="flex h-full w-full items-center justify-center bg-nebula-gradient text-xs text-white/40">
              Campus map preview
            </div>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="glass flex flex-col gap-5 rounded-2xl p-8 lg:col-span-3"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm text-white/70">
                Full name
              </label>
              <input
                id="name"
                {...register('name', { required: 'Please tell us your name.' })}
                aria-invalid={errors.name ? 'true' : 'false'}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-cyan"
                placeholder="Ada Lovelace"
              />
              {errors.name && (
                <span role="alert" className="text-xs text-plasma">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm text-white/70">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'An email is required for a reply.',
                  pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address.' },
                })}
                aria-invalid={errors.email ? 'true' : 'false'}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-cyan"
                placeholder="ada@example.com"
              />
              {errors.email && (
                <span role="alert" className="text-xs text-plasma">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="subject" className="text-sm text-white/70">
              Subject
            </label>
            <input
              id="subject"
              {...register('subject', { required: 'Give your transmission a subject.' })}
              aria-invalid={errors.subject ? 'true' : 'false'}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-cyan"
              placeholder="Team registration for Hackstellar"
            />
            {errors.subject && (
              <span role="alert" className="text-xs text-plasma">
                {errors.subject.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-sm text-white/70">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              {...register('message', {
                required: 'Add a short message so we know how to help.',
                minLength: { value: 10, message: 'Give us at least 10 characters.' },
              })}
              aria-invalid={errors.message ? 'true' : 'false'}
              className="resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-cyan"
              placeholder="Tell us about your crew and mission..."
            />
            {errors.message && (
              <span role="alert" className="text-xs text-plasma">
                {errors.message.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-glow mt-2 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan via-ion to-plasma px-8 py-4 font-display text-sm font-bold text-void shadow-glow transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Transmitting...
              </>
            ) : sent ? (
              <>
                <CheckCircle2 className="h-4 w-4" /> Transmission received
              </>
            ) : (
              <>
                <Send className="h-4 w-4" /> Send transmission
              </>
            )}
          </button>
          <p role="status" aria-live="polite" className="sr-only">
            {sent ? 'Your message has been sent.' : ''}
          </p>
        </motion.form>
      </div>
    </section>
  );
}
