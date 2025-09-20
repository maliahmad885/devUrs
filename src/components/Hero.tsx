'use client'

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowRight, Play, MessageCircle, Zap, Sparkles, Rocket, Target, TrendingUp, Clock, Shield, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect, useRef, useState, useCallback } from 'react'
import VideoModal from './VideoModal'

// Types
interface HeroProps {
  className?: string
}

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

// Enhanced Dynamic Headings with better messaging
const HEADING_VARIANTS = [
  {
    main: "AI Automation",
    sub: "Made Simple",
    description: "Transform your business with cutting-edge AI automation and no-code tools. From Make.com to n8n, we make complex workflows effortless and fun.",
    highlight: "20+ hours saved weekly",
    icon: Rocket
  },
  {
    main: "n8n & Make.com",
    sub: "Expert Solutions",
    description: "Certified automation expert with 5+ years building AI agents, voice systems, and backend workflows that save 20+ hours weekly.",
    highlight: "500+ integrations",
    icon: Target
  },
  {
    main: "AI Voice Agents",
    sub: "24/7 Operations",
    description: "Intelligent voice systems that qualify leads, handle support, book calls, and run your business operations around the clock.",
    highlight: "24/7 availability",
    icon: MessageCircle
  },
  {
    main: "Smart CRM Workflows",
    sub: "Boost Close Rates",
    description: "AI-powered CRM pipelines that eliminate manual work, route leads smarter, and scale without hiring more staff.",
    highlight: "3x faster closing",
    icon: TrendingUp
  },
  {
    main: "Integration Hub",
    sub: "Connect Everything",
    description: "Seamlessly integrate with 500+ apps and services. From CRM to marketing tools, we connect your entire tech stack.",
    highlight: "500+ apps connected",
    icon: Zap
  }
]

// Enhanced Animation variants
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
      ease: "easeOut" as const
    }
  },
}

const floatingVariants = {
  float: {
    y: [0, -25, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
}

const pulseVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
}

const rotateVariants = {
  rotate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear" as const,
    },
  },
}

// Optimized Interactive Particle System
const ParticleSystem = () => {
  const [particles, setParticles] = useState<Particle[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const lastTimeRef = useRef<number>(0)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = []
      // Reduced particle count for better performance
      const particleCount = isMobile ? 30 : 80
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.8,
          speedY: (Math.random() - 0.5) * 0.8,
          opacity: Math.random() * 0.4 + 0.2,
          color: ['#F85B5D', '#FCA207', '#7661FB', '#DB4DBA', '#C57E9E', '#D7979E'][Math.floor(Math.random() * 6)]
        })
      }
      setParticles(newParticles)
    }

    generateParticles()
    window.addEventListener('resize', generateParticles)
    return () => window.removeEventListener('resize', generateParticles)
  }, [isMobile])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = (currentTime: number) => {
      // Throttle animation to 60fps
      if (currentTime - lastTimeRef.current < 16) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }
      
      lastTimeRef.current = currentTime
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Optimized mouse interaction
        const dx = mousePosition.x - particle.x
        const dy = mousePosition.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 100) {
          const force = (100 - distance) / 100
          particle.x -= dx * force * 0.03
          particle.y -= dy * force * 0.03
        }

        // Draw particle with optimized rendering
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity
        ctx.fill()

        // Draw connections with reduced complexity
        particles.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 80) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = particle.color
            ctx.globalAlpha = (80 - distance) / 80 * 0.2
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [particles, mousePosition])

  if (isMobile) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}

