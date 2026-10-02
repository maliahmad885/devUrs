'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    this.setState({ error, errorInfo })
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (!this.state.hasError) return this.props.children
    if (this.props.fallback) return this.props.fallback

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h1>

          <p className="text-gray-600 mb-6">
            Something unexpected happened while loading this page. Please try again, or reach out
            directly if the problem continues.
          </p>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mb-6 text-left">
              <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 mb-2">
                Error Details (Development)
              </summary>
              <div className="bg-gray-100 p-4 rounded-lg text-xs font-mono text-gray-700 overflow-auto">
                <div className="mb-2">
                  <strong>Error:</strong> {this.state.error.toString()}
                </div>
                {this.state.errorInfo && (
                  <div>
                    <strong>Stack:</strong>
                    <pre className="whitespace-pre-wrap mt-1">{this.state.errorInfo.componentStack}</pre>
                  </div>
                )}
              </div>
            </details>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={this.handleRetry}
              className="px-6 py-3 bg-gradient-to-r from-[#3B82F6] to-[#10B981] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>

            <button
              type="button"
              onClick={this.handleGoHome}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Go Home
            </button>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <p>If this keeps happening, please let me know through the contact form on the homepage.</p>
          </div>
        </div>
      </div>
    )
  }
}
