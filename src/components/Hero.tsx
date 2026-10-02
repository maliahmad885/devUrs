'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Play, MessageCircle, Zap, Rocket, Target, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect, useRef, useState, useCallback } from 'react'
import {
  AUTOMATIONS_SHIPPED,
  HOURS_SAVED_PER_WEEK,
  PLATFORMS_SHIPPED,
  YEARS_EXPERIENCE,
} from '@/lib/site'

interface HeroProps {
  className?: string
  /** Opens the project consultation wizard (owned by the page). */
  onOpenWizard: () => void
}

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

const HEADING_VARIANTS = [
  {
    main: 'Ali Ahmad',
    sub: 'Full-Stack Developer & Automation Expert',
    description: `${YEARS_EXPERIENCE} years building high-performance web applications and intelligent workflow systems. Specialized in Ruby on Rails, React.js, Next.js, and Node.js.`,
    highlight: `${AUTOMATIONS_SHIPPED} workflow automations shipped`,
    icon: Rocket,
  },
  {
    main: 'Web Apps That Scale',
    sub: 'Rails · React · Next.js · Node',
    description:
      'From admin platforms and marketplaces to travel-tech and teledermatology — production systems with billing, CRM sync, and cloud infrastructure.',
    highlight: `${PLATFORMS_SHIPPED} platforms shipped`,
    icon: Target,
  },
  {
    main: 'Intelligent Automation',
    sub: 'n8n · Make · Zapier',
    description: `Certified automation professional. Workflows that cut manual work and save clients ${HOURS_SAVED_PER_WEEK} hours every week.`,
    highlight: 'Automation that pays for itself',
    icon: MessageCircle,
  },
  {
    main: 'Building AI Agents',
    sub: 'LangChain · LangGraph',
    description:
      'Expanding into AI agent development — connecting LLMs to real business workflows for smarter, more autonomous systems.',
    highlight: 'Next-gen workflow intelligence',
    icon: TrendingUp,
  },
  {
    main: 'End-to-End Ownership',
    sub: 'Backend · Frontend · DevOps',
    description:
      'From architecture and APIs to Stripe billing, AWS CI/CD, and integrations — one builder who ships and maintains the full stack.',
    highlight: `${YEARS_EXPERIENCE} years of shipping`,
    icon: Zap,
  },
]

const HEADING_INTERVAL_MS = 5000

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut' as const,
    },
  },
}

const PARTICLE_COLORS = ['#22c55e', '#0ea5e9', '#f59e0b', '#16a34a', '#0284c7', '#d97706']
const PARTICLE_COUNT = 80
const MOUSE_RADIUS = 100
const LINK_DISTANCE = 80

/**
 * Canvas particle field. Runs a single requestAnimationFrame loop that reads
 * mouse position from a ref, so moving the mouse never restarts the loop.
 * Disabled on small screens, for reduced-motion users, and while the tab is hidden.
 */
const ParticleSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)')
    const update = () => setEnabled(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Particle[] = []
    const mouse = { x: -9999, y: -9999 }
    let raf = 0

    const createParticles = () =>
      Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,
        opacity: Math.random() * 0.4 + 0.2,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      }))

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particles = createParticles()
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.speedX
        p.y += p.speedY

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.hypot(dx, dy)
        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS
          p.x -= dx * force * 0.03
          p.y -= dy * force * 0.03
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()

        // Only link each pair once (j > i) to halve the work per frame.
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const d = Math.hypot(p.x - q.x, p.y - q.y)
          if (d < LINK_DISTANCE) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = p.color
            ctx.globalAlpha = ((LINK_DISTANCE - d) / LINK_DISTANCE) * 0.2
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }

    const onVisibility = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}

export default function Hero({ className, onOpenWizard }: HeroProps) {
  const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadingIndex((prev) => (prev + 1) % HEADING_VARIANTS.length)
    }, HEADING_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [])

  const scrollToProjects = useCallback(() => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const currentHeading = HEADING_VARIANTS[currentHeadingIndex]
  const HighlightIcon = currentHeading.icon

  return (
    <section
      className={cn(
        'relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#3B82F6]/10 via-white to-[#10B981]/10',
        className
      )}
    >
      <ParticleSystem />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-900 pt-20 sm:pt-24 lg:pt-32">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mb-12 sm:mb-16">
          <motion.div variants={itemVariants} className="mb-8 sm:mb-12">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-6 sm:mb-8 relative font-bold leading-tight font-montserrat">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`main-${currentHeadingIndex}`}
                  className="bg-gradient-to-r from-[#3B82F6] via-[#10B981] to-[#1E40AF] bg-clip-text text-transparent font-montserrat"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {currentHeading.main}
                </motion.span>
              </AnimatePresence>
              <br />
              <AnimatePresence mode="wait">
                <motion.span
                  key={`sub-${currentHeadingIndex}`}
                  className="bg-gradient-to-r from-[#1E40AF] via-[#10B981] to-[#3B82F6] bg-clip-text text-transparent font-montserrat"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
                >
                  {currentHeading.sub}
                </motion.span>
              </AnimatePresence>

              {/* Soft 3D text shadow (desktop only) */}
              <div
                aria-hidden="true"
                className="absolute inset-0 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-300/20 transform translate-x-2 translate-y-2 -z-10 hidden lg:block font-montserrat"
              >
                <span>{currentHeading.main}</span>
                <br />
                <span>{currentHeading.sub}</span>
              </div>
            </h1>

            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${currentHeadingIndex}`}
                className="text-xl sm:text-2xl lg:text-3xl text-gray-600 max-w-4xl sm:max-w-6xl mx-auto mb-8 sm:mb-10 px-4 sm:px-0 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
              >
                {currentHeading.description}
              </motion.p>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`highlight-${currentHeadingIndex}`}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3B82F6] to-[#10B981] text-white px-6 py-3 rounded-full shadow-lg mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <HighlightIcon className="w-5 h-5" />
                <span className="font-semibold text-sm sm:text-base">{currentHeading.highlight}</span>
              </motion.div>
            </AnimatePresence>

            {/* Heading selector dots */}
            <motion.div
              className="hidden md:flex justify-center items-center gap-3 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              {HEADING_VARIANTS.map((variant, index) => (
                <motion.button
                  key={variant.main}
                  type="button"
                  aria-label={`Show: ${variant.main}`}
                  aria-pressed={index === currentHeadingIndex}
                  onClick={() => setCurrentHeadingIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                    index === currentHeadingIndex
                      ? 'bg-gradient-to-r from-[#3B82F6] to-[#10B981] scale-125 shadow-lg'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </motion.div>

            <motion.div
              className="hidden md:block w-full max-w-md mx-auto h-2 bg-gray-200 rounded-full overflow-hidden mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-[#3B82F6] to-[#10B981] rounded-full shadow-sm"
                initial={{ width: '0%' }}
                animate={{ width: `${((currentHeadingIndex + 1) / HEADING_VARIANTS.length) * 100}%` }}
                transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <motion.button
              type="button"
              onClick={onOpenWizard}
              className="px-10 py-4 bg-gradient-to-r from-[#3B82F6] to-[#10B981] text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 hover:from-[#2563EB] hover:to-[#059669] relative overflow-hidden group"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <span className="relative z-10">Get Free Consultation</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB] to-[#059669] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>

            <motion.button
              type="button"
              onClick={scrollToProjects}
              className="px-10 py-4 bg-white/90 backdrop-blur-md border-2 border-[#3B82F6] text-[#3B82F6] rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 hover:bg-[#3B82F6] hover:text-white"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <Play className="w-5 h-5" />
              <span>View Selected Work</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
