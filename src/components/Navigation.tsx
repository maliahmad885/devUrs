'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart } from 'lucide-react'
import { SITE_NAME } from '@/lib/site'

interface NavItem {
  name: string
  section: string
  cta?: boolean
}

interface NavigationProps {
  className?: string
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Home', section: 'home' },
  { name: 'About', section: 'about' },
  { name: 'Features', section: 'features' },
  { name: 'Projects', section: 'projects' },
  { name: "Let's Connect", section: 'contact', cta: true },
]

const NAV_HEIGHT = 80

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
}

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0, y: -20 },
  visible: {
    opacity: 1,
    height: 'auto',
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: {
    opacity: 0,
    height: 0,
    y: -20,
    transition: { duration: 0.2, ease: [0.55, 0.06, 0.68, 0.19] as const },
  },
}

export default function Navigation({ className }: NavigationProps) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const navRef = useRef<HTMLElement>(null)
  const rafRef = useRef<number | undefined>(undefined)

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), [])
  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen((prev) => !prev), [])

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (!element) return
    const top = element.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT
    window.scrollTo({ top, behavior: 'smooth' })
    window.history.replaceState(null, '', `#${sectionId}`)
  }, [])

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      // On other pages (e.g. /privacy) let the browser navigate to /#section.
      if (!isHome) {
        closeMobileMenu()
        return
      }

      e.preventDefault()
      if (isMobileMenuOpen) {
        closeMobileMenu()
        // Give the menu a moment to collapse so the scroll target is stable.
        setTimeout(() => scrollToSection(sectionId), 150)
      } else {
        scrollToSection(sectionId)
      }
    },
    [isHome, isMobileMenuOpen, closeMobileMenu, scrollToSection]
  )

  // Highlight the section that is most visible (home page only).
  useEffect(() => {
    if (!isHome) return

    const update = () => {
      let best = ''
      let bestVisibility = 0
      NAV_ITEMS.forEach(({ section }) => {
        const element = document.getElementById(section)
        if (!element) return
        const rect = element.getBoundingClientRect()
        const visible = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
        const visibility = visible / element.offsetHeight
        if (visibility > bestVisibility && visibility > 0.3) {
          bestVisibility = visibility
          best = section
        }
      })
      if (best) setActiveSection(best)
    }

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      rafRef.current = requestAnimationFrame(() => {
        update()
        ticking = false
      })
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isHome])

  // Mobile menu: lock body scroll, close on outside click and Escape.
  useEffect(() => {
    if (!isMobileMenuOpen) return

    const onPointerDown = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) closeMobileMenu()
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobileMenu()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isMobileMenuOpen, closeMobileMenu])

  const linkClasses = (item: NavItem, mobile: boolean) => {
    if (item.cta) {
      return mobile
        ? 'bg-gradient-to-r from-[#3B82F6] to-[#10B981] text-white hover:from-[#2563EB] hover:to-[#059669] shadow-lg'
        : 'bg-gradient-to-r from-[#3B82F6] to-[#10B981] text-white hover:from-[#2563EB] hover:to-[#059669] shadow-lg hover:shadow-xl rounded-lg lg:rounded-full'
    }
    if (isHome && activeSection === item.section) {
      return mobile
        ? 'text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20'
        : 'text-[#3B82F6] bg-[#3B82F6]/10 rounded-lg'
    }
    return mobile
      ? 'text-gray-700 hover:text-[#10B981] hover:bg-gray-50'
      : 'text-gray-700 hover:text-[#10B981] hover:bg-gray-50 rounded-lg'
  }

  const renderLabel = (item: NavItem) =>
    item.cta ? (
      <span className="flex items-center space-x-2">
        <Heart className="w-4 h-4" />
        <span>{item.name}</span>
      </span>
    ) : (
      item.name
    )

  return (
    <motion.nav
      ref={navRef}
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 ${className || ''}`}
      variants={navVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="/"
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            aria-label={`${SITE_NAME} home`}
          >
            <div className="relative w-16 h-16">
              <Image
                src="/images/logo.png"
                alt={`${SITE_NAME} logo`}
                fill
                sizes="64px"
                priority
                className="object-contain logo-img"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#3B82F6] via-[#10B981] to-[#1E40AF] bg-clip-text text-transparent">
              {SITE_NAME}
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <motion.a
                key={item.section}
                href={`/#${item.section}`}
                onClick={(e) => handleNavClick(e, item.section)}
                aria-current={isHome && activeSection === item.section ? 'location' : undefined}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] ${linkClasses(item, false)}`}
                whileHover={{ y: item.cta ? 0 : -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {renderLabel(item)}
                {isHome && activeSection === item.section && !item.cta && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#3B82F6]/20 to-[#10B981]/20 rounded-lg -z-10"
                    layoutId="activeSection"
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            type="button"
            className="lg:hidden px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-[#10B981] hover:bg-gray-50 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] border border-gray-200 hover:border-[#3B82F6]"
            onClick={toggleMobileMenu}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.span
                  key="close"
                  className="block"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-4 h-4" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  className="block font-medium"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  Menu
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              className="lg:hidden"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md border-t border-gray-200/50">
                {NAV_ITEMS.map((item, index) => (
                  <motion.a
                    key={item.section}
                    href={`/#${item.section}`}
                    onClick={(e) => handleNavClick(e, item.section)}
                    aria-current={isHome && activeSection === item.section ? 'location' : undefined}
                    className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] ${linkClasses(item, true)}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: item.cta ? 0 : 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {renderLabel(item)}
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
