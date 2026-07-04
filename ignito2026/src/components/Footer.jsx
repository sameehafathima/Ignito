import { Rocket, Camera, Link2, MessageCircle, PlaySquare } from 'lucide-react';
import { NAV_LINKS } from '../data/content';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-6 py-14 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:justify-between">
        <div className="max-w-sm">
          <a href="#hero" className="flex items-center gap-2 font-display text-lg tracking-widest text-white">
            <Rocket className="h-5 w-5 text-cyan" aria-hidden="true" />
            IGNITO<span className="text-gradient">2026</span>
          </a>
          <p className="mt-4 text-sm text-white/50">
            The national techfest of the Department of Engineering. Two days, one mission:
            beyond infinity.
          </p>
          <div className="mt-5 flex gap-4 text-white/50">
            <a href="#" aria-label="Instagram" className="transition hover:text-cyan">
              <Camera className="h-5 w-5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="transition hover:text-cyan">
              <Link2 className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Twitter" className="transition hover:text-cyan">
              <MessageCircle className="h-5 w-5" />
            </a>
            <a href="#" aria-label="YouTube" className="transition hover:text-cyan">
              <PlaySquare className="h-5 w-5" />
            </a>
          </div>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-3">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-white/60 transition hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
        <p>&copy; {new Date().getFullYear()} IGNITO. All transmissions reserved.</p>
        <p>Built by the Department of Engineering student council.</p>
      </div>
    </footer>
  );
}
