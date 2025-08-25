'use client'

import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const progressBar = progressRef.current
    if (!progressBar) return

    const updateProgress = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = scrollTop / docHeight
      
      progressBar.style.transform = `scaleX(${scrollPercent})`
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()

    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div 
      ref={progressRef}
      className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-blue-600 transform origin-left z-50 transition-transform duration-100 ease-out"
      style={{ transform: 'scaleX(0)' }}
    />
  )
} 