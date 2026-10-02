'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { X, Cookie } from 'lucide-react'
import { readConsent, writeConsent } from '@/lib/consent'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (readConsent() !== null) return
    const timer = setTimeout(() => setIsVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const accept = () => {
    writeConsent('accepted')
    setIsVisible(false)
  }

  const decline = () => {
    writeConsent('declined')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Analytics consent"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-[#3B82F6] to-[#10B981] rounded-full flex items-center justify-center">
                  <Cookie className="w-4 h-4 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                    Help me understand how this site is used
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    With your permission I use Vercel Analytics to measure page views and performance.
                    No advertising or cross-site tracking. See the{' '}
                    <Link href="/privacy" className="underline hover:text-gray-900">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                <button
                  onClick={decline}
                  className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg transition-colors duration-200 text-sm"
                >
                  Decline
                </button>
                <button
                  onClick={accept}
                  className="px-4 py-2 bg-gradient-to-r from-[#3B82F6] to-[#10B981] text-white hover:shadow-lg font-medium rounded-lg transition-all duration-200 text-sm"
                >
                  Allow analytics
                </button>
                <button
                  onClick={decline}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
                  aria-label="Dismiss and decline analytics"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
