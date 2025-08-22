'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'
import { cn, enhancedScrollToSection, createMagneticNavigation } from '@/lib/utils'

// Types
interface NavItem {
  name: string
  href: string
  isActive?: boolean
}

interface NavigationProps {
  className?: string
}

// Constants
const NAV_ITEMS: NavItem[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Features', href: '#features' },
  { name: 'Services', href: '#services' },
  { name: 'Tools', href: '#tools' },
  { name: 'Projects', href: '#projects' },
  { name: 'Blogs', href: '#blogs' },
  { name: 'Contact', href: '#contact' },
]

// Enhanced animation variants with smoother transitions
const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6
    }
  },
}

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    height: 'auto',
    scale: 1,
    transition: {
      duration: 0.4
    }
  },
  exit: { 
    opacity: 0, 
    height: 0,
    scale: 0.95,
    transition: {
      duration: 0.3
    }
  },
}

export default function Navigation({ className }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const navRef = useRef<HTMLElement>(null)

  // Enhanced navigation click handler with smooth transitions
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const sectionId = href.replace('#', '')
    
    // Add smooth transition class
    setIsScrolling(true)
    
    // Enhanced scroll with better timing
    enhancedScrollToSection(sectionId)
    
    // Close mobile menu with smooth animation
    if (isMobileMenuOpen) {
      closeMobileMenu()
    }
    
    // Remove scrolling state after animation
    setTimeout(() => {
      setIsScrolling(false)
    }, 1200)
  }, [isMobileMenuOpen])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  // Enhanced active section detection with better performance
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        const sections = NAV_ITEMS.map(item => item.href.replace('#', ''))
        const scrollPosition = window.scrollY + window.innerHeight / 3
        
        // Find the most visible section
        let bestSection = 'home'
        let bestVisibility = 0
        
        sections.forEach(sectionId => {
          const section = document.getElementById(sectionId)
          if (section) {
            const rect = section.getBoundingClientRect()
            const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
            const visibility = visibleHeight / section.offsetHeight
            
            if (visibility > bestVisibility) {
              bestVisibility = visibility
              bestSection = sectionId
            }
          }
        })
        
        setActiveSection(bestSection)
      }, 50) // Debounce scroll events for better performance
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial position

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Initialize magnetic navigation effects with better performance
  useEffect(() => {
    const navElements = document.querySelectorAll('.nav-link')
    const cleanup = createMagneticNavigation(navElements)
    return cleanup
  }, [])

  // Enhanced scroll-based navigation styling
  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const scrollY = window.scrollY
        const threshold = 100
        
        if (scrollY > threshold) {
          navRef.current.classList.add('nav-scrolled')
        } else {
          navRef.current.classList.remove('nav-scrolled')
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      ref={navRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
        'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm',
        isScrolling && 'pointer-events-none',
        className
      )}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Enhanced Logo with magnetic effect */}
          <motion.div
            className="flex items-center space-x-3 nav-link"
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg"
              whileHover={{ 
                rotate: 360,
                transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
              }}
            >
              <Zap className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-purple-600 bg-clip-text text-transparent">
              Nexus Bloom
            </span>
          </motion.div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item, index) => {
              const isActive = activeSection === item.href.replace('#', '')
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.08
                  }}
                  className={cn(
                    "nav-link relative font-medium transition-all duration-500 cursor-pointer group",
                    isActive 
                      ? "text-purple-600" 
                      : "text-gray-600 hover:text-purple-600"
                  )}
                  whileHover={{ 
                    y: -3,
                    transition: { duration: 0.3 }
                  }}
                >
                  <span className="relative">
                    {item.name}
                    <motion.span 
                      className={cn(
                        "absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500",
                        isActive ? "w-full" : "w-0"
                      )}
                      initial={{ width: 0 }}
                      animate={{ width: isActive ? "100%" : "0%" }}
                      transition={{ duration: 0.4 }}
                    />
                  </span>
                  
                  {/* Enhanced hover indicator */}
                  {!isActive && (
                    <motion.span 
                      className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 w-0"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.a>
              )
            })}
          </div>

          {/* Enhanced Mobile Menu Button */}
          <motion.button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-600 hover:text-purple-600 transition-colors duration-300 p-2 nav-link"
            aria-label="Toggle mobile menu"
            whileHover={{ 
              scale: 1.1,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Enhanced Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {NAV_ITEMS.map((item, index) => {
                  const isActive = activeSection === item.href.replace('#', '')
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: index * 0.05
                      }}
                      className={cn(
                        "nav-link block px-3 py-2 rounded-md transition-all duration-300 font-medium cursor-pointer",
                        isActive
                          ? "text-purple-600 bg-purple-50"
                          : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                      )}
                      whileHover={{ 
                        x: 8,
                        transition: { duration: 0.3 }
                      }}
                    >
                      {item.name}
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
} 