import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from '../components/layout/Navbar';
import OfflineError from '../components/layout/OfflineError';
import Section from '../components/layout/Section';
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
    
    function scrollWithDynamicOffset(hash: string): boolean {
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
    let observer: MutationObserver | null = null;
    let timeoutId: number | undefined;
    const stop = () => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
        timeoutId = undefined;
      }
    };
    observer = new MutationObserver(() => {
      if (tryScrollNow()) {
        console.log('[ScrollToHash] MutationObserver: section appeared, scroll done', hash);
        stop();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    // 3) Sécurité: arrête après 3s même si non trouvé
    const timerId = window.setTimeout(() => {
      stop();
      // dernier essai au cas où
      if (tryScrollNow()) {
        console.log('[ScrollToHash] Timeout: last scroll attempt succeeded', hash);
      } else {
        console.warn('[ScrollToHash] Timeout: section not found for hash', hash);
      }
    }, 3000);
    timeoutId = timerId;
    return () => stop();
  }, []);
  return null;
}


// Gestion améliorée du défilement lors de la navigation
function ScrollTopOnNavigate() {
  const location = useLocation();
  const initialLoad = useRef(true);
  const scrollTimer = useRef<NodeJS.Timeout>();

  // Désactiver la restauration automatique du navigateur
  useEffect(() => {
    try {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
    } catch {}

    // Nettoyer les timeouts lors du démontage
    return () => {
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }
    };
  }, []);

  // Gérer le défilement lors de la navigation et du rafraîchissement
  useEffect(() => {
    const handleScroll = () => {
      if (location.hash) {
        // Laisser ScrollToHash gérer le défilement pour les ancres
        return;
      }

      // Pour le premier chargement, on scroll en haut immédiatement
      if (initialLoad.current) {
        window.scrollTo({ top: 0, behavior: 'auto' });
        initialLoad.current = false;
        return;
      }

      // Pour les navigations suivantes, on scroll en haut avec un léger délai
      // pour s'assurer que le contenu est bien chargé
      scrollTimer.current = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    };

    // Exécuter la gestion du défilement après un court délai
    const timer = setTimeout(handleScroll, 0);

    return () => {
      clearTimeout(timer);
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }
    };
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
  // La variable location n'est plus utilisée car on utilise window.location directement

  const scrollToHash = (hash: string, behavior: ScrollBehavior = 'smooth') => {
    if (!hash) return;
    
    // Retirer le # du hash si présent
    const id = hash.startsWith('#') ? hash.substring(1) : hash;
    if (!id) return;
    
    // Trouver l'élément cible
    const element = document.getElementById(id);
    if (!element) return;
    
    // Calculer le décalage en fonction de la hauteur de la navbar
    const headerOffset = id === 'contact' ? 160 : 64;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    // Effectuer le défilement
    window.scrollTo({
      top: offsetPosition,
      behavior: behavior
    });
  };

  // Gestion du chargement initial avec hash dans l'URL
  useLayoutEffect(() => {
    if (window.location.hash) {
      // Utiliser 'auto' pour le chargement initial pour éviter les sauts
      scrollToHash(window.location.hash, 'auto');
    } else {
      // S'assurer que la page est tout en haut au chargement initial
      window.scrollTo(0, 0);
    }
  }, []);

  // Gestion des changements de hash pendant la navigation
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash) {
        scrollToHash(window.location.hash);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('popstate', handleHashChange);
    return () => window.removeEventListener('popstate', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <a 
        href="/#accueil" 
        onClick={(e) => {
          e.preventDefault();
          window.history.pushState({}, '', '/#accueil');
          scrollToHash('accueil');
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50 transition-all duration-200"
      >
        Aller au contenu principal
      </a>
      <Navbar />
      <ScrollToHash />
      <ScrollTopOnNavigate />
      <main id="main-content" role="main" className="flex-grow">
        <Suspense fallback={<div className="h-screen w-full flex justify-center items-center"><p>Chargement...</p></div>}>
          <Routes>
            <Route path="/" element={
              <>
                <Section id="accueil">
                  <Accueil />
                </Section>
                <LazyWhenVisible>
                  <Section id="cv">
                    <CV />
                  </Section>
                </LazyWhenVisible>
                <LazyWhenVisible>
                  <Section id="ateliers">
                    <AteliersPro />
                  </Section>
                </LazyWhenVisible>
                <LazyWhenVisible>
                  <Section id="stages">
                    <Stages />
                  </Section>
                </LazyWhenVisible>
                <LazyWhenVisible>
                  <Section id="competences">
                    <Competences />
                  </Section>
                </LazyWhenVisible>
                <LazyWhenVisible>
                  <Section id="productions">
                    <Productions />
                  </Section>
                </LazyWhenVisible>
                <LazyWhenVisible>
                  <Section id="veilles">
                    <Veilles />
                  </Section>
                </LazyWhenVisible>
                <LazyWhenVisible>
                  <Section id="contact">
                    <Contact />
                  </Section>
                </LazyWhenVisible>
              </>
            } />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
          </Routes>
        </Suspense>
        <UpdateNotification />
      </main>
      <OfflineError />
    </div>
  );
}

export default App;