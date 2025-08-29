'use client'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import EnhancedFeatures from '@/components/EnhancedFeatures'
import ThreeDBackground from '@/components/3DBackground'
import ScrollIndicator from '@/components/ScrollIndicator'
import ScrollProgress from '@/components/ScrollProgress'
import SectionDivider from '@/components/SectionDivider'
import ScrollDebug from '@/components/ScrollDebug'

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
  Sparkles,
  Mail,
  Phone,
  MessageSquare
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, Sphere, Box, Torus } from '@react-three/drei'
import EnhancedProjectBackground from '@/components/EnhancedProjectBackground'
import ProjectShowcase from '@/components/ProjectShowcase'
import ThreeJSParticles from '@/components/ThreeJSParticles'

export default function Home() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Ensure page starts at the top
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
    
    // Scroll progress is now handled by ScrollProgress component
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
    <main className="min-h-screen overflow-x-hidden">
      {/* 3D Interactive Background */}
      <ThreeDBackground />
      
      {/* Scroll Progress Bar */}
      <ScrollProgress />
      
      {/* Innovative Scroll Indicator */}
      <ScrollIndicator sections={sections} />
      
      {/* Scroll Debug Component (development only) */}
      <ScrollDebug />
      
      <Navigation />
      
      {/* Hero Section */}
      <section id="home" className="scroll-section bg-gradient-to-br from-gray-50 via-white to-purple-50 bg-pattern overflow-hidden">
        <div className="parallax-layer">
          <motion.div
            className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-100/60 to-blue-100/60 rounded-full blur-3xl opacity-50"
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
            <img src="/images/floating-3d-elements.svg" alt="" className="w-24 h-24 floating-elements about-image-hover" />
          </div>
          <div className="absolute bottom-32 left-20 opacity-20 animate-float-medium">
            <img src="/images/floating-3d-elements.svg" alt="" className="w-20 h-20 floating-elements about-image-hover" />
          </div>
          <div className="absolute top-1/3 left-1/4 opacity-15 animate-float-fast">
            <img src="/images/floating-3d-elements.svg" alt="" className="w-16 h-16 floating-elements about-image-hover" />
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <motion.div
            className="reveal-on-scroll text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="heading-3 heading-3d md:text-5xl text-gray-900 mb-6 sm:mb-8">
              About <span className="heading-3d-gradient">Nexus Bloom</span>
            </h2>
            <p className="text-body-large text-gray-600 max-w-4xl mx-auto px-4 sm:px-0 text-lg">
              We're revolutionizing how businesses automate, integrate, and grow through intelligent AI agents and cutting-edge automation solutions that transform operations 24/7.
            </p>
            
            {/* 3D Decorative Elements */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Story & Mission */}
            <motion.div
              className="reveal-on-scroll space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* 3D Integration Icon */}
              <div className="mb-6">
                <img 
                  src="/images/3d-integration.svg" 
                  alt="Integration Platform"
                  className="w-24 h-24 mx-auto lg:mx-0 integration-icon about-image-hover animate-image-float"
                />
              </div>
              
              <div className="space-y-5">
                <h3 className="heading-4 text-gray-900">Our Story</h3>
                <p className="text-body text-gray-600 leading-relaxed">
                  Founded in 2023, Nexus Bloom emerged from a deep understanding of the automation challenges businesses face daily. Our founder, a certified Make.com and n8n automation expert with 5+ years of hands-on experience, recognized that businesses were drowning in manual processes and disconnected tools.
                </p>
                <p className="text-body text-gray-600 leading-relaxed">
                  What started as a passion for building AI agents and voice systems has grown into a powerhouse of automation expertise, serving businesses worldwide with intelligent solutions that save 20+ hours weekly and boost close rates through smart CRM workflows.
                </p>
                
                {/* 3D Timeline */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-3 text-center">Our Journey</h4>
                  <img 
                    src="/images/3d-timeline.svg" 
                    alt="Company Timeline"
                    className="w-full max-w-sm mx-auto timeline-image about-image-hover animate-image-glow"
                  />
                </div>
                
                {/* Mission Statement */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-5 rounded-2xl border border-purple-100">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    Our Mission
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    To democratize enterprise-grade automation capabilities, making complex AI agents, voice systems, and workflow automation accessible to businesses of all sizes while maintaining the highest standards of security and reliability.
                  </p>
                </div>
                
                {/* Key Achievement */}
                <div className="flex items-center space-x-4 bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">500+ Automations</p>
                    <p className="text-sm text-gray-500">Built & deployed successfully</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Right Column - 3D Illustration & Stats */}
            <motion.div
              className="reveal-on-scroll space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* 3D Main Illustration */}
              <div className="text-center mb-6">
                <img 
                  src="/images/about-3d-illustration.svg" 
                  alt="Nexus Bloom Platform Overview"
                  className="w-full max-w-md mx-auto about-image-hover animate-image-float"
                />
              </div>
              
              {/* Enhanced Stats Grid */}
              <div className="glass-card rounded-2xl p-6 bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center group">
                    <div className="w-20 h-20 mx-auto mb-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <img src="/images/3d-users.svg" alt="Automations Built" className="w-full h-full stats-image about-image-interactive" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">500+</h3>
                    <p className="text-sm text-gray-600 font-medium">Automations Built</p>
                    <p className="text-xs text-gray-500 mt-1">Successfully deployed</p>
                  </div>
                  
                  <div className="text-center group">
                    <div className="w-20 h-20 mx-auto mb-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <img src="/images/3d-globe.svg" alt="Hours Saved" className="w-full h-full stats-image about-image-interactive" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">20+</h3>
                    <p className="text-sm text-gray-600 font-medium">Hours Saved Weekly</p>
                    <p className="text-sm text-gray-500 mt-1">Per business</p>
                  </div>
                  
                  <div className="text-center group">
                    <div className="w-20 h-20 mx-auto mb-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <img src="/images/3d-uptime.svg" alt="AI Operations" className="w-full h-full stats-image about-image-interactive" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">24/7</h3>
                    <p className="text-sm text-gray-600 font-medium">AI Agent Operations</p>
                    <p className="text-xs text-gray-500 mt-1">Always available</p>
                  </div>
                  
                  <div className="text-center group">
                    <div className="w-20 h-20 mx-auto mb-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <img src="/images/3d-award.svg" alt="Experience" className="w-full h-full stats-image about-image-interactive" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors duration-300">5+</h3>
                    <p className="text-sm text-gray-600 font-medium">Years Experience</p>
                    <p className="text-xs text-gray-500 mt-1">Automation expert</p>
                  </div>
                </div>
                
                {/* Additional Achievement */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="text-center space-y-3">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-blue-100 px-4 py-2 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-gray-700">Certified Make.com & n8n Expert</span>
                    </div>
                    
                    {/* 3D Achievement Badge */}
                    <div className="flex justify-center">
                      <img 
                        src="/images/3d-achievement-badge.svg" 
                        alt="Automation Expert"
                        className="w-20 h-20 transition-transform duration-300 hover:scale-110 achievement-badge about-image-hover animate-image-bounce"
                      />
                    </div>
                    <p className="text-xs text-gray-500 font-medium">Automation Excellence 2024</p>
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
      <section id="features" className="scroll-section bg-gradient-to-br from-gray-50 via-white to-purple-50 bg-pattern overflow-hidden">
        <Features />
      </section>

      {/* Innovative Section Divider */}
      <SectionDivider variant="flowing" />

      {/* Enhanced Features Section */}
      <EnhancedFeatures />

      {/* Innovative Section Divider */}
      <SectionDivider variant="sparkle" />

      {/* Services Section */}
      <section id="services" className="scroll-section bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
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
              Comprehensive AI automation, voice agents, and workflow solutions to transform your business operations 24/7.
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
              Ready to transform your business with AI agents and intelligent automation? Let's discuss how our services can save you 20+ hours weekly and boost your close rates.
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
              Explore our cutting-edge AI automation solutions that transform businesses through intelligent voice agents, smart CRM workflows, and 24/7 operational efficiency.
            </p>
          </motion.div>

          {/* Enhanced Project Showcase */}
          <ProjectShowcase />
        </div>
      </section>

      {/* Innovative Section Divider */}
      <SectionDivider variant="flowing" />

      {/* Blogs Section */}
      <section id="blogs" className="scroll-section bg-gradient-to-br from-gray-50 via-white to-purple-50 bg-pattern overflow-hidden">
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
              Stay updated with the latest trends, tips, and insights in AI automation, voice agents, and workflow optimization.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {[
              {
                title: "AI Voice Agents: The Future of Customer Service",
                excerpt: "Discover how AI voice agents are revolutionizing customer service and lead qualification 24/7.",
                image: "🎤",
                category: "AI",
                readTime: "5 min read",
                date: "Dec 15, 2024"
              },
              {
                title: "n8n vs Make.com: Which Automation Platform to Choose",
                excerpt: "A comprehensive comparison of leading automation platforms to help you choose the right solution.",
                image: "⚖️",
                category: "Guide",
                readTime: "8 min read",
                date: "Dec 12, 2024"
              },
              {
                title: "Top 10 AI Automation Mistakes to Avoid",
                excerpt: "Learn from common pitfalls and ensure your AI automation projects succeed from the start.",
                image: "⚠️",
                category: "Tips",
                readTime: "6 min read",
                date: "Dec 10, 2024"
              },
              {
                title: "Building Scalable AI Agent Architecture",
                excerpt: "Best practices for designing AI agent systems that grow with your business and handle increasing complexity.",
                image: "🏗️",
                category: "Technical",
                readTime: "10 min read",
                date: "Dec 8, 2024"
              },
              {
                title: "AI-Powered CRM Workflows: Boost Your Close Rates",
                excerpt: "Exploring how AI-driven CRM automation can significantly increase your sales conversion rates.",
                image: "📈",
                category: "AI",
                readTime: "7 min read",
                date: "Dec 5, 2024"
              },
              {
                title: "Customer Success Stories: 20+ Hours Saved Weekly",
                excerpt: "Inspiring stories from businesses that transformed their operations with Nexus Bloom's AI automation.",
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

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden relative">
        {/* 3D Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-200/40 to-blue-200/40 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-indigo-200/40 to-purple-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Let&apos;s discuss how AI automation can transform your business and save you 20+ hours weekly.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Three.js 3D Scene - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="h-96 lg:h-[500px] relative"
            >
              <Canvas
                camera={{ position: [0, 0, 8], fov: 75 }}
                style={{ background: 'transparent' }}
                className="w-full h-full"
              >
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                
                {/* Central AI Brain */}
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                  <Sphere 
                    args={[1.2, 32, 32]} 
                    position={[0, 0, 0]}
                  >
                    <meshStandardMaterial 
                      color="#8B5CF6" 
                      transparent 
                      opacity={0.9}
                      metalness={0.3}
                      roughness={0.1}
                      emissive="#4338CA"
                      emissiveIntensity={0.2}
                    />
                  </Sphere>
                </Float>

                {/* Orbiting Elements */}
                <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
                  <Box 
                    args={[0.6, 0.6, 0.6]} 
                    position={[3, 2, 0]}
                  >
                    <meshStandardMaterial 
                      color="#10B981" 
                      transparent 
                      opacity={0.8}
                      metalness={0.4}
                      roughness={0.2}
                    />
                  </Box>
                </Float>

                <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.4}>
                  <Torus 
                    args={[1.5, 0.4, 16, 32]} 
                    position={[-3, -1, 0]}
                  >
                    <meshStandardMaterial 
                      color="#F59E0B" 
                      transparent 
                      opacity={0.7}
                      metalness={0.2}
                      roughness={0.3}
                    />
                  </Torus>
                </Float>

                {/* Floating Particles */}
                {Array.from({ length: 15 }).map((_, i) => (
                  <Float key={i} speed={1 + Math.random()} rotationIntensity={0.2} floatIntensity={0.3}>
                    <Sphere 
                      args={[0.1 + Math.random() * 0.2, 16, 16]} 
                      position={[
                        (Math.random() - 0.5) * 6,
                        (Math.random() - 0.5) * 6,
                        (Math.random() - 0.5) * 6
                      ]}
                    >
                      <meshStandardMaterial 
                        color={['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B'][Math.floor(Math.random() * 4)]}
                        transparent 
                        opacity={0.6}
                      />
                    </Sphere>
                  </Float>
                ))}

                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
              </Canvas>
            </motion.div>

            {/* Contact Form - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Get in Touch
                </h3>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        placeholder="Your first name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        placeholder="Your last name"
                        required
                      />
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your company name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      placeholder="your.email@company.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell us about your automation needs..."
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <Send className="w-5 h-5 inline mr-2" />
                    Send Message
                  </button>
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
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Innovative Section Divider */}
      <SectionDivider variant="magnetic" />
      
      {/* Cookie Consent Banner */}
      <CookieConsent />
      
      {/* Footer */}
      <Footer />
      
    </main>
  )
}
