import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import SolarSystemIcon from './SolarSystemIcon';
import { useRegistration } from '../context/RegistrationContext';

const INTRO = "I'm COSMO, mission assistant for IGNITO 2026. Ask me about events, timing, registration or prizes.";

const RULES = [
  {
    match: /(register|sign ?up|join)/i,
    reply: 'I can pull up the registration form for you right now — just tap the button below, or use the "Register" button in the navigation.',
    action: 'register',
  },
  {
    match: /(when|date|time|schedule)/i,
    reply: 'IGNITO 2026 launches in December 2026. Check the Countdown and Timeline sections for the exact schedule.',
  },
  {
    match: /(prize|reward|cash|money)/i,
    reply: 'The total prize pool across all missions is over \u20b910 lakh. Each competition card lists its specific prize.',
  },
  {
    match: /(event|competition|hackathon)/i,
    reply: 'We have 6 featured events and 6 flagship competitions, from Hackstellar to Zero-G Robotics. Check the Events and Competitions sections above.',
  },
  {
    match: /(speaker|talk|keynote)/i,
    reply: 'Our speaker lineup includes engineers and researchers from propulsion, robotics, AI and security. See the Speakers section for bios.',
  },
  {
    match: /(contact|email|phone|reach)/i,
    reply: 'You can reach mission control at contact@ignito2026.tech or through the contact form at the bottom of the page.',
  },
  {
    match: /(hi|hello|hey)/i,
    reply: "Hello, crew member! Ready to explore IGNITO 2026?",
  },
  {
    match: /(thank)/i,
    reply: "Anytime. Godspeed on your mission.",
  },
];

const FALLBACK =
  "I don't have that on file yet, but the team at contact@ignito2026.tech can help with mission-specific questions.";

function getReply(text) {
  const rule = RULES.find((r) => r.match.test(text));
  return rule ? { text: rule.reply, action: rule.action } : { text: FALLBACK };
}

export default function Cosmo() {
  const { openRegistration } = useRegistration();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'bot', text: INTRO }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const send = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const reply = getReply(text);
      setMessages((m) => [...m, { role: 'bot', text: reply.text, action: reply.action }]);
      setTyping(false);
    }, 650 + Math.random() * 400);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[90]">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-label="COSMO mission assistant chat"
            className="glass-strong mb-4 flex h-[26rem] w-[20rem] flex-col overflow-hidden rounded-2xl shadow-glow sm:w-80"
          >
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan to-plasma">
                <SolarSystemIcon className="h-5 w-5 text-void" />
              </div>
              <div className="flex-1">
                <p className="font-display text-sm font-bold">COSMO</p>
                <p className="text-[11px] text-white/40">Mission assistant &middot; online</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-full p-1.5 text-white/50 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex flex-col gap-2 ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm ${
                      m.role === 'user'
                        ? 'bg-gradient-to-r from-ion to-plasma text-paper'
                        : 'bg-white/5 text-white/80'
                    }`}
                  >
                    {m.text}
                  </div>
                  {m.action === 'register' && (
                    <button
                      onClick={() => {
                        setOpen(false);
                        openRegistration();
                      }}
                      className="rounded-full bg-gradient-to-r from-cyan to-plasma px-4 py-1.5 text-xs font-semibold text-void transition hover:scale-105"
                    >
                      Open registration form
                    </button>
                  )}
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl bg-white/5 px-3.5 py-2.5">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }}
                        className="h-1.5 w-1.5 rounded-full bg-white/60"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={send} className="flex items-center gap-2 border-t border-white/10 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask COSMO..."
                aria-label="Message COSMO"
                className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm outline-none focus:border-cyan"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-cyan to-plasma text-void transition hover:scale-105"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileTap={{ scale: 0.92 }}
        aria-label={open ? 'Close COSMO chat' : 'Open COSMO chat'}
        className="btn-glow flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan via-ion to-plasma text-void shadow-glow animate-pulse-glow"
      >
        {open ? <X className="h-6 w-6" /> : <SolarSystemIcon className="h-7 w-7" />}
      </motion.button>
    </div>
  );
}
