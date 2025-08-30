import { useState, useEffect } from 'react';

/**
 * Hook moderne utilisant React pour le data fetching
 * Remplace les patterns useEffect + useState classiques
 */
export function useAsyncData<T>(
  fetcher: () => Promise<T>,
  deps: React.DependencyList = []
): T {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        const result = await fetcher();
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- custom deps list accepted by hook API
  }, [fetcher, ...deps]);

  if (error) {
    throw error;
  }

  if (!data) {
    // Throw a Promise that will be caught by Suspense boundary
    throw new Promise((resolve) => {
      fetcher().then(resolve);
    });
  }

  return data;
}

/**
 * Hook pour charger des données avec cache simple
 */
export function useCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  deps: React.DependencyList = []
): T | null {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  type DataCache = Record<string, unknown>;

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        // Check cache first
        const g = globalThis as unknown as { __dataCache?: DataCache };
        const cached = g.__dataCache?.[key] as T | undefined;
        if (cached) {
          if (isMounted) setData(cached);
          return;
        }

        const result = await fetcher();
        
        // Update cache
        if (!g.__dataCache) {
          g.__dataCache = {} as DataCache;
        }
        g.__dataCache[key] = result as unknown as DataCache[keyof DataCache];
        
        if (isMounted) setData(result);
      } catch (err) {
        if (isMounted) setError(err as Error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- custom deps list accepted by hook API
  }, [key, fetcher, ...deps]);

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Hook pour les images avec lazy loading optimisé
 * Fonctionne avec les Suspense boundaries de React
 */
// Cache pour stocker les images déjà chargées
const imageCache = new Map<string, string>();

export function useImageLoader(src: string): string {
  const [state, setState] = useState<{
    status: 'loading' | 'loaded' | 'error';
    src: string | null;
    error: Error | null;
  }>(() => {
    // Vérifier si l'image est déjà dans le cache
    if (imageCache.has(src)) {
      return {
        status: 'loaded',
        src: imageCache.get(src) || null,
        error: null,
      };
    }
    return {
      status: 'loading',
      src: null,
      error: null,
    };
  });

  useEffect(() => {
    // Si l'image est déjà chargée ou en cours de chargement, ne rien faire
    if (state.status !== 'loading' || !src) {
      return;
    }

    let isMounted = true;
    
    const img = new Image();
    
    const onLoad = () => {
      if (!isMounted) return;
      // Mettre en cache l'URL de l'image chargée
      imageCache.set(src, src);
      setState({
        status: 'loaded',
        src: src,
        error: null,
      });
    };
    
    const onError = (event: Event | string) => {
      if (!isMounted) return;
      const errorMessage = event instanceof Event ? 
        `Échec du chargement de l'image: ${src}` : 
        event;
      const error = new Error(errorMessage);
      console.error(errorMessage);
      setState({
        status: 'error',
        src: null,
        error,
      });
    };
    
    img.onload = onLoad;
    img.onerror = onError;
    img.src = src;
    
    // Nettoyage
    return () => {
      isMounted = false;
      img.onload = null;
      img.onerror = null;
    };
  }, [src]); // Suppression de state.status des dépendances

  // Gérer l'état de chargement avec Suspense
  if (state.status === 'loading') {
    throw new Promise<void>((resolve) => {
      const timer = setTimeout(() => {
        resolve();
      }, 100);
      
      return () => clearTimeout(timer);
    });
  }
  
  // Gérer les erreurs
  if (state.status === 'error' && state.error) {
    // Ne pas lancer d'erreur pour ne pas casser l'interface
    // Utiliser une image de remplacement si disponible
    return ''; // Retourner une chaîne vide en cas d'erreur
  }

  // Retourner la source lorsque chargée
  if (state.status === 'loaded' && state.src) {
    return state.src;
  }

  // Cas par défaut
  return '';
}