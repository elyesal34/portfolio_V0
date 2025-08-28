import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/Footer';
import Section from '../components/layout/Section';
import Accueil from '../components/sections/home/Accueil';

// Lazy-loaded components
const CV = lazy(() => import('../components/sections/about/CV.tsx'));
const Competences = lazy(() => import('../components/sections/about/Competences'));
const Contact = lazy(() => import('../components/sections/contact/Contact'));
const AteliersPro = lazy(() => import('../components/sections/projects/AteliersPro'));
const Stages = lazy(() => import('../components/sections/projects/Stages'));
const Productions = lazy(() => import('../components/sections/projects/Productions'));
const Veilles = lazy(() => import('../components/sections/content/Veilles'));

// Lazy loading with visibility
function LazyWhenVisible({ children, rootMargin = '300px' }: { children: React.ReactNode; rootMargin?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible || !placeholderRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(placeholderRef.current);
    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return <div ref={placeholderRef}>{isVisible ? children : null}</div>;
}

// Error boundary component
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      setHasError(true);
      setError(new Error(event.message));
    };

    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
          <p className="text-gray-700 mb-4">
            {error?.message || 'An unexpected error occurred'}
          </p>
          <button
            type="button"
            onClick={() => setHasError(false)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// Scroll to hash utility
function useScrollToHash() {
  const { hash } = useLocation();
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!hash) return;

    const id = hash.replace('#', '');
    const element = document.getElementById(id);
    
    if (element) {
      // Small delay to ensure the component is rendered
      const timer = setTimeout(() => {
        const headerOffset = id === 'contact' ? 32 : 24;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        setIsScrolling(true);
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Set focus for accessibility
        element.setAttribute('tabindex', '-1');
        element.focus({ preventScroll: true });
        
        // Reset scrolling state
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 1000);
        
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [hash]);

  return { isScrolling };
}

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');
  const { isScrolling } = useScrollToHash();
  const location = useLocation();

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  // Close mobile menu on route change
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      document.body.style.overflow = '';
    }
  }, [location.pathname]);

  // Track active section on scroll
  useEffect(() => {
    if (isScrolling) return;

    const handleScroll = () => {
      const sections = ['accueil', 'cv', 'competences', 'projets', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolling]);

  // Handle anchor clicks
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = id === 'contact' ? 32 : 24;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Update URL without page reload
      window.history.pushState({}, '', `#${id}`);
      
      // Set focus for accessibility
      element.setAttribute('tabindex', '-1');
      element.focus({ preventScroll: true });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar 
        activeSection={activeSection} 
        onAnchorClick={handleAnchorClick} 
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={toggleMobileMenu}
      />
      
      <main className="flex-grow">
        <Section id="accueil">
          <Accueil />
        </Section>

        <Section id="cv">
          <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center">Chargement du CV...</div>}>
            <LazyWhenVisible>
              <CV />
            </LazyWhenVisible>
          </Suspense>
        </Section>

        <Section id="competences">
          <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center">Chargement des compétences...</div>}>
            <LazyWhenVisible>
              <Competences />
            </LazyWhenVisible>
          </Suspense>
        </Section>

        <Section id="projets">
          <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center">Chargement des projets...</div>}>
            <LazyWhenVisible>
              <AteliersPro />
              <Stages />
              <Productions />
              <Veilles />
            </LazyWhenVisible>
          </Suspense>
        </Section>

        <Section id="contact">
          <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center">Chargement du formulaire de contact...</div>}>
            <LazyWhenVisible>
              <Contact />
            </LazyWhenVisible>
          </Suspense>
        </Section>
      </main>
      
      <Footer />
    </div>
  );
}

export default function AppWithRouter() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}