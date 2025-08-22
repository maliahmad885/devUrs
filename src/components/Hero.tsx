'use client'

import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowRight, Play, MessageCircle, Zap, Settings, Database, Shield, Sparkles, Zap as ZapIcon, Zap as Lightning } from 'lucide-react'
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

interface CodeSnippet {
  id: number
  code: string
  language: string
  x: number
  y: number
  rotation: number
}

// Constants
// FEATURES array removed

// Dynamic Headings and Descriptions
const HEADING_VARIANTS = [
  {
    main: "AI Automation",
    sub: "Made Simple",
    description: "Transform your business with cutting-edge AI automation and no-code tools. From Make.com to Zapier, we make complex workflows effortless and fun."
  },
  {
    main: "No-Code Tools",
    sub: "Built for Everyone",
    description: "Create powerful automations without writing a single line of code. Our intuitive platform makes complex workflows accessible to everyone."
  },
  {
    main: "Smart Workflows",
    sub: "That Learn & Adapt",
    description: "AI-powered decision making that learns from your business patterns and continuously improves your automation processes."
  },
  {
    main: "Enterprise Solutions",
    sub: "Scale with Confidence",
    description: "Bank-grade security, compliance, and scalability for enterprise teams. Trust your business automation to industry-leading standards."
  },
  {
    main: "Integration Hub",
    sub: "Connect Everything",
    description: "Seamlessly integrate with 500+ apps and services. From CRM to marketing tools, we connect your entire tech stack."
  }
]


// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const floatingVariants = {
  float: {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
}

