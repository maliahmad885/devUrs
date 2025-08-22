'use client'

import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowRight, Play, MessageCircle, Zap, Settings, Database, Shield, Sparkles, Zap as ZapIcon, Cpu, Rocket, Brain, Zap as Lightning } from 'lucide-react'
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
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = []
      for (let i = 0; i < 50; i++) {
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

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}





// Interactive 3D Card Component
const Interactive3DCard = ({ 
  icon: Icon, 
  title, 
  description, 
  gradient, 
  delay = 0 
}: { 
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  gradient: string
  delay?: number
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    mouseX.set((e.clientX - centerX) / (rect.width / 2))
    mouseY.set((e.clientY - centerY) / (rect.height / 2))
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      style={{
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
      }}
    >
      <motion.div
        className="relative p-6 bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
        style={{ transform: 'translateZ(20px)' }}
        whileHover={{ 
          scale: 1.05,
          y: -10
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Unique Border Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(45deg, ${gradient} 0%, transparent 50%, ${gradient} 100%)`,
            filter: 'blur(1px)',
          }}
        />
        
        {/* Animated background */}
        <motion.div
          className={`absolute inset-0 ${gradient} opacity-20`}
          animate={{ 
            scale: isHovered ? 1.2 : 1,
            rotate: isHovered ? 180 : 0
          }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Unique Pattern Overlay for Each Card */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 90, 180]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-full h-full bg-gradient-to-br from-white/40 to-transparent" />
        </motion.div>
        
        {/* Icon with Enhanced Hover Effects */}
        <motion.div
          className="relative z-10 w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200"
          animate={{ 
            y: isHovered ? -5 : 0,
            scale: isHovered ? 1.1 : 1
          }}
          whileHover={{ 
            scale: 1.1,
            rotate: 5,
            y: -2
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <Icon className="w-8 h-8 text-gray-700" />
        </motion.div>
        
        {/* Content with Enhanced Hover Effects */}
        <motion.div 
          className="relative z-10 text-center"
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </motion.div>
        
        {/* Enhanced Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${gradient} 0%, transparent 70%)`,
            filter: 'blur(20px)',
          }}
        />
      </motion.div>
    </motion.div>
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
  const springConfig = { stiffness: 300, damping: 20 }
  const scale = useSpring(isHovered ? 1.2 : 1, springConfig)
  const rotation = useSpring(isHovered ? 15 : 0, springConfig)

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
  const springConfig = { stiffness: 300, damping: 20 }
  const scale = useSpring(isHovered ? 1.15 : 1, springConfig)
  const rotationZ = useSpring(isHovered ? 5 : 0, springConfig)

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

  return (
    <>

      
      <section
        id="home"
        className={cn(
          'relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50',
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
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100/80 to-purple-100/80 rounded-full blur-3xl opacity-60"
        />
        <motion.div
          style={{ y: y2, animationDelay: '2s' }}
          variants={floatingVariants}
          animate="float"
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-100/80 to-blue-100/80 rounded-full blur-3xl opacity-60"
        />
        <motion.div 
          style={{ opacity }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-100/60 to-pink-100/60 rounded-full blur-3xl animate-pulse"
        />
        
        {/* Additional floating geometric shapes */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-blue-200/40 rounded-full"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 0.8, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/4 right-1/4 w-24 h-24 border-2 border-purple-200/40 transform rotate-45"
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
        className="absolute top-1/4 left-10 w-4 h-4 bg-blue-400 rounded-full animate-pulse shadow-lg"
      />
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [360, 180, 0],
          scale: [1, 0.8, 1]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/3 right-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse shadow-lg"
      />
      <motion.div
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 90, 180],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/4 left-20 w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg"
      />
      
      {/* Additional floating sparkles */}
      <motion.div
        animate={{ 
          y: [0, -30, 0],
          x: [0, 10, 0],
          rotate: [0, 360]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute top-1/2 right-1/4"
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
        className="absolute bottom-1/3 left-1/3"
      >
        <ZapIcon className="w-5 h-5 text-orange-400 animate-pulse" />
      </motion.div>

      

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Content with Enhanced Animations */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          {/* Enhanced Heading with Animated Gradient Text */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 relative">
              <motion.span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 relative z-10"
                whileHover={{ scale: 1.02 }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                AI Automation
              </motion.span>
              <br />
              <motion.span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-gray-800 relative z-10"
                whileHover={{ scale: 1.02 }}
                animate={{
                  backgroundPosition: ['100% 50%', '0% 50%', '100% 50%'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                Made Simple
              </motion.span>
              
              {/* 3D Text Shadow Effect */}
              <div className="absolute inset-0 text-5xl md:text-7xl font-bold text-gray-300/30 transform translate-x-1 translate-y-1 -z-10">
                <span>AI Automation</span>
                <br />
                <span>Made Simple</span>
              </div>
            </h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Transform your business with cutting-edge AI automation and no-code tools. 
              From Make.com to Zapier, we make complex workflows effortless and fun.
            </motion.p>
          </motion.div>

          {/* Enhanced CTA Buttons with Advanced Hover Effects */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <motion.button 
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-lg hover:shadow-xl relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Start Automating</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
              
              {/* Animated background overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
            
            <motion.button 
              className="px-8 py-4 border-2 border-gray-800 text-gray-800 rounded-lg font-semibold text-lg hover:bg-gray-800 hover:text-white transition-all duration-300 flex items-center space-x-2 hover:shadow-lg relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Watch Demo</span>
              
              {/* Hover background animation */}
              <motion.div
                className="absolute inset-0 bg-gray-800"
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
          className="mt-16"
        >
          <p className="text-gray-500 mb-6">Trusted by leading companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['Make.com', 'Zapier', 'ManyChat', 'Zoho', 'HubSpot'].map((company, index) => (
              <motion.div
                key={company}
                className="text-gray-700 font-bold text-lg cursor-pointer hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ duration: 0.5, delay: 2 + index * 0.1 }}
              >
                {company}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>


    </section>

    {/* Features Section - All 6 Cards */}
    <section className="py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Nexus Bloom</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the powerful features that make us the leading AI automation platform
          </p>
        </motion.div>

        {/* Interactive 3D Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20"
        >
          <Interactive3DCard
            icon={Cpu}
            title="Smart AI Engine"
            description="Advanced machine learning algorithms that adapt to your business needs"
            gradient="bg-gradient-to-br from-indigo-500 to-blue-500"
            delay={0.6}
          />
          <Interactive3DCard
            icon={Rocket}
            title="Lightning Fast"
            description="Deploy automations in seconds with our optimized infrastructure"
            gradient="bg-gradient-to-br from-emerald-500 to-teal-500"
            delay={0.8}
          />
          <Interactive3DCard
            icon={Brain}
            title="Intelligent Workflows"
            description="AI-powered decision making that learns and improves over time"
            gradient="bg-gradient-to-br from-violet-500 to-purple-500"
            delay={1.0}
          />
          <Interactive3DCard
            icon={Zap}
            title="Powerful Automation"
            description="Streamline complex processes with intelligent automation tools"
            gradient="bg-gradient-to-br from-orange-500 to-red-500"
            delay={1.2}
          />
          <Interactive3DCard
            icon={Shield}
            title="Enterprise Security"
            description="Bank-grade security and compliance for your business operations"
            gradient="bg-gradient-to-br from-green-500 to-emerald-500"
            delay={1.4}
          />
          <Interactive3DCard
            icon={Sparkles}
            title="Innovation Hub"
            description="Cutting-edge features and continuous platform improvements"
            gradient="bg-gradient-to-br from-pink-500 to-rose-500"
            delay={1.6}
          />
        </motion.div>

        {/* Enhanced Features Grid with Glassmorphism */}
        {/* Removed the second features grid that rendered the FEATURES array */}
      </div>
    </section>
    </>
  )
} 