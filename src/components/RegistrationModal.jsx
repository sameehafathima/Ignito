import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, X, Loader2, CheckCircle2, Users, Mail, User, Building2, Hash } from 'lucide-react';
import { useRegistration } from '../context/RegistrationContext';
import { EVENTS, COMPETITIONS } from '../data/content';
import { submitTransmission } from '../lib/firebase';

const PROGRAM_OPTIONS = [
  { group: 'General', options: ['General Registration'] },
  { group: 'Featured Events', options: EVENTS.map((e) => e.name) },
  { group: 'Flagship Competitions', options: COMPETITIONS.map((c) => c.name) },
  { group: 'Partnership', options: ['Sponsorship Enquiry'] },
];

export default function RegistrationModal() {
  const { isOpen, presetProgram, closeRegistration } = useRegistration();
  const [sent, setSent] = useState(false);
  const firstFieldRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { program: 'General Registration' } });

  const nameField = register('name', { required: 'Please tell us your name.' });

  // Pre-select whichever program the person clicked "Register" from, and
  // reset the success state each time the modal opens fresh.
  useEffect(() => {
    if (isOpen) {
      setSent(false);
      setValue('program', presetProgram || 'General Registration');
      const t = setTimeout(() => firstFieldRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [isOpen, presetProgram, setValue]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeRegistration();
    };
    if (isOpen) window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeRegistration]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const onSubmit = async (data) => {
    await submitTransmission({ ...data, kind: 'registration' });
    setSent(true);
    reset({ program: data.program });
    setTimeout(() => {
      setSent(false);
      closeRegistration();
    }, 2400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[210] flex items-center justify-center overflow-y-auto bg-ink/40 p-4 py-10 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="registration-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeRegistration();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotateX: 12, y: 30 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateX: 8, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformPerspective: 1200 }}
            className="glass-strong relative w-full max-w-lg rounded-3xl p-6 shadow-glow sm:p-8"
          >
            <button
              onClick={closeRegistration}
              aria-label="Close registration form"
              className="absolute right-5 top-5 rounded-full p-1.5 text-white/55 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center gap-4 py-14 text-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                  >
                    <motion.div
                      animate={{ y: [0, -14, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Rocket className="h-14 w-14 text-cyan" />
                    </motion.div>
                  </motion.div>
                  <h3 className="font-display text-xl font-bold">Crew manifest received</h3>
                  <p className="max-w-xs text-sm text-white/65">
                    Your registration for <strong>{presetProgram || 'IGNITO 2026'}</strong> has been logged.
                    Check your inbox for mission confirmation.
                  </p>
                  <CheckCircle2 className="h-6 w-6 text-cyan" />
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-paper shadow-glow">
                      <Rocket className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="section-label">Mission Control</p>
                      <h3 id="registration-title" className="font-display text-xl font-bold">
                        Crew registration
                      </h3>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="reg-program" className="text-sm text-white/75">
                        Mission / program
                      </label>
                      <select
                        id="reg-program"
                        {...register('program', { required: true })}
                        className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan [color-scheme:dark]"
                      >
                        {PROGRAM_OPTIONS.map((g) => (
                          <optgroup key={g.group} label={g.group}>
                            {g.options.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="reg-name" className="text-sm text-white/75">
                          Full name
                        </label>
                        <div className="relative">
                          <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
                          <input
                            id="reg-name"
                            {...nameField}
                            ref={(el) => {
                              nameField.ref(el);
                              firstFieldRef.current = el;
                            }}
                            className="w-full rounded-lg border border-white/15 bg-white/5 py-3 pl-9 pr-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-cyan [color-scheme:dark]"
                            placeholder="Ada Lovelace"
                          />
                        </div>
                        {errors.name && (
                          <span role="alert" className="text-xs text-plasma">
                            {errors.name.message}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="reg-email" className="text-sm text-white/75">
                          Email
                        </label>
                        <div className="relative">
                          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
                          <input
                            id="reg-email"
                            type="email"
                            {...register('email', {
                              required: 'An email is required for confirmation.',
                              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address.' },
                            })}
                            className="w-full rounded-lg border border-white/15 bg-white/5 py-3 pl-9 pr-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-cyan [color-scheme:dark]"
                            placeholder="ada@example.com"
                          />
                        </div>
                        {errors.email && (
                          <span role="alert" className="text-xs text-plasma">
                            {errors.email.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="reg-college" className="text-sm text-white/75">
                          College / institution
                        </label>
                        <div className="relative">
                          <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
                          <input
                            id="reg-college"
                            {...register('college', { required: 'Let us know your institution.' })}
                            className="w-full rounded-lg border border-white/15 bg-white/5 py-3 pl-9 pr-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-cyan [color-scheme:dark]"
                            placeholder="Launch Campus"
                          />
                        </div>
                        {errors.college && (
                          <span role="alert" className="text-xs text-plasma">
                            {errors.college.message}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="reg-team" className="text-sm text-white/75">
                          Team name (optional)
                        </label>
                        <div className="relative">
                          <Hash className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
                          <input
                            id="reg-team"
                            {...register('teamName')}
                            className="w-full rounded-lg border border-white/15 bg-white/5 py-3 pl-9 pr-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-cyan [color-scheme:dark]"
                            placeholder="Crew Nova"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="reg-size" className="text-sm text-white/75">
                        Crew size
                      </label>
                      <div className="relative">
                        <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
                        <select
                          id="reg-size"
                          {...register('teamSize')}
                          className="w-full rounded-lg border border-white/15 bg-white/5 py-3 pl-9 pr-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-cyan [color-scheme:dark]"
                          defaultValue="Solo"
                        >
                          {['Solo', '2', '3', '4', '5+'].map((n) => (
                            <option key={n} value={n}>
                              {n}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-glow group mt-2 flex items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 font-display text-sm font-bold text-paper shadow-glow transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Filing manifest...
                        </>
                      ) : (
                        <>
                          <Rocket className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:rotate-12" />
                          Confirm registration
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
