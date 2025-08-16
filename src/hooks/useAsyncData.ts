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