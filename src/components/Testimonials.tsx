'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote, Play, Pause } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  avatar: string
  content: string
  rating: number
  category: string
  results: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CTO",
    company: "TechFlow Solutions",
    avatar: "👩‍💼",
    content: "Nexus Bloom transformed our workflow automation. We reduced manual processes by 85% and our team productivity increased by 300%. The no-code approach made it accessible to everyone.",
    rating: 5,
    category: "Enterprise",
    results: "85% time savings"
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Operations Director",
    company: "Global Retail Corp",
    avatar: "👨‍💼",
    content: "The integration capabilities are incredible. We connected 20+ systems in just 2 weeks. Our order processing time went from 48 hours to 2 hours. Game changer!",
    rating: 5,
    category: "Retail",
    results: "96% faster processing"
  },
  {
    id: 3,
    name: "Dr. Emily Watson",
    role: "Chief Medical Officer",
    company: "HealthTech Innovations",
    avatar: "👩‍⚕️",
    content: "As a healthcare provider, security was our top concern. Nexus Bloom exceeded our expectations with SOC 2 compliance and HIPAA-ready features. Patient data is safer than ever.",
    rating: 5,
    category: "Healthcare",
    results: "100% compliance"
  },
  {
    id: 4,
    name: "Alex Thompson",
    role: "Founder",
    company: "StartupXYZ",
    avatar: "👨‍💻",
    content: "Started with just 3 team members and scaled to 50+ without changing our automation setup. The platform grows with your business. Absolutely brilliant!",
    rating: 5,
    category: "Startup",
    results: "16x team growth"
  },
  {
    id: 5,
    name: "Lisa Park",
    role: "Marketing Director",
    company: "Growth Marketing Pro",
    avatar: "👩‍🎨",
    content: "Our marketing campaigns are now fully automated. Lead nurturing, email sequences, and analytics all work seamlessly together. ROI increased by 400%.",
    rating: 5,
    category: "Marketing",
    results: "400% ROI increase"
  }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [direction, setDirection] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const autoplayRef = useRef<NodeJS.Timeout>()

  // Autoplay functionality
  useEffect(() => {
    if (isPlaying) {
      autoplayRef.current = setInterval(() => {
        setDirection(1)
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, 5000)
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [isPlaying])

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrevious = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleDragEnd = (event: any, info: PanInfo) => {
    setIsDragging(false)
    const swipeThreshold = 50

    if (info.offset.x > swipeThreshold) {
      handlePrevious()
    } else if (info.offset.x < -swipeThreshold) {
      handleNext()
    }
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
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
            What Our Customers Say
          </h2>
          <p className="text-body-large text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied customers who have transformed their businesses with Nexus Bloom
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: direction * 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -direction * 100, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative"
          >
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
              whileHover={{ scale: 1.02 }}
              className="glass-card rounded-3xl p-8 sm:p-12 cursor-grab active:cursor-grabbing"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-8 text-6xl text-purple-200 opacity-30">
                <Quote />
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-xl sm:text-2xl text-gray-700 mb-8 leading-relaxed italic">
                  "{currentTestimonial.content}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{currentTestimonial.avatar}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">
                        {currentTestimonial.name}
                      </h4>
                      <p className="text-gray-600">
                        {currentTestimonial.role} at {currentTestimonial.company}
                      </p>
                    </div>
                  </div>
                  
                  {/* Results Badge */}
                  <div className="text-right">
                    <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                      {currentTestimonial.results}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {/* Previous Button */}
            <motion.button
              onClick={handlePrevious}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </motion.button>

            {/* Play/Pause Button */}
            <motion.button
              onClick={() => setIsPlaying(!isPlaying)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </motion.button>

            {/* Next Button */}
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </motion.button>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-purple-600 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-12">
          {Array.from(new Set(testimonials.map(t => t.category))).map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-white hover:shadow-md transition-all duration-300"
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
} 