'use client'

import { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { 
  Zap, 
  Brain, 
  Rocket, 
  Lock, 
  Code,
  Database,
  Cloud,
  BarChart3
} from 'lucide-react'

interface Feature {
  id: number
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  benefits: string[]
  color: string
  gradient: string
  category: string
}

const features: Feature[] = [
  {
    id: 1,
    icon: Code,
    title: "Full-Stack Development",
    description: "End-to-end web platforms with Ruby on Rails, React, Next.js, and Node.js.",
    benefits: ["Ruby on Rails", "React & Next.js", "Node.js", "API development"],
    color: "from-orange-400 to-red-500",
    gradient: "bg-gradient-to-br from-orange-400 to-red-500",
    category: "Development"
  },
  {
    id: 2,
    icon: Zap,
    title: "Workflow Automation",
    description: "Certified automation work with n8n, Make, and Zapier — 200+ workflows shipped.",
    benefits: ["n8n", "Make", "Zapier", "Process automation"],
    color: "from-green-400 to-emerald-600",
    gradient: "bg-gradient-to-br from-green-400 to-emerald-600",
    category: "Automation"
  },
  {
    id: 3,
    icon: Brain,
    title: "AI Agent Development",
    description: "Building intelligent agents with LangChain and LangGraph for real business workflows.",
    benefits: ["LangChain", "LangGraph", "LLM workflows", "Agent tooling"],
    color: "from-blue-400 to-indigo-600",
    gradient: "bg-gradient-to-br from-blue-400 to-indigo-600",
    category: "AI"
  },
  {
    id: 4,
    icon: Database,
    title: "Integrations & Data",
    description: "Payments, CRM, accounting, and commerce integrations wired into production apps.",
    benefits: ["Stripe", "Xero", "Brevo", "Shopify"],
    color: "from-purple-400 to-violet-600",
    gradient: "bg-gradient-to-br from-purple-400 to-violet-600",
    category: "Integrations"
  },
  {
    id: 5,
    icon: Rocket,
    title: "Background Jobs & APIs",
    description: "Reliable Sidekiq jobs, REST APIs, and async processing for scalable platforms.",
    benefits: ["Sidekiq", "REST APIs", "Job queues", "Data sync"],
    color: "from-yellow-400 to-orange-500",
    gradient: "bg-gradient-to-br from-yellow-400 to-orange-500",
    category: "Backend"
  },
  {
    id: 6,
    icon: Lock,
    title: "Auth & Access Control",
    description: "Secure authentication patterns with OAuth, JWT, and role-based access where projects need them.",
    benefits: ["OAuth", "JWT", "Role-based access", "Session security"],
    color: "from-red-400 to-pink-600",
    gradient: "bg-gradient-to-br from-red-400 to-pink-600",
    category: "Security"
  },
  {
    id: 7,
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "AWS deployment, CI/CD pipelines, and NGINX — including solo backend/DevOps ownership.",
    benefits: ["AWS", "CI/CD", "NGINX", "Deployments"],
    color: "from-indigo-400 to-purple-600",
    gradient: "bg-gradient-to-br from-indigo-400 to-purple-600",
    category: "Cloud"
  },
  {
    id: 8,
    icon: BarChart3,
    title: "Platform Migrations",
    description: "Framework migrations and modernization — including Django-to-Rails and React frontend work.",
    benefits: ["Rails migrations", "React frontends", "Legacy modernization", "Refactoring"],
    color: "from-teal-400 to-cyan-600",
    gradient: "bg-gradient-to-br from-teal-400 to-cyan-600",
    category: "Migrations"
  }
]

// Interactive Feature Card Component
const FeatureCard = ({ feature, index }: { feature: Feature; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15])
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15])
  
  const springConfig = { stiffness: 300, damping: 30 }
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)
  
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(event.clientX - centerX)
    mouseY.set(event.clientY - centerY)
  }
  
  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative h-full cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          rotateX: springRotateX,
          rotateY: springRotateY,
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Main Card */}
        <motion.div
          className="glass-card rounded-2xl p-6 h-full relative overflow-hidden"
          animate={{
            boxShadow: isHovered 
              ? "0 25px 50px rgba(139, 92, 246, 0.3)" 
              : "0 8px 32px rgba(0, 0, 0, 0.12)"
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Background Gradient */}
          <div className={`absolute inset-0 ${feature.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
          
          {/* Header */}
          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              className={`w-16 h-16 ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <feature.icon className="w-8 h-8 text-white" />
            </motion.div>
            
            {/* Category Badge */}
            <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              {feature.category}
            </span>
            
            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
              {feature.title}
            </h3>
            
            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-4">
              {feature.description}
            </p>
          </div>
          
          {/* Benefits List */}
          <motion.div
            className="relative z-10 overflow-hidden"
            initial={false}
            animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-2 mb-4">
              {feature.benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-2 text-sm text-gray-600"
                  initial={false}
                  animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -20 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                >
                  <div className={`w-2 h-2 ${feature.gradient} rounded-full`} />
                  {benefit}
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Expand/Collapse Button */}
          <motion.button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setIsExpanded(!isExpanded)
            }}
            className="relative z-10 w-full text-center text-purple-600 font-semibold text-sm hover:text-purple-700 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isExpanded ? "Show Less" : "Learn More"}
          </motion.button>
        </motion.div>
        
        {/* Hover Glow Effect */}
        {isHovered && (
          <motion.div
            className={`absolute inset-0 ${feature.gradient} rounded-2xl blur-xl opacity-20 pointer-events-none`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

export default function EnhancedFeatures() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  
  const categories = ["All", ...Array.from(new Set(features.map(f => f.category)))]
  const filteredFeatures = selectedCategory === "All" 
    ? features 
    : features.filter(f => f.category === selectedCategory)

  return (
    <section className="py-20 bg-gradient-to-br from-[#3B82F6]/5 via-white to-[#10B981]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-900">Capabilities That </span>
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#10B981] bg-clip-text text-transparent">Ship</span>
          </h2>
          <p className="text-body-large text-gray-600 max-w-3xl mx-auto">
            Practical strengths from 5+ years of building platforms, automations, and integrations in production.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-[#3B82F6] to-[#10B981] text-white shadow-lg"
                  : "bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 hover:bg-white hover:shadow-md"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFeatures.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>


      </div>
    </section>
  )
} 