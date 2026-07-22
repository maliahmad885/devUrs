'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ClientWizard from './ClientWizard'
import { 
  Send, 
  User, 
  Mail, 
  Phone,
  MessageSquare, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Sparkles,
  Zap,
  Clock,
  Star,
  Heart,
  Globe,
  Shield,
  Rocket,
  ChevronDown,
  ChevronUp
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
  const [isWizardOpen, setIsWizardOpen] = useState(false)
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  const services = [
    'Mobile App Development',
    'Web Development',
    'CRM Development',
    'E-commerce Solutions',
    'SaaS Platform Development',
    'API Development',
    'Custom Software',
    'Other'
  ]


  const stats = [
    { number: '5+', label: 'Years Experience', icon: Shield },
    { number: '200+', label: 'Automations', icon: Rocket },
    { number: '8+', label: 'Platforms Shipped', icon: Star },
    { number: '20+', label: 'Hrs/Week Saved', icon: Clock }
  ]

  const faqData = [
    {
      question: "How much does custom software development cost?",
      answer: "Costs depend on scope and complexity. After a discovery call, I can outline a realistic timeline and budget for your specific project."
    },
    {
      question: "What if the software doesn't meet my needs?",
      answer: "We scope clearly up front and iterate with regular check-ins so the build stays aligned with your goals throughout development."
    },
    {
      question: "How long does development take?",
      answer: "Timelines vary by project. Smaller features can ship in weeks; larger platforms take longer. I'll give a clear estimate after understanding the scope."
    },
    {
      question: "Do I need technical knowledge?",
      answer: "No. You describe the product and outcomes you need — I handle the architecture, implementation, and deployment."
    },
    {
      question: "What types of projects do you take on?",
      answer: "Web platforms, admin systems, marketplaces, billing/integrations, workflow automation (n8n, Make, Zapier), and AI agent work with LangChain/LangGraph."
    },
    {
      question: "What technologies do you use?",
      answer: "Primarily Ruby on Rails, React, Next.js, and Node.js, plus Stripe, AWS, Sidekiq, and automation tools like n8n, Make, and Zapier."
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes — maintenance, iterations, and automation improvements after launch are available as needed."
    },
    {
      question: "Can the software be modified later?",
      answer: "Yes. I build maintainable, scalable systems so you can extend features as the business grows."
    },
    {
      question: "Do you handle backend and DevOps?",
      answer: "Yes. I often own backend and DevOps end-to-end — APIs, jobs, CI/CD, and AWS deployments."
    },
    {
      question: "Is my data secure?",
      answer: "Security is treated seriously: encrypted connections, careful access control, and practices aligned with common data-protection requirements."
    }
  ]

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index)
  }

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
    
    try {
      // Prepare data for the API
      const emailData = {
        firstName: formData.name.split(' ')[0] || formData.name,
        lastName: formData.name.split(' ').slice(1).join(' ') || '',
        email: formData.email,
        phone: formData.phone,
        company: formData.company || '',
        businessType: 'Contact Form',
        industry: 'General',
        teamSize: 'Not specified',
        currentChallenges: [formData.service || 'General inquiry'],
        aiGoals: ['Get information'],
        specificUseCase: formData.message,
        automationPriority: 'Not specified',
        budget: 'Not specified',
        timeline: 'Not specified',
        additionalInfo: `Subject: ${formData.subject}\nService: ${formData.service}\nMessage: ${formData.message}`
      }

      const response = await fetch('/api/send-wizard-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setIsSubmitted(true)
        // Reset form after successful submission
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
      } else {
        throw new Error(result.message || 'Failed to send email')
      }
    } catch (error) {
      console.error('Error sending email:', error)
      alert('There was an error sending your message. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
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
              <span className="font-semibold">We&apos;re excited to help you transform your business!</span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="scroll-section bg-gradient-to-br from-[#F85B5D]/10 via-white to-[#7661FB]/10 relative overflow-hidden py-20">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#F85B5D]/20 to-[#7661FB]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-[#7661FB]/20 to-[#DB4DBA]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-[#FCA207]/20 to-[#F85B5D]/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

        {/* Development Icon - Floating in background */}
        <motion.div 
          className="absolute top-32 right-12 w-28 h-28 sm:w-36 sm:h-36 opacity-40"
          animate={{ 
            x: [0, 15, -15, 0],
            y: [0, -10, 10, 0],
            rotate: [0, 2, -2, 0]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <img 
            src="/images/workflow-builder.svg" 
            alt="Development Workflow" 
            className="w-full h-full object-contain"
            style={{
              imageRendering: 'crisp-edges',
              filter: 'drop-shadow(0 0 12px rgba(118, 97, 251, 0.25))'
            }}
          />
        </motion.div>

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
          <Globe className="w-16 h-16 text-[#7661FB]" />
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 opacity-20"
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 5, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <Rocket className="w-20 h-20 text-[#F85B5D]" />
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-1/4 opacity-20"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 3, -3, 0]
          }}
          transition={{ duration: 7, repeat: Infinity }}
        >
          <Zap className="w-14 h-14 text-[#FCA207]" />
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
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Let&apos;s <span className="bg-gradient-to-r from-[#3B82F6] to-[#10B981] bg-clip-text text-transparent">Build Something</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have a web app, platform, or automation project in mind? Tell me what you&apos;re building and I&apos;ll help you figure out the right approach.
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
              <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#10B981] rounded-xl flex items-center justify-center mx-auto mb-3">
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
            <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/5 to-[#10B981]/5 rounded-3xl"></div>
            <motion.div
              className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#3B82F6]/10 to-[#10B981]/10 rounded-full blur-3xl"
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
                <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#10B981] rounded-2xl flex items-center justify-center">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">Let's Connect</h3>
                  <p className="text-gray-600">Tell me about your project</p>
                </div>
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
                        errors.name ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-[#3B82F6]'
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
                        errors.email ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-[#3B82F6]'
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
                      className="w-full pl-12 pr-4 py-4 bg-white/80 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#3B82F6] focus:bg-white transition-all duration-300"
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
                      className="w-full pl-12 pr-4 py-4 bg-white/80 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#3B82F6] focus:bg-white transition-all duration-300"
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
                      errors.service ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-[#3B82F6]'
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
                      errors.subject ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-[#3B82F6]'
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
                    placeholder="Tell us about your software development needs, current challenges, and goals..."
                    required
                    rows={6}
                    className={`w-full pl-12 pr-4 py-4 bg-white/80 border rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white transition-all duration-300 resize-none ${
                      errors.message ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-[#3B82F6]'
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
                  className="w-full bg-gradient-to-r from-[#3B82F6] via-[#10B981] to-[#3B82F6] hover:from-[#2563EB] hover:via-[#059669] hover:to-[#2563EB] text-white font-semibold py-4 px-8 rounded-2xl flex items-center justify-center space-x-3 transition-all duration-300 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ delay: 1.0 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#3B82F6] to-[#10B981]"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '0%' }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  <span className="relative z-10 flex items-center space-x-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
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

            {/* FAQ Section */}
            <motion.div
              className="bg-gradient-to-br from-[#3B82F6]/5 to-[#10B981]/5 rounded-2xl p-8 border border-[#3B82F6]/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#10B981] rounded-2xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h4>
              </div>
              
              <div className="space-y-2">
                {faqData.map((faq, index) => (
                  <motion.div
                    key={index}
                    className="border border-[#3B82F6]/20 rounded-lg overflow-hidden will-change-auto"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    style={{ contain: 'layout' }}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-6 py-4 text-left bg-white hover:bg-[#3B82F6]/5 transition-colors duration-200 flex items-center justify-between group"
                    >
                      <h5 className="font-semibold text-gray-900 group-hover:text-[#3B82F6] transition-colors duration-200">
                        {faq.question}
                      </h5>
                      <motion.div
                        animate={{ rotate: expandedFAQ === index ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-5 h-5 text-[#3B82F6] group-hover:text-[#10B981] transition-colors duration-200" />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence mode="wait">
                      {expandedFAQ === index && (
                        <motion.div
                          initial={{ 
                            maxHeight: 0,
                            opacity: 0,
                            scaleY: 0,
                            transformOrigin: 'top'
                          }}
                          animate={{ 
                            maxHeight: 200,
                            opacity: 1,
                            scaleY: 1,
                            transformOrigin: 'top'
                          }}
                          exit={{ 
                            maxHeight: 0,
                            opacity: 0,
                            scaleY: 0,
                            transformOrigin: 'top'
                          }}
                          transition={{ 
                            duration: 0.3, 
                            ease: [0.25, 0.46, 0.45, 0.94],
                            maxHeight: { duration: 0.4 },
                            opacity: { duration: 0.2 },
                            scaleY: { duration: 0.3 }
                          }}
                          className="overflow-hidden bg-purple-50/50 origin-top"
                        >
                          <div className="px-6 py-4">
                            <motion.p 
                              className="text-gray-700 text-sm leading-relaxed"
                              initial={{ y: -10, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.1, duration: 0.2 }}
                            >
                              {faq.answer}
                            </motion.p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Client Wizard Modal */}
      <ClientWizard 
        isOpen={isWizardOpen} 
        onClose={() => setIsWizardOpen(false)} 
      />
    </section>
  )
}
