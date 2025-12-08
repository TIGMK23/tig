// src/components/ContactForm/components/ErrorBoundary.tsx
import React from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from './types';
import { logAnalytics } from './utils/analytics';

export class ContactFormErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    logAnalytics('form_error', { error: error.message, errorInfo });
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="text-center p-4 bg-red-50 rounded-lg">
          <h3 className="text-red-700 font-medium">Something went wrong</h3>
          <p className="text-red-600">Please refresh the page and try again</p>
        </div>
      );
    }

    return this.props.children;
  }
}