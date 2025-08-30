'use client'

import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowRight, Play, MessageCircle, Zap, Settings, Database, Shield, Sparkles, Zap as ZapIcon, Zap as Lightning, Star, CheckCircle, Rocket, Target, TrendingUp, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'

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

// Enhanced Interactive Particle System
const ParticleSystem = () => {
  const [particles, setParticles] = useState<Particle[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
      const particleCount = isMobile ? 60 : 150
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 4 + 1,
          speedX: (Math.random() - 0.5) * 1.2,
          speedY: (Math.random() - 0.5) * 1.2,
          opacity: Math.random() * 0.6 + 0.3,
          color: ['#8B5CF6', '#3B82F6', '#06B6D4', '#10B981', '#F59E0B', '#EC4899'][Math.floor(Math.random() * 6)]
        })
      }
      setParticles(newParticles)
    }

    generateParticles()
    window.addEventListener('resize', generateParticles)
    return () => window.removeEventListener('resize', generateParticles)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = () => {
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

        // Enhanced mouse interaction
        const dx = mousePosition.x - particle.x
        const dy = mousePosition.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 120) {
          const force = (120 - distance) / 120
          particle.x -= dx * force * 0.05
          particle.y -= dy * force * 0.05
        }

        // Draw particle with glow effect
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        
        // Create gradient for glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        )
        gradient.addColorStop(0, particle.color)
        gradient.addColorStop(1, 'transparent')
        
        ctx.fillStyle = gradient
        ctx.globalAlpha = particle.opacity
        ctx.fill()

        // Draw connections with improved styling
        particles.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 120) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            
            // Create gradient for connections
            const lineGradient = ctx.createLinearGradient(
              particle.x, particle.y, otherParticle.x, otherParticle.y
            )
            lineGradient.addColorStop(0, particle.color)
            lineGradient.addColorStop(1, otherParticle.color)
            
            ctx.strokeStyle = lineGradient
            ctx.globalAlpha = (120 - distance) / 120 * 0.4
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    animate()

    return () => window.removeEventListener('resize', resizeCanvas)
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

