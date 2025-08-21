'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Play, Bot, Code, BarChart3, MessageCircle, Zap, Settings, Database, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

// Types
interface Feature {
  icon: React.ComponentType<{ className?: string }>
  text: string
  description: string
  color: string
}

interface HeroProps {
  className?: string
}

// Constants
const FEATURES: Feature[] = [
  {
    icon: Bot,
    text: 'AI Automation',
    description: 'Intelligent workflows that adapt and learn',
    color: 'bg-gradient-to-br from-blue-100 to-purple-100',
  },
  {
    icon: Code,
    text: 'No-Code Tools',
    description: 'Build powerful automations without coding',
    color: 'bg-gradient-to-br from-green-100 to-blue-100',
  },
  {
    icon: BarChart3,
    text: 'Analytics',
    description: 'Deep insights into your automation performance',
    color: 'bg-gradient-to-br from-orange-100 to-red-100',
  },
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

// Animated Mascot Components
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
}) => (
  <motion.div
    className={cn(
      'absolute flex flex-col items-center',
      position,
      left
    )}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay }}
  >
    <motion.div
      className={cn(
        'w-16 h-16 rounded-full flex items-center justify-center mb-2 shadow-lg',
        color
      )}
      variants={floatingVariants}
      animate="float"
      style={{ animationDelay: `${delay}s` }}
    >
      <Icon className="w-8 h-8 text-white" />
    </motion.div>
    <motion.div
      className="text-xs font-medium text-gray-600 bg-white px-2 py-1 rounded-full shadow-sm"
      variants={waveVariants}
      animate="wave"
      style={{ animationDelay: `${delay + 1}s` }}
    >
      {name}
    </motion.div>
  </motion.div>
)

const ChatbotRobot = ({ 
  position = 'bottom-1/4',
  left = 'right-20',
  delay = 0
}: { 
  position?: string
  left?: string
  delay?: number
}) => (
  <motion.div
    className={cn(
      'absolute flex flex-col items-center',
      position,
      left
    )}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay }}
  >
    {/* Robot Body */}
    <motion.div
      className="w-20 h-24 bg-gradient-to-b from-blue-400 to-blue-600 rounded-2xl flex flex-col items-center justify-center shadow-lg relative"
      variants={walkingVariants}
      animate="walk"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Robot Head */}
      <div className="w-16 h-16 bg-gradient-to-b from-blue-300 to-blue-500 rounded-xl mb-2 flex items-center justify-center relative">
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse absolute right-2" />
      </div>
      {/* Robot Arms */}
      <div className="flex justify-between w-full px-2">
        <motion.div
          className="w-2 h-8 bg-blue-500 rounded-full"
          variants={waveVariants}
          animate="wave"
          style={{ animationDelay: `${delay + 0.5}s` }}
        />
        <motion.div
          className="w-2 h-8 bg-blue-500 rounded-full"
          variants={waveVariants}
          animate="wave"
          style={{ animationDelay: `${delay + 1}s` }}
        />
      </div>
    </motion.div>
    
    {/* Chat Bubble */}
    <motion.div
      className="absolute -top-16 -left-24 bg-white rounded-2xl px-3 py-2 shadow-lg border border-gray-200"
      variants={chatBubbleVariants}
      animate="chat"
      style={{ animationDelay: `${delay + 2}s` }}
    >
      <div className="text-xs text-gray-700 font-medium">Hello! 👋</div>
      <div className="text-xs text-gray-500">Let's automate!</div>
      <div className="absolute bottom-0 right-0 w-3 h-3 bg-white border-r border-b border-gray-200 transform rotate-45 translate-x-1 translate-y-1" />
    </motion.div>
    
    <div className="text-xs font-medium text-gray-600 bg-white px-2 py-1 rounded-full shadow-sm mt-2">
      AI Bot
    </div>
  </motion.div>
)

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
}) => (
  <motion.div
    className={cn(
      'absolute flex flex-col items-center',
      position,
      left
    )}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay }}
  >
    <motion.div
      className={cn(
        'w-14 h-14 rounded-full flex items-center justify-center shadow-lg',
        color
      )}
      variants={walkingVariants}
      animate="walk"
      style={{ animationDelay: `${delay}s` }}
    >
      <Icon className="w-7 h-7 text-white" />
    </motion.div>
    <motion.div
      className="text-xs font-medium text-gray-600 bg-white px-2 py-1 rounded-full shadow-sm"
      variants={waveVariants}
      animate="wave"
      style={{ animationDelay: `${delay + 1}s` }}
    >
      {name}
    </motion.div>
  </motion.div>
)

export default function Hero({ className }: HeroProps) {
  return (
    <section
      id="home"
      className={cn(
        'relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50',
        className
      )}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          variants={floatingVariants}
          animate="float"
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-60"
        />
        <motion.div
          variants={floatingVariants}
          animate="float"
          style={{ animationDelay: '2s' }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-100 to-blue-100 rounded-full blur-3xl opacity-60"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl animate-pulse opacity-40" />
      </div>

      {/* Animated Mascots */}
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

      {/* Walking Mascots */}
      <WalkingMascot 
        icon={Code} 
        name="No-Code" 
        color="bg-gradient-to-br from-indigo-400 to-purple-600"
        position="bottom-1/3"
        left="left-1/4"
        delay={3}
      />
      
      <WalkingMascot 
        icon={BarChart3} 
        name="Analytics" 
        color="bg-gradient-to-br from-teal-400 to-cyan-600"
        position="bottom-2/5"
        left="right-1/3"
        delay={3.5}
      />

      {/* Chatbot Robots */}
      <ChatbotRobot 
        position="bottom-1/4"
        left="right-20"
        delay={4}
      />
      
      <ChatbotRobot 
        position="top-2/5"
        left="left-1/3"
        delay={4.5}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          {/* Heading */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600">
                AI Automation
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-gray-800">
                Made Simple
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transform your business with cutting-edge AI automation and no-code tools. 
              From Make.com to Zapier, we make complex workflows effortless and fun.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-lg hover:shadow-xl">
              <span>Start Automating</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button className="px-8 py-4 border-2 border-gray-800 text-gray-800 rounded-lg font-semibold text-lg hover:bg-gray-800 hover:text-white transition-all duration-300 flex items-center space-x-2 hover:shadow-lg">
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </button>
          </motion.div>

          {/* Features Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="group relative"
              >
                <div className="relative p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:transform hover:scale-105 shadow-sm hover:shadow-md">
                  <div
                    className={cn(
                      'w-16 h-16 mx-auto mb-4 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300',
                      feature.color
                    )}
                  >
                    <feature.icon className="w-8 h-8 text-gray-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {feature.text}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <p className="text-gray-500 mb-6">Trusted by leading companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-gray-700 font-bold text-lg">Make.com</div>
            <div className="text-gray-700 font-bold text-lg">Zapier</div>
            <div className="text-gray-700 font-bold text-lg">ManyChat</div>
            <div className="text-gray-700 font-bold text-lg">Zoho</div>
            <div className="text-gray-700 font-bold text-lg">HubSpot</div>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-10 w-4 h-4 bg-blue-400 rounded-full animate-pulse"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/3 right-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse"
      />
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/4 left-20 w-2 h-2 bg-green-400 rounded-full animate-pulse"
      />
    </section>
  )
} 