/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Deep-space cinematic palette. Every text-white / bg-white /
        // border-white utility across the app now reads as true light-on-dark.
        white: '#f5f7ff',

        // Deep space background stack
        void: '#03040c',
        abyss: '#080b1a',
        nebula: '#0d1230',

        // Neon energy accents
        ion: '#8b5cf6',
        cyan: '#22d3ee',
        plasma: '#ec4899',

        ink: '#03040c',
        paper: '#f5f7ff',
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'nebula-gradient':
          'radial-gradient(ellipse 80% 60% at 20% 10%, rgba(139,92,246,0.14), transparent 60%), radial-gradient(ellipse 70% 50% at 85% 20%, rgba(34,211,238,0.10), transparent 55%), radial-gradient(ellipse 90% 70% at 50% 100%, rgba(236,72,153,0.10), transparent 60%)',
        'grid-overlay':
          'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
      },
      boxShadow: {
        glow: '0 0 24px rgba(139,92,246,0.45), 0 0 60px rgba(34,211,238,0.25)',
        'glow-cyan': '0 0 22px rgba(34,211,238,0.55), 0 0 46px rgba(34,211,238,0.25)',
        'glow-plasma': '0 0 22px rgba(236,72,153,0.55), 0 0 46px rgba(236,72,153,0.25)',
        'inner-glass': 'inset 0 1px 0 0 rgba(255,255,255,0.06)',
        ink: '0 12px 40px rgba(0,0,0,0.55)',
        'ink-sm': '0 6px 20px rgba(0,0,0,0.45)',
      },
      animation: {
        'spin-slow': 'spin 40s linear infinite',
        'spin-slower': 'spin 90s linear infinite',
        'spin-reverse': 'spin-reverse 60s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'float-delay': 'float 7s ease-in-out infinite 1s',
        twinkle: 'twinkle 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2.4s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
        wiggle: 'wiggle 5s ease-in-out infinite',
      },
      keyframes: {
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(2deg)' },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.25 },
          '50%': { opacity: 1 },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 14px rgba(34,211,238,0.45), 0 0 30px rgba(139,92,246,0.25)' },
          '50%': { boxShadow: '0 0 28px rgba(34,211,238,0.75), 0 0 55px rgba(139,92,246,0.45)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      letterSpacing: {
        widest2: '0.35em',
      },
    },
  },
  plugins: [],
};
