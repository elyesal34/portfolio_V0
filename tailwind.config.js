/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
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
