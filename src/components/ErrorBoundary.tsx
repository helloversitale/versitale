import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-primary">Oops!</h1>
              <h2 className="text-xl font-semibold text-foreground">
                Something went wrong
              </h2>
              <p className="text-muted-foreground">
                We encountered an error while loading the page. Please try refreshing or go back to the home page.
              </p>
            </div>

            {this.state.error && (
              <details className="text-left bg-card p-4 rounded-lg border border-border">
                <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
                  Error Details
                </summary>
                <pre className="mt-2 text-xs text-destructive whitespace-pre-wrap break-words">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}

            <div className="flex gap-4 justify-center">
              <Button onClick={this.handleReset} variant="default" size="lg">
                Go to Home
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                size="lg"
              >
                Refresh Page
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
