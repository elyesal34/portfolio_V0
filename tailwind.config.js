/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs personnalisées pour un meilleur contraste
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        dark: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          850: '#1a202c', // Niveau supplémentaire pour le mode sombre
          900: '#111827',
          950: '#030712',
        },
      },
      // Smooth scroll behavior for the entire document
      scrollBehavior: {
        smooth: 'smooth',
      },
      // Custom keyframes for animations
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-in-out',
      },
      // Font face definitions
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [
    // Add custom scroll behavior plugin
    function({ addBase, theme }) {
      addBase({
        // Smooth scrolling for the entire document
        'html': {
          scrollBehavior: 'smooth',
          scrollPaddingTop: '6rem', // Adjust based on your header height
        },
        // Focus styles for better accessibility
        'a:focus, button:focus, [tabindex="0"]:focus': {
          outline: '2px solid',
          outlineColor: theme('colors.blue.500'),
          outlineOffset: '2px',
          borderRadius: theme('borderRadius.DEFAULT'),
        },
        // Better scrollbar styling
        '::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '::-webkit-scrollbar-track': {
          background: theme('colors.gray.100'),
        },
        '::-webkit-scrollbar-thumb': {
          background: theme('colors.gray.400'),
          borderRadius: theme('borderRadius.full'),
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: theme('colors.gray.500'),
        },
      });
    },
  ],
};
