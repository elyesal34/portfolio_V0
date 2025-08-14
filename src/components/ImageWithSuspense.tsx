import { Suspense } from 'react';
import { useImageLoader } from '../hooks/useAsyncData';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  fallbackSrc?: string;
}

function ImageContent({ src, alt, className, width, height, loading = 'lazy', fallbackSrc }: ImageProps) {
  // Appel du hook en dehors de tout try/catch
  const loadedSrc = useImageLoader(src);
  
  // S'assurer que l'attribut alt n'est jamais vide pour l'accessibilité
  const validAlt = alt.trim() || 'Image';

  // Si le hook retourne null ou une valeur d'échec, on affiche le fallback
  if (!loadedSrc && fallbackSrc) {
    return (
      <img
        src={fallbackSrc}
        alt={validAlt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
      />
    );
  }

  if (!loadedSrc) {
    // Placeholder en cas d'échec total
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm">Image non disponible</span>
      </div>
    );
  }

  return (
    <img
      src={loadedSrc}
      alt={validAlt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
    />
  );
}

function ImageSkeleton({ width, height, className }: { width?: number; height?: number; className?: string }) {
  return (
    <div 
      className={`bg-gray-200 animate-pulse ${className}`}
      style={{ width, height }}
    >
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

/**
 * Composant Image avec Suspense intégré utilisant React 19
 */
export default function ImageWithSuspense(props: ImageProps) {
  return (
    <Suspense 
      fallback={
        <ImageSkeleton 
          width={props.width} 
          height={props.height} 
          className={props.className} 
        />
      }
    >
      <ImageContent {...props} />
    </Suspense>
  );
}