const walkingVariants = {
  walk: {
    x: [0, 100, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
}

const waveVariants = {
  wave: {
    rotate: [0, 20, -20, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
}

const chatBubbleVariants = {
  chat: {
    scale: [1, 1.1, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
}

// Interactive Particle System
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
      // Reduce particles on mobile for better performance
      const particleCount = isMobile ? 20 : 50
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2,
          color: ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B'][Math.floor(Math.random() * 5)]
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

        // Mouse interaction
        const dx = mousePosition.x - particle.x
        const dy = mousePosition.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 100) {
          const force = (100 - distance) / 100
          particle.x -= dx * force * 0.01
          particle.y -= dy * force * 0.01
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity
        ctx.fill()

        // Draw connections
        particles.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = particle.color
            ctx.globalAlpha = (100 - distance) / 100 * 0.3
            ctx.lineWidth = 0.5
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

  // Don't render particle system on mobile for better performance
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







// Enhanced Animated Mascot Components
const AutomationMascot = ({ 
  icon: Icon, 
  name, 
  color, 
  delay = 0,
  position = 'top-1/4',
  left = 'left-20'
}: { 
  icon: React.ComponentType<{ className?: string }>
  name: string
  color: string
  delay?: number
  position?: string
  left?: string
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const springConfig = { stiffness: 300, damping: 20 }
  const scale = useSpring(isHovered ? 1.2 : 1, springConfig)
  const rotation = useSpring(isHovered ? 15 : 0, springConfig)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <motion.div
      className={cn(
        'absolute flex flex-col items-center cursor-pointer group',
        // Mobile responsive positioning
        'hidden sm:flex', // Hide on mobile
        position,
        left
      )}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ scale, rotateZ: rotation }}
    >
      <motion.div
        className={cn(
          'w-16 h-16 rounded-full flex items-center justify-center mb-2 shadow-lg relative overflow-hidden',
          color
        )}
        variants={floatingVariants}
        animate="float"
        style={{ animationDelay: `${delay}s` }}
      >
        <Icon className="w-8 h-8 text-white relative z-10" />
        <motion.div
          className="absolute inset-0 bg-white/20"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, delay }}
        />
      </motion.div>
      <motion.div
        className="text-xs font-medium text-gray-600 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-gray-200/50"
        variants={waveVariants}
        animate="wave"
        style={{ animationDelay: `${delay + 1}s` }}
      >
        {name}
      </motion.div>
      
      {/* Hover Tooltip */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-20 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-xl whitespace-nowrap"
        >
          Click to learn more about {name}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
        </motion.div>
      )}
    </motion.div>
  )
}

// Enhanced ChatbotRobot with 3D effects
const ChatbotRobot = ({ 
  position = 'bottom-1/4',
  left = 'right-20',
  delay = 0
}: { 
  position?: string
  left?: string
  delay?: number
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const springConfig = { stiffness: 300, damping: 20 }
  const scale = useSpring(isHovered ? 1.1 : 1, springConfig)
  const rotationY = useSpring(isHovered ? 10 : 0, springConfig)

  return (
    <motion.div
      className={cn(
        'absolute flex flex-col items-center cursor-pointer group',
        position,
        left
      )}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ scale, rotateY: rotationY }}
    >
              {/* Robot Body with Glassmorphism */}
        <motion.div
          className="w-20 h-24 bg-gradient-to-b from-blue-400/90 to-blue-600/90 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center shadow-2xl relative overflow-hidden border border-white/20"
          variants={walkingVariants}
          animate="walk"
          style={{ animationDelay: `${delay}s` }}
        >
        {/* Animated Background Pattern */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-full h-full bg-gradient-to-br from-white/30 to-transparent" />
        </motion.div>
        
        {/* Robot Head */}
        <div className="w-16 h-16 bg-gradient-to-b from-blue-300/90 to-blue-500/90 backdrop-blur-sm rounded-xl mb-2 flex items-center justify-center relative border border-white/20">
          <motion.div 
            className="w-3 h-3 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div 
            className="w-3 h-3 bg-green-400 rounded-full absolute right-2"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          />
        </div>
        
        {/* Robot Arms */}
        <div className="flex justify-between w-full px-2">
          <motion.div
            className="w-2 h-8 bg-blue-500/80 rounded-full"
            variants={waveVariants}
            animate="wave"
            style={{ animationDelay: `${delay + 0.5}s` }}
          />
          <motion.div
            className="w-2 h-8 bg-blue-500/80 rounded-full"
            variants={waveVariants}
            animate="wave"
            style={{ animationDelay: `${delay + 1}s` }}
          />
        </div>
      </motion.div>
      
      {/* Enhanced Chat Bubble with Glassmorphism */}
      <motion.div
        className="absolute -top-16 -left-24 bg-white/90 backdrop-blur-md rounded-2xl px-3 py-2 shadow-2xl border border-white/20"
        variants={chatBubbleVariants}
        animate="chat"
        style={{ animationDelay: `${delay + 2}s` }}
      >
        <div className="text-xs text-gray-700 font-medium">Hello! 👋</div>
        <div className="text-xs text-gray-500">Let's automate!</div>
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-white/90 border-r border-b border-white/20 transform rotate-45 translate-x-1 translate-y-1" />
      </motion.div>
      
      <div className="text-xs font-medium text-gray-600 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-lg border border-gray-200/50 mt-2">
        AI Bot
      </div>
    </motion.div>
  )
}

// Enhanced WalkingMascot with 3D effects
const WalkingMascot = ({ 
  icon: Icon, 
  name, 
  color, 
  delay = 0,
  position = 'bottom-1/3',
  left = 'left-1/4'
}: { 
  icon: React.ComponentType<{ className?: string }>
  name: string
  color: string
  delay?: number
  position?: string
  left?: string
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const springConfig = { stiffness: 300, damping: 20 }
  const scale = useSpring(isHovered ? 1.15 : 1, springConfig)
  const rotationZ = useSpring(isHovered ? 5 : 0, springConfig)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <motion.div
      className={cn(
        'absolute flex flex-col items-center cursor-pointer group',
        // Mobile responsive positioning
        'hidden sm:flex', // Hide on mobile
        position,
        left
      )}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ scale, rotateZ: rotationZ }}
    >
      <motion.div
        className={cn(
          'w-14 h-14 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden border border-white/20',
          color
        )}
        variants={walkingVariants}
        animate="walk"
        style={{ animationDelay: `${delay}s` }}
      >
        <Icon className="w-7 h-7 text-white relative z-10" />
        <motion.div
          className="absolute inset-0 bg-white/20"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, delay }}
        />
      </motion.div>
      <motion.div
        className="text-xs font-medium text-gray-600 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-lg border border-gray-200/50"
        variants={waveVariants}
        animate="wave"
        style={{ animationDelay: `${delay + 1}s` }}
      >
        {name}
      </motion.div>
    </motion.div>
  )
}



