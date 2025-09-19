'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Check, Star, Zap, Brain, Rocket, Crown } from 'lucide-react'

interface PricingPlan {
  id: string
  name: string
  description: string
  price: string
  period: string
  features: string[]
  popular?: boolean
  icon: React.ComponentType<{ className?: string }>
  gradient: string
  category: string
}

const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "AI Starter",
    description: "Perfect for small businesses ready to embrace AI automation",
    price: "$297",
    period: "/month",
    features: [
      "Neural Network Automation (up to 50 workflows)",
      "Basic Voice Intelligence",
      "Predictive Analytics Dashboard",
      "Standard AI Content Generation",
      "Email Support",
      "5 Team Members",
      "99.5% Uptime SLA"
    ],
    icon: Brain,
    gradient: "from-blue-500 to-cyan-500",
    category: "Essential"
  },
  {
    id: "professional",
    name: "AI Professional",
    description: "Advanced AI capabilities for growing businesses",
    price: "$797",
    period: "/month",
    features: [
      "Advanced Neural Networks (unlimited workflows)",
      "Intelligent Voice AI with NLP",
      "Quantum-Speed Processing",
      "Advanced Predictive Analytics",
      "AI Content Generation Suite",
      "Priority Support",
      "Unlimited Team Members",
      "99.9% Uptime SLA",
      "Custom AI Model Training"
    ],
    popular: true,
    icon: Zap,
    gradient: "from-purple-500 to-indigo-500",
    category: "Popular"
  },
  {
    id: "enterprise",
    name: "AI Enterprise",
    description: "Complete AI transformation for large organizations",
    price: "Custom",
    period: "",
    features: [
      "Full Neural Network Suite",
      "Quantum-Speed Processing",
      "Advanced Voice Intelligence",
      "Real-time Predictive Analytics",
      "AI Content Generation Pro",
      "Dedicated AI Specialist",
      "White-label Solutions",
      "99.99% Uptime SLA",
      "Custom AI Development",
      "API Access",
      "Multi-cloud Deployment"
    ],
    icon: Crown,
    gradient: "from-orange-500 to-red-500",
    category: "Enterprise"
  }
]

const PricingCard = ({ plan, index }: { plan: PricingPlan; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={`relative bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border-2 overflow-hidden ${
          plan.popular 
            ? 'border-purple-200 scale-105' 
            : 'border-gray-200/50'
        }`}
        whileHover={{ scale: plan.popular ? 1.05 : 1.02, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {/* Popular Badge */}
        {plan.popular && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2">
              <Star className="w-4 h-4 fill-current" />
              Most Popular
            </div>
          </div>
        )}

        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />

        {/* Header */}
        <div className="relative z-10 text-center mb-8">
          <div className={`w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
            <plan.icon className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
          <p className="text-gray-600 mb-6">{plan.description}</p>
          
          <div className="mb-6">
            <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
            <span className="text-gray-600 ml-1">{plan.period}</span>
          </div>
        </div>

        {/* Features List */}
        <div className="relative z-10 space-y-4 mb-8">
          {plan.features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + idx * 0.05 }}
              viewport={{ once: true }}
            >
              <div className={`w-5 h-5 bg-gradient-to-br ${plan.gradient} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-gray-700 text-sm">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 relative overflow-hidden ${
            plan.popular
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700'
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {plan.id === 'enterprise' ? 'Contact Sales' : 'Start AI Transformation'}
          
          {/* Button Hover Effect */}
          <motion.div
            className="absolute inset-0 bg-white/20"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />
        </motion.button>

        {/* Hover Glow Effect */}
        {isHovered && (
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} rounded-3xl blur-xl opacity-20`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Rocket,
      title: "Deploy in 24 Hours",
      description: "Get your AI systems running in less than a day with our streamlined onboarding process"
    },
    {
      icon: Brain,
      title: "Self-Learning AI",
      description: "Our neural networks continuously improve and adapt to your business patterns automatically"
    },
    {
      icon: Zap,
      title: "Quantum-Speed Results",
      description: "Experience lightning-fast processing with sub-millisecond response times and infinite scalability"
    }
  ]

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {benefits.map((benefit, index) => (
        <motion.div
          key={benefit.title}
          className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <benefit.icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
          <p className="text-gray-600 text-sm">{benefit.description}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default function AIPricing() {
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">AI Journey</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Transform your business with our revolutionary AI technology stack. Start small and scale to enterprise-level automation.
          </p>
        </motion.div>

        {/* Benefits Section */}
        <BenefitsSection />

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need a Custom AI Solution?
            </h3>
            <p className="text-gray-600 mb-6">
              Our AI specialists can create a tailored solution for your unique business needs. 
              Get a personalized consultation and see how AI can transform your operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-bold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule AI Consultation
              </motion.button>
              <motion.button
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-bold hover:border-purple-500 hover:text-purple-600 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                View Case Studies
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

