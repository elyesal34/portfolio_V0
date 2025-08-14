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
  }, deps);

  if (error) {
    throw error;
  }

  if (!data) {
    // This will be caught by Suspense boundary
    throw fetcher();
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

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        // Check cache first
        const cached = (globalThis as any).__dataCache?.[key];
        if (cached) {
          if (isMounted) setData(cached);
          return;
        }

        const result = await fetcher();
        
        // Update cache
        if (!(globalThis as any).__dataCache) {
          (globalThis as any).__dataCache = {};
        }
        (globalThis as any).__dataCache[key] = result;
        
        if (isMounted) setData(result);
      } catch (err) {
        if (isMounted) setError(err as Error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [key, ...deps]);

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Hook pour les images avec lazy loading optimisé
 */
export function useImageLoader(src: string): string | null {
  const [source, setSource] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const loadImage = () => {
      const img = new Image();
      
      img.onload = () => {
        if (isMounted) setSource(src);
      };
      
      img.onerror = () => {
        if (isMounted) setError(new Error(`Failed to load image: ${src}`));
      };
      
      img.src = src;
    };

    loadImage();

    return () => {
      isMounted = false;
    };
  }, [src]);

  if (error) {
    console.error(error);
    return null;
  }

  return source;
}