// Force manual scroll restoration and aggressively reset to top on initial load when no hash
(function(){
  try {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  } catch {}

  // Temporarily lock scrolling to avoid showing any restored position before we reset to top
  try {
    document.documentElement.classList.add('no-scroll');
    if (document.body) document.body.classList.add('no-scroll');
  } catch {}

  function forceTopRepeating(attempts, delay) {
    var i = 0;
    var run = function(){
      if (location.hash) return; // don't interfere with explicit anchors
      window.scrollTo(0, 0);
      i++;
      if (i < attempts) setTimeout(run, delay);
    };
    // also chain a few rAF passes for layout stabilization
    var rafPasses = 4;
    var rafRun = function(){
      if (location.hash) return;
      window.scrollTo(0, 0);
      rafPasses--;
      if (rafPasses > 0) requestAnimationFrame(rafRun);
    };
    requestAnimationFrame(rafRun);
    run();
  }

  function releaseLock() {
    try {
      document.documentElement.classList.remove('no-scroll');
      if (document.body) document.body.classList.remove('no-scroll');
    } catch {}
  }

  function onFirstLoad() {
    if (location.hash) { releaseLock(); return; }
    // Blur any auto-focused control that could scroll into view
    try { if (document.activeElement) (document.activeElement).blur(); } catch {}
    // Try immediate and repeated corrections for late layout shifts
    forceTopRepeating(6, 150);
    // Final guard after full load
    window.addEventListener('load', function(){
      if (!location.hash) forceTopRepeating(4, 200);
      // Release scroll shortly after stabilization
      setTimeout(releaseLock, 250);
    }, { once: true });
  }

  // DOMContentLoaded path
  window.addEventListener('DOMContentLoaded', function(){
    onFirstLoad();
    // Fallback release in case 'load' never fires quickly
    setTimeout(releaseLock, 1200);
  }, { once: true });

  // Handle back/forward cache restores
  window.addEventListener('pageshow', function(e){
    if (e && e.persisted && !location.hash) {
      forceTopRepeating(4, 150);
      setTimeout(releaseLock, 200);
    }
  });
})();
