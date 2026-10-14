/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f8ebd7',
        foreground: '#2d0f28',
        'dark-brown': '#2d0f28',
        brown: '#894031',
        'light-brown': '#d4a373',
        cream: '#f8ebd7',
        'accent-purple': '#ca9af1',
        'accent-purple-light': '#f4eaff',
        'accent-green': '#036e2c',
        'accent-yellow': '#ffe8b3',
        'cream-light': '#fff9ef',
        'muted-border': 'rgba(45, 15, 40, 0.15)',
      },
      fontFamily: {
        champ: ['"Champ Black"', 'Inter', 'sans-serif'],
        mono: ['"Azeret Mono"', 'monospace'],
        body: ['Inter', 'sans-serif'],
        primary: ['"Champ Black"', 'Inter', 'sans-serif'],
        secondary: ['"Azeret Mono"', 'monospace'],
      },
      borderRadius: {
        'drizzy': '16px',
        'drizzy-lg': '24px',
        'drizzy-pill': '9999px',
      },
      animation: {
        'marquee': 'marquee 44s linear infinite',
        'announcement-marquee': 'announcement-marquee 44s linear infinite',
        'bounce-subtle': 'bounceSubtle 2s infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'announcement-marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
