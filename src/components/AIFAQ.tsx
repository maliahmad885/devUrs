'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown, Brain, Zap, Shield, Users } from 'lucide-react'

interface FAQItem {
  id: number
  question: string
  answer: string
  category: string
  icon: React.ComponentType<{ className?: string }>
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "How does your neural network automation work?",
    answer: "Our neural network automation uses deep learning algorithms that continuously analyze your business patterns, predict optimal outcomes, and self-optimize workflows. The AI learns from every interaction and automatically improves performance over time, ensuring maximum efficiency and accuracy.",
    category: "AI Technology",
    icon: Brain
  },
  {
    id: 2,
    question: "What makes your voice AI different from others?",
    answer: "Our voice AI combines advanced natural language processing with emotion recognition and contextual understanding. It can handle complex conversations, understand nuance, and respond with 95% accuracy while learning from each interaction to provide increasingly human-like experiences.",
    category: "Voice AI",
    icon: Zap
  },
  {
    id: 3,
    question: "How secure is my data with your AI systems?",
    answer: "We implement military-grade security with quantum encryption, zero-trust architecture, and AI-powered threat detection. Your data is protected with SOC 2 compliance, HIPAA readiness, and 99.99% uptime SLA. All AI processing happens in secure, encrypted environments.",
    category: "Security",
    icon: Shield
  },
  {
    id: 4,
    question: "Can your AI integrate with our existing systems?",
    answer: "Absolutely! Our omnichannel AI hub connects with 1000+ applications and services. We use intelligent data mapping and AI-powered connectors to seamlessly integrate with your existing CRM, marketing tools, databases, and custom systems without disrupting your workflow.",
    category: "Integration",
    icon: Users
  },
  {
    id: 5,
    question: "How quickly can we see results from AI automation?",
    answer: "Most clients see immediate improvements within 24-48 hours of deployment. Our quantum-speed processing delivers instant results, while our predictive analytics start providing insights within the first week. Full optimization typically occurs within 30 days as the AI learns your specific patterns.",
    category: "Performance",
    icon: Zap
  },
  {
    id: 6,
    question: "Do we need technical expertise to use your AI platform?",
    answer: "Not at all! Our visual AI builder features drag-and-drop interfaces with AI-assisted suggestions. The platform auto-generates complex logic and provides smart recommendations. You can create sophisticated workflows without any coding knowledge, and our AI specialists provide full support.",
    category: "Usability",
    icon: Brain
  },
  {
    id: 7,
    question: "What kind of ROI can we expect from AI automation?",
    answer: "Our clients typically see 300-500% ROI within the first 6 months. This comes from increased efficiency (40% average productivity boost), reduced manual work (saving 20+ hours weekly), improved accuracy (99.7% AI accuracy rate), and enhanced customer satisfaction (98% satisfaction rates).",
    category: "ROI",
    icon: Shield
  },
  {
    id: 8,
    question: "How does your predictive analytics help our business?",
    answer: "Our predictive analytics engine forecasts trends, predicts customer behavior, and provides actionable insights with 99.7% accuracy. It helps optimize sales strategies, predict market changes, identify high-value leads, and make data-driven decisions that drive significant business growth.",
    category: "Analytics",
    icon: Brain
  }
]

const FAQCard = ({ item, isOpen, onClick }: { item: FAQItem; isOpen: boolean; onClick: () => void }) => {
  return (
    <motion.div
      className="bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200/50 shadow-lg overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <motion.button
        onClick={onClick}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors duration-200"
        whileHover={{ backgroundColor: 'rgba(249, 250, 251, 0.5)' }}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
            <item.icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.question}</h3>
            <span className="text-sm text-purple-600 font-medium">{item.category}</span>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </motion.div>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <div className="pl-14">
                <p className="text-gray-700 leading-relaxed">{item.answer}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const CategoryFilter = ({ selectedCategory, onCategoryChange }: { selectedCategory: string; onCategoryChange: (category: string) => void }) => {
  const categories = ["All", ...Array.from(new Set(faqItems.map(item => item.category)))]
  
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-3 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {categories.map((category) => (
        <motion.button
          key={category}
          onClick={() => onCategoryChange(category)}
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
  )
}

export default function AIFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  
  const filteredItems = selectedCategory === "All" 
    ? faqItems 
    : faqItems.filter(item => item.category === selectedCategory)
  
  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            AI Technology <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get answers to the most common questions about our revolutionary AI technology and how it can transform your business operations.
          </p>
        </motion.div>

        {/* Category Filter */}
        <CategoryFilter 
          selectedCategory={selectedCategory} 
          onCategoryChange={setSelectedCategory} 
        />

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <FAQCard
                item={item}
                isOpen={openItems.includes(item.id)}
                onClick={() => toggleItem(item.id)}
              />
            </motion.div>
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
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our AI specialists are here to help you understand how our technology can transform your business. 
              Get personalized answers and see how AI can work specifically for your use case.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-bold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Talk to AI Specialist
              </motion.button>
              <motion.button
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-bold hover:border-purple-500 hover:text-purple-600 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Demo
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

