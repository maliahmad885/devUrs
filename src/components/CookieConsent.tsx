'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Cookie, Shield, Settings } from 'lucide-react'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', 'all')
    setIsVisible(false)
  }

  const handleAcceptEssential = () => {
    localStorage.setItem('cookie-consent', 'essential')
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setIsVisible(false)
  }

  const toggleSettings = () => {
    setShowSettings(!showSettings)
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl max-h-[80vh] overflow-y-auto"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col gap-4">
            {/* Header with Close Button */}
            <div className="flex items-start justify-between gap-4">
              {/* Cookie Icon and Text */}
              <div className="flex items-start gap-3 flex-1">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Cookie className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                    We use cookies to enhance your experience
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    We use cookies and similar technologies to help personalize content, 
                    provide social media features, and analyze our traffic.
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={handleDecline}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
                aria-label="Close cookie consent"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Cookie Settings */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 sm:space-y-3"
                >
                  <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 text-sm sm:text-base">Essential Cookies</p>
                        <p className="text-xs sm:text-sm text-gray-600">Required for the website to function properly</p>
                      </div>
                    </div>
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 text-sm sm:text-base">Analytics Cookies</p>
                        <p className="text-xs sm:text-sm text-gray-600">Help us understand how visitors interact with our website</p>
                      </div>
                    </div>
                    <div className="w-4 h-4 bg-gray-300 rounded-full flex-shrink-0"></div>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Cookie className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 text-sm sm:text-base">Marketing Cookies</p>
                        <p className="text-xs sm:text-sm text-gray-600">Used to deliver personalized advertisements</p>
                      </div>
                    </div>
                    <div className="w-4 h-4 bg-gray-300 rounded-full flex-shrink-0"></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={toggleSettings}
                className="px-3 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200 text-sm sm:text-base"
              >
                {showSettings ? 'Hide Settings' : 'Cookie Settings'}
              </button>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={handleDecline}
                  className="px-3 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg transition-colors duration-200 text-sm sm:text-base"
                >
                  Decline
                </button>
                
                <button
                  onClick={handleAcceptEssential}
                  className="px-3 py-2 bg-gray-600 text-white hover:bg-gray-700 font-medium rounded-lg transition-colors duration-200 text-sm sm:text-base"
                >
                  Essential Only
                </button>
                
                <button
                  onClick={handleAcceptAll}
                  className="px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 font-medium rounded-lg transition-all duration-200 hover:shadow-lg text-sm sm:text-base"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
} 