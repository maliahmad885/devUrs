'use client'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import ScrollIndicator from '@/components/ScrollIndicator'
import SectionDivider from '@/components/SectionDivider'
import ScrollDebug from '@/components/ScrollDebug'
import ContactForm from '@/components/ContactForm'
import CookieConsent from '@/components/CookieConsent'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { 
  Users, 
  Target, 
  Award, 
  Globe, 
  Zap, 
  Shield, 
  Heart, 
  Lightbulb,
  TrendingUp,
  Star,
  ArrowRight,
  Send
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { 
  createScrollProgress, 
  createScrollReveal,
  createParallaxEffect,
  createMomentumScroll,
  smoothScrollToSection,
  enableSmoothScrolling
} from '@/lib/utils'

export default function Home() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Ensure page starts at the top
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
    
    // Initialize enhanced scroll features
    const cleanupProgress = createScrollProgress()
    
    // Initialize momentum-based scrolling for mobile
    const cleanupMomentum = createMomentumScroll()
    
    // Create scroll-triggered reveal animations
    const revealElements = document.querySelectorAll('.reveal-on-scroll')
    const revealObserver = createScrollReveal(revealElements)
    
    // Create parallax effects for background elements
    const parallaxElements = document.querySelectorAll('.parallax-layer')
    const parallaxCleanups: (() => void)[] = []
    
    parallaxElements.forEach((el) => {
      if (el instanceof HTMLElement) {
        const cleanup = createParallaxEffect(el, 0.3)
        parallaxCleanups.push(cleanup)
      }
    })

    // Enable smooth scrolling when user starts scrolling
    let hasScrolled = false
    const handleFirstScroll = () => {
      if (!hasScrolled) {
        hasScrolled = true
        enableSmoothScrolling()
        window.removeEventListener('scroll', handleFirstScroll)
      }
    }
    window.addEventListener('scroll', handleFirstScroll, { passive: true })
    
    // Test scroll functionality
    const testScroll = () => {
      console.log('Scroll test: All scroll utilities initialized successfully')
      // Test smooth scroll to a section
      setTimeout(() => {
        const aboutSection = document.getElementById('about')
        if (aboutSection) {
          console.log('Scroll test: About section found, scroll functionality ready')
        }
      }, 1000)
    }
    
    testScroll()
    
    return () => {
      cleanupProgress()
      cleanupMomentum()
      revealObserver.disconnect()
      parallaxCleanups.forEach(cleanup => cleanup())
      window.removeEventListener('scroll', handleFirstScroll)
    }
  }, [])

  const sections = ['home', 'about', 'features', 'services', 'tools', 'projects', 'blogs', 'contact']

  // Don't render scroll-related components during SSR
  if (!isClient) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <Hero />
        {/* Show loading state for other components */}
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" />
      
      {/* Innovative Scroll Indicator */}
      <ScrollIndicator sections={sections} />
      
      {/* Scroll Debug Component (development only) */}
      <ScrollDebug />
      
      <Navigation />
      
      {/* Hero Section */}
      <section id="home" className="scroll-section bg-gradient-to-br from-gray-50 via-white to-purple-50 bg-pattern">
        <div className="parallax-layer">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-100/60 to-blue-100/60 rounded-full blur-3xl opacity-50"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        <Hero />
      </section>

      {/* Innovative Section Divider */}
      <SectionDivider variant="magnetic" />

      {/* About Section */}
      <section id="about" className="scroll-section bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            className="reveal-on-scroll text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="heading-3 md:text-4xl text-gray-900 mb-6">
              About Nexus Bloom
            </h2>
            <p className="text-body-large text-gray-600 max-w-3xl mx-auto">
              We're revolutionizing how businesses connect, automate, and grow through intelligent integration solutions.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="reveal-on-scroll"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="heading-5 text-gray-900 mb-6">Our Story</h3>
              <p className="text-body text-gray-600 mb-6">
                Founded in 2023, Nexus Bloom emerged from a simple observation: businesses were drowning in disconnected tools and manual processes. Our founders, veterans in both enterprise software and startup ecosystems, recognized that the future belonged to those who could seamlessly connect their digital world.
              </p>
              <p className="text-body text-gray-600 mb-6">
                What started as a small team of integration enthusiasts has grown into a powerhouse of automation experts, serving thousands of businesses worldwide.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">500+ Integrations</p>
                  <p className="text-sm text-gray-500">And counting every day</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="reveal-on-scroll"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="glass-card rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Users className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">10,000+</h3>
                    <p className="text-sm text-gray-600">Happy Customers</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Globe className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">50+</h3>
                    <p className="text-sm text-gray-600">Countries Served</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <TrendingUp className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">99.9%</h3>
                    <p className="text-sm text-gray-600">Uptime</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Award className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">15+</h3>
                    <p className="text-sm text-gray-600">Industry Awards</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Innovative Section Divider */}
      <SectionDivider variant="sparkle" />

      {/* Features Section */}
      <section id="features" className="scroll-section bg-gradient-to-br from-gray-50 via-white to-purple-50 bg-pattern">
        <Features />
      </section>

      {/* Innovative Section Divider */}
      <SectionDivider variant="flowing" />

      {/* Services Section */}
      <section id="services" className="scroll-section bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            className="reveal-on-scroll text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="heading-3 md:text-4xl text-gray-900 mb-6">
              Our Services
            </h2>
            <p className="text-body-large text-gray-600 max-w-3xl mx-auto">
              Comprehensive integration solutions to connect your entire tech stack.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Workflow Automation",
                description: "Automate repetitive tasks and streamline your business processes with intelligent workflows.",
                color: "from-purple-500 to-blue-600"
              },
              {
                icon: Globe,
                title: "App Integration",
                description: "Connect 500+ applications seamlessly with our robust integration platform.",
                color: "from-blue-500 to-cyan-600"
              },
              {
                icon: Shield,
                title: "Data Security",
                description: "Enterprise-grade security with SOC 2 compliance and end-to-end encryption.",
                color: "from-green-500 to-emerald-600"
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                className="reveal-on-scroll glass-card rounded-2xl p-8 text-center group hover-lift"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovative Section Divider */}
      <SectionDivider variant="magnetic" />

      {/* Tools Section */}
      <section id="tools" className="scroll-section bg-gradient-to-br from-gray-50 via-white to-purple-50 bg-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            className="reveal-on-scroll text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="heading-3 md:text-4xl text-gray-900 mb-6">
              Powerful Tools
            </h2>
            <p className="text-body-large text-gray-600 max-w-3xl mx-auto">
              Built for developers and business users alike.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Visual Workflow Builder", icon: "🎨" },
              { name: "REST API", icon: "🔌" },
              { name: "Webhook Manager", icon: "🪝" },
              { name: "Data Mapper", icon: "🗺️" },
              { name: "Scheduler", icon: "⏰" },
              { name: "Error Handler", icon: "⚠️" },
              { name: "Analytics Dashboard", icon: "📊" },
              { name: "Team Collaboration", icon: "👥" }
            ].map((tool, index) => (
              <motion.div
                key={tool.name}
                className="reveal-on-scroll glass-card rounded-xl p-6 text-center hover-lift"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="font-semibold text-gray-900">{tool.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovative Section Divider */}
      <SectionDivider variant="sparkle" />

      {/* Projects Section */}
      <section id="projects" className="scroll-section bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            className="reveal-on-scroll text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="heading-3 md:text-4xl text-gray-900 mb-6">
              Featured Projects
            </h2>
            <p className="text-body-large text-gray-600 max-w-3xl mx-auto">
              Discover how we've helped businesses transform their operations with our integration solutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "E-commerce Automation",
                description: "Streamlined order processing and inventory management for a leading retail chain, reducing manual work by 80%.",
                image: "🛒",
                category: "E-commerce",
                results: "80% time savings"
              },
              {
                title: "CRM Integration Hub",
                description: "Connected 15+ business tools for a SaaS company, improving customer data accuracy and team productivity.",
                image: "📊",
                category: "SaaS",
                results: "15+ tools connected"
              },
              {
                title: "Marketing Workflow",
                description: "Automated lead nurturing and campaign management for a B2B company, increasing conversion rates by 45%.",
                image: "📈",
                category: "Marketing",
                results: "45% conversion increase"
              },
              {
                title: "Financial Automation",
                description: "Automated invoice processing and expense tracking for a fintech startup, reducing errors by 95%.",
                image: "💰",
                category: "Fintech",
                results: "95% error reduction"
              },
              {
                title: "Healthcare Integration",
                description: "Connected patient management systems for a healthcare network, improving care coordination and efficiency.",
                image: "🏥",
                category: "Healthcare",
                results: "Improved care coordination"
              },
              {
                title: "Education Platform",
                description: "Integrated learning management systems for an edtech company, enhancing student engagement and outcomes.",
                image: "🎓",
                category: "Education",
                results: "Enhanced student engagement"
              }
            ].map((project, index) => (
              <motion.div
                key={project.title}
                className="reveal-on-scroll glass-card rounded-2xl overflow-hidden group hover-lift"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="p-6">
                  <div className="text-6xl mb-4 text-center">{project.image}</div>
                  <div className="mb-4">
                    <span className="inline-block bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-green-600">
                      {project.results}
                    </span>
                    <button className="text-purple-600 hover:text-purple-700 font-semibold text-sm group-hover:translate-x-1 transition-all duration-300">
                      View Case Study →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovative Section Divider */}
      <SectionDivider variant="flowing" />

      {/* Blogs Section */}
      <section id="blogs" className="scroll-section bg-gradient-to-br from-gray-50 via-white to-purple-50 bg-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            className="reveal-on-scroll text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="heading-3 md:text-4xl text-gray-900 mb-6">
              Latest Insights & Updates
            </h2>
            <p className="text-body-large text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest trends, tips, and insights in automation and integration.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "The Future of Workflow Automation in 2024",
                excerpt: "Discover the emerging trends and technologies that will shape the future of business automation.",
                image: "🚀",
                category: "Trends",
                readTime: "5 min read",
                date: "Dec 15, 2024"
              },
              {
                title: "How to Choose the Right Integration Platform",
                excerpt: "A comprehensive guide to selecting the perfect integration solution for your business needs.",
                image: "🔍",
                category: "Guide",
                readTime: "8 min read",
                date: "Dec 12, 2024"
              },
              {
                title: "Top 10 Automation Mistakes to Avoid",
                excerpt: "Learn from common pitfalls and ensure your automation projects succeed from the start.",
                image: "⚠️",
                category: "Tips",
                readTime: "6 min read",
                date: "Dec 10, 2024"
              },
              {
                title: "Building Scalable Integration Architecture",
                excerpt: "Best practices for designing integration systems that grow with your business.",
                image: "🏗️",
                category: "Technical",
                readTime: "10 min read",
                date: "Dec 8, 2024"
              },
              {
                title: "AI-Powered Workflows: What's Next?",
                excerpt: "Exploring the cutting-edge developments in AI-driven automation and decision making.",
                image: "🤖",
                category: "AI",
                readTime: "7 min read",
                date: "Dec 5, 2024"
              },
              {
                title: "Customer Success Stories: Real Results",
                excerpt: "Inspiring stories from businesses that transformed their operations with Nexus Bloom.",
                image: "📖",
                category: "Case Study",
                readTime: "4 min read",
                date: "Dec 3, 2024"
              }
            ].map((blog, index) => (
              <motion.div
                key={blog.title}
                className="reveal-on-scroll glass-card rounded-2xl overflow-hidden group hover-lift"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="p-6">
                  <div className="text-6xl mb-4 text-center">{blog.image}</div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {blog.category}
                    </span>
                    <span className="text-sm text-gray-500">{blog.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{blog.date}</span>
                    <button className="text-purple-600 hover:text-purple-700 font-semibold text-sm group-hover:translate-x-1 transition-all duration-300">
                      Read More →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovative Section Divider */}
      <SectionDivider variant="magnetic" />

      {/* Contact Section */}
      <section id="contact" className="scroll-section bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            className="reveal-on-scroll text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="heading-3 text-gray-900 mb-6">Get in Touch</h2>
            <p className="text-body-large text-gray-600 max-w-2xl mx-auto">
              Ready to transform your business? Let's start a conversation about how Nexus Bloom can help.
            </p>
          </motion.div>

          <ContactForm />
        </div>
      </section>
      
      {/* Cookie Consent Banner */}
      <CookieConsent />
      
      {/* Footer */}
      <Footer />
    </main>
  )
}
