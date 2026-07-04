import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Rocket } from 'lucide-react';
import { NAV_LINKS } from '../data/content';
import { useRegistration } from '../context/RegistrationContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openRegistration } = useRegistration();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-[60] transition-all duration-300 ${
        scrolled ? 'glass-strong shadow-[0_4px_30px_rgba(0,0,0,0.35)]' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8" aria-label="Primary">
        <a href="#hero" className="flex items-center gap-2 font-display text-lg tracking-widest text-white">
          <Rocket className="h-5 w-5 text-cyan" aria-hidden="true" />
          IGNITO<span className="text-gradient">2026</span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-sm text-white/70 transition hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-cyan after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <button
            type="button"
            onClick={() => openRegistration()}
            className="btn-glow rounded-full bg-gradient-to-r from-ion to-plasma px-5 py-2.5 text-sm font-semibold text-paper shadow-glow transition hover:scale-105"
          >
            Register
          </button>
        </div>

        <button
          className="rounded-md p-2 text-white lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-strong overflow-hidden lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-white/80 transition hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openRegistration();
                  }}
                  className="block w-full rounded-full bg-gradient-to-r from-ion to-plasma px-5 py-3 text-center text-sm font-semibold text-paper shadow-glow"
                >
                  Register
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
