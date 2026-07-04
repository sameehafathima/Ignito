// Central content store — swap in real copy/CMS data here.
import {
  Rocket,
  Cpu,
  Satellite,
  Radar,
  Orbit,
  Telescope,
  Brain,
  Gamepad2,
  Wifi,
  Code2,
  Boxes,
  ShieldCheck,
} from 'lucide-react';

export const NAV_LINKS = [
  { label: 'Mission', href: '#about' },
  { label: 'Countdown', href: '#countdown' },
  { label: 'Events', href: '#events' },
  { label: 'Competitions', href: '#competitions' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Speakers', href: '#speakers' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export const EVENTS = [
  {
    id: 'ev-01',
    name: 'Hackstellar',
    tagline: '24-hour build sprint',
    orbit: 'inner',
    icon: Code2,
    color: 'from-cyan to-ion',
    description:
      'A 24-hour hackathon for teams to design, build and ship a working product around this year\u2019s mission brief.',
  },
  {
    id: 'ev-02',
    name: 'RoboOrbit',
    tagline: 'Autonomous bot arena',
    orbit: 'mid',
    icon: Cpu,
    color: 'from-ion to-plasma',
    description:
      'Build and race autonomous bots through a gravity-defying obstacle course under mission-control judging.',
  },
  {
    id: 'ev-03',
    name: 'DataVoyager',
    tagline: 'Analytics & ML challenge',
    orbit: 'outer',
    icon: Brain,
    color: 'from-plasma to-cyan',
    description:
      'Crunch real mission telemetry, train models, and present insights that could steer an actual spacecraft.',
  },
  {
    id: 'ev-04',
    name: 'CircuitDrift',
    tagline: 'Embedded systems lab',
    orbit: 'inner',
    icon: Satellite,
    color: 'from-cyan to-plasma',
    description:
      'Design embedded systems on a tight power budget — just like engineering for a satellite payload.',
  },
  {
    id: 'ev-05',
    name: 'NetSignal',
    tagline: 'CTF & cybersecurity',
    orbit: 'mid',
    icon: ShieldCheck,
    color: 'from-ion to-cyan',
    description:
      'Defend mission systems from live intrusions in a capture-the-flag built around real-world vulnerabilities.',
  },
  {
    id: 'ev-06',
    name: 'PixelNova',
    tagline: 'Game dev jam',
    orbit: 'outer',
    icon: Gamepad2,
    color: 'from-plasma to-ion',
    description:
      'A rapid game-jam: concept, build, and ship a playable game inspired by deep-space exploration.',
  },
];

export const COMPETITIONS = [
  {
    id: 'mc-01',
    code: 'MC-01',
    name: 'Ideathon: Terra Nova',
    prize: '\u20b9 75,000',
    seats: '32 teams',
    icon: Rocket,
    brief:
      'Pitch a venture-grade solution to a real sustainability or deep-tech problem to a panel of founders and faculty.',
  },
  {
    id: 'mc-02',
    code: 'MC-02',
    name: 'Circuit Constellation',
    prize: '\u20b9 50,000',
    seats: '48 solo',
    icon: Boxes,
    brief:
      'On-the-spot PCB and analog-circuit design challenge scored on efficiency, elegance and robustness.',
  },
  {
    id: 'mc-03',
    code: 'MC-03',
    name: 'Signal Chase CTF',
    prize: '\u20b9 60,000',
    seats: '40 teams',
    icon: Radar,
    brief:
      'A jeopardy-style capture-the-flag spanning crypto, web, reverse engineering and forensics.',
  },
  {
    id: 'mc-04',
    code: 'MC-04',
    name: 'AstroCode Sprint',
    prize: '\u20b9 45,000',
    seats: '60 solo',
    icon: Telescope,
    brief:
      'Competitive programming under mission-clock pressure — algorithms tuned for orbital-scale problems.',
  },
  {
    id: 'mc-05',
    code: 'MC-05',
    name: 'Zero-G Robotics',
    prize: '\u20b9 80,000',
    seats: '24 teams',
    icon: Orbit,
    brief:
      'Build a bot to complete manipulation tasks that simulate microgravity constraints.',
  },
  {
    id: 'mc-06',
    code: 'MC-06',
    name: 'Mesh Uplink',
    prize: '\u20b9 40,000',
    seats: '36 teams',
    icon: Wifi,
    brief:
      'Design a resilient low-power mesh network that survives simulated node failures mid-mission.',
  },
];

export const TIMELINE = [
  {
    time: 'Day 1 \u00b7 08:00',
    stage: 'T-minus: Ignition',
    detail: 'Registrations open, mission badges issued, opening ceremony at Launch Deck A.',
  },
  {
    time: 'Day 1 \u00b7 10:30',
    stage: 'Stage Separation',
    detail: 'Parallel tracks begin — Hackstellar kickoff and Ideathon: Terra Nova briefings.',
  },
  {
    time: 'Day 1 \u00b7 15:00',
    stage: 'Orbital Insertion',
    detail: 'Keynote: navigating deep-tech careers, followed by workshop pods across three domes.',
  },
  {
    time: 'Day 1 \u00b7 20:00',
    stage: 'Night Watch',
    detail: 'Overnight build window for Hackstellar teams, live DJ set under the projection dome.',
  },
  {
    time: 'Day 2 \u00b7 09:00',
    stage: 'Course Correction',
    detail: 'Competition finals across CircuitDrift, NetSignal, Zero-G Robotics and Mesh Uplink.',
  },
  {
    time: 'Day 2 \u00b7 17:00',
    stage: 'Re-entry & Splashdown',
    detail: 'Grand finale, awards ceremony and closing address at Mission Control Plaza.',
  },
];

export const SPEAKERS = [
  {
    name: 'Dr. Ananya Rao',
    role: 'Propulsion Systems Lead, OrbitalWorks',
    focus: 'Reusable Launch Systems',
  },
  {
    name: 'Kabir Mehta',
    role: 'Founding Engineer, Lumen Robotics',
    focus: 'Autonomous Navigation',
  },
  {
    name: 'Dr. Sarah Kim',
    role: 'Research Scientist, DeepField AI',
    focus: 'ML for Astrophysics',
  },
  {
    name: 'Rahul Verma',
    role: 'Security Architect, Zenith Labs',
    focus: 'Mission-Critical Systems Security',
  },
];

export const SPONSORS = {
  title: [{ name: 'Orbital Dynamics' }],
  platinum: [{ name: 'Nova Systems' }, { name: 'Vertex Aerospace' }],
  gold: [{ name: 'Quantica' }, { name: 'Helion Labs' }, { name: 'Circuitry Co.' }],
  community: [{ name: 'DevGuild' }, { name: 'HackNight' }, { name: 'Launchpad Club' }, { name: 'OpenOrbit' }],
};

export const GALLERY = [
  { id: 'g1', caption: 'Opening ceremony, IGNITO 2025', hue: 'from-ion/40 to-cyan/20' },
  { id: 'g2', caption: 'Hackstellar overnight build', hue: 'from-plasma/40 to-ion/20' },
  { id: 'g3', caption: 'RoboOrbit arena finals', hue: 'from-cyan/40 to-plasma/20' },
  { id: 'g4', caption: 'Keynote at Launch Deck A', hue: 'from-ion/40 to-plasma/20' },
  { id: 'g5', caption: 'Award ceremony, Mission Control Plaza', hue: 'from-plasma/40 to-cyan/20' },
  { id: 'g6', caption: 'CTF war room', hue: 'from-cyan/40 to-ion/20' },
  { id: 'g7', caption: 'Night watch DJ set', hue: 'from-ion/40 to-cyan/20' },
  { id: 'g8', caption: 'Closing address', hue: 'from-plasma/40 to-ion/20' },
];

export const FAQS = [
  {
    q: 'Who can participate in IGNITO 2026?',
    a: 'Any student currently enrolled in a recognized undergraduate or postgraduate program can register, solo or in teams, depending on the event rules.',
  },
  {
    q: 'Is there a registration fee?',
    a: 'Most events are free to enter. A few flagship competitions carry a nominal fee that covers kits and materials — this is listed on each event page at registration.',
  },
  {
    q: 'Can I participate in multiple events?',
    a: 'Yes. Just check for schedule overlaps on the Timeline section before you lock in your crew\u2019s mission plan.',
  },
  {
    q: 'Will accommodation be provided for outstation teams?',
    a: 'Yes, on-campus dormitory accommodation is available for outstation participants on a first-come basis. Details are shared after registration.',
  },
  {
    q: 'What should I bring on event day?',
    a: 'A valid college ID, your mission badge (emailed after registration), and a laptop/charger for coding or hardware tracks.',
  },
  {
    q: 'How do I get updates before the event?',
    a: 'Follow the live announcement bar on this site, and join the mission-control channel link sent in your confirmation email.',
  },
];

export const EASTER_EGG_HINT = 'Try the Konami code: \u2191 \u2191 \u2193 \u2193 \u2190 \u2192 \u2190 \u2192 B A';
