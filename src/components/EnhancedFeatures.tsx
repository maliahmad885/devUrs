'use client'

import { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { 
  Zap, 
  Shield, 
  Globe, 
  Brain, 
  Rocket, 
  Lock, 
  TrendingUp, 
  Users,
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
    icon: Zap,
    title: "AI-Powered Automation",
    description: "Intelligent workflows that learn from your business patterns and continuously optimize performance.",
    benefits: ["Smart decision making", "Predictive analytics", "Continuous learning", "Adaptive workflows"],
    color: "from-orange-400 to-red-500",
    gradient: "bg-gradient-to-br from-orange-400 to-red-500",
    category: "AI & ML"
  },
  {
    id: 2,
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security with SOC 2 compliance, end-to-end encryption, and advanced threat protection.",
    benefits: ["SOC 2 certified", "HIPAA ready", "GDPR compliant", "24/7 monitoring"],
    color: "from-green-400 to-emerald-600",
    gradient: "bg-gradient-to-br from-green-400 to-emerald-600",
    category: "Security"
  },
  {
    id: 3,
    icon: Globe,
    title: "Global Integration Hub",
    description: "Connect with 500+ applications and services from a single, unified platform.",
    benefits: ["500+ integrations", "Real-time sync", "Custom connectors", "API-first approach"],
    color: "from-blue-400 to-indigo-600",
    gradient: "bg-gradient-to-br from-blue-400 to-indigo-600",
    category: "Integration"
  },
  {
    id: 4,
    icon: Brain,
    title: "No-Code Workflow Builder",
    description: "Create complex automations with our intuitive drag-and-drop interface. No coding required.",
    benefits: ["Visual builder", "Drag & drop", "Templates library", "Custom logic"],
    color: "from-purple-400 to-violet-600",
    gradient: "bg-gradient-to-br from-purple-400 to-violet-600",
    category: "No-Code"
  },
  {
    id: 5,
    icon: Rocket,
    title: "Lightning Fast Performance",
    description: "Optimized for speed with sub-second response times and 99.9% uptime guarantee.",
    benefits: ["Sub-second response", "99.9% uptime", "Auto-scaling", "Global CDN"],
    color: "from-yellow-400 to-orange-500",
    gradient: "bg-gradient-to-br from-yellow-400 to-orange-500",
    category: "Performance"
  },
  {
    id: 6,
    icon: Lock,
    title: "Advanced Access Control",
    description: "Role-based permissions, SSO integration, and granular access management for enterprise teams.",
    benefits: ["Role-based access", "SSO integration", "Audit trails", "Multi-factor auth"],
    color: "from-red-400 to-pink-600",
    gradient: "bg-gradient-to-br from-red-400 to-pink-600",
    category: "Access Control"
  },
  {
    id: 7,
    icon: TrendingUp,
    title: "Real-Time Analytics",
    description: "Comprehensive dashboards with real-time insights into your automation performance and ROI.",
    benefits: ["Real-time data", "Custom dashboards", "Performance metrics", "ROI tracking"],
    color: "from-teal-400 to-cyan-600",
    gradient: "bg-gradient-to-br from-teal-400 to-cyan-600",
    category: "Analytics"
  },
  {
    id: 8,
    icon: Users,
    title: "Team Collaboration",
    description: "Built-in collaboration tools for teams to work together on automation projects.",
    benefits: ["Team workspaces", "Version control", "Comments & feedback", "Approval workflows"],
    color: "from-indigo-400 to-purple-600",
    gradient: "bg-gradient-to-br from-indigo-400 to-purple-600",
    category: "Collaboration"
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
            className="relative z-10"
            initial={false}
            animate={{ height: isExpanded ? "auto" : "0" }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-2 mb-4">
              {feature.benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-2 text-sm text-gray-600"
                  initial={{ opacity: 0, x: -20 }}
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
            onClick={() => setIsExpanded(!isExpanded)}
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
            className={`absolute inset-0 ${feature.gradient} rounded-2xl blur-xl opacity-20`}
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
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-3 text-gray-900 mb-6">
            Powerful Features That Drive Results
          </h2>
          <p className="text-body-large text-gray-600 max-w-3xl mx-auto">
            Discover the cutting-edge capabilities that make Nexus Bloom the most advanced automation platform
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
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
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

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Experience the Future of Automation?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of businesses already transforming their operations with Nexus Bloom
            </p>
            <motion.button
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Free Trial
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 