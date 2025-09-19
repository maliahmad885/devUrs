'use client'

import { Suspense, lazy, useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import EnhancedFeatures from '@/components/EnhancedFeatures'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/CookieConsent'
import ScrollToTop from '@/components/ScrollToTop'
import ContactSection from '@/components/ContactSection'

// Lazy load heavy components
const ThreeDBackground = lazy(() => import('@/components/3DBackground'))
const ScrollIndicator = lazy(() => import('@/components/ScrollIndicator'))
const ScrollProgress = lazy(() => import('@/components/ScrollProgress'))
const SectionDivider = lazy(() => import('@/components/SectionDivider'))
const ScrollDebug = lazy(() => import('@/components/ScrollDebug'))
const ProjectShowcase = lazy(() => import('@/components/ProjectShowcase'))

// Loading component for lazy-loaded components
const LoadingFallback = () => (
  <div className="w-full h-32 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-lg" />
)

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsClient(true)
    
    // Ensure page starts at the top
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
    
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  const sections = ['home', 'about', 'features', 'services', 'projects', 'blogs', 'contact']

  // Don't render scroll-related components during SSR
  if (!isClient || isLoading) {
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
        <ScrollToTop />
      </main>
    )
  }

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* 3D Interactive Background - Lazy loaded */}
      <Suspense fallback={<LoadingFallback />}>
        <ThreeDBackground />
      </Suspense>
      
      {/* Scroll Progress Bar - Lazy loaded */}
      <Suspense fallback={null}>
        <ScrollProgress />
      </Suspense>
      
      {/* Innovative Scroll Indicator - Lazy loaded */}
      <Suspense fallback={null}>
        <ScrollIndicator sections={sections} />
      </Suspense>
      
      {/* Scroll Debug Component (development only) - Lazy loaded */}
      <Suspense fallback={null}>
        <ScrollDebug />
      </Suspense>
      
      <Navigation />
      
      {/* Hero Section */}
      <section id="home" className="scroll-section bg-gradient-to-br from-gray-50 via-white to-purple-50 bg-pattern overflow-hidden">
        <Hero />
      </section>

      {/* Innovative Section Divider */}
      <Suspense fallback={null}>
        <SectionDivider variant="magnetic" />
      </Suspense>

      {/* About Section */}
      <section id="about" className="scroll-section bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Simplified background without heavy 3D elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-green-400 to-blue-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          {/* About content - simplified version */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl md:text-5xl text-gray-900 mb-6 sm:mb-8 font-bold">
              About <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">AI Solutions</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto px-4 sm:px-0">
              We&apos;re revolutionizing how businesses automate, integrate, and grow through intelligent AI agents and cutting-edge automation solutions that transform operations 24/7.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Story & Mission */}
            <div className="space-y-6">
              <div className="space-y-5">
                <h3 className="text-2xl font-semibold text-gray-900">Our Story</h3>
                <p className="text-gray-600 leading-relaxed">
                  Founded in 2023, AI Solutions emerged from a deep understanding of the automation challenges businesses face daily. Our founder, a certified Make.com and n8n automation expert with 5+ years of hands-on experience, recognized that businesses were drowning in manual processes and disconnected tools.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  What started as a passion for building AI agents and voice systems has grown into a powerhouse of automation expertise, serving businesses worldwide with intelligent solutions that save 20+ hours weekly and boost close rates through smart CRM workflows.
                </p>
              </div>
            </div>
            
            {/* Right Column - Stats */}
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-xl rounded-2xl p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">500+</h3>
                  <p className="text-sm text-gray-600 font-medium">Automations Built</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">20+</h3>
                  <p className="text-sm text-gray-600 font-medium">Hours Saved Weekly</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">24/7</h3>
                  <p className="text-sm text-gray-600 font-medium">AI Agent Operations</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">5+</h3>
                  <p className="text-sm text-gray-600 font-medium">Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="scroll-section bg-gradient-to-br from-gray-50 via-white to-purple-50 bg-pattern overflow-hidden">
        <Features />
      </section>

      {/* Enhanced Features Section */}
      <EnhancedFeatures />

      {/* Services Section - Simplified */}
      <section id="services" className="scroll-section bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl md:text-5xl text-gray-900 mb-4 sm:mb-6 font-bold">
              Our <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Comprehensive AI automation, voice agents, and workflow solutions to transform your business operations 24/7.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "n8n, Make, Zapier Automations",
                description: "Seamless integration with leading automation platforms. Connect workflows across multiple tools and services.",
                category: "Automation",
                image: "/images/automation-zap.svg"
              },
              {
                title: "AI Agents",
                description: "Intelligent AI agents that automate complex tasks, learn from patterns, and optimize your business processes.",
                category: "AI",
                image: "/images/ai-engine.svg"
              },
              {
                title: "Smart Workflows",
                description: "Build intelligent, adaptive workflows that respond to business events and optimize performance automatically.",
                category: "Workflow",
                image: "/images/workflow-builder.svg"
              },
              {
                title: "Business Automations",
                description: "End-to-end business process automation from lead capture to customer retention and everything in between.",
                category: "Automation",
                image: "/images/ai-automation-flow.svg"
              },
              {
                title: "Lead Generation",
                description: "Automated lead generation systems that identify, qualify, and nurture prospects with AI-powered insights.",
                category: "Marketing",
                image: "/images/brain-intelligence.svg"
              },
              {
                title: "CRM Integration",
                description: "Seamlessly integrate with popular CRM systems like Salesforce, HubSpot, and Pipedrive for unified customer data.",
                category: "Integration",
                image: "/images/3d-integration.svg"
              }
            ].map((service, index) => (
              <div
                key={service.title}
                className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-xl rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-10 h-10 text-white"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm mb-4">
                  {service.description}
                </p>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                  {service.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - Lazy loaded */}
      <section id="projects" className="scroll-section bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl text-gray-900 mb-6 font-bold">
              Innovation Portfolio
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Explore our cutting-edge AI automation solutions that transform businesses through intelligent voice agents, smart CRM workflows, and 24/7 operational efficiency.
            </p>
          </div>

          <Suspense fallback={<LoadingFallback />}>
            <ProjectShowcase />
          </Suspense>
        </div>
      </section>

      {/* Blogs Section - Simplified */}
      <section id="blogs" className="scroll-section bg-gradient-to-br from-gray-50 via-white to-purple-50 bg-pattern overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl md:text-5xl text-gray-900 mb-4 sm:mb-6 font-bold">
              Latest Insights & Updates
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Stay updated with the latest trends, tips, and insights in AI automation, voice agents, and workflow optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "AI Voice Agents: The Future of Customer Service",
                excerpt: "Discover how AI voice agents are revolutionizing customer service and lead qualification 24/7.",
                category: "AI",
                readTime: "5 min read",
                date: "Dec 15, 2024"
              },
              {
                title: "n8n vs Make.com: Which Automation Platform to Choose",
                excerpt: "A comprehensive comparison of leading automation platforms to help you choose the right solution.",
                category: "Guide",
                readTime: "8 min read",
                date: "Dec 12, 2024"
              },
              {
                title: "Top 10 AI Automation Mistakes to Avoid",
                excerpt: "Learn from common pitfalls and ensure your AI automation projects succeed from the start.",
                category: "Tips",
                readTime: "6 min read",
                date: "Dec 10, 2024"
              }
            ].map((blog, index) => (
              <div
                key={blog.title}
                className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {blog.category}
                    </span>
                    <span className="text-sm text-gray-500">{blog.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-purple-600 transition-colors duration-300 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{blog.date}</span>
                    <button className="text-purple-600 hover:text-purple-700 font-semibold text-sm hover:translate-x-1 transition-all duration-300">
                      Read More →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />

      {/* Cookie Consent Banner */}
      <CookieConsent />
      
      {/* Footer */}
      <Footer />
      
      <ScrollToTop />
    </main>
  )
}
