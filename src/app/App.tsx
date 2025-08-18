import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from '../components/layout/Navbar';
import OfflineError from '../components/layout/OfflineError';
import UpdateNotification from '../components/layout/UpdateNotification';
import Accueil from '../components/sections/home/Accueil';
const MentionsLegales = lazy(() => import('../components/sections/legal/MentionsLegales'));

// Lazy loading des composants pour optimiser le chargement initial
const CV = lazy(() => import('../components/sections/about/CV'));
const AteliersPro = lazy(() => import('../components/sections/projects/AteliersPro'));
const Stages = lazy(() => import('../components/sections/projects/Stages'));
const Competences = lazy(() => import('../components/sections/about/Competences'));
const Productions = lazy(() => import('../components/sections/projects/Productions'));
const Veilles = lazy(() => import('../components/sections/content/Veilles'));
const Contact = lazy(() => import('../components/sections/contact/Contact'));

// Render children only when near the viewport to delay downloading their chunks
function LazyWhenVisible({ children, rootMargin = '300px' }: { children: React.ReactNode; rootMargin?: string }) {
  const [visible, setVisible] = useState(false);
  const placeholderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (visible) return;
    const el = placeholderRef.current;
    if (!el || !('IntersectionObserver' in window)) {
      // Fallback: render after a tick
      const id = window.setTimeout(() => setVisible(true), 0);
      return () => window.clearTimeout(id);
    }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
          break;
        }
      }
    }, { rootMargin, threshold: 0.01 });
    io.observe(el);
    return () => io.disconnect();
  }, [visible, rootMargin]);

  if (visible) return <>{children}</>;
  return <div ref={placeholderRef} aria-hidden="true" className="min-h-px" />;
}

function ScrollToHash() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    function scrollWithDynamicOffset(hash) {
      const el = document.querySelector(hash);
      console.log('[ScrollToHash] scrollWithDynamicOffset', { hash, el });
      if (!el) return false;
      let offset = -64;
      if (hash === '#contact') offset = -160;
      const y = el.getBoundingClientRect().top + window.pageYOffset + offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      return true;
    }
    // 1) Tentative immédiate
    const tryScrollNow = () => {
      const found = scrollWithDynamicOffset(hash);
      if (found) {
        console.log('[ScrollToHash] Immediate scroll succeeded', hash);
        return true;
      }
      return false;
    };
    if (tryScrollNow()) return;
    // 2) Observe l'apparition de l'élément (lazy loading)
    let observer = null;
    let timeoutId = undefined;
    const stop = () => {
      if (observer) observer.disconnect();
      if (timeoutId) window.clearTimeout(timeoutId);
    };
    observer = new MutationObserver(() => {
      if (tryScrollNow()) {
        console.log('[ScrollToHash] MutationObserver: section appeared, scroll done', hash);
        stop();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    // 3) Sécurité: arrête après 3s même si non trouvé
    timeoutId = window.setTimeout(() => {
      stop();
      // dernier essai au cas où
      if (tryScrollNow()) {
        console.log('[ScrollToHash] Timeout: last scroll attempt succeeded', hash);
      } else {
        console.warn('[ScrollToHash] Timeout: section not found for hash', hash);
      }
    }, 3000);
    return () => stop();
  }, []);
  return null;
}

// Export utilitaire pour tests unitaires
export function testableScrollToHash(hash) {
  const el = typeof document !== 'undefined' ? document.querySelector(hash) : null;
  if (!el) return false;
  let offset = -64;
  if (hash === '#contact') offset = -160;
  const y = el.getBoundingClientRect().top + window.pageYOffset + offset;
  window.scrollTo({ top: y, behavior: 'auto' });
  return true;
}

// Ensure we start at the top when there is no hash (avoid browser scroll restoration)
function ScrollTopOnNavigate() {
  const location = useLocation();
  // Force manual restoration to prevent browser restoring an old scroll position
  useEffect(() => {
    try {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (location.hash) return; // Hash handling is done by ScrollToHash
    // On path navigation or reload without hash, scroll to top
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname, location.hash]);

  return null;
}

function App() {
  // Before paint: if no hash, reset scroll to top immediately to beat browser restoration
  useLayoutEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
      try {
        document.documentElement.classList.remove('no-scroll');
        if (document.body) document.body.classList.remove('no-scroll');
      } catch {}
    }
  }, []);

  // Defer non-critical effects to idle time
  useEffect(() => {
    const schedule = (cb: () => void) => {
      const win = window as unknown as {
        requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => number;
      };
      const ric = win.requestIdleCallback;
      if (typeof ric === 'function') ric(cb);
      else window.setTimeout(cb, 1);
    };
    schedule(() => {
      const lcpText = document.getElementById('lcp-text');
      if (lcpText) lcpText.style.visibility = 'hidden';
    });
  }, []);

  // Final safety guard: after first paint, if no hash and browser restored a scroll, reset to top once
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!window.location.hash && window.scrollY > 0) {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
      // Ensure the temporary scroll lock is released
      try { document.documentElement.classList.remove('no-scroll'); } catch {}
    }, 400);
    return () => window.clearTimeout(timer);
  }, []);

  // Prefetch likely-next sections during idle time to warm cache
  useEffect(() => {
    const win = window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => number;
    };
    const prefetch = () => {
      const tasks = [
        import('../components/sections/about/CV'),
        import('../components/sections/projects/Productions'),
        import('../components/sections/contact/Contact'),
      ];
      // Silence errors if network is blocked; this is a best-effort warmup
      tasks.forEach((p) => p.catch(() => null));
    };
    const ric = win.requestIdleCallback;
    if (typeof ric === 'function') {
      ric(prefetch, { timeout: 3000 });
    } else {
      const id = window.setTimeout(prefetch, 1500);
      return () => window.clearTimeout(id);
    }
  }, []);

  return (
    <Router>
      <AppWithRouter />
    </Router>
  );
}

function AppWithRouter() {
  const location = useLocation();

  function scrollToHash(hash: string) {
    const el = document.querySelector(hash);
    if (!el) return;
    let offset = -64;
    if (hash === '#contact') offset = -160;
    const y = el.getBoundingClientRect().top + window.pageYOffset + offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  useEffect(() => {
    if (window.location.hash) {
      scrollToHash(window.location.hash);
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-gray-100">
      <a href="/#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50 transition-all duration-200">
        Aller au contenu principal
      </a>
      <Navbar />
      <ScrollToHash />
      <ScrollTopOnNavigate />
      <main id="main-content" role="main">
        <Suspense fallback={<div className="h-screen w-full flex justify-center items-center"><p>Chargement...</p></div>}>
          <Routes>
            <Route path="/" element={
              <>
                <Accueil />
                <LazyWhenVisible><CV /></LazyWhenVisible>
                <LazyWhenVisible><AteliersPro /></LazyWhenVisible>
                <LazyWhenVisible><Stages /></LazyWhenVisible>
                <LazyWhenVisible><Competences /></LazyWhenVisible>
                <LazyWhenVisible><Productions /></LazyWhenVisible>
                <LazyWhenVisible><Veilles /></LazyWhenVisible>
                <LazyWhenVisible><Contact /></LazyWhenVisible>
              </>
            } />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
          </Routes>
        </Suspense>
        <UpdateNotification />
        <OfflineError />
      </main>
    </div>
  );
}

export default App;

console.log('ScrollToHash:', hash, document.querySelector(hash));