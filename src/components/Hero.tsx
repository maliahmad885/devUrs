'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Play, Bot, Code, BarChart3 } from 'lucide-react'
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
    color: 'from-neon-blue to-neon-green',
  },
  {
    icon: Code,
    text: 'No-Code Tools',
    description: 'Build powerful automations without coding',
    color: 'from-neon-pink to-neon-purple',
  },
  {
    icon: BarChart3,
    text: 'Analytics',
    description: 'Deep insights into your automation performance',
    color: 'from-neon-green to-neon-yellow',
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
      ease: 'easeInOut',
    },
  },
}

export default function Hero({ className }: HeroProps) {
  return (
    <section
      id="home"
      className={cn(
        'relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient',
        className
      )}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          variants={floatingVariants}
          animate="float"
          className="absolute -top-40 -right-40 w-80 h-80 bg-neon-blue/20 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="float"
          style={{ animationDelay: '2s' }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-neon-pink/20 rounded-full blur-3xl"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-pulse-slow" />
      </div>

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
              <span className="bg-gradient-to-r from-neon-blue via-neon-pink to-neon-green bg-clip-text text-transparent">
                AI Automation
              </span>
              <br />
              <span className="text-white">Made Simple</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Transform your business with cutting-edge AI automation and no-code tools. 
              From Integromat to Zapier, we make complex workflows effortless.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="group px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-neon-blue/50 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
              <span>Start Automating</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button className="px-8 py-4 border-2 border-neon-blue text-neon-blue rounded-lg font-semibold text-lg hover:bg-neon-blue hover:text-white transition-all duration-300 flex items-center space-x-2">
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
                <div className="relative p-6 bg-imperial-primer/50 backdrop-blur-sm rounded-xl border border-neon-blue/30 hover:border-neon-blue/60 transition-all duration-300 hover:transform hover:scale-105">
                  <div
                    className={cn(
                      'w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-r flex items-center justify-center group-hover:animate-glow transition-all duration-300',
                      feature.color
                    )}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.text}
                  </h3>
                  <p className="text-gray-400 text-sm">
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
          <p className="text-gray-400 mb-6">Trusted by leading companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-neon-blue font-bold text-lg">Integromat</div>
            <div className="text-neon-pink font-bold text-lg">Make.com</div>
            <div className="text-neon-green font-bold text-lg">Zapier</div>
            <div className="text-neon-purple font-bold text-lg">ManyChat</div>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-10 w-4 h-4 bg-neon-blue rounded-full animate-pulse"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/3 right-20 w-3 h-3 bg-neon-pink rounded-full animate-pulse"
      />
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/4 left-20 w-2 h-2 bg-neon-green rounded-full animate-pulse"
      />
    </section>
  )
} 