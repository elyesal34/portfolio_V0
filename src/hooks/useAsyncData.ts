import { use, useMemo } from 'react';

/**
 * Hook moderne utilisant React 19 use() pour le data fetching
 * Remplace les patterns useEffect + useState classiques
 */
export function useAsyncData<T>(
  fetcher: () => Promise<T>,
  deps: React.DependencyList = []
): T {
  // Mémoisation de la Promise pour éviter les re-créations inutiles
  const promise = useMemo(() => {
    return fetcher();
  }, deps);

  // Utilisation du nouveau hook use() de React 19
  // Suspend automatiquement le composant jusqu'à résolution
  return use(promise);
}

/**
 * Hook pour charger des données avec cache simple
 */
export function useCachedData<T>(
  key: string,
  fetcher: () => Promise<T>
): T {
  const promise = useMemo(() => {
    // Cache simple en mémoire
    const cached = (globalThis as any).__dataCache?.[key];
    if (cached) return Promise.resolve(cached);

    return fetcher().then(data => {
      if (!(globalThis as any).__dataCache) {
        (globalThis as any).__dataCache = {};
      }
      (globalThis as any).__dataCache[key] = data;
      return data;
    });
  }, [key]);

  return use(promise);
}

/**
 * Hook pour les images avec lazy loading optimisé
 */
export function useImageLoader(src: string): string {
  const promise = useMemo(() => {
    return new Promise<string>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(src);
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  }, [src]);

  return use(promise);
}