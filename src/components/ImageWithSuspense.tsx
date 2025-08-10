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
  try {
    // Utilisation du hook use() pour charger l'image
    const loadedSrc = useImageLoader(src);
    
    return (
      <img
        src={loadedSrc}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
      />
    );
  } catch (error) {
    // Fallback en cas d'erreur de chargement
    if (fallbackSrc) {
      return (
        <img
          src={fallbackSrc}
          alt={alt}
          className={className}
          width={width}
          height={height}
          loading={loading}
          decoding="async"
        />
      );
    }
    
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