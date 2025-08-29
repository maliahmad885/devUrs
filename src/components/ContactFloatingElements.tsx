'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Heart, Star, Zap } from 'lucide-react'

export default function ContactFloatingElements() {
  const floatingElements = [
    {
      icon: Mail,
      position: { x: '10%', y: '20%' },
      delay: 0,
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Phone,
      position: { x: '85%', y: '30%' },
      delay: 0.5,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: MapPin,
      position: { x: '15%', y: '70%' },
      delay: 1,
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Send,
      position: { x: '80%', y: '75%' },
      delay: 1.5,
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Heart,
      position: { x: '50%', y: '15%' },
      delay: 2,
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Star,
      position: { x: '5%', y: '50%' },
      delay: 2.5,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Zap,
      position: { x: '90%', y: '50%' },
      delay: 3,
      color: 'from-indigo-500 to-purple-500'
    }
  ]

  return (
    <div className="fixed inset-0 pointer-events-none">
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: element.position.x,
            top: element.position.y,
          }}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ 
            opacity: [0, 1, 0.8, 1],
            scale: [0, 1.2, 1, 1.1],
            rotate: [-180, 0, 10, 0]
          }}
          transition={{
            duration: 2,
            delay: element.delay,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut"
          }}
        >
          <motion.div
            className={`w-16 h-16 bg-gradient-to-r ${element.color} rounded-2xl flex items-center justify-center shadow-2xl`}
            whileHover={{ 
              scale: 1.2,
              rotate: 360,
              transition: { duration: 0.3 }
            }}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <element.icon className="w-8 h-8 text-white" />
          </motion.div>
          
          {/* Glow effect */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${element.color} rounded-2xl blur-xl opacity-30`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      ))}

      {/* Floating text elements */}
      <motion.div
        className="absolute top-1/4 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div
          className="text-white/20 text-sm font-mono"
          animate={{
            opacity: [0.2, 0.5, 0.2],
            y: [0, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          &lt;contact /&gt;
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-1/4"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <motion.div
          className="text-white/20 text-sm font-mono"
          animate={{
            opacity: [0.2, 0.5, 0.2],
            x: [0, 5, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {`{ message: "Hello!" }`}
        </motion.div>
      </motion.div>

      {/* Corner decorations */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 border border-white/10 rounded-full"
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute bottom-10 right-10 w-16 h-16 border border-white/10 rounded-full"
        animate={{
          rotate: -360,
          scale: [1, 0.9, 1]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  )
} 