export default function Hero({ className }: HeroProps) {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -100])
  const y2 = useTransform(scrollY, [0, 300], [0, 100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3])

  // State for dynamic headings
  const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0)

  // Auto-cycle through headings
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadingIndex((prev) => (prev + 1) % HEADING_VARIANTS.length)
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [])

  const currentHeading = HEADING_VARIANTS[currentHeadingIndex]

  return (
    <>
      
      <section
        id="home"
        className={cn(
          'relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-purple-50/30',
          className
        )}
      >
        {/* Interactive Particle System */}
        <ParticleSystem />
      
        
        {/* Enhanced Background Elements with 3D Parallax */}
        <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y: y1 }}
          variants={floatingVariants}
          animate="float"
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-100/60 to-blue-100/60 rounded-full blur-3xl opacity-50 hidden sm:block"
        />
        <motion.div
          style={{ y: y2, animationDelay: '2s' }}
          variants={floatingVariants}
          animate="float"
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-100/60 to-blue-100/60 rounded-full blur-3xl opacity-50 hidden sm:block"
        />
        <motion.div 
          style={{ opacity }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-100/40 to-pink-100/40 rounded-full blur-3xl animate-pulse hidden sm:block"
        />
        
        {/* Additional floating geometric shapes */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-purple-200/30 rounded-full hidden sm:block"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 0.8, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/4 right-1/4 w-24 h-24 border-2 border-blue-200/30 transform rotate-45 hidden sm:block"
        />
      </div>

      {/* Enhanced Animated Mascots with 3D effects */}
      <AutomationMascot 
        icon={Zap} 
        name="Zapier" 
        color="bg-gradient-to-br from-orange-400 to-red-500"
        position="top-1/4"
        left="left-16"
        delay={0.5}
      />
      
      <AutomationMascot 
        icon={Settings} 
        name="Make.com" 
        color="bg-gradient-to-br from-blue-400 to-indigo-600"
        position="top-1/3"
        left="right-24"
        delay={1}
      />
      
      <AutomationMascot 
        icon={MessageCircle} 
        name="ManyChat" 
        color="bg-gradient-to-br from-green-400 to-emerald-600"
        position="top-1/2"
        left="left-32"
        delay={1.5}
      />
      
      <AutomationMascot 
        icon={Database} 
        name="Zoho" 
        color="bg-gradient-to-br from-purple-400 to-violet-600"
        position="top-2/3"
        left="right-16"
        delay={2}
      />
      
      <AutomationMascot 
        icon={Shield} 
        name="HubSpot" 
        color="bg-gradient-to-br from-red-400 to-pink-600"
        position="bottom-1/4"
        left="left-24"
        delay={2.5}
      />

      {/* Enhanced Walking Mascots */}
      <WalkingMascot 
        icon={Settings} 
        name="No-Code" 
        color="bg-gradient-to-br from-indigo-400 to-purple-600"
        position="bottom-1/3"
        left="left-1/4"
        delay={3}
      />
      
      <WalkingMascot 
        icon={Database} 
        name="Analytics" 
        color="bg-gradient-to-br from-teal-400 to-cyan-600"
        position="bottom-2/5"
        left="right-1/3"
        delay={3.5}
      />



      {/* Enhanced Floating Elements with 3D Movement */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-10 w-4 h-4 bg-purple-400 rounded-full animate-pulse shadow-lg hidden sm:block"
      />
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [360, 180, 0],
          scale: [1, 0.8, 1]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/3 right-20 w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-lg hidden sm:block"
      />
      <motion.div
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 90, 180],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/4 left-20 w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg hidden sm:block"
      />
      
      {/* Additional floating sparkles */}
      <motion.div
        animate={{ 
          y: [0, -30, 0],
          x: [0, 10, 0],
          rotate: [0, 360]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute top-1/2 right-1/4 hidden sm:block"
      >
        <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
      </motion.div>
      
      <motion.div
        animate={{ 
          y: [0, 25, 0],
          x: [0, -15, 0],
          rotate: [360, 0]
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute bottom-1/3 left-1/3 hidden sm:block"
      >
        <ZapIcon className="w-5 h-5 text-orange-400 animate-pulse" />
      </motion.div>

      

      {/* Main Content Area */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 text-center text-gray-900">
        {/* Main Content with Enhanced Animations */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 sm:mb-16"
        >
          {/* Enhanced Heading with Animated Gradient Text */}
          <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
            <h1 className="heading-1 md:text-8xl mb-4 sm:mb-6 relative">
              <AnimatePresence mode="wait">
                <motion.span 
                  key={`main-${currentHeadingIndex}`}
                  className="text-gradient font-display font-bold relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  {currentHeading.main}
                </motion.span>
              </AnimatePresence>
              <br />
              <AnimatePresence mode="wait">
                <motion.span 
                  key={`sub-${currentHeadingIndex}`}
                  className="text-gradient-reverse font-display font-semibold relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: "easeInOut", delay: 0.1 }}
                >
                  {currentHeading.sub}
                </motion.span>
              </AnimatePresence>
              
              {/* 3D Text Shadow Effect */}
              <div className="absolute inset-0 heading-1 md:text-8xl font-bold text-gray-300/20 transform translate-x-1 translate-y-1 -z-10 hidden sm:block">
                <span>{currentHeading.main}</span>
                <br />
                <span>{currentHeading.sub}</span>
              </div>
            </h1>
            
            {/* Enhanced Subtitle */}
            <AnimatePresence mode="wait">
              <motion.p 
                key={`desc-${currentHeadingIndex}`}
                className="text-body-large md:text-2xl text-gray-600 max-w-4xl sm:max-w-6xl mx-auto mb-6 sm:mb-8 px-4 sm:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
              >
                {currentHeading.description}
              </motion.p>
            </AnimatePresence>

            {/* Progress Dots */}
            <motion.div 
              className="flex justify-center items-center gap-2 sm:gap-3 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {HEADING_VARIANTS.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentHeadingIndex(index)}
                  className={`w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full transition-all duration-300 cursor-pointer ${
                    index === currentHeadingIndex 
                      ? 'bg-purple-600 scale-125 shadow-lg' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </motion.div>

            {/* Progress Bar */}
            <motion.div 
              className="w-full max-w-sm sm:max-w-md mx-auto h-1 sm:h-1.5 bg-gray-200 rounded-full overflow-hidden mb-8 sm:mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-sm"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentHeadingIndex + 1) / HEADING_VARIANTS.length) * 100}%` }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Key Benefits Bullet Points */}
            <motion.div 
              className="flex flex-row gap-2 sm:gap-3 justify-center items-center mb-10 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center gap-2 sm:gap-3 text-gray-600 bg-white/80 backdrop-blur-sm px-2 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm border border-gray-100">
                <div className="w-2 sm:w-3 h-2 sm:h-3 bg-green-500 rounded-full shadow-sm"></div>
                <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">No-Code Required</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-gray-600 bg-white/80 backdrop-blur-sm px-2 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm border border-gray-100">
                <div className="w-2 sm:w-3 h-2 sm:h-3 bg-blue-500 rounded-full shadow-sm"></div>
                <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">AI-Powered</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-gray-600 bg-white/80 backdrop-blur-sm px-2 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm border border-gray-100">
                <div className="w-2 sm:w-3 h-2 sm:h-3 bg-purple-500 rounded-full shadow-sm"></div>
                <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">Enterprise Ready</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced CTA Buttons with Advanced Hover Effects */}
          <motion.div variants={itemVariants} className="flex flex-row gap-3 sm:gap-6 justify-center items-center mb-16 flex-wrap">
            <motion.button 
              className="group px-4 sm:px-10 py-2.5 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold text-sm sm:text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 sm:space-x-3 shadow-xl hover:shadow-2xl relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Start Automating</span>
              <ArrowRight className="w-3.5 sm:w-5 h-3.5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
              
              {/* Animated background overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Ripple effect */}
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-xl"
                initial={{ scale: 0, opacity: 1 }}
                whileHover={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
            
            <motion.button 
              className="px-4 sm:px-10 py-2.5 sm:py-4 border-2 border-purple-600 text-purple-600 rounded-xl font-semibold text-sm sm:text-lg hover:bg-purple-600 hover:text-white transition-all duration-300 flex items-center space-x-2 sm:space-x-3 hover:shadow-xl relative overflow-hidden group bg-white/90 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-3.5 sm:w-5 h-3.5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Watch Demo</span>
              
              {/* Hover background animation */}
              <motion.div
                className="absolute inset-0 bg-purple-600"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: 'left' }}
              />
            </motion.button>
          </motion.div>

          
        </motion.div>

        {/* Enhanced Trust Indicators with Animated Icons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 sm:mt-20"
        >
          <p className="text-gray-500 mb-6 sm:mb-8 text-base sm:text-lg font-medium">Trusted by leading companies worldwide</p>
          
          {/* Enhanced Company Logos */}
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 opacity-70">
            {[
              { name: 'Make.com', color: 'text-blue-600' },
              { name: 'Zapier', color: 'text-orange-600' },
              { name: 'ManyChat', color: 'text-green-600' },
              { name: 'Zoho', color: 'text-blue-500' },
              { name: 'HubSpot', color: 'text-orange-500' }
            ].map((company, index) => (
              <motion.div
                key={company.name}
                className={`font-bold text-lg sm:text-xl cursor-pointer hover:opacity-100 transition-all duration-300 ${company.color} hover:scale-110`}
                whileHover={{ 
                  scale: 1.1, 
                  y: -2,
                  opacity: 1
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.7, y: 0 }}
                transition={{ duration: 0.5, delay: 2 + index * 0.1 }}
              >
                {company.name}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>


    </section>


    </>
  )
} 