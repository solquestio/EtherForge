/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Solana color palette
        solana: {
          green: '#14F195',
          purple: '#9945FF',
          blue: '#00F0FF',
          dark: '#0F0F0F',
          darker: '#0A0A0A',
          surface: '#1A1A1A',
          border: '#2D2D2D',
          'border-light': '#3D3D3D',
          'text-primary': '#FFFFFF',
          'text-secondary': '#A0A0A0',
        },
        // Keep the primary colors for backward compatibility
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'solana-gradient': 'linear-gradient(90deg, #14F195 0%, #9945FF 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      boxShadow: {
        'solana': '0 0 0 2px rgba(20, 241, 149, 0.2)',
        'solana-lg': '0 0 0 4px rgba(20, 241, 149, 0.3)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
  darkMode: 'class',
};