// Enhanced Floating Icon Component
const FloatingIcon = ({ 
  icon: Icon, 
  name, 
  color, 
  delay = 0,
  position = 'top-1/4',
  left = 'left-20',
  size = 'w-16 h-16'
}: { 
  icon: React.ComponentType<{ className?: string }>
  name: string
  color: string
  delay?: number
  position?: string
  left?: string
  size?: string
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const springConfig = { stiffness: 300, damping: 20 }
  const scale = useSpring(isHovered ? 1.15 : 1, springConfig)
  const rotation = useSpring(isHovered ? 15 : 0, springConfig)

  return (
    <motion.div
      className={cn(
        'absolute flex flex-col items-center cursor-pointer group hidden lg:flex',
        position,
        left
      )}
      initial={{ opacity: 0, scale: 0, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ scale, rotateZ: rotation }}
    >
      <motion.div
        className={cn(
          `${size} rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden border border-white/20`,
          color
        )}
        variants={floatingVariants}
        animate="float"
        style={{ animationDelay: `${delay}s` }}
      >
        <Icon className="w-8 h-8 text-white relative z-10" />
        
        {/* Animated shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, delay }}
        />
        
        {/* Hover glow effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>
      
      <motion.div
        className="text-sm font-semibold text-gray-700 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-gray-200/60 mt-3"
        variants={pulseVariants}
        animate="pulse"
        style={{ animationDelay: `${delay + 1}s` }}
      >
        {name}
      </motion.div>
      
      {/* Enhanced Hover Tooltip */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute -top-24 bg-gray-900 text-white text-sm px-4 py-3 rounded-xl shadow-2xl whitespace-nowrap border border-gray-700"
        >
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>Learn more about {name}</span>
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
        </motion.div>
      )}
    </motion.div>
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
      className="flex flex-wrap justify-center gap-6 mb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg border border-gray-200/50"
          whileHover={{ scale: 1.05, y: -5 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
            <stat.icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

// Enhanced Feature Pills
const FeaturePills = () => {
  const features = [
    { text: "No-Code Required", color: "from-green-500 to-emerald-600", icon: CheckCircle },
    { text: "AI-Powered", color: "from-blue-500 to-indigo-600", icon: Sparkles },
    { text: "Enterprise Ready", color: "from-purple-500 to-violet-600", icon: Shield },
    { text: "24/7 Support", color: "from-orange-500 to-red-600", icon: MessageCircle }
  ]

  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-3 mb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      {features.map((feature, index) => (
        <motion.div
          key={feature.text}
          className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-gray-200/50"
          whileHover={{ scale: 1.05, y: -2 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
        >
          <div className={`w-2 h-2 bg-gradient-to-r ${feature.color} rounded-full`}></div>
          <feature.icon className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-semibold text-gray-700">{feature.text}</span>
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadingIndex((prev) => (prev + 1) % HEADING_VARIANTS.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const currentHeading = HEADING_VARIANTS[currentHeadingIndex]

  return (
    <section
      id="home"
      className={cn(
        'relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-purple-50/30',
        className
      )}
    >
      {/* Enhanced Interactive Particle System */}
      <ParticleSystem />
      
      {/* Enhanced Background Elements with 3D Parallax - Fixed positioning to prevent overflow */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y: y1 }}
          variants={floatingVariants}
          animate="float"
          className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-100/60 to-blue-100/60 rounded-full blur-3xl opacity-60 hidden lg:block"
        />
        <motion.div
          style={{ y: y2, animationDelay: '2s' }}
          variants={floatingVariants}
          animate="float"
          className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-green-100/60 to-blue-100/60 rounded-full blur-3xl opacity-60 hidden lg:block"
        />
        <motion.div 
          style={{ opacity }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-100/40 to-pink-100/40 rounded-full blur-3xl animate-pulse hidden lg:block"
        />
        
        {/* Enhanced floating geometric shapes - Fixed positioning */}
        <motion.div
          variants={rotateVariants}
          animate="rotate"
          className="absolute top-1/4 left-0 w-32 h-32 border-2 border-purple-200/40 rounded-full hidden lg:block"
        />
        <motion.div
          variants={rotateVariants}
          animate="rotate"
          className="absolute bottom-1/4 right-0 w-24 h-24 border-2 border-blue-200/40 transform rotate-45 hidden lg:block"
        />
      </div>



      {/* Enhanced Floating Sparkles - Fixed positioning */}
      <motion.div
        animate={{ 
          y: [0, -30, 0],
          x: [0, 10, 0],
          rotate: [0, 360]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute top-1/2 right-8 hidden lg:block"
      >
        <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
      </motion.div>
      
      <motion.div
        animate={{ 
          y: [0, 25, 0],
          x: [0, -15, 0],
          rotate: [360, 0]
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute bottom-1/3 left-8 hidden lg:block"
      >
        <ZapIcon className="w-6 h-6 text-orange-400 animate-pulse" />
      </motion.div>

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
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-6 sm:mb-8 relative font-bold leading-tight font-poppins">
              <AnimatePresence mode="wait">
                <motion.span 
                  key={`main-${currentHeadingIndex}`}
                  className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent font-poppins"
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
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent font-poppins"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
                >
                  {currentHeading.sub}
                </motion.span>
              </AnimatePresence>
              
              {/* Enhanced 3D Text Shadow Effect */}
              <div className="absolute inset-0 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-300/20 transform translate-x-2 translate-y-2 -z-10 hidden lg:block font-poppins">
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
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-3 rounded-full shadow-lg mb-8"
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
              className="flex justify-center items-center gap-3 mb-8"
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
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 scale-125 shadow-lg' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </motion.div>

            {/* Enhanced Progress Bar */}
            <motion.div 
              className="w-full max-w-md mx-auto h-2 bg-gray-200 rounded-full overflow-hidden mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-sm"
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

          {/* Enhanced CTA Buttons with Advanced Hover Effects */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16">
            <motion.button 
              className="group px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-bold text-lg sm:text-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 shadow-2xl hover:shadow-3xl relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Start Automating</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
              
              {/* Enhanced animated background overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.4 }}
              />
              
              {/* Enhanced ripple effect */}
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-2xl"
                initial={{ scale: 0, opacity: 1 }}
                whileHover={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 0.8 }}
              />
            </motion.button>
            
            <motion.button 
              className="px-8 sm:px-12 py-4 sm:py-5 border-2 border-purple-600 text-purple-600 rounded-2xl font-bold text-lg sm:text-xl hover:bg-purple-600 hover:text-white transition-all duration-300 flex items-center space-x-3 hover:shadow-2xl relative overflow-hidden group bg-white/95 backdrop-blur-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Watch Demo</span>
              
              {/* Enhanced hover background animation */}
              <motion.div
                className="absolute inset-0 bg-purple-600"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
                style={{ transformOrigin: 'left' }}
              />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 