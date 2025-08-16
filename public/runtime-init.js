// Hide loading screen ASAP to improve LCP
window.addEventListener('DOMContentLoaded', function () {
  const loadingScreen = document.getElementById('loading-screen');
  if (!loadingScreen) return;
  loadingScreen.style.transition = 'opacity 0.2s ease';
  loadingScreen.style.opacity = '0';
  // Remove after transition ends or after a short fallback timeout
  const remove = () => loadingScreen.remove();
  loadingScreen.addEventListener('transitionend', remove, { once: true });
  setTimeout(remove, 250);
});

// Performance monitoring (non-critical)
if ('performance' in window) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      if (perfData) {
        console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
      }
    }, 0);
  });
}

// Defer 700-weight fonts: enable stylesheet after first interaction or short delay
(function deferBoldFonts() {
  const enableFonts = () => {
    const link = document.getElementById('fonts-700');
    if (link && link.media !== 'all') link.media = 'all';
    window.removeEventListener('pointerdown', enableFonts);
    window.removeEventListener('keydown', enableFonts);
  };
  window.addEventListener('pointerdown', enableFonts, { once: true });
  window.addEventListener('keydown', enableFonts, { once: true });
  // Fallback: enable after idle/load
  window.addEventListener('load', () => setTimeout(enableFonts, 2000), { once: true });
})();
