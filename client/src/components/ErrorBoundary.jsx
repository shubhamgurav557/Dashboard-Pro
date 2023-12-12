import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error or send it to an error tracking service here
    console.error('Error in Snackbar component:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can customize the error fallback UI here
      return <div>Something went wrong with the Snackbar.</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
