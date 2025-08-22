'use client'

import { motion } from 'framer-motion'
import { Cpu, Rocket, Brain, Zap, Shield, Sparkles } from 'lucide-react'
import { useState, useRef } from 'react'
import { useMotionValue, useSpring, useTransform } from 'framer-motion'

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
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
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

export default function Features() {
  return (
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
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Nexus Bloom</span>?
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
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
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
      </div>
    </section>
  )
} 