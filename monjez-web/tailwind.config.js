/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#04101F',
          900: '#0A1A2F',
          800: '#0D2B3E',
          700: '#142B43',
          600: '#1A3A56',
        },
        mint: {
          50: '#ECFEFA',
          100: '#CFFAF1',
          200: '#A5F3E0',
          300: '#6EE7CC',
          400: '#34D9B6',
          500: '#2DD4BF',
          600: '#16A99B',
          700: '#0F857C',
          800: '#0E6961',
        },
        coral: {
          400: '#FF8A65',
          500: '#FF6B4A',
          600: '#E85333',
        },
        gold: {
          400: '#FFD166',
          500: '#F4B942',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', '"IBM Plex Sans Arabic"', 'sans-serif'],
        body: ['Inter', '"IBM Plex Sans Arabic"', 'sans-serif'],
        arabic: ['"IBM Plex Sans Arabic"', 'Tajawal', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(45,212,191,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.06) 1px, transparent 1px)",
        'radial-mint': 'radial-gradient(circle at 50% 0%, rgba(45,212,191,0.18), transparent 60%)',
        'radial-glow': 'radial-gradient(ellipse at center, rgba(45,212,191,0.25), transparent 70%)',
        'mesh-gradient': 'conic-gradient(from 180deg at 50% 50%, #0A1A2F 0deg, #0D2B3E 120deg, #2DD4BF20 240deg, #0A1A2F 360deg)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'grid-drift': 'gridDrift 30s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'orbit': 'orbit 20s linear infinite',
        'aurora': 'aurora 14s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        glow: {
          '0%, 100%': { opacity: 0.5, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.05)' },
        },
        gridDrift: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '60px 60px' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(140px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(140px) rotate(-360deg)' },
        },
        aurora: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(30px, -20px) rotate(8deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        'mint-glow': '0 0 60px -10px rgba(45, 212, 191, 0.4)',
        'mint-glow-lg': '0 0 100px -10px rgba(45, 212, 191, 0.55)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
      },
    },
  },
  plugins: [],
}
