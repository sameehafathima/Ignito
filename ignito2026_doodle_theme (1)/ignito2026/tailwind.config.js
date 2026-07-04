/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Override Tailwind's built-in white/black so every existing
        // text-white / bg-white / border-white utility across the app
        // flips to the doodle paper palette without touching each file.
        white: '#141414',

        // "Paper" background stack (was the dark void/abyss/nebula stack)
        void: '#f7f3e8',
        abyss: '#efe8d5',
        nebula: '#e6ddc4',

        // Ink accents (was ion/cyan/plasma neon accents)
        ion: '#1a1a1a',
        cyan: '#111111',
        plasma: '#2e2e2e',

        ink: '#121212',
        paper: '#f7f3e8',
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'nebula-gradient':
          'radial-gradient(ellipse 80% 60% at 20% 10%, rgba(17,17,17,0.05), transparent 60%), radial-gradient(ellipse 70% 50% at 85% 20%, rgba(17,17,17,0.04), transparent 55%), radial-gradient(ellipse 90% 70% at 50% 100%, rgba(17,17,17,0.05), transparent 60%)',
        'grid-overlay':
          'linear-gradient(rgba(17,17,17,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,0.05) 1px, transparent 1px)',
      },
      boxShadow: {
        glow: '3px 3px 0 rgba(17,17,17,0.9)',
        'glow-cyan': '3px 3px 0 rgba(17,17,17,0.9)',
        'glow-plasma': '3px 3px 0 rgba(17,17,17,0.9)',
        'inner-glass': 'inset 0 1px 0 0 rgba(17,17,17,0.05)',
        ink: '4px 4px 0 rgba(17,17,17,0.95)',
        'ink-sm': '2px 2px 0 rgba(17,17,17,0.9)',
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
          '0%, 100%': { boxShadow: '2px 2px 0 rgba(17,17,17,0.7)' },
          '50%': { boxShadow: '5px 5px 0 rgba(17,17,17,0.95)' },
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
