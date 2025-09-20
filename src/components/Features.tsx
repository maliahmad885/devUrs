'use client'

import { motion } from 'framer-motion'
import { Cpu, Rocket, Brain, Zap, Shield, Sparkles } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
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
  const [isMobile, setIsMobile] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    mouseX.set((e.clientX - centerX) / (rect.width / 2))
    mouseY.set((e.clientY - centerY) / (rect.height / 2))
  }

  const handleMouseLeave = () => {
    if (isMobile) return
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer perspective-1000 h-full flex flex-col"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      style={{
        transformStyle: 'preserve-3d',
        // Disable 3D transforms on mobile for better performance
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
      }}
    >
      <motion.div
        className="relative p-4 sm:p-6 bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden h-64 flex flex-col"
        style={{ transform: 'translateZ(20px)', minHeight: '16rem' }}
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
          className="relative z-10 w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0"
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
          <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
        </motion.div>
        
        {/* Content with Enhanced Hover Effects */}
        <motion.div 
          className="relative z-10 text-center flex flex-col flex-1 justify-start"
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 flex-shrink-0">{title}</h3>
          <p className="text-gray-600 text-xs sm:text-sm flex-1 flex items-start justify-center">{description}</p>
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
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F85B5D] to-[#7661FB]">AI Solutions</span>?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
            Discover the powerful automation capabilities that make us the leading AI integration platform
          </p>
        </motion.div>

        {/* Interactive 3D Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto items-stretch"
        >
          <Interactive3DCard
            icon={Cpu}
            title="AI Voice Agents"
            description="24/7 inbound & outbound voice systems that qualify leads and handle support"
            gradient="bg-gradient-to-br from-[#7661FB] to-[#DB4DBA]"
            delay={0.6}
          />
          <Interactive3DCard
            icon={Rocket}
            title="n8n & Make.com"
            description="Certified expert building complex workflows and integrations across platforms"
            gradient="bg-gradient-to-br from-[#FCA207] to-[#F85B5D]"
            delay={0.8}
          />
          <Interactive3DCard
            icon={Brain}
            title="Smart CRM Pipelines"
            description="AI-powered workflows for HubSpot, GHL, Salesforce, and Airtable"
            gradient="bg-gradient-to-br from-[#F85B5D] to-[#7661FB]"
            delay={1.0}
          />
          <Interactive3DCard
            icon={Zap}
            title="WhatsApp & Slack Bots"
            description="24/7 sales and support automation across messaging platforms"
            gradient="bg-gradient-to-br from-[#DB4DBA] to-[#FCA207]"
            delay={1.2}
          />
          <Interactive3DCard
            icon={Shield}
            title="Lead Monitoring"
            description="Automated lead generation from IG, LinkedIn, Reddit, and websites"
            gradient="bg-gradient-to-br from-[#7661FB] to-[#F85B5D]"
            delay={1.4}
          />
          <Interactive3DCard
            icon={Sparkles}
            title="Content Automation"
            description="Auto blogs, YouTube Shorts, and image workflows with AI"
            gradient="bg-gradient-to-br from-[#F85B5D] to-[#DB4DBA]"
            delay={1.6}
          />
        </motion.div>
      </div>
    </section>
  )
} 