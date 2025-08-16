// Force manual scroll restoration and aggressively reset to top on initial load when no hash
(function(){
  try {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
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

  function onFirstLoad() {
    if (location.hash) return;
    // Blur any auto-focused control that could scroll into view
    try { if (document.activeElement) (document.activeElement).blur(); } catch {}
    // Try immediate and repeated corrections for late layout shifts
    forceTopRepeating(6, 150);
    // Final guard after full load
    window.addEventListener('load', function(){
      if (!location.hash) forceTopRepeating(4, 200);
    }, { once: true });
  }

  // DOMContentLoaded path
  window.addEventListener('DOMContentLoaded', onFirstLoad, { once: true });

  // Handle back/forward cache restores
  window.addEventListener('pageshow', function(e){
    if (e && e.persisted && !location.hash) {
      forceTopRepeating(4, 150);
    }
  });
})();
