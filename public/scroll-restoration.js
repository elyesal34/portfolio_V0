// Force manual scroll restoration and reset to top on initial load when no hash
(function(){
  try {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  } catch {}

  // On normal load without hash, ensure top
  window.addEventListener('DOMContentLoaded', function(){
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  });

  // Handle back/forward cache restores
  window.addEventListener('pageshow', function(e){
    if (e && e.persisted && !location.hash) {
      window.scrollTo(0, 0);
    }
  });
})();
