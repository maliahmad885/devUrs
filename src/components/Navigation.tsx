'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

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
  { name: 'Services', href: '#services' },
  { name: 'Tools', href: '#tools' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
]

// Animation variants
const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
}

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto' },
  exit: { opacity: 0, height: 0 },
}

export default function Navigation({ className }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handlers
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            variants={navVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">
              Nexus Bloom
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                variants={navVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative text-gray-600 hover:text-gray-900 transition-colors duration-300"
              >
                <span className="relative">
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-800 group-hover:w-full transition-all duration-300" />
                </span>
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            variants={navVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.5 }}
            className="hidden md:block px-6 py-2 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-600 hover:text-gray-900 transition-colors duration-300 p-2"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-gray-200 bg-white"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {NAV_ITEMS.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-300"
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </motion.a>
                ))}
                
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: NAV_ITEMS.length * 0.1 }}
                  className="w-full mt-4 px-3 py-2 bg-gray-800 text-white rounded-md font-semibold hover:bg-gray-700"
                  onClick={closeMobileMenu}
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
} 