// Enhanced Stats Component
const StatsSection = () => {
  const stats = [
    { number: "500+", label: "Integrations", icon: Zap },
    { number: "20+", label: "Hours Saved", icon: Clock },
    { number: "99.9%", label: "Uptime", icon: Shield },
    { number: "24/7", label: "Support", icon: MessageCircle }
  ]

  return (
    <motion.div 
      className="grid grid-cols-2 lg:flex lg:flex-wrap justify-center gap-3 lg:gap-6 mb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="flex items-center gap-2 lg:gap-3 bg-white/90 backdrop-blur-md px-3 lg:px-6 py-3 rounded-2xl shadow-lg border border-gray-200/50"
          whileHover={{ scale: 1.05, y: -5 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
        >
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-[#F85B5D] to-[#7661FB] rounded-xl flex items-center justify-center">
            <stat.icon className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
          </div>
          <div>
            <div className="text-lg lg:text-2xl font-bold text-gray-900">{stat.number}</div>
            <div className="text-xs lg:text-sm text-gray-600">{stat.label}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

// Enhanced Feature Pills
const FeaturePills = () => {
  const features = [
    { text: "No-Code Required", color: "from-[#FCA207] to-[#F85B5D]", icon: CheckCircle },
    { text: "AI-Powered", color: "from-[#7661FB] to-[#DB4DBA]", icon: Sparkles },
    { text: "Enterprise Ready", color: "from-[#F85B5D] to-[#7661FB]", icon: Shield },
    { text: "24/7 Support", color: "from-[#DB4DBA] to-[#FCA207]", icon: MessageCircle }
  ]

  return (
    <motion.div 
      className="grid grid-cols-2 lg:flex lg:flex-wrap justify-center gap-2 lg:gap-3 mb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      {features.map((feature, index) => (
        <motion.div
          key={feature.text}
          className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 lg:px-4 py-2 rounded-full shadow-lg border border-gray-200/50"
          whileHover={{ scale: 1.05, y: -2 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
        >
          <div className={`w-2 h-2 bg-gradient-to-r ${feature.color} rounded-full`}></div>
          <feature.icon className="w-3 h-3 lg:w-4 lg:h-4 text-gray-600" />
          <span className="text-xs lg:text-sm font-semibold text-gray-700">{feature.text}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default function Hero({ className }: HeroProps) {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -100])
  const y2 = useTransform(scrollY, [0, 300], [0, 100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3])

  const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadingIndex((prev) => (prev + 1) % HEADING_VARIANTS.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Function to scroll to contact section
  const scrollToContact = useCallback(() => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const currentHeading = HEADING_VARIANTS[currentHeadingIndex]

  return (
    <section
      id="home"
      className={cn(
        'relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F85B5D]/10 via-white to-[#7661FB]/10',
        className
      )}
    >
      {/* Optimized Interactive Particle System */}
      <ParticleSystem />
      
      {/* AI Background Image Only */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Enhanced AI image with animated glow effect - Responsive */}
        <motion.div 
          className="absolute top-1/2 right-0 transform -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 opacity-70 sm:opacity-80"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.7, 0.8, 0.7]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          style={{
            backgroundImage: 'url(/images/pngtree-artificial.png)',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            filter: 'drop-shadow(0 0 20px rgba(248, 91, 93, 0.3))'
          }}
        />
        
        {/* Subtle logo color glow behind the AI image */}
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-96 h-96 bg-gradient-to-l from-[#F85B5D]/20 to-transparent rounded-full blur-3xl" />
        
        {/* Light overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/30 to-transparent" />
      </div>


      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-900 pt-20 sm:pt-24 lg:pt-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 sm:mb-16"
        >
          {/* Enhanced Heading with Animated Gradient Text */}
          <motion.div variants={itemVariants} className="mb-8 sm:mb-12">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-6 sm:mb-8 relative font-bold leading-tight font-montserrat">
              <AnimatePresence mode="wait">
                <motion.span 
                  key={`main-${currentHeadingIndex}`}
                  className="bg-gradient-to-r from-[#F85B5D] via-[#FCA207] to-[#DB4DBA] bg-clip-text text-transparent font-montserrat"
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
                  className="bg-gradient-to-r from-[#7661FB] via-[#FCA207] to-[#7661FB] bg-clip-text text-transparent font-montserrat"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
                >
                  {currentHeading.sub}
                </motion.span>
              </AnimatePresence>
              
              {/* Enhanced 3D Text Shadow Effect */}
              <div className="absolute inset-0 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-300/20 transform translate-x-2 translate-y-2 -z-10 hidden lg:block font-montserrat">
                <span>{currentHeading.main}</span>
                <br />
                <span>{currentHeading.sub}</span>
              </div>
            </h1>
            
            {/* Enhanced Subtitle */}
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

            {/* Enhanced Highlight Badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`highlight-${currentHeadingIndex}`}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F85B5D] to-[#7661FB] text-white px-6 py-3 rounded-full shadow-lg mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <currentHeading.icon className="w-5 h-5" />
                <span className="font-semibold text-sm sm:text-base">{currentHeading.highlight}</span>
              </motion.div>
            </AnimatePresence>

            {/* Enhanced Progress Dots */}
            <motion.div 
              className="hidden md:flex justify-center items-center gap-3 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              {HEADING_VARIANTS.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentHeadingIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                    index === currentHeadingIndex 
                      ? 'bg-gradient-to-r from-[#F85B5D] to-[#7661FB] scale-125 shadow-lg' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </motion.div>

            {/* Enhanced Progress Bar */}
            <motion.div 
              className="hidden md:block w-full max-w-md mx-auto h-2 bg-gray-200 rounded-full overflow-hidden mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-[#F85B5D] to-[#7661FB] rounded-full shadow-sm"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentHeadingIndex + 1) / HEADING_VARIANTS.length) * 100}%` }}
                transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </motion.div>

            {/* Enhanced Feature Pills */}
            <FeaturePills />

            {/* Enhanced Stats Section */}
            <StatsSection />
          </motion.div>

          {/* Simple & Shiny CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <motion.button 
              onClick={scrollToContact}
              className="px-10 py-4 bg-gradient-to-r from-[#F85B5D] to-[#7661FB] text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 hover:from-[#DB4DBA] hover:to-[#FCA207]"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <span>Start Automating</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <motion.button 
              onClick={() => setIsVideoModalOpen(true)}
              className="px-10 py-4 bg-gradient-to-r from-[#7661FB] to-[#DB4DBA] text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 hover:from-[#FCA207] hover:to-[#F85B5D]"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
      />
    </section>
  )
}
