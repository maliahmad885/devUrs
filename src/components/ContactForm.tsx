'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, User, Mail, MessageSquare, FileText, CheckCircle } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after showing success
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  const inputVariants = {
    focus: { scale: 1.02, y: -2 },
    blur: { scale: 1, y: 0 }
  }

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05, y: -2 },
    tap: { scale: 0.95 },
    submitting: { scale: 0.98 }
  }

  if (isSubmitted) {
    return (
      <motion.div 
        className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
          </motion.div>
          <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
          <p className="text-gray-300">Thank you for reaching out. I'll get back to you soon!</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
    >
      <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <motion.div
            variants={inputVariants}
            whileFocus="focus"
            whileBlur="blur"
            className="relative"
          >
            <div className="absolute left-4 top-4 text-gray-400">
              <User className="w-5 h-5" />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              required
              className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300"
            />
          </motion.div>

          {/* Email Field */}
          <motion.div
            variants={inputVariants}
            whileFocus="focus"
            whileBlur="blur"
            className="relative"
          >
            <div className="absolute left-4 top-4 text-gray-400">
              <Mail className="w-5 h-5" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your Email"
              required
              className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300"
            />
          </motion.div>
        </div>

        {/* Subject Field */}
        <motion.div
          variants={inputVariants}
          whileFocus="focus"
          whileBlur="blur"
          className="relative"
        >
          <div className="absolute left-4 top-4 text-gray-400">
            <FileText className="w-5 h-5" />
          </div>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="Subject"
            required
            className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300"
          />
        </motion.div>

        {/* Message Field */}
        <motion.div
          variants={inputVariants}
          whileFocus="focus"
          whileBlur="blur"
          className="relative"
        >
          <div className="absolute left-4 top-4 text-gray-400">
            <MessageSquare className="w-5 h-5" />
          </div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Your Message"
            required
            rows={6}
            className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300 resize-none"
          />
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          variants={buttonVariants}
          initial="idle"
          whileHover="hover"
          whileTap="tap"
          animate={isSubmitting ? "submitting" : "idle"}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-2xl flex items-center justify-center space-x-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Send className="w-5 h-5" />
              </motion.div>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  )
} 