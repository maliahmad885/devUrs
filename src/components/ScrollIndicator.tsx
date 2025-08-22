'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { createMagneticEffect, enhancedScrollToSection } from '@/lib/utils'

interface ScrollIndicatorProps {
  sections: string[]
  className?: string
}

export default function ScrollIndicator({ sections, className }: ScrollIndicatorProps) {
  const [activeSection, setActiveSection] = useState(-1)
  const [isVisible, setIsVisible] = useState(false)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const lastScrollY = useRef(0)

  useEffect(() => {
    // Don't show indicator initially - only show after user starts scrolling
    const handleFirstScroll = () => {
      setIsVisible(true)
      window.removeEventListener('scroll', handleFirstScroll)
    }
    
    window.addEventListener('scroll', handleFirstScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleFirstScroll)
    }
  }, [])

  // Fixed scroll detection with better performance and less conflicts
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Only update if scroll position changed significantly
      if (Math.abs(currentScrollY - lastScrollY.current) < 50) return
      
      lastScrollY.current = currentScrollY
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        const scrollPosition = window.scrollY + window.innerHeight / 3
        
        sections.forEach((sectionId, index) => {
          const section = document.getElementById(sectionId)
          if (section) {
            const rect = section.getBoundingClientRect()
            const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
            const visibility = visibleHeight / section.offsetHeight
            
            if (visibility > 0.6) {
              setActiveSection(index)
            }
          }
        })
      }, 100) // Increased debounce for better performance
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial position

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      window.removeEventListener('scroll', handleScroll)
    }
  }, [sections])

  // Fixed magnetic effect with better performance
  useEffect(() => {
    if (indicatorRef.current) {
      const cleanup = createMagneticEffect(indicatorRef.current, 0.08)
      return cleanup
    }
  }, [])

  // Fixed scroll to section with smooth animation
  const scrollToSection = useCallback((sectionId: string) => {
    enhancedScrollToSection(sectionId)
  }, [])

  // Add touch event handling for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent, sectionId: string) => {
    e.preventDefault()
    scrollToSection(sectionId)
  }, [scrollToSection])

  // Enhanced animation variants for ultra-smooth motion
  const scrollVariants: Variants = {
    hidden: { opacity: 0, x: 60, scale: 0.8 },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.08
      }
    }
  }

  const dotVariants: Variants = {
    hidden: { scale: 0, opacity: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.8
      }
    }
  }

  const activeDotVariants: Variants = {
    active: { 
      scale: 1.8,
      rotate: 360,
      boxShadow: "0 0 30px rgba(139, 92, 246, 0.6)",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 20,
        mass: 1
      }
    }
  }

  const hoverVariants: Variants = {
    hover: {
      scale: 1.4,
      transition: {
        type: "spring",
        stiffness: 600,
        damping: 15
      }
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={indicatorRef}
          className={`scroll-indicator ${className || ''}`}
          variants={scrollVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {sections.map((sectionId, index) => {
            const isActive = activeSection === index
            return (
              <motion.div
                key={sectionId}
                variants={dotVariants}
                animate={isActive ? "active" : "visible"}
                whileHover="hover"
                className={`scroll-dot nav-link ${isActive ? 'active' : ''}`}
                onClick={() => scrollToSection(sectionId)}
                onTouchStart={(e) => handleTouchStart(e, sectionId)}
                whileTap={{ scale: 0.8 }}
                style={{ cursor: 'pointer' }}
              >
                {/* Enhanced magnetic glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-purple-400/30"
                  animate={{
                    scale: isActive ? [1, 1.3, 1] : 1,
                    opacity: isActive ? [0.3, 0.7, 0.3] : 0
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Enhanced pulse effect for active dot */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-purple-500/20"
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
                
                {/* Enhanced section label tooltip */}
                <motion.div
                  className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-gray-800/90 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-lg whitespace-nowrap opacity-0 pointer-events-none shadow-md"
                  initial={{ opacity: 0, x: 10, scale: 0.8 }}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    x: isActive ? 0 : 10,
                    scale: isActive ? 1 : 0.8
                  }}
                  transition={{ 
                    duration: 0.4,
                    ease: "easeOut",
                    delay: isActive ? 0.5 : 0
                  }}
                >
                  {sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}
                  <div className="absolute top-1/2 right-0 transform translate-x-1 -translate-y-1/2 w-0 h-0 border-l-3 border-r-0 border-t-3 border-b-0 border-transparent border-l-gray-800/90" />
                </motion.div>
                
                {/* Enhanced connection line between dots */}
                {index < sections.length - 1 && (
                  <motion.div
                    className="absolute top-full left-1/2 w-0.5 h-5 bg-gradient-to-b from-purple-300 to-transparent"
                    initial={{ height: 16, opacity: 0.4 }}
                    animate={{ 
                      height: 16,
                      opacity: 0.4
                    }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            )
          })}
          
          {/* Enhanced scroll progress indicator */}
          <motion.div
            className="absolute -bottom-8 left-1/2 transform -translate-x-1 -translate-y-1/2 w-16 h-1 bg-gray-200 rounded-full overflow-hidden"
            initial={{ opacity: 0.6, scaleX: 0.8 }}
            animate={{ 
              opacity: 0.6,
              scaleX: 0.8
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
              style={{
                width: `${((activeSection + 1) / sections.length) * 100}%`
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 