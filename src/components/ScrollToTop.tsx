'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-br from-[#F85B5D] to-[#7661FB] border-2 border-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group cursor-pointer"
          whileHover={{ 
            scale: 1.15,
            y: -3,
            boxShadow: '0 15px 35px rgba(248, 91, 93, 0.4)'
          }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Simple icon */}
          <div className="w-full h-full flex items-center justify-center">
            <ArrowUp className="w-7 h-7 text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
