/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette
        'light-blue': '#87CEEB',
        'ballerina': '#FFB6C1',
        'fuel-town': '#2C3E50',
        'storm-petrel': '#4A5568',
        'imperial-primer': '#1A202C',
        
        // Neon accent colors
        'neon-blue': '#00F5FF',
        'neon-pink': '#FF00FF',
        'neon-green': '#00FF00',
        'neon-purple': '#8A2BE2',
        'neon-yellow': '#FFFF00',
        'neon-orange': '#FF6B35',
      },
      
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      
      keyframes: {
        glow: {
          '0%': { 
            boxShadow: '0 0 5px #00F5FF, 0 0 10px #00F5FF, 0 0 15px #00F5FF' 
          },
          '100%': { 
            boxShadow: '0 0 10px #00F5FF, 0 0 20px #00F5FF, 0 0 30px #00F5FF' 
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'neon-gradient': 'linear-gradient(45deg, #00F5FF, #FF00FF, #00FF00, #8A2BE2)',
        'hero-gradient': 'linear-gradient(135deg, #1A202C 0%, #2C3E50 50%, #4A5568 100%)',
      },
      
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Inter', 'system-ui', 'sans-serif'],
      },
      
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
} 