'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, ArrowLeft, Check, Building, Target, DollarSign, User, Zap, AlertCircle } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

interface ClientWizardProps {
  isOpen: boolean
  onClose: () => void
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

interface WizardData {
  // Step 1: Basic Info
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  
  // Step 2: Business Details
  businessType: string
  industry: string
  teamSize: string
  currentChallenges: string[]
  
  // Step 3: Development Goals
  aiGoals: string[]
  specificUseCase: string
  automationPriority: string
  
  // Step 4: Budget & Timeline
  budget: string
  timeline: string
  additionalInfo: string
}

const BUSINESS_TYPES = [
  'Individual/Freelancer',
  'SaaS/Software',
  'E-commerce',
  'Agency/Consulting',
  'Healthcare',
  'Real Estate',
  'Education',
  'Finance',
  'Manufacturing',
  'Retail',
  'Other'
]

const INDUSTRIES = [
  'Technology',
  'Healthcare',
  'Finance',
  'Real Estate',
  'Education',
  'E-commerce',
  'Marketing',
  'Consulting',
  'Manufacturing',
  'Other'
]

const TEAM_SIZES = [
  'Just me (Individual)',
  '1-5 employees',
  '6-20 employees',
  '21-50 employees',
  '51-200 employees',
  '200+ employees'
]

const CHALLENGES = [
  'Too many manual processes',
  'Tools that do not talk to each other',
  'Outdated or slow web app',
  'Need a new platform built',
  'Billing / payments headaches',
  'Scaling or performance issues',
  'Legacy code to modernize',
  'No backend / DevOps owner',
  'Want to use AI in our workflow',
  'Data sync and reporting gaps',
  'Security or access-control concerns',
  'Other'
]

const AI_GOALS = [
  'Build a web application (Rails / React / Next.js)',
  'Automate workflows (n8n / Make / Zapier)',
  'Integrate payments (Stripe) or accounting (Xero)',
  'Connect CRM, Shopify, or other SaaS tools',
  'Build an AI agent (LangChain / LangGraph)',
  'Design or extend an API',
  'Migrate or modernize an existing platform',
  'Set up AWS deployment and CI/CD',
  'Add authentication and roles',
  'Ongoing maintenance and improvements'
]

const AUTOMATION_PRIORITIES = [
  'High - Need immediate results',
  'Medium - Within 3 months',
  'Low - Long-term planning',
  'Not sure - Need consultation'
]

const BUDGET_RANGES = [
  '$1,000 - $5,000',
  '$5,000 - $15,000',
  '$15,000 - $50,000',
  '$50,000+',
  'Need to discuss budget'
]

const TIMELINES = [
  'ASAP - Within 2 weeks',
  '1-2 months',
  '3-6 months',
  '6+ months',
  'Flexible timeline'
]

const INITIAL_DATA: WizardData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  businessType: '',
  industry: '',
  teamSize: '',
  currentChallenges: [],
  aiGoals: [],
  specificUseCase: '',
  automationPriority: '',
  budget: '',
  timeline: '',
  additionalInfo: ''
}

