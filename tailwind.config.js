/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0F0F0F',
        card: '#1A1A1A',
        accent: '#FF3B30',
      },
      fontFamily: {
        heading: ['"Bebas Neue"', 'system-ui', 'sans-serif'],
        body: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(255, 59, 48, 0.45)',
      },
    },
  },
  plugins: [],
}

