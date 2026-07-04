# IGNITO 2026 — Beyond Infinity

A cinematic, space-mission-themed website for the IGNITO 2026 techfest. Built with
React + Vite, Tailwind CSS, and Framer Motion, with a canvas-based starfield,
custom cursor with trailing particles, a rocket-launch loading sequence, and a
rule-based mission assistant named COSMO.

## Stack

- **React 18 + Vite** — fast dev server and optimized production build
- **Tailwind CSS** — design tokens for the space palette (`void`, `abyss`, `nebula`, `ion`, `cyan`, `plasma`)
- **Framer Motion** — page transitions, scroll-linked parallax, micro-interactions
- **React Hook Form** — validated contact/registration form
- **Firebase (optional)** — Firestore persistence for form submissions; the app runs fully without it (demo mode)
- **lucide-react** — icon set

> Note on 3D: the brief mentioned Three.js/React Three Fiber and tsParticles. This build
> achieves the same visual language (orbiting planets, starfield, parallax, shooting stars,
> nebula glow) with lightweight Canvas/CSS/SVG for reliability and fast load times. Both
> libraries are easy to layer in later — see "Extending" below.

## Getting started

```bash
npm install
npm run dev       # start local dev server
npm run build      # production build to /dist
npm run preview    # preview the production build locally
```

Copy `.env.example` to `.env` and fill in Firebase credentials if you want form
submissions persisted to Firestore. Without it, submissions are logged to the
console and the UI still confirms success (demo mode) — nothing breaks.

## Project structure

```
src/
  components/     All UI sections and reusable pieces (Navbar, Hero, TiltCard, Cosmo, ...)
  data/content.js  Single source of truth for copy: events, competitions, timeline, speakers,
                    sponsors, gallery captions, FAQs — edit this file to update site content
  lib/firebase.js  Optional Firestore wiring for the contact form
  index.css        Design tokens, glass utilities, accessibility helpers
  App.jsx          Section assembly + lazy loading
```

## Sections included

Loading screen (rocket launch) · Announcement bar · Sticky glass navbar · Hero ·
Mission Briefing (About) · Countdown · Featured Events (planet cards) ·
Competitions (mission cards) · Rocket-style Timeline · Speakers · Sponsors ·
Gallery (with lightbox) · FAQ (accordion) · Contact / Mission Control (form) ·
Footer · COSMO chatbot · Konami-code easter egg · Scroll progress bar · Custom cursor.

## Accessibility & performance notes

- Semantic landmarks (`header`, `main`, `footer`, `nav`), skip-to-content link, visible focus rings
- `prefers-reduced-motion` respected (starfield, cursor trail, and animations fall back gracefully)
- Below-the-fold sections are code-split with `React.lazy` + `Suspense`
- Custom cursor and canvas effects auto-disable on touch/coarse-pointer devices
- All interactive controls have accessible names; form errors are announced via `role="alert"`

## Extending

- **3D hero**: swap the CSS orbit rings in `Hero.jsx` for a React Three Fiber `<Canvas>` scene
- **Particles**: drop in `tsparticles` inside `StarField.jsx` if you want physics-based particle interactions
- **CMS**: replace the arrays in `src/data/content.js` with a fetch from your CMS/Firestore of choice
- **Auth/dashboard**: Firebase is already initialized in `src/lib/firebase.js` — add Firestore
  collections or Firebase Auth as your registration flow grows

## Customizing content

Everything participant-facing — event names, prize amounts, timeline stages, speaker bios,
sponsor tiers, FAQs — lives in `src/data/content.js`. The countdown target date lives at the
top of `src/components/Countdown.jsx`.
