'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  User, 
  Mail, 
  MessageSquare, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Sparkles,
  Zap,
  Phone,
  MapPin
} from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    service: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const services = [
    'AI Voice Agents',
    'n8n & Make.com Automation',
    'CRM Integration',
    'Lead Generation',
    'Social Media Automation',
    'Custom Development',
    'Other'
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    if (!formData.service) newErrors.service = 'Please select a service'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    // Simulate form submission with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after showing success
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ 
        name: '', 
        email: '', 
        phone: '', 
        company: '', 
        subject: '', 
        message: '', 
        service: '' 
      })
    }, 4000)
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
        className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Success Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-3xl"></div>
        <motion.div
          className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="text-center space-y-6 relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="w-20 h-20 text-green-400 mx-auto drop-shadow-lg" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-3xl font-bold text-white mb-2">Message Sent Successfully!</h3>
            <p className="text-gray-300 text-lg">
              Thank you for reaching out. We&apos;ll get back to you within 24 hours!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center space-x-2 text-sm text-gray-400"
          >
            <Sparkles className="w-4 h-4" />
            <span>We&apos;re excited to help you automate your business!</span>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 relative overflow-hidden"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-3xl"></div>
      <motion.div
        className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 90, 180]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <h3 className="text-3xl font-bold text-white mb-2 flex items-center">
            <Zap className="w-8 h-8 mr-3 text-yellow-400" />
            Let's Build Something Amazing
          </h3>
          <p className="text-gray-300">
            Tell us about your automation needs and we&apos;ll create a custom solution for you.
          </p>
        </motion.div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <motion.div
              variants={inputVariants}
              whileFocus="focus"
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
                placeholder="Your Full Name"
                required
                className={`w-full pl-12 pr-4 py-4 bg-white/10 border rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:bg-white/15 transition-all duration-300 ${
                  errors.name ? 'border-red-400 focus:border-red-400' : 'border-white/20 focus:border-purple-400'
                }`}
              />
              {errors.name && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center mt-2 text-red-400 text-sm"
                >
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.name}
                </motion.div>
              )}
            </motion.div>

            {/* Email Field */}
            <motion.div
              variants={inputVariants}
              whileFocus="focus"
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
                placeholder="your.email@company.com"
                required
                className={`w-full pl-12 pr-4 py-4 bg-white/10 border rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:bg-white/15 transition-all duration-300 ${
                  errors.email ? 'border-red-400 focus:border-red-400' : 'border-white/20 focus:border-purple-400'
                }`}
              />
              {errors.email && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center mt-2 text-red-400 text-sm"
                >
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Phone and Company Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone Field */}
            <motion.div
              variants={inputVariants}
              whileFocus="focus"
              className="relative"
            >
              <div className="absolute left-4 top-4 text-gray-400">
                <Phone className="w-5 h-5" />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300"
              />
            </motion.div>

            {/* Company Field */}
            <motion.div
              variants={inputVariants}
              whileFocus="focus"
              className="relative"
            >
              <div className="absolute left-4 top-4 text-gray-400">
                <MapPin className="w-5 h-5" />
              </div>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Your Company Name"
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300"
              />
            </motion.div>
          </div>

          {/* Service Selection */}
          <motion.div
            variants={inputVariants}
            whileFocus="focus"
            className="relative"
          >
            <div className="absolute left-4 top-4 text-gray-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <select
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              required
              className={`w-full pl-12 pr-4 py-4 bg-white/10 border rounded-2xl text-white focus:outline-none focus:bg-white/15 transition-all duration-300 appearance-none ${
                errors.service ? 'border-red-400 focus:border-red-400' : 'border-white/20 focus:border-purple-400'
              }`}
            >
              <option value="" className="bg-gray-800 text-white">Select a Service</option>
              {services.map((service) => (
                <option key={service} value={service} className="bg-gray-800 text-white">
                  {service}
                </option>
              ))}
            </select>
            {errors.service && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center mt-2 text-red-400 text-sm"
              >
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.service}
              </motion.div>
            )}
          </motion.div>

          {/* Subject Field */}
          <motion.div
            variants={inputVariants}
            whileFocus="focus"
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
              placeholder="Project Title or Brief Description"
              required
              className={`w-full pl-12 pr-4 py-4 bg-white/10 border rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300 ${
                errors.subject ? 'border-red-400 focus:border-red-400' : 'border-white/20 focus:border-purple-400'
              }`}
            />
            {errors.subject && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center mt-2 text-red-400 text-sm"
              >
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.subject}
              </motion.div>
            )}
          </motion.div>

          {/* Message Field */}
          <motion.div
            variants={inputVariants}
            whileFocus="focus"
            className="relative"
          >
            <div className="absolute left-4 top-4 text-gray-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell us about your automation needs, current challenges, and goals..."
              required
              rows={6}
              className={`w-full pl-12 pr-4 py-4 bg-white/10 border rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-300 resize-none ${
                errors.message ? 'border-red-400 focus:border-red-400' : 'border-white/20 focus:border-purple-400'
              }`}
            />
            {errors.message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center mt-2 text-red-400 text-sm"
              >
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.message}
              </motion.div>
            )}
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
            className="w-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 hover:from-purple-600 hover:via-blue-600 hover:to-purple-600 text-white font-semibold py-4 px-8 rounded-2xl flex items-center justify-center space-x-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400"
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.4 }}
            />
            
            <span className="relative z-10 flex items-center space-x-2">
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Send className="w-5 h-5" />
                  </motion.div>
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  <span>Send Message</span>
                  <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </>
              )}
            </span>
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}
