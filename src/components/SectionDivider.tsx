'use client'

import { motion, Variants } from 'framer-motion'
import { ChevronDown, Sparkles, Zap } from 'lucide-react'

interface SectionDividerProps {
  variant?: 'flowing' | 'magnetic' | 'sparkle'
  className?: string
  /** Section id to scroll to when the magnetic button is clicked */
  targetId?: string
}

export default function SectionDivider({ variant = 'flowing', className, targetId = 'about' }: SectionDividerProps) {
  const scrollToTarget = () => {
    const element = document.getElementById(targetId)
    if (!element) return

    const navHeight = 80
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - navHeight
    window.scrollTo({ top: targetPosition, behavior: 'smooth' })
  }
  const flowingVariants: Variants = {
    hidden: { opacity: 0, scaleY: 0 },
    visible: { 
      opacity: 1, 
      scaleY: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const sparkleVariants: Variants = {
    hidden: { opacity: 0, scale: 0, rotate: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 360,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  }

  const magneticVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  if (variant === 'flowing') {
    return (
      <motion.div 
        className={`section-divider ${className || ''}`}
        variants={flowingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="flex items-center justify-center h-full">
          <motion.div
            className="w-1 h-16 bg-gradient-to-b from-transparent via-purple-500 to-transparent"
            animate={{
              scaleY: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    )
  }

  if (variant === 'sparkle') {
    return (
      <motion.div 
        className={`section-divider ${className || ''}`}
        variants={sparkleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="flex items-center justify-center h-full space-x-4">
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-6 h-6 text-purple-500" />
          </motion.div>
          
          <motion.div
            className="w-16 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
            animate={{
              scaleX: [0.5, 1, 0.5],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
          
          <motion.div
            animate={{
              y: [0, 10, 0],
              rotate: [360, 180, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <Zap className="w-6 h-6 text-blue-500" />
          </motion.div>
        </div>
      </motion.div>
    )
  }

  if (variant === 'magnetic') {
    return (
      <motion.div 
        className={`section-divider ${className || ''}`}
        variants={magneticVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="flex items-center justify-center h-full">
          <motion.button
            type="button"
            onClick={scrollToTarget}
            aria-label="Scroll to next section"
            className="relative cursor-pointer bg-transparent border-0 p-0"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div
              className="w-12 h-12 rounded-full border-2 border-purple-500 flex items-center justify-center"
              animate={{
                scale: [1, 1.1, 1],
                borderColor: ['rgb(139, 92, 246)', 'rgb(59, 130, 246)', 'rgb(139, 92, 246)']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <ChevronDown className="w-6 h-6 text-purple-500" />
              </motion.div>
            </motion.div>
            
            {/* Magnetic glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-purple-500/20 pointer-events-none"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.button>
        </div>
      </motion.div>
    )
  }

  return null
} 