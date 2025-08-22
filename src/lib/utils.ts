import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Fixed smooth scroll with better performance and no conflicts
export function smoothScrollToSection(elementId: string, duration: number = 800) {
  const element = document.getElementById(elementId)
  if (!element) return

  const navHeight = 80
  const targetPosition = element.offsetTop - navHeight
  const startPosition = window.pageYOffset
  const distance = targetPosition - startPosition
  let startTime: number | null = null

  // Simple easing function for smooth motion
  function easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3)
  }

  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1)
    
    const easedProgress = easeOutCubic(progress)
    const currentPosition = startPosition + (distance * easedProgress)
    
    window.scrollTo(0, currentPosition)
    
    if (progress < 1) {
      requestAnimationFrame(animation)
    }
  }

  requestAnimationFrame(animation)
}

// Fixed enhanced scroll to section - simplified and more reliable
export function enhancedScrollToSection(sectionId: string) {
  const section = document.getElementById(sectionId)
  if (!section) return

  const navHeight = 80
  const targetPosition = section.offsetTop - navHeight
  
  // Temporarily enable smooth scrolling for this action
  document.documentElement.style.scrollBehavior = 'smooth'
  
  // Use native smooth scroll for better compatibility
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  })
  
  // Reset to auto after scrolling
  setTimeout(() => {
    document.documentElement.style.scrollBehavior = 'auto'
  }, 1000)
}

// Fixed magnetic hover effect with better performance
export function createMagneticEffect(element: HTMLElement, strength: number = 0.15) {
  let rafId: number | null = null
  
  const handleMouseMove = (e: MouseEvent) => {
    if (rafId) return
    
    rafId = requestAnimationFrame(() => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength
      
      element.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`
      rafId = null
    })
  }
  
  const handleMouseLeave = () => {
    if (rafId) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
    element.style.transform = 'translate3d(0px, 0px, 0px)'
  }
  
  element.addEventListener('mousemove', handleMouseMove, { passive: true })
  element.addEventListener('mouseleave', handleMouseLeave)
  
  return () => {
    if (rafId) {
      cancelAnimationFrame(rafId)
    }
    element.removeEventListener('mousemove', handleMouseMove)
    element.removeEventListener('mouseleave', handleMouseLeave)
  }
}

// Fixed scroll-triggered reveal animation with better performance
export function createScrollReveal(elements: NodeListOf<Element> | Element[], threshold: number = 0.1) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed')
        // Add staggered animation delay for children
        const children = entry.target.querySelectorAll('.stagger-child')
        children.forEach((child, index) => {
          (child as HTMLElement).style.animationDelay = `${index * 0.1}s`
        })
      }
    })
  }, {
    threshold,
    rootMargin: '0px 0px -100px 0px'
  })
  
  if (Array.isArray(elements)) {
    elements.forEach(el => observer.observe(el))
  } else {
    elements.forEach(el => observer.observe(el))
  }
  
  return observer
}

// Fixed parallax effect with better performance
export function createParallaxEffect(element: HTMLElement, speed: number = 0.3) {
  let rafId: number | null = null
  
  const handleScroll = () => {
    if (rafId) return
    
    rafId = requestAnimationFrame(() => {
      const scrolled = window.pageYOffset
      const rate = scrolled * speed
      element.style.transform = `translate3d(0, ${rate}px, 0)`
      rafId = null
    })
  }
  
  window.addEventListener('scroll', handleScroll, { passive: true })
  
  return () => {
    if (rafId) {
      cancelAnimationFrame(rafId)
    }
    window.removeEventListener('scroll', handleScroll)
  }
}

// Fixed scroll progress with smooth animations
export function createScrollProgress() {
  const progressBar = document.createElement('div')
  progressBar.className = 'scroll-progress'
  progressBar.style.transform = 'scaleX(0)'
  document.body.appendChild(progressBar)
  
  let rafId: number | null = null
  
  const updateProgress = () => {
    if (rafId) return
    
    rafId = requestAnimationFrame(() => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = scrollTop / docHeight
      
      progressBar.style.transform = `scaleX(${scrollPercent})`
      rafId = null
    })
  }
  
  window.addEventListener('scroll', updateProgress, { passive: true })
  
  return () => {
    if (rafId) {
      cancelAnimationFrame(rafId)
    }
    document.body.removeChild(progressBar)
    window.removeEventListener('scroll', updateProgress)
  }
}

// Removed conflicting scroll snap utilities

// Fixed magnetic navigation effect with better performance
export function createMagneticNavigation(navElements: NodeListOf<Element>) {
  navElements.forEach((navItem) => {
    if (navItem instanceof HTMLElement) {
      createMagneticEffect(navItem, 0.1)
      navItem.classList.add('magnetic-nav')
    }
  })
}

// Enable smooth scrolling when user starts interacting
export function enableSmoothScrolling() {
  document.documentElement.style.scrollBehavior = 'smooth'
}

// Fixed momentum-based scroll utility for mobile
export function createMomentumScroll() {
  let isScrolling = false
  let startY = 0
  let startTime = 0
  let velocity = 0
  let isMobile = false
  
  const checkMobile = () => {
    isMobile = window.innerWidth < 768
  }
  
  checkMobile()
  window.addEventListener('resize', checkMobile)
  
  const handleTouchStart = (e: TouchEvent) => {
    if (!isMobile) return
    startY = e.touches[0].clientY
    startTime = Date.now()
    isScrolling = true
  }
  
  const handleTouchMove = (e: TouchEvent) => {
    if (!isScrolling || !isMobile) return
    
    const currentY = e.touches[0].clientY
    const deltaY = startY - currentY
    const deltaTime = Date.now() - startTime
    
    velocity = deltaY / deltaTime
  }
  
  const handleTouchEnd = () => {
    if (!isScrolling || !isMobile) return
    
    isScrolling = false
    const momentum = velocity * 30 // Reduced momentum for better control
    
    if (Math.abs(momentum) > 50) {
      window.scrollBy({
        top: momentum,
        behavior: 'smooth'
      })
    }
  }
  
  document.addEventListener('touchstart', handleTouchStart, { passive: true })
  document.addEventListener('touchmove', handleTouchMove, { passive: true })
  document.addEventListener('touchend', handleTouchEnd, { passive: true })
  
  return () => {
    window.removeEventListener('resize', checkMobile)
    document.removeEventListener('touchstart', handleTouchStart)
    document.removeEventListener('touchmove', handleTouchMove)
    document.removeEventListener('touchend', handleTouchEnd)
  }
}

// Fixed smooth scroll to top utility
export function smoothScrollToTop(duration: number = 800) {
  const startPosition = window.pageYOffset
  const startTime = Date.now()
  
  function animation(currentTime: number) {
    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1)
    
    // Smooth ease-out function
    const easedProgress = 1 - Math.pow(1 - progress, 3)
    
    const currentPosition = startPosition * (1 - easedProgress)
    window.scrollTo(0, currentPosition)
    
    if (progress < 1) {
      requestAnimationFrame(animation)
    }
  }
  
  requestAnimationFrame(animation)
} 