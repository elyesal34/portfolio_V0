import { Suspense, ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

interface DataLoaderProps {
  children: ReactNode;
  fallback?: ReactNode;
  errorFallback?: ReactNode;
}

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="min-h-[200px] flex items-center justify-center bg-red-50 rounded-lg border border-red-200">
      <div className="text-center p-6">
        <div className="text-red-600 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-red-800 mb-2">Erreur de chargement</h3>
        <p className="text-red-600 mb-4">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-[200px] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement en cours...</p>
      </div>
    </div>
  );
}

/**
 * Composant wrapper utilisant les nouvelles capacités React 19
 * Combine Suspense + ErrorBoundary pour une gestion élégante des états
 */
export default function DataLoader({ children, fallback, errorFallback }: DataLoaderProps) {
  return (
    <ErrorBoundary
      FallbackComponent={errorFallback ? () => <>{errorFallback}</> : ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <Suspense fallback={fallback || <LoadingFallback />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}