'use client'

import { useEffect, useState } from 'react'

export default function ScrollDebug() {
  const [scrollInfo, setScrollInfo] = useState({
    scrollY: 0,
    scrollHeight: 0,
    clientHeight: 0,
    scrollBehavior: 'auto'
  })

  useEffect(() => {
    const updateScrollInfo = () => {
      setScrollInfo({
        scrollY: window.scrollY,
        scrollHeight: document.documentElement.scrollHeight,
        clientHeight: window.innerHeight,
        scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior
      })
    }

    // Check initial scroll state
    updateScrollInfo()
    
    // Monitor scroll events
    window.addEventListener('scroll', updateScrollInfo, { passive: true })
    
    // Monitor resize events
    window.addEventListener('resize', updateScrollInfo, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateScrollInfo)
      window.removeEventListener('resize', updateScrollInfo)
    }
  }, [])

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono z-50">
      <div>Scroll Y: {scrollInfo.scrollY}</div>
      <div>Scroll Height: {scrollInfo.scrollHeight}</div>
      <div>Client Height: {scrollInfo.clientHeight}</div>
      <div>Scroll Behavior: {scrollInfo.scrollBehavior}</div>
      <div>Scroll Padding: {getComputedStyle(document.documentElement).scrollPaddingTop}</div>
    </div>
  )
} 