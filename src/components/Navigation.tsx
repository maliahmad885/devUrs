'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import DarkModeToggle from './DarkModeToggle'

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
  { name: 'Projects', href: '#projects' },
  { name: 'Blogs', href: '#blogs' },
  { name: 'Contact', href: '#contact' },
]

// Enhanced animation variants
const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 }
}

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0, y: -20 },
  visible: { opacity: 1, height: 'auto', y: 0 },
  exit: { opacity: 0, height: 0, y: -20 }
}

export default function Navigation({ className }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const navRef = useRef<HTMLElement>(null)
  const [isClient, setIsClient] = useState(false)

  // Enhanced navigation click handler with smooth scroll
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Handle external links (like /contact)
    if (href.startsWith('/')) {
      // Allow normal navigation for external links
      return
    }
    
    e.preventDefault()
    const sectionId = href.replace('#', '')
    
    setIsScrolling(true)
    
    // Use native smooth scroll for better performance
    const section = document.getElementById(sectionId)
    if (section) {
      const navHeight = 80
      const targetPosition = section.offsetTop - navHeight
      
      // Temporarily enable smooth scrolling
      document.documentElement.style.scrollBehavior = 'smooth'
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
      
      // Reset scroll behavior after animation
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = 'auto'
        setIsScrolling(false)
      }, 1000)
    }
    
    if (isMobileMenuOpen) {
      closeMobileMenu()
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  // Enhanced active section detection with better performance
  useEffect(() => {
    setIsClient(true)
    
    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        const sections = NAV_ITEMS.filter(item => item.href.startsWith('#')).map(item => item.href.replace('#', ''))
        const scrollPosition = window.scrollY + window.innerHeight / 3
        
        let bestSection = ''
        let bestVisibility = 0
        
        sections.forEach(sectionId => {
          const section = document.getElementById(sectionId)
          if (section) {
            const rect = section.getBoundingClientRect()
            const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
            const visibility = visibleHeight / section.offsetHeight
            
            if (visibility > bestVisibility && visibility > 0.3) {
              bestVisibility = visibility
              bestSection = sectionId
            }
          }
        })
        
        if (bestSection && bestVisibility > 0.3) {
          setActiveSection(bestSection)
        }
      }, 100) // Increased debounce for better performance
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Enhanced scroll-based navigation styling
  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const scrollY = window.scrollY
        const threshold = 50
        
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

  // Only render on client side
  if (!isClient) {
    return null
  }

  return (
    <motion.nav
      ref={navRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
        'bg-white/90 backdrop-blur-xl border-b border-gray-100/50',
        'shadow-lg shadow-black/5',
        isScrolling && 'pointer-events-none',
        'nav-scrolled:bg-white/95 nav-scrolled:shadow-xl nav-scrolled:shadow-black/10',
        className
      )}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Enhanced Logo */}
          <motion.div
            className="flex items-center space-x-4"
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div 
              className="w-12 h-12 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/25 border border-white/20"
              whileHover={{ 
                rotate: 360,
                scale: 1.1,
                transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
              }}
            >
              <Zap className="w-7 h-7 text-white" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-blue-900 bg-clip-text text-transparent">
                Nexus
              </span>
              <span className="text-lg font-semibold text-gray-600">
                Bloom
              </span>
            </div>
          </motion.div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
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
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className={cn(
                    "relative px-6 py-3 rounded-xl font-medium transition-all duration-300 cursor-pointer group",
                    isActive 
                      ? "text-purple-700 bg-purple-50/80" 
                      : "text-gray-700 hover:text-purple-700 hover:bg-purple-50/60"
                  )}
                  whileHover={{ 
                    y: -2,
                    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                  }}
                >
                  <span className="relative z-10">
                    {item.name}
                  </span>
                  
                  {/* Enhanced active indicator */}
                  {isActive && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl border border-purple-200/50"
                      layoutId="activeNav"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                  )}
                  
                  {/* Hover effect */}
                  {!isActive && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                  )}
                </motion.a>
              )
            })}
            
            {/* Dark Mode Toggle */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="ml-6"
            >
              <DarkModeToggle />
            </motion.div>
          </div>

          {/* Enhanced Mobile Menu Button */}
          <motion.button
            onClick={toggleMobileMenu}
            className="lg:hidden relative p-3 text-gray-700 hover:text-purple-700 transition-all duration-300 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-md hover:shadow-lg hover:bg-white"
            aria-label="Toggle mobile menu"
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
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
              className="lg:hidden border-t border-gray-100/50 bg-white/95 backdrop-blur-xl overflow-hidden rounded-b-2xl shadow-xl shadow-black/10"
            >
              <div className="px-4 py-6 space-y-2">
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
                        delay: index * 0.08,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      className={cn(
                        "block px-4 py-3 rounded-xl transition-all duration-300 font-medium cursor-pointer",
                        isActive
                          ? "text-purple-700 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200/50 shadow-md"
                          : "text-gray-700 hover:text-purple-700 hover:bg-gradient-to-r hover:from-purple-50/60 hover:to-blue-50/60 border border-transparent hover:border-purple-200/30"
                      )}
                      whileHover={{ 
                        x: 8,
                        transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
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