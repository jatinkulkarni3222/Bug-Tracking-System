const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  enabled: true,
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // class, 'media' or boolean
  extend: {
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
    },
    colors:{
      teal: {300: '#4DB6AC'},
      orange: colors.orange
    },
    boxShadow: {
      bottom: '0 5px 6px -7px rgba(0, 0, 0, 0.6), 0 2px 4px -5px rgba(0, 0, 0, 0.06)',
      'sm-glow': '0 0 10px rgba(249, 115, 22, 0.2)',
      'md-glow': '0 0 20px rgba(249, 115, 22, 0.3)',
      'lg-glow': '0 0 30px rgba(249, 115, 22, 0.4)',
    },
    backgroundImage: {
      'gradient-orange': 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
      'gradient-purple': 'linear-gradient(135deg, #7e44ee 0%, #a855f7 100%)',
      'gradient-blue': 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
      'gradient-dark': 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    },
    animation: {
      'fade-in': 'fadeIn 0.5s ease-in',
      'slide-in': 'slideIn 0.3s ease-out',
      'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      slideIn: {
        '0%': { transform: 'translateY(-10px)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' },
      },
      pulseGlow: {
        '0%, 100%': { boxShadow: '0 0 10px rgba(249, 115, 22, 0.2)' },
        '50%': { boxShadow: '0 0 20px rgba(249, 115, 22, 0.4)' },
      },
    },
  },
  variants: {},
  plugins: [],
};
