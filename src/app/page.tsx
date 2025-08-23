'use client'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import EnhancedFeatures from '@/components/EnhancedFeatures'
import Testimonials from '@/components/Testimonials'
import ThreeDBackground from '@/components/3DBackground'
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
  Send,
  Sparkles
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
import { Canvas } from '@react-three/fiber'
import EnhancedProjectBackground from '@/components/EnhancedProjectBackground'
import ProjectShowcase from '@/components/ProjectShowcase'

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

  const sections = ['home', 'about', 'features', 'services', 'projects', 'blogs', 'contact']

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
      {/* 3D Interactive Background */}
      <ThreeDBackground />
      
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
      <section id="about" className="scroll-section bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Background 3D Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-green-400 to-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl"></div>
        </div>
        
        {/* Floating 3D Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 right-20 opacity-20 animate-float-slow">
            <img src="/images/floating-3d-elements.svg" alt="" className="w-24 h-24" />
          </div>
          <div className="absolute bottom-32 left-20 opacity-20 animate-float-medium">
            <img src="/images/floating-3d-elements.svg" alt="" className="w-20 h-20" />
          </div>
          <div className="absolute top-1/3 left-1/4 opacity-15 animate-float-fast">
            <img src="/images/floating-3d-elements.svg" alt="" className="w-16 h-16" />
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <motion.div
            className="reveal-on-scroll text-center mb-16 sm:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="heading-3 heading-3d md:text-5xl text-gray-900 mb-6 sm:mb-8">
              About <span className="heading-3d-gradient">Nexus Bloom</span>
            </h2>
            <p className="text-body-large text-gray-600 max-w-4xl mx-auto px-4 sm:px-0 text-lg">
              We're revolutionizing how businesses connect, automate, and grow through intelligent integration solutions that transform the digital landscape.
            </p>
            
            {/* 3D Decorative Elements */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Story & Mission */}
            <motion.div
              className="reveal-on-scroll space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* 3D Integration Icon */}
              <div className="mb-8">
                <img 
                  src="/images/3d-integration.svg" 
                  alt="Integration Platform"
                  className="w-24 h-24 mx-auto lg:mx-0"
                />
              </div>
              
              <div className="space-y-6">
                <h3 className="heading-4 text-gray-900">Our Story</h3>
                <p className="text-body text-gray-600 leading-relaxed">
                  Founded in 2023, Nexus Bloom emerged from a simple observation: businesses were drowning in disconnected tools and manual processes. Our founders, veterans in both enterprise software and startup ecosystems, recognized that the future belonged to those who could seamlessly connect their digital world.
                </p>
                <p className="text-body text-gray-600 leading-relaxed">
                  What started as a small team of integration enthusiasts has grown into a powerhouse of automation experts, serving thousands of businesses worldwide with cutting-edge AI-powered solutions.
                </p>
                
                {/* 3D Timeline */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-4 text-center">Our Journey</h4>
                  <img 
                    src="/images/3d-timeline.svg" 
                    alt="Company Timeline"
                    className="w-full max-w-sm mx-auto"
                  />
                </div>
                
                {/* Mission Statement */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-2xl border border-purple-100">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    Our Mission
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    To democratize enterprise-grade integration capabilities, making complex automation accessible to businesses of all sizes while maintaining the highest standards of security and reliability.
                  </p>
                </div>
                
                {/* Key Achievement */}
                <div className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">500+ Integrations</p>
                    <p className="text-sm text-gray-500">And counting every day</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Right Column - 3D Illustration & Stats */}
            <motion.div
              className="reveal-on-scroll space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* 3D Main Illustration */}
              <div className="text-center mb-8">
                <img 
                  src="/images/about-3d-illustration.svg" 
                  alt="Nexus Bloom Platform Overview"
                  className="w-full max-w-md mx-auto"
                />
              </div>
              
              {/* Enhanced Stats Grid */}
              <div className="glass-card rounded-2xl p-8 bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-xl">
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center group">
                    <div className="w-20 h-20 mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <img src="/images/3d-users.svg" alt="Happy Customers" className="w-full h-full" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">10,000+</h3>
                    <p className="text-sm text-gray-600 font-medium">Happy Customers</p>
                    <p className="text-xs text-gray-500 mt-1">Trusting our platform</p>
                  </div>
                  
                  <div className="text-center group">
                    <div className="w-20 h-20 mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <img src="/images/3d-globe.svg" alt="Global Reach" className="w-full h-full" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">50+</h3>
                    <p className="text-sm text-gray-600 font-medium">Countries Served</p>
                    <p className="text-xs text-gray-500 mt-1">Worldwide presence</p>
                  </div>
                  
                  <div className="text-center group">
                    <div className="w-20 h-20 mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <img src="/images/3d-uptime.svg" alt="Reliability" className="w-full h-full" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">99.9%</h3>
                    <p className="text-sm text-gray-600 font-medium">Uptime</p>
                    <p className="text-xs text-gray-500 mt-1">Enterprise reliability</p>
                  </div>
                  
                  <div className="text-center group">
                    <div className="w-20 h-20 mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <img src="/images/3d-award.svg" alt="Industry Recognition" className="w-full h-full" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors duration-300">15+</h3>
                    <p className="text-sm text-gray-600 font-medium">Industry Awards</p>
                    <p className="text-xs text-gray-500 mt-1">Excellence recognized</p>
                  </div>
                </div>
                
                {/* Additional Achievement */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-blue-100 px-4 py-2 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-gray-700">Trusted by Fortune 500 companies</span>
                    </div>
                    
                    {/* 3D Achievement Badge */}
                    <div className="flex justify-center">
                      <img 
                        src="/images/3d-achievement-badge.svg" 
                        alt="Excellence Award"
                        className="w-20 h-20 transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    <p className="text-xs text-gray-500 font-medium">Industry Excellence Award 2024</p>
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

      {/* Enhanced Features Section */}
      <EnhancedFeatures />

      {/* Innovative Section Divider */}
      <SectionDivider variant="sparkle" />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Services Section */}
      <section id="services" className="scroll-section bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            className="reveal-on-scroll text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ 
              opacity: 1, 
              y: 0, 
              scale: 1 
            }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 20,
              duration: 1
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 
              className="heading-3 md:text-4xl text-gray-900 mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 150,
                damping: 25,
                delay: 0.2
              }}
            >
              Our <motion.span 
                className="heading-3d-gradient"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  backgroundSize: "200% 200%"
                }}
              >
                Services
              </motion.span>
            </motion.h2>
            <motion.p 
              className="text-body-large text-gray-600 max-w-3xl mx-auto px-4 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 120,
                damping: 20,
                delay: 0.4
              }}
            >
              Comprehensive automation and development solutions to transform your business operations.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: "/images/automation-zap.svg",
                title: "n8n, Make, Zapier Automations",
                description: "Seamless integration with leading automation platforms. Connect workflows across multiple tools and services.",
                color: "from-purple-500 to-blue-600",
                category: "Automation"
              },
              {
                icon: "/images/ai-engine.svg",
                title: "AI Agents",
                description: "Intelligent AI agents that automate complex tasks, learn from patterns, and optimize your business processes.",
                color: "from-indigo-500 to-purple-600",
                category: "AI"
              },
              {
                icon: "/images/workflow-builder.svg",
                title: "Smart Workflows",
                description: "Build intelligent, adaptive workflows that respond to business events and optimize performance automatically.",
                color: "from-blue-500 to-cyan-600",
                category: "Workflow"
              },
              {
                icon: "/images/automation-zap.svg",
                title: "Business Automations",
                description: "End-to-end business process automation from lead capture to customer retention and everything in between.",
                color: "from-emerald-500 to-teal-600",
                category: "Automation"
              },
              {
                icon: "/images/3d-users.svg",
                title: "Lead Generation",
                description: "Automated lead generation systems that identify, qualify, and nurture prospects with AI-powered insights.",
                color: "from-orange-500 to-red-600",
                category: "Marketing"
              },
              {
                icon: "/images/3d-globe.svg",
                title: "Social Media Automation",
                description: "Automate social media posting, engagement, and analytics across all major platforms simultaneously.",
                color: "from-pink-500 to-rose-600",
                category: "Marketing"
              },
              {
                icon: "/images/3d-integration.svg",
                title: "CRM Integration",
                description: "Seamlessly integrate with popular CRM systems like Salesforce, HubSpot, and Pipedrive for unified customer data.",
                color: "from-violet-500 to-purple-600",
                category: "Integration"
              },
              {
                icon: "/images/brain-intelligence.svg",
                title: "Marketing AI Strategy",
                description: "AI-powered marketing strategies that analyze customer behavior and optimize campaigns in real-time.",
                color: "from-cyan-500 to-blue-600",
                category: "AI"
              },
              {
                icon: "/images/rest-api.svg",
                title: "API Development",
                description: "Custom API development and integration services to connect your systems with third-party applications.",
                color: "from-green-500 to-emerald-600",
                category: "Development"
              },
              {
                icon: "/images/3d-globe.svg",
                title: "Web Development",
                description: "Modern, responsive web applications built with cutting-edge technologies and best practices.",
                color: "from-yellow-500 to-orange-600",
                category: "Development"
              },
              {
                icon: "/images/3d-integration.svg",
                title: "Fullstack Development",
                description: "Complete fullstack development services from database design to frontend implementation and deployment.",
                color: "from-red-500 to-pink-600",
                category: "Development"
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                className="reveal-on-scroll glass-card rounded-2xl p-6 text-center group hover-lift relative overflow-hidden"
                initial={{ opacity: 0, y: 50, scale: 0.8, rotateX: -15 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1, 
                  rotateX: 0 
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: index * 0.15,
                  duration: 0.8
                }}
                whileHover={{ 
                  y: -15,
                  scale: 1.05,
                  rotateY: 5,
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
                viewport={{ once: true, margin: "-100px" }}
              >
                {/* Enhanced Animated Background with Spring Motion */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-10`}
                  animate={{ 
                    scale: 1.05,
                    rotate: 180,
                    opacity: 0.12
                  }}
                  transition={{ 
                    duration: 40, 
                    repeat: Infinity, 
                    ease: "linear"
                  }}
                />
                
                {/* Floating Particles Effect */}
                <motion.div
                  className="absolute inset-0 overflow-hidden"
                  animate={{ rotate: 180 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-2 h-2 bg-gradient-to-r ${service.color} rounded-full opacity-30`}
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${15 + i * 20}%`,
                      }}
                      animate={{
                        y: -15,
                        x: 8,
                        scale: 1.3,
                        opacity: 0.6
                      }}
                      transition={{
                        duration: 4 + i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.8
                      }}
                    />
                  ))}
                </motion.div>
                
                {/* Enhanced Category Badge with Spring Animation */}
                <motion.div 
                  className="absolute top-4 right-4"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 20,
                    delay: index * 0.15 + 0.3
                  }}
                >
                  <span className="px-3 py-1 text-xs font-medium bg-white/90 backdrop-blur-md rounded-full text-gray-700 border border-gray-200/60 shadow-sm">
                    {service.category}
                  </span>
                </motion.div>

                {/* Enhanced Icon Container with Spring Motion */}
                <motion.div 
                  className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-2xl relative overflow-hidden`}
                  whileHover={{ 
                    scale: 1.15,
                    rotate: 5,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                  animate={{
                    boxShadow: [
                      "0 10px 25px rgba(0,0,0,0.1)",
                      "0 20px 40px rgba(0,0,0,0.15)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                                     {/* Icon Background Glow */}
                   <motion.div
                     className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20`}
                     animate={{ 
                       scale: 1.2,
                       opacity: 0.3
                     }}
                     transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                   />
                  
                  <motion.img 
                    src={service.icon} 
                    alt={service.title}
                    className="w-10 h-10 object-contain filter brightness-0 invert relative z-10"
                    whileHover={{ 
                      scale: 1.2,
                      rotate: 360,
                      transition: { type: "spring", stiffness: 400, damping: 20 }
                    }}
                  />
                </motion.div>

                {/* Enhanced Content with Spring Animations */}
                <motion.div 
                  className="relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 150, 
                    damping: 20,
                    delay: index * 0.15 + 0.5
                  }}
                >
                  <motion.h3 
                    className="text-lg font-semibold text-gray-900 mb-3 leading-tight"
                    whileHover={{ 
                      scale: 1.05,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                  >
                    {service.title}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600 leading-relaxed text-sm"
                    whileHover={{ 
                      y: -2,
                      transition: { type: "spring", stiffness: 200, damping: 20 }
                    }}
                  >
                    {service.description}
                  </motion.p>
                </motion.div>

                {/* Enhanced Hover Effect Overlay with Spring Motion */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/10 opacity-0 group-hover:opacity-100 rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, transparent 0%, ${service.color.split(' ')[1]}15 50%, ${service.color.split(' ')[1]}25 100%)`
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: { type: "spring", stiffness: 200, damping: 25 }
                  }}
                />
                
                {/* Border Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(45deg, ${service.color.split(' ')[1]} 0%, transparent 50%, ${service.color.split(' ')[1]} 100%)`,
                    filter: 'blur(1px)',
                  }}
                  animate={{
                    opacity: 0.2,
                    scale: 1.02
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ 
              opacity: 1, 
              y: 0, 
              scale: 1 
            }}
            transition={{ 
              type: "spring",
              stiffness: 80,
              damping: 25,
              delay: 0.8
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p 
              className="text-gray-600 mb-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 120,
                damping: 20,
                delay: 1.0
              }}
            >
              Ready to transform your business with intelligent automation? Let's discuss how our services can help you achieve your goals.
            </motion.p>
            <motion.button
              className="btn-modern-primary px-8 py-4"
              whileHover={{ 
                scale: 1.02,
                y: -2,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              
              {/* Button Content */}
              <motion.span 
                className="relative z-10"
                whileHover={{ 
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 400, damping: 20 }
                }}
              >
                Get Started Today
              </motion.span>
              
              {/* Floating Particles around Button */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                  style={{
                    left: `${20 + i * 20}%`,
                    top: "50%",
                    transform: "translateY(-50%)"
                  }}
                  animate={{
                    y: -10,
                    x: 5,
                    opacity: 0.8,
                    scale: 1.3
                  }}
                  transition={{
                    duration: 3 + i * 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3
                  }}
                />
              ))}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Innovative Section Divider */}
      <SectionDivider variant="magnetic" />

      {/* Projects Section */}
      <section id="projects" className="scroll-section bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Enhanced 3D Background Elements - Modern design with better performance */}
        <div className="absolute inset-0 opacity-30">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 75 }}
            style={{ background: 'transparent' }}
            performance={{ min: 0.5 }}
            gl={{ antialias: false, powerPreference: "high-performance" }}
          >
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffffff" />
            <pointLight position={[-10, -10, -5]} intensity={0.4} color="#8B5CF6" />
            <pointLight position={[10, -10, -5]} intensity={0.3} color="#3B82F6" />
            
            {/* Enhanced 3D Background Elements */}
            <EnhancedProjectBackground />
          </Canvas>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <motion.div
            className="reveal-on-scroll text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-xl shadow-purple-500/25"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Sparkles className="w-4 h-4" />
              Showcasing Excellence
            </motion.div>
            
            <h2 className="heading-3 heading-3d md:text-6xl text-gray-900 mb-6">
              Innovation Portfolio
            </h2>
            <p className="text-body-large text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Explore our cutting-edge solutions that transform businesses through intelligent automation, seamless integration, and innovative technology.
            </p>
          </motion.div>

          {/* Enhanced Project Showcase */}
          <ProjectShowcase />
        </div>
      </section>

      {/* Innovative Section Divider */}
      <SectionDivider variant="flowing" />

      {/* Blogs Section */}
      <section id="blogs" className="scroll-section bg-gradient-to-br from-gray-50 via-white to-purple-50 bg-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            className="reveal-on-scroll text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="heading-3 heading-3d md:text-4xl text-gray-900 mb-4 sm:mb-6">
              Latest Insights & Updates
            </h2>
            <p className="text-body-large text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Stay updated with the latest trends, tips, and insights in automation and integration.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            className="reveal-on-scroll text-center mb-10 sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="heading-3 heading-3d text-gray-900 mb-4 sm:mb-6">Get in Touch</h2>
            <p className="text-body-large text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
              Ready to transform your business? Let's start a conversation about how Nexus Bloom can help.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contact Illustration */}
            <motion.div
              className="reveal-on-scroll text-center lg:text-left"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <img 
                src="/images/contact-illustration.svg" 
                alt="Contact us illustration"
                className="w-full max-w-md mx-auto lg:mx-0 mb-6"
              />
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Let's Build Something Amazing Together</h3>
                <p className="text-gray-600">
                  Our team of integration experts is ready to help you streamline your workflows, 
                  connect your applications, and unlock the full potential of your business.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>24/7 Support Available</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Free Consultation</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <div className="lg:order-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      
      {/* Cookie Consent Banner */}
      <CookieConsent />
      
      {/* Footer */}
      <Footer />
      
    </main>
  )
}
