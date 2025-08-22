'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

interface FormData {
  firstName: string
  lastName: string
  email: string
  company: string
  message: string
}

interface FormErrors {
  [key: string]: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: ''
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData)
      
      setSubmitStatus('success')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        message: ''
      })
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
      
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      
      // Reset error message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClasses = "w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-300"
  const errorClasses = "text-red-500 text-sm mt-1 flex items-center gap-2"
  const successClasses = "text-green-600 text-sm mt-1 flex items-center gap-2"

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      className="glass-card rounded-2xl p-8"
    >
      {/* Status Messages */}
      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl"
        >
          <div className={successClasses}>
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Thank you! Your message has been sent successfully.</span>
          </div>
        </motion.div>
      )}
      
      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
        >
          <div className={errorClasses}>
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Something went wrong. Please try again or contact us directly.</span>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`${inputClasses} ${errors.firstName ? 'border-red-300' : 'border-gray-300'}`}
              placeholder="Your first name"
              aria-describedby={errors.firstName ? 'firstName-error' : undefined}
              aria-invalid={!!errors.firstName}
            />
            {errors.firstName && (
              <div id="firstName-error" className={errorClasses}>
                <AlertCircle className="w-4 h-4" />
                {errors.firstName}
              </div>
            )}
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`${inputClasses} ${errors.lastName ? 'border-red-300' : 'border-gray-300'}`}
              placeholder="Your last name"
              aria-describedby={errors.lastName ? 'lastName-error' : undefined}
              aria-invalid={!!errors.lastName}
            />
            {errors.lastName && (
              <div id="lastName-error" className={errorClasses}>
                <AlertCircle className="w-4 h-4" />
                {errors.lastName}
              </div>
            )}
          </div>
        </div>
        
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
            Company Name *
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className={`${inputClasses} ${errors.company ? 'border-red-300' : 'border-gray-300'}`}
            placeholder="Your company name"
            aria-describedby={errors.company ? 'company-error' : undefined}
            aria-invalid={!!errors.company}
          />
          {errors.company && (
            <div id="company-error" className={errorClasses}>
              <AlertCircle className="w-4 h-4" />
              {errors.company}
            </div>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`${inputClasses} ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
            placeholder="your.email@company.com"
            aria-describedby={errors.email ? 'email-error' : undefined}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <div id="email-error" className={errorClasses}>
              <AlertCircle className="w-4 h-4" />
              {errors.email}
            </div>
          )}
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleInputChange}
            className={`${inputClasses} resize-none ${errors.message ? 'border-red-300' : 'border-gray-300'}`}
            placeholder="Tell us about your integration needs..."
            aria-describedby={errors.message ? 'message-error' : undefined}
            aria-invalid={!!errors.message}
          />
          {errors.message && (
            <div id="message-error" className={errorClasses}>
              <AlertCircle className="w-4 h-4" />
              {errors.message}
            </div>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 hover-lift disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          aria-describedby={isSubmitting ? 'submitting-status' : undefined}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </>
          )}
        </button>
        
        {isSubmitting && (
          <div id="submitting-status" className="sr-only">
            Form is being submitted, please wait
          </div>
        )}
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          By submitting this form, you agree to our{' '}
          <a href="/privacy" className="text-purple-600 hover:text-purple-700 underline">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="/terms" className="text-purple-600 hover:text-purple-700 underline">
            Terms of Service
          </a>
        </p>
      </div>
    </motion.div>
  )
} 