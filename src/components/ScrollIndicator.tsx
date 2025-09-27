'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'

interface ScrollIndicatorProps {
  sections: string[]
}

export default function ScrollIndicator({ sections }: ScrollIndicatorProps) {
  const [currentSection, setCurrentSection] = useState('')
  const rafRef = useRef<number | undefined>(undefined)
  const lastScrollY = useRef(0)
  const sectionElements = useRef<Map<string, HTMLElement>>(new Map())

  // Cache section elements for better performance
  useEffect(() => {
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId)
      if (element) {
        sectionElements.current.set(sectionId, element)
      }
    })
  }, [sections])

  const updateScrollState = useCallback(() => {
    const scrollY = window.scrollY
    
    // Only update if scroll position changed significantly
    if (Math.abs(scrollY - lastScrollY.current) < 5) return

    // Optimized section detection with cached elements
    let newCurrentSection = ''
    let bestVisibility = 0

    sectionElements.current.forEach((element, sectionId) => {
      const rect = element.getBoundingClientRect()
      const elementHeight = element.offsetHeight
      const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
      const visibility = visibleHeight / elementHeight
      
      if (visibility > bestVisibility && visibility > 0.3) {
        bestVisibility = visibility
        newCurrentSection = sectionId
      }
    })

    if (newCurrentSection && newCurrentSection !== currentSection) {
      setCurrentSection(newCurrentSection)
    }
    
    lastScrollY.current = scrollY
  }, [currentSection])

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          updateScrollState()
          ticking = false
        })
        ticking = true
      }
    }

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Initial update
    updateScrollState()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [updateScrollState])

  const scrollToSection = useCallback((sectionId: string) => {
    const element = sectionElements.current.get(sectionId)
    if (element) {
      const navHeight = 80
      const targetPosition = element.offsetTop - navHeight
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  }, [])

  return (
    <>
      {/* Section Indicator */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="flex flex-col items-center space-y-4">
          {sections.map((section) => (
            <motion.button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`w-3 h-3 rounded-full transition-all duration-200 will-change-transform ${
                currentSection === section
                  ? 'bg-[#3B82F6] scale-125'
                  : 'bg-gray-300 hover:bg-[#10B981] hover:scale-110'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              title={`Go to ${section}`}
              style={{
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)'
              }}
            />
          ))}
        </div>
      </div>
    </>
  )
}
