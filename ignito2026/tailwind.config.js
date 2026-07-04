/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void: '#050816',
        abyss: '#0B1026',
        nebula: '#12192D',
        ion: '#6C63FF',
        cyan: '#00E5FF',
        plasma: '#9D4EDD',
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'nebula-gradient':
          'radial-gradient(ellipse 80% 60% at 20% 10%, rgba(108,99,255,0.28), transparent 60%), radial-gradient(ellipse 70% 50% at 85% 20%, rgba(0,229,255,0.16), transparent 55%), radial-gradient(ellipse 90% 70% at 50% 100%, rgba(157,78,221,0.22), transparent 60%)',
        'grid-overlay':
          'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(108,99,255,0.35)',
        'glow-cyan': '0 0 40px rgba(0,229,255,0.35)',
        'glow-plasma': '0 0 40px rgba(157,78,221,0.35)',
        'inner-glass': 'inset 0 1px 0 0 rgba(255,255,255,0.06)',
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
      },
      keyframes: {
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.25 },
          '50%': { opacity: 1 },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,229,255,0.35)' },
          '50%': { boxShadow: '0 0 45px rgba(0,229,255,0.7)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      letterSpacing: {
        widest2: '0.35em',
      },
    },
  },
  plugins: [],
};
