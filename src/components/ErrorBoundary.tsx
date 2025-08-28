import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error | null, resetError: () => void) => ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.resetError);
      }
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Une erreur est survenue</h1>
            <p className="mb-4">Désolé, une erreur inattendue s'est produite.</p>
            {this.state.error && (
              <details className="mb-4">
                <summary className="text-blue-600 cursor-pointer mb-2">Détails de l'erreur</summary>
                <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <button
              onClick={this.resetError}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
