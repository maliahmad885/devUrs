'use client'

import { useState, useRef, useEffect } from 'react'
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
  MapPin,
  Clock,
  Star,
  ArrowRight,
  Heart,
  Globe,
  Shield,
  Rocket
} from 'lucide-react'

export default function ContactSection() {
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
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const services = [
    'AI Voice Agents',
    'n8n & Make.com Automation',
    'CRM Integration',
    'Lead Generation',
    'Social Media Automation',
    'Custom Development',
    'Other'
  ]

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Get a response within 24 hours',
      value: 'hello@nexusbloom.com',
      color: 'from-blue-500 to-cyan-500',
      action: () => window.open('mailto:hello@nexusbloom.com')
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our team',
      value: '+1 (555) 123-4567',
      color: 'from-green-500 to-emerald-500',
      action: () => window.open('tel:+15551234567')
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      description: 'Come see our amazing office',
      value: 'San Francisco, CA',
      color: 'from-purple-500 to-pink-500',
      action: () => window.open('https://maps.google.com/?q=San+Francisco+CA')
    }
  ]

  const stats = [
    { number: '24h', label: 'Response Time', icon: Clock },
    { number: '99%', label: 'Satisfaction', icon: Star },
    { number: '500+', label: 'Projects', icon: Rocket },
    { number: '5+', label: 'Years Experience', icon: Shield }
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
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2500))
    setIsSubmitting(false)
    setIsSubmitted(true)
    
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

  if (isSubmitted) {
    return (
      <section id="contact" className="scroll-section bg-gradient-to-br from-gray-50 via-white to-purple-50 relative overflow-hidden py-20">
        {/* Success Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-400 to-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <CheckCircle className="w-20 h-20 text-white" />
            </motion.div>
            
            <motion.h2 
              className="text-5xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Message Sent Successfully! 🎉
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Thank you for reaching out! We&apos;ll get back to you within 24 hours with a personalized response.
            </motion.p>

            <motion.div
              className="flex items-center justify-center space-x-2 text-purple-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">We&apos;re excited to help you automate your business!</span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="scroll-section bg-gradient-to-br from-gray-50 via-white to-purple-50 relative overflow-hidden py-20">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 opacity-20"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <Globe className="w-16 h-16 text-purple-500" />
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 opacity-20"
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 5, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <Rocket className="w-20 h-20 text-blue-500" />
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-1/4 opacity-20"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 3, -3, 0]
          }}
          transition={{ duration: 7, repeat: Infinity }}
        >
          <Zap className="w-14 h-14 text-green-500" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-xl"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Heart className="w-4 h-4" />
            Let&apos;s Connect
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Contact <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Us</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your business with AI automation? Let&apos;s create something amazing together. 
            Whether you have a project in mind or just want to chat about possibilities, we&apos;d love to hear from you.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200/50"
              whileHover={{ scale: 1.05, y: -5 }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-200/50 relative overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            onHoverStart={() => setHoveredCard('form')}
            onHoverEnd={() => setHoveredCard(null)}
          >
            {/* Form Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-3xl"></div>
            <motion.div
              className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full blur-3xl"
              animate={{ 
                scale: hoveredCard === 'form' ? 1.2 : 1,
                rotate: hoveredCard === 'form' ? 180 : 0
              }}
              transition={{ duration: 0.6 }}
            />
            
            <div className="relative z-10">
              <motion.div
                className="flex items-center gap-3 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Send a Message</h3>
              </motion.div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
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
                      className={`w-full pl-12 pr-4 py-4 bg-white/80 border rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white transition-all duration-300 ${
                        errors.name ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-purple-400'
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

                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
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
                      className={`w-full pl-12 pr-4 py-4 bg-white/80 border rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white transition-all duration-300 ${
                        errors.email ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-purple-400'
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
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
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
                      className="w-full pl-12 pr-4 py-4 bg-white/80 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:bg-white transition-all duration-300"
                    />
                  </motion.div>

                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="absolute left-4 top-4 text-gray-400">
                      <Globe className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your Company Name"
                      className="w-full pl-12 pr-4 py-4 bg-white/80 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:bg-white transition-all duration-300"
                    />
                  </motion.div>
                </div>

                {/* Service Selection */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute left-4 top-4 text-gray-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className={`w-full pl-12 pr-4 py-4 bg-white/80 border rounded-2xl text-gray-900 focus:outline-none focus:bg-white transition-all duration-300 appearance-none ${
                      errors.service ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-purple-400'
                    }`}
                  >
                    <option value="" className="bg-white text-gray-900">Select a Service</option>
                    {services.map((service) => (
                      <option key={service} value={service} className="bg-white text-gray-900">
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
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  viewport={{ once: true }}
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
                    className={`w-full pl-12 pr-4 py-4 bg-white/80 border rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white transition-all duration-300 ${
                      errors.subject ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-purple-400'
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
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  viewport={{ once: true }}
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
                    className={`w-full pl-12 pr-4 py-4 bg-white/80 border rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white transition-all duration-300 resize-none ${
                      errors.message ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-purple-400'
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
                  className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-700 hover:via-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl flex items-center justify-center space-x-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ delay: 1.0 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500"
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

          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Contact Methods */}
            <div className="space-y-6">
              <motion.h3 
                className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                Let&apos;s Connect
              </motion.h3>

              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50 cursor-pointer group hover:shadow-2xl transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={method.action}
                >
                  <div className="flex items-center space-x-4">
                    <motion.div
                      className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      <method.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors duration-300">
                        {method.title}
                      </h4>
                      <p className="text-gray-600 mb-2">{method.description}</p>
                      <p className="text-lg font-medium text-gray-800 group-hover:text-purple-700 transition-colors duration-300">
                        {method.value}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Info Card */}
            <motion.div
              className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-200/50"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900">Why Choose Us?</h4>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">Certified automation experts with 5+ years experience</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">500+ successful automation projects delivered</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">24/7 support and maintenance included</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">Average 20+ hours saved per week per client</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
