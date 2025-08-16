// Hide loading screen faster to improve LCP
window.addEventListener('DOMContentLoaded', function () {
  setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.opacity = '0';
      loadingScreen.style.transition = 'opacity 0.3s ease';
      setTimeout(() => {
        loadingScreen.remove();
      }, 300);
    }
  }, 500);
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
