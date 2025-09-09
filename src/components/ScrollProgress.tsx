'use client'

import { useEffect, useRef, useCallback } from 'react'

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>()
  const lastScrollY = useRef(0)

  const updateProgress = useCallback(() => {
    const progressBar = progressRef.current
    if (!progressBar) return

    const scrollTop = window.pageYOffset
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = Math.min(scrollTop / docHeight, 1)
    
    // Only update if scroll position changed significantly
    if (Math.abs(scrollTop - lastScrollY.current) > 1) {
      progressBar.style.transform = `scaleX(${scrollPercent})`
      lastScrollY.current = scrollTop
    }
  }, [])

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          updateProgress()
          ticking = false
        })
        ticking = true
      }
    }

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Initial update
    updateProgress()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [updateProgress])

  return (
    <div 
      ref={progressRef}
      className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-blue-600 transform origin-left z-50 will-change-transform"
      style={{ 
        transform: 'scaleX(0)',
        // Use transform3d for hardware acceleration
        transformOrigin: '0 0',
        backfaceVisibility: 'hidden',
        perspective: '1000px'
      }}
    />
  )
}
