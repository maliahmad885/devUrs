'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Star, Quote, TrendingUp, Users, Zap, Brain } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
  improvement: string
  category: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CEO",
    company: "TechFlow Solutions",
    content: "FlowMind's neural network automation transformed our operations completely. We've seen a 300% increase in efficiency and our AI agents handle 95% of customer interactions flawlessly.",
    rating: 5,
    avatar: "SC",
    improvement: "300% efficiency boost",
    category: "AI Automation"
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "CTO",
    company: "InnovateCorp",
    content: "The predictive analytics engine is incredible. It predicted market trends 3 months ahead and helped us optimize our sales strategy. Our revenue increased by 150% in just 6 months.",
    rating: 5,
    avatar: "MR",
    improvement: "150% revenue increase",
    category: "Predictive Analytics"
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Head of Operations",
    company: "Global Dynamics",
    content: "Quantum-speed processing is a game-changer. Our workflows now run 10x faster, and the self-healing automation has eliminated 99% of our manual intervention needs.",
    rating: 5,
    avatar: "EW",
    improvement: "10x faster processing",
    category: "Performance"
  },
  {
    id: 4,
    name: "David Kim",
    role: "VP Marketing",
    company: "GrowthTech",
    content: "The AI content generation saved us 40 hours per week. Our content quality improved dramatically, and our engagement rates skyrocketed by 250%. It's like having a genius writer on our team.",
    rating: 5,
    avatar: "DK",
    improvement: "250% engagement boost",
    category: "Content AI"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Founder",
    company: "StartupVenture",
    content: "Voice intelligence changed everything. Our AI agents handle complex customer queries with human-like understanding. Customer satisfaction is at an all-time high of 98%.",
    rating: 5,
    avatar: "LT",
    improvement: "98% satisfaction rate",
    category: "Voice Intelligence"
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Director of Sales",
    company: "Enterprise Solutions",
    content: "The omnichannel AI hub connected our entire tech stack seamlessly. Lead qualification accuracy improved by 400%, and our sales team can focus on closing deals instead of data entry.",
    rating: 5,
    avatar: "JW",
    improvement: "400% accuracy improvement",
    category: "Integration"
  }
]

const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-200/50 overflow-hidden"
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quote Icon */}
        <motion.div
          className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center opacity-20"
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <Quote className="w-4 h-4 text-white" />
        </motion.div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        {/* Content */}
        <p className="text-gray-700 leading-relaxed mb-6 relative z-10">
          "{testimonial.content}"
        </p>

        {/* Improvement Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
          <TrendingUp className="w-4 h-4" />
          {testimonial.improvement}
        </div>

        {/* Author Info */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {testimonial.avatar}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
            <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-4 right-4">
          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
            {testimonial.category}
          </span>
        </div>

        {/* Hover Glow Effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

const StatsSection = () => {
  const stats = [
    { number: "500+", label: "Companies Transformed", icon: Users },
    { number: "99.7%", label: "AI Accuracy Rate", icon: Brain },
    { number: "40%", label: "Average Efficiency Gain", icon: TrendingUp },
    { number: "24/7", label: "AI Operations", icon: Zap }
  ]

  return (
    <motion.div
      className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
            <stat.icon className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default function AITestimonials() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  
  const categories = ["All", ...Array.from(new Set(testimonials.map(t => t.category)))]
  const filteredTestimonials = selectedCategory === "All" 
    ? testimonials 
    : testimonials.filter(t => t.category === selectedCategory)

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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Trusted by <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">AI Innovators</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See how industry leaders are revolutionizing their operations with our cutting-edge AI technology stack
          </p>
        </motion.div>

        {/* Stats Section */}
        <StatsSection />

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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Join the AI Revolution?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your business with the same cutting-edge AI technology that's helping industry leaders achieve unprecedented results.
          </p>
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your AI Transformation
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

