'use client'

import { useEffect } from 'react'

export default function PerformanceMonitor() {
  useEffect(() => {
    // Performance monitoring
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Monitor Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime)
          }
          if (entry.entryType === 'first-input') {
            console.log('FID:', (entry as PerformanceEntry & { processingStart: number }).processingStart - entry.startTime)
          }
          if (entry.entryType === 'layout-shift') {
            console.log('CLS:', (entry as PerformanceEntry & { value: number }).value)
          }
        }
      })

      try {
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })
      } catch (e) {
        // Fallback for browsers that don't support all entry types
        console.log('Performance monitoring not fully supported')
      }

      // Monitor page load time
      window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart
        console.log('Page Load Time:', loadTime + 'ms')
      })

      // Monitor resource loading
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 1000) {
            console.warn('Slow resource:', entry.name, entry.duration + 'ms')
          }
        }
      })

      try {
        resourceObserver.observe({ entryTypes: ['resource'] })
      } catch (e) {
        console.log('Resource monitoring not supported')
      }
    }

    // Memory usage monitoring (if available)
    if (typeof window !== 'undefined' && 'memory' in performance) {
      const checkMemory = () => {
        const memory = (performance as Performance & { memory: { usedJSHeapSize: number; jsHeapSizeLimit: number } }).memory
        if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.8) {
          console.warn('High memory usage detected')
        }
      }
      
      setInterval(checkMemory, 30000) // Check every 30 seconds
    }

    // Error tracking
    window.addEventListener('error', (event) => {
      console.error('JavaScript Error:', event.error)
    })

    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled Promise Rejection:', event.reason)
    })

  }, [])

  return null
}