export default function ClientWizard({ isOpen, onClose }: ClientWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [data, setData] = useState<WizardData>(INITIAL_DATA)

  const totalSteps = 4

  // Reset the wizard once the close animation has finished so reopening
  // starts fresh instead of showing the previous success screen.
  useEffect(() => {
    if (isOpen) return
    const timer = setTimeout(() => {
      setCurrentStep(1)
      setIsSubmitted(false)
      setSubmitError(null)
      setData(INITIAL_DATA)
    }, 300)
    return () => clearTimeout(timer)
  }, [isOpen])

  // Close on Escape while open.
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSubmitting) onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, isSubmitting, onClose])

  const updateData = useCallback(<K extends keyof WizardData>(field: K, value: WizardData[K]) => {
    setData(prev => ({ ...prev, [field]: value }))
  }, [])

  const toggleArrayItem = (field: 'currentChallenges' | 'aiGoals', value: string) => {
    setData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('/api/send-wizard-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json().catch(() => ({}))

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to send your request')
      }

      setIsSubmitted(true)
    } catch (error) {
      setSubmitError(
        error instanceof Error && error.message
          ? error.message
          : 'Something went wrong while sending your request. Please try again in a moment.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return Boolean(data.firstName.trim() && data.lastName.trim() && EMAIL_RE.test(data.email) && data.phone.trim())
      case 2:
        return Boolean(data.businessType && data.industry && data.teamSize && data.currentChallenges.length > 0)
      case 3:
        return Boolean(data.aiGoals.length > 0 && data.specificUseCase.trim() && data.automationPriority)
      case 4:
        return Boolean(data.budget && data.timeline)
      default:
        return false
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4 sm:space-y-6"
          >
            <div className="text-center mb-4 sm:mb-6 lg:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-[#3B82F6] to-[#10B981] rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4">
                <User className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">Let&apos;s Get Started!</h2>
              <p className="text-gray-600 text-sm sm:text-base">Tell me about yourself and your company</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  value={data.firstName}
                  onChange={(e) => updateData('firstName', e.target.value)}
                  className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-base touch-manipulation"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  value={data.lastName}
                  onChange={(e) => updateData('lastName', e.target.value)}
                  className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-base touch-manipulation"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => updateData('email', e.target.value)}
                className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7661FB] focus:border-transparent text-base"
                placeholder="john@company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => updateData('phone', e.target.value)}
                className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7661FB] focus:border-transparent text-base"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name (Optional)</label>
              <input
                type="text"
                value={data.company}
                onChange={(e) => updateData('company', e.target.value)}
                className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7661FB] focus:border-transparent text-base"
                placeholder="Your Company Inc. or leave blank for individual"
              />
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4 sm:space-y-6"
          >
            <div className="text-center mb-4 sm:mb-6 lg:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-[#7661FB] to-[#DB4DBA] rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4">
                <Building className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">About Your Business</h2>
              <p className="text-gray-600 text-sm sm:text-base">Help me understand your business better</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Type *</label>
                <select
                  value={data.businessType}
                  onChange={(e) => updateData('businessType', e.target.value)}
                  className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-base touch-manipulation"
                >
                  <option value="">Select business type</option>
                  {BUSINESS_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry *</label>
                <select
                  value={data.industry}
                  onChange={(e) => updateData('industry', e.target.value)}
                  className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-base touch-manipulation"
                >
                  <option value="">Select industry</option>
                  {INDUSTRIES.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Team Size *</label>
              <select
                value={data.teamSize}
                onChange={(e) => updateData('teamSize', e.target.value)}
                className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7661FB] focus:border-transparent text-base"
              >
                <option value="">Select team size</option>
                {TEAM_SIZES.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Challenges * (Select all that apply)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                {CHALLENGES.map(challenge => (
                  <label key={challenge} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer touch-manipulation active:bg-gray-100">
                    <input
                      type="checkbox"
                      checked={data.currentChallenges.includes(challenge)}
                      onChange={() => toggleArrayItem('currentChallenges', challenge)}
                      className="w-5 h-5 sm:w-4 sm:h-4 text-[#7661FB] border-gray-300 rounded focus:ring-[#7661FB] mt-0.5 flex-shrink-0 touch-manipulation"
                    />
                    <span className="text-sm text-gray-700 leading-relaxed">{challenge}</span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4 sm:space-y-6"
          >
            <div className="text-center mb-4 sm:mb-6 lg:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-[#DB4DBA] to-[#FCA207] rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">Development Goals & Vision</h2>
              <p className="text-gray-600 text-sm sm:text-base">What do you want to achieve with custom software?</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Development Goals * (Select all that apply)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                {AI_GOALS.map(goal => (
                  <label key={goal} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer touch-manipulation active:bg-gray-100">
                    <input
                      type="checkbox"
                      checked={data.aiGoals.includes(goal)}
                      onChange={() => toggleArrayItem('aiGoals', goal)}
                      className="w-5 h-5 sm:w-4 sm:h-4 text-[#7661FB] border-gray-300 rounded focus:ring-[#7661FB] mt-0.5 flex-shrink-0 touch-manipulation"
                    />
                    <span className="text-sm text-gray-700 leading-relaxed">{goal}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specific Use Case *</label>
              <textarea
                value={data.specificUseCase}
                onChange={(e) => updateData('specificUseCase', e.target.value)}
                rows={4}
                className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7661FB] focus:border-transparent text-base resize-none touch-manipulation"
                placeholder="Describe the specific software or application you want to build..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Priority *</label>
              <select
                value={data.automationPriority}
                onChange={(e) => updateData('automationPriority', e.target.value)}
                className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7661FB] focus:border-transparent text-base"
              >
                <option value="">Select priority level</option>
                {AUTOMATION_PRIORITIES.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4 sm:space-y-6"
          >
            <div className="text-center mb-4 sm:mb-6 lg:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-[#FCA207] to-[#F85B5D] rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">Budget & Timeline</h2>
              <p className="text-gray-600 text-sm sm:text-base">Final details so I can prepare your proposal</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range *</label>
                <select
                  value={data.budget}
                  onChange={(e) => updateData('budget', e.target.value)}
                  className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-base touch-manipulation"
                >
                  <option value="">Select budget range</option>
                  {BUDGET_RANGES.map(budget => (
                    <option key={budget} value={budget}>{budget}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Timeline *</label>
                <select
                  value={data.timeline}
                  onChange={(e) => updateData('timeline', e.target.value)}
                  className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-base touch-manipulation"
                >
                  <option value="">Select timeline</option>
                  {TIMELINES.map(timeline => (
                    <option key={timeline} value={timeline}>{timeline}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Information</label>
              <textarea
                value={data.additionalInfo}
                onChange={(e) => updateData('additionalInfo', e.target.value)}
                rows={4}
                className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7661FB] focus:border-transparent text-base resize-none touch-manipulation"
                placeholder="Any additional details, questions, or specific requirements..."
              />
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  const renderSuccessMessage = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12 px-8"
    >
      {/* Animated Success Icon */}
      <motion.div 
        className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 relative"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring", 
          damping: 15, 
          stiffness: 300,
          delay: 0.2
        }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            damping: 15, 
            stiffness: 300,
            delay: 0.4
          }}
        >
          <Check className="w-12 h-12 text-white" />
        </motion.div>
        
        {/* Pulsing ring effect */}
        <motion.div
          className="absolute inset-0 border-4 border-green-400 rounded-full"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      </motion.div>

      {/* Success Content */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">
          🎉 Success! 
        </h2>
        <div className="space-y-4 mb-6 sm:mb-8">
          <p className="text-lg sm:text-xl text-gray-700 font-semibold">
            I&apos;ll reach out to you shortly!
          </p>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Thank you for sharing the details of your project. I&apos;ve received your request and will review it personally.
          </p>
          <div className="bg-gradient-to-r from-[#3B82F6]/10 to-[#10B981]/10 rounded-xl p-4 sm:p-6 border border-[#3B82F6]/20">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[#3B82F6]" />
              <span className="font-semibold text-[#3B82F6] text-sm sm:text-base">What happens next?</span>
            </div>
            <div className="text-xs sm:text-sm text-gray-600 space-y-1">
              <p>• I&apos;ll get back to you within 24 hours</p>
              <p>• We&apos;ll schedule a short discovery call if it makes sense</p>
              <p>• You&apos;ll receive a proposal with scope, timeline, and estimate</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <button
          type="button"
          onClick={onClose}
          className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#10B981] to-[#059669] text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base touch-manipulation min-h-[44px] hover:from-[#059669] hover:to-[#047857]"
        >
          <Check className="w-4 h-4 sm:w-5 sm:h-5" />
          Awesome, Got It!
        </button>
      </motion.div>

      <motion.p
        className="text-xs text-gray-400 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Questions in the meantime? Use the contact form on the homepage.
      </motion.p>
    </motion.div>
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="wizard-title"
              className="relative w-full max-w-2xl bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden mx-auto my-auto touch-manipulation flex flex-col"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ 
                type: "spring", 
                damping: 30, 
                stiffness: 300,
                duration: 0.4
              }}
              onClick={(e) => e.stopPropagation()}
              style={{ 
                maxHeight: '90vh', 
                minHeight: '400px',
                touchAction: 'manipulation' 
              }}
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-[#3B82F6] to-[#10B981] p-4 sm:p-6 text-white flex-shrink-0">
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-8 sm:h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors duration-200 touch-manipulation"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-center pr-12">
                  <h2 id="wizard-title" className="text-xl sm:text-2xl font-bold mb-2">Free Project Consultation</h2>
                  <p className="text-white/90 text-sm sm:text-base">Step {currentStep} of {totalSteps}</p>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 min-h-0">
                {isSubmitted ? renderSuccessMessage() : renderStep()}
              </div>

              {/* Footer */}
              {!isSubmitted && (
              <div className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 bg-gray-50 border-t gap-4 sm:gap-0 flex-shrink-0 relative">
                {submitError && (
                  <div
                    role="alert"
                    className="w-full sm:absolute sm:-top-14 sm:left-4 sm:right-4 sm:w-auto flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs sm:text-sm text-red-700"
                  >
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 px-4 sm:px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm sm:text-base touch-manipulation min-h-[44px]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: totalSteps }, (_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i + 1 <= currentStep ? 'bg-[#3B82F6]' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {currentStep === totalSteps ? (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!isStepValid(currentStep) || isSubmitting}
                    className="flex items-center gap-2 px-6 sm:px-8 py-3 bg-gradient-to-r from-[#3B82F6] to-[#10B981] text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base w-full sm:w-auto justify-center touch-manipulation min-h-[44px]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Submit & Get Proposal
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStepValid(currentStep)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3B82F6] to-[#10B981] text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base w-full sm:w-auto justify-center touch-manipulation min-h-[44px]"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
