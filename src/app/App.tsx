import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
    const offset = 64; // hauteur approx. de la navbar fixe

    const scrollDeterministic = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      const absoluteTop = rect.top + window.pageYOffset;
      const top = Math.max(absoluteTop - offset, 0);
      window.scrollTo({ top, behavior: 'smooth' });
    };

    // 1) Tentative immédiate
    const tryScrollNow = () => {
      const element = document.querySelector(hash) as HTMLElement | null;
      if (!element) return false;
      requestAnimationFrame(() => scrollDeterministic(element));
      // multi-pass pour compenser les décalages de layout (images/captcha)
      const passes = [150, 400, 800];
      passes.forEach((ms) => {
        window.setTimeout(() => {
          const el = document.querySelector(hash) as HTMLElement | null;
          if (el) scrollDeterministic(el);
        }, ms);
      });
      // observer les changements de taille de la cible pendant une courte durée
      try {
        const target = element;
        const ro = new ResizeObserver(() => {
          scrollDeterministic(target);
        });
        ro.observe(target);
        window.setTimeout(() => ro.disconnect(), 1500);
      } catch {
        /* noop: ResizeObserver may be unavailable in some environments */
      }
      return true;
    };

    if (tryScrollNow()) return;

    // 2) Observe l'apparition de l'élément (lazy loading)
    let observer: MutationObserver | null = null;
    // eslint-disable-next-line prefer-const
    let timeoutId: number | undefined;

    const stop = () => {
      if (observer) observer.disconnect();
      if (timeoutId) window.clearTimeout(timeoutId);
    };

    observer = new MutationObserver(() => {
      if (tryScrollNow()) {
        stop();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // 3) Sécurité: arrête après 3s même si non trouvé
    timeoutId = window.setTimeout(() => {
      stop();
      // dernier essai au cas où
      tryScrollNow();
    }, 3000);

    return () => stop();
  }, []);
  return null;
}

function App() {
  // Defer non-critical effects to idle time
  useEffect(() => {
    const schedule = (cb: () => void) => {
      const ric: any = (window as any).requestIdleCallback;
      if (typeof ric === 'function') ric(cb);
      else setTimeout(cb, 1);
    };
    schedule(() => {
      const lcpText = document.getElementById('lcp-text');
      if (lcpText) lcpText.style.visibility = 'hidden';
    });
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <a href="/#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50 transition-all duration-200">
          Aller au contenu principal
        </a>
        <Navbar />
        <ScrollToHash />
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
    </Router>
  );
}

export default App;