'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Heart } from 'lucide-react'

interface NavItem {
  name: string
  href: string
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
  { name: "Let's Connect", href: '#contact' },
]

// Enhanced animation variants
const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 }
}

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0, y: -20 },
  visible: { 
    opacity: 1, 
    height: 'auto', 
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  },
  exit: { 
    opacity: 0, 
    height: 0, 
    y: -20,
    transition: {
      duration: 0.2,
      ease: [0.55, 0.06, 0.68, 0.19] as const
    }
  }
}

export default function Navigation({ className }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isScrolling, setIsScrolling] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const [isClient, setIsClient] = useState(false)
  
  // Performance optimization refs
  const rafRef = useRef<number | undefined>(undefined)
  const lastScrollY = useRef(0)
  const sectionElements = useRef<Map<string, HTMLElement>>(new Map())
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  // Cache section elements for better performance
  useEffect(() => {
    const sections = document.querySelectorAll('[id]')
    sections.forEach(section => {
      if (section.id && NAV_ITEMS.some(item => item.href === `#${section.id}`)) {
        sectionElements.current.set(section.id, section as HTMLElement)
      }
    })
  }, [])

  // Define closeMobileMenu first
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  // Extract scroll logic into separate function for reusability
  const performScroll = useCallback((sectionId: string) => {
    setIsScrolling(true)
    
    const element = sectionElements.current.get(sectionId)
    if (element) {
      const navHeight = 80
      const targetPosition = element.offsetTop - navHeight
      
      // Mobile-optimized scroll behavior
      const isMobile = window.innerWidth <= 768
      
      if (isMobile) {
        // For mobile, use immediate scroll without smooth behavior to avoid conflicts
        window.scrollTo({
          top: targetPosition,
          behavior: 'auto'
        })
        
        // Add a small delay for mobile touch events
        setTimeout(() => {
          setIsScrolling(false)
        }, 100)
      } else {
        // For desktop, use smooth scrolling
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
    }
  }, [])

  // Enhanced mobile-friendly scroll handler
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Handle external links (like /contact)
    if (href.startsWith('/')) {
      return
    }
    
    e.preventDefault()
    const sectionId = href.replace('#', '')
    
    // If mobile menu is open, close it first and restore body overflow
    if (isMobileMenuOpen) {
      // Immediately restore body overflow to allow scrolling
      document.body.style.overflow = 'unset'
      closeMobileMenu()
      
      // Wait for mobile menu to close before scrolling
      setTimeout(() => {
        performScroll(sectionId)
      }, 150) // Small delay to ensure menu is closed
    } else {
      // If mobile menu is not open, scroll immediately
      performScroll(sectionId)
    }
  }, [isMobileMenuOpen, closeMobileMenu, performScroll])

  // Optimized active section detection with RAF
  const updateActiveSection = useCallback(() => {
    const scrollY = window.scrollY
    
    // Only update if scroll position changed significantly
    if (Math.abs(scrollY - lastScrollY.current) < 10) return
    
    let bestSection = ''
    let bestVisibility = 0
    
    sectionElements.current.forEach((element, sectionId) => {
      const rect = element.getBoundingClientRect()
      const elementHeight = element.offsetHeight
      const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
      const visibility = visibleHeight / elementHeight
      
      if (visibility > bestVisibility && visibility > 0.3) {
        bestVisibility = visibility
        bestSection = sectionId
      }
    })
    
    if (bestSection && bestSection !== activeSection) {
      setActiveSection(bestSection)
    }
    
    lastScrollY.current = scrollY
  }, [activeSection])

  useEffect(() => {
    setIsClient(true)
    
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          updateActiveSection()
          ticking = false
        })
        ticking = true
      }
    }

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [updateActiveSection])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeMobileMenu()
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      // Prevent body scroll when mobile menu is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen, closeMobileMenu])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMobileMenuOpen, closeMobileMenu])

  if (!isClient) {
    return null
  }

  return (
    <motion.nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 ${className || ''}`}
      variants={navVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {/* Logo Image */}
            <div className="w-10 h-10 flex items-center justify-center">
              <img 
                src="/images/logo.png" 
                alt="AI Solutions Logo" 
                className="w-full h-full object-contain logo-img"
              />
            </div>
            
            {/* AI Solutions text on same line */}
            <div className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI Solutions
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 focus:outline-none ${
                  item.name === "Let's Connect"
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl rounded-lg lg:rounded-full'
                    : activeSection === item.href.replace('#', '')
                    ? 'text-purple-600 bg-purple-50 rounded-lg'
                    : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg'
                }`}
                whileHover={{ y: item.name === "Let's Connect" ? 0 : -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name === "Let's Connect" ? (
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4" />
                    <span>Let's Connect</span>
                  </div>
                ) : (
                  item.name
                )}
                {activeSection === item.href.replace('#', '') && item.name !== "Let's Connect" && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg -z-10"
                    layoutId="activeSection"
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 transition-all duration-300 focus:outline-none border border-gray-200 hover:border-purple-300"
            onClick={toggleMobileMenu}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle mobile menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-4 h-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="font-medium">Menu</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md border-t border-gray-200/50">
                {NAV_ITEMS.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 focus:outline-none ${
                      item.name === "Let's Connect"
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg'
                        : activeSection === item.href.replace('#', '')
                        ? 'text-purple-600 bg-purple-50 border border-purple-200'
                        : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: item.name === "Let's Connect" ? 0 : 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name === "Let's Connect" ? (
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4" />
                        <span>Let's Connect</span>
                      </div>
                    ) : (
                      item.name
                    )}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
