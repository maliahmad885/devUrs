'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun } from 'lucide-react'

type Theme = 'light'

export default function DarkModeToggle() {
  const [theme, setTheme] = useState<Theme>('light')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    } else {
      setTheme('light')
      applyTheme('light')
    }
  }, [])

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement
    root.classList.remove('dark')
    localStorage.setItem('theme', newTheme)
  }

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    applyTheme(newTheme)
    setIsOpen(false)
  }

  const getCurrentIcon = () => {
    return <Sun className="w-5 h-5" />
  }

  const getCurrentLabel = () => {
    return 'Light'
  }

  return (
    <div className="relative">
      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white hover:shadow-lg transition-all duration-300 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {getCurrentIcon()}
        </motion.div>
        
        {/* Hover Tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          Theme: {getCurrentLabel()}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
        </div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 backdrop-blur-xl z-50 overflow-hidden"
            >
              {/* Light Theme Option */}
              <motion.button
                onClick={() => handleThemeChange('light')}
                className="w-full flex items-center gap-3 px-4 py-3 text-left bg-purple-50 text-purple-600 transition-colors duration-200"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <Sun className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="font-medium">Light</div>
                  <div className="text-sm text-gray-500">Light theme</div>
                </div>
                
                {/* Checkmark for selected theme */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto w-2 h-2 bg-purple-600 rounded-full"
                />
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
} 