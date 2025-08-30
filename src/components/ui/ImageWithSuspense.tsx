import { Component, Suspense, ReactNode, useState, useEffect } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  fallbackSrc?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
  onError?: () => void;
}

// Composant de gestion des erreurs pour les images
class ImageErrorBoundary extends Component<
  { 
    fallback: ReactNode; 
    children: ReactNode;
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  },
  { hasError: boolean }
> {
  constructor(props: { 
    fallback: ReactNode; 
    children: ReactNode;
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Erreur de chargement de l\'image :', error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <ImageFallback />;
    }
    return this.props.children;
  }
}

// Composant pour afficher le contenu de l'image
function ImageContent({ 
  src, 
  alt, 
  className = '', 
  width, 
  height, 
  loading = 'lazy',
  fetchPriority,
  onError
}: ImageProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!src) {
      setError(new Error('Aucune source d\'image fournie'));
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const img = new Image();
    
    const onLoad = () => {
      setImgSrc(src);
      setError(null);
      setIsLoading(false);
    };
    
    const onErrorEvent = (e: Event | string) => {
      // S'assurer que e est un Event avant d'accéder à ses propriétés
      const errorEvent = e instanceof Event ? e : new Event('error');
      const error = new Error(`Impossible de charger l'image: ${src}`);
      setError(error);
      setImgSrc(null);
      setIsLoading(false);
      if (onError) onError();
      console.error('Erreur de chargement de l\'image:', error, errorEvent);
    };
    
    img.onload = onLoad;
    img.onerror = onErrorEvent;
    img.src = src;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, onError]);

  // Si l'image est en cours de chargement
  if (isLoading) {
    return <ImageSkeleton className={className} />;
  }

  // Si une erreur s'est produite
  if (error) {
    return <ImageFallback className={className} alt={alt} />;
  }

  // Si l'image est chargée avec succès
  if (imgSrc) {
    return (
      <img
        src={imgSrc}
        alt={alt.trim() || 'Image'}
        className={className}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        {...(fetchPriority ? { fetchpriority: fetchPriority } : {})}
      />
    );
  }

  // Cas par défaut
  return <ImageFallback className={className} alt={alt} />;
}

// Composant de chargement squelette
function ImageSkeleton({ className = '' }: { className?: string }) {
  return (
    <div 
      className={`bg-gray-200 animate-pulse ${className || 'w-full h-64'}`}
      aria-hidden="true"
    >
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

// Composant de secours en cas d'échec de chargement
function ImageFallback({ 
  className = '', 
  alt = '' 
}: { 
  className?: string; 
  alt?: string;
}) {
  return (
    <div 
      className={`bg-gray-100 flex items-center justify-center ${className || 'w-full h-64'}`}
      role="img"
      aria-label={alt || 'Image non disponible'}
    >
      <span className="text-gray-500 text-sm">Image non disponible</span>
    </div>
  );
}

/**
 * Composant Image avec gestion des erreurs et des états de chargement
 */
export default function ImageWithSuspense({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  fetchPriority,
  fallbackSrc,
  onError
}: ImageProps) {
  // État pour suivre les erreurs
  const [hasError, setHasError] = useState(false);

  const handleImageError = (error: Error, errorInfo: React.ErrorInfo) => {
    console.error('Erreur dans le composant Image:', error, errorInfo);
    setHasError(true);
    if (onError) onError();
  };

  // Si une erreur s'est produite, afficher l'image de secours si elle est fournie
  if (hasError && fallbackSrc) {
    return (
      <img
        src={fallbackSrc}
        alt={`${alt} (secours)`}
        className={className}
        width={width}
        height={height}
        loading="eager"
        decoding="async"
      />
    );
  }

  // Si une erreur s'est produite et qu'aucune image de secours n'est fournie
  if (hasError) {
    return <ImageFallback className={className} alt={alt} />;
  }

  // Afficher le composant avec gestion des erreurs
  return (
    <ImageErrorBoundary 
      fallback={<ImageFallback className={className} alt={alt} />}
      onError={handleImageError}
    >
      <Suspense fallback={<ImageSkeleton className={className} />}>
        <ImageContent 
          src={src}
          alt={alt}
          className={className}
          width={width}
          height={height}
          loading={loading}
          fetchPriority={fetchPriority}
          onError={() => handleImageError(new Error('Erreur de chargement d\'image'), { componentStack: '' })}
        />
      </Suspense>
    </ImageErrorBoundary>
  );
}