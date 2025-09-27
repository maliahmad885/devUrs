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
import ClientWizard from '@/components/ClientWizard'

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
  const [isWizardOpen, setIsWizardOpen] = useState(false)

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
        <div className="min-h-screen bg-gradient-to-br from-[#3B82F6]/10 via-white to-[#10B981]/10 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#3B82F6] to-[#10B981] rounded-full animate-spin mx-auto mb-4"></div>
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
      <section id="home" className="scroll-section bg-gradient-to-br from-[#22c55e]/10 via-white to-[#0ea5e9]/10 bg-pattern overflow-hidden">
        <Hero />
      </section>

      {/* Innovative Section Divider */}
      <Suspense fallback={null}>
        <SectionDivider variant="magnetic" />
      </Suspense>

      {/* About Section - Enhanced with Credibility */}
      <section id="about" className="scroll-section bg-gradient-to-br from-[#3B82F6]/5 via-white to-[#10B981]/5 relative overflow-hidden">
        {/* Simplified background without heavy 3D elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#3B82F6]/20 to-[#10B981]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-[#10B981]/20 to-[#3B82F6]/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          {/* About content - enhanced version */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-gray-900 mb-6 sm:mb-8 font-bold">
              Why <span className="bg-gradient-to-r from-[#3B82F6] to-[#10B981] bg-clip-text text-transparent">200+ Businesses</span> Trust Us
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto px-4 sm:px-0">
              We&apos;re not just another development agency. We&apos;re expert developers who deliver cutting-edge solutions and guaranteed results. Here&apos;s why businesses choose us over competitors.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Credibility & Story */}
            <div className="space-y-8">
              {/* Certifications */}
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-xl rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical Expertise</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-[#3B82F6]/10 to-[#10B981]/10 rounded-xl">
                    <div className="text-2xl mb-2">🏆</div>
                    <div className="text-sm font-semibold text-gray-800">React/Next.js Expert</div>
                    <div className="text-xs text-gray-600">5+ Years</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-[#10B981]/10 to-[#3B82F6]/10 rounded-xl">
                    <div className="text-2xl mb-2">🎯</div>
                    <div className="text-sm font-semibold text-gray-800">Mobile Development</div>
                    <div className="text-xs text-gray-600">React Native</div>
                  </div>
                </div>
              </div>

              {/* Client Testimonial */}
              <div className="bg-gradient-to-br from-[#3B82F6]/10 to-[#10B981]/10 rounded-2xl p-6 border border-[#3B82F6]/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#10B981] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">S</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Sarah Johnson</div>
                    <div className="text-sm text-gray-600">CEO, TechStart Inc.</div>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  "DevUrs built us an amazing mobile app that increased our user engagement by 400%. The development process was smooth and the final product exceeded our expectations."
                </p>
                <div className="flex text-yellow-500">
                  <span>★★★★★</span>
                </div>
              </div>

              {/* Our Mission */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  We build cutting-edge software solutions that transform businesses and drive growth. Our expert developers don't just write code – we deliver scalable applications that deliver measurable results.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Every client gets a dedicated development team, guaranteed quality, and ongoing support. We're so confident in our work that we offer a free consultation to show you exactly how we can help your business grow.
                </p>
              </div>
            </div>
            
            {/* Right Column - Enhanced Stats & Results */}
            <div className="space-y-8">
              {/* Real Results */}
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-xl rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Proven Results</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#10B981] bg-clip-text text-transparent mb-2">$10M+</h3>
                    <p className="text-sm text-gray-600 font-medium">Revenue Generated</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent mb-2">400%</h3>
                    <p className="text-sm text-gray-600 font-medium">Avg User Growth</p>
                </div>
                <div className="text-center">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#10B981] bg-clip-text text-transparent mb-2">200+</h3>
                  <p className="text-sm text-gray-600 font-medium">Projects Delivered</p>
                </div>
                <div className="text-center">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent mb-2">99%</h3>
                    <p className="text-sm text-gray-600 font-medium">Client Satisfaction</p>
                  </div>
                </div>
              </div>

              {/* Process */}
              <div className="bg-gradient-to-br from-[#3B82F6]/10 to-[#10B981]/10 rounded-2xl p-6 border border-[#3B82F6]/20">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Process</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#3B82F6] to-[#10B981] rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                    <span className="text-gray-700">Free consultation & project planning</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#10B981] to-[#3B82F6] rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                    <span className="text-gray-700">Design & development strategy</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#3B82F6] to-[#10B981] rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                    <span className="text-gray-700">Development & testing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#10B981] to-[#3B82F6] rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                    <span className="text-gray-700">Deployment & ongoing support</span>
                  </div>
                </div>
              </div>

              {/* Free Consultation */}
              <div className="text-center bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                <div className="text-4xl mb-2">🎯</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Project Consultation</h3>
                <p className="text-sm text-gray-600">Get a free consultation and discover exactly how we can transform your business with custom software solutions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="scroll-section bg-gradient-to-br from-[#f59e0b]/5 via-white to-[#22c55e]/5 bg-pattern overflow-hidden">
        <Features />
      </section>

      {/* Enhanced Features Section */}
      <EnhancedFeatures />


      {/* Case Studies Section - Client Success Stories */}
      <section id="projects" className="scroll-section bg-gradient-to-br from-[#f59e0b]/5 via-white to-[#22c55e]/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl text-gray-900 mb-6 font-bold">
              <span className="text-gray-900">Real </span>
              <span className="bg-gradient-to-r from-[#22c55e] to-[#0ea5e9] bg-clip-text text-transparent">Success Stories</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              See how our clients transformed their businesses and achieved growth with our development solutions. These are real results from real businesses.
            </p>
          </div>

          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Case Study 1 */}
            <div className="bg-white/90 backdrop-blur-md border border-gray-200/50 shadow-xl rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#22c55e] to-[#0ea5e9] rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Mobile App</h3>
                  <p className="text-gray-600">Fitness & Wellness Platform</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Challenge:</h4>
                  <p className="text-gray-600">Need for a cross-platform mobile app with real-time features, user engagement, and payment integration</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                  <p className="text-gray-600">React Native app with real-time tracking, push notifications, and secure payment processing</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Results:</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                      <div className="text-2xl font-bold text-green-600">50k+</div>
                      <div className="text-sm text-gray-600">Downloads</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600">4.8★</div>
                      <div className="text-sm text-gray-600">App Store Rating</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <p className="text-gray-700 italic mb-2">
                  "DevUrs built us an amazing mobile app that our users love. The development process was smooth and the final product exceeded our expectations."
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-900">- Mike Chen, CEO</span>
                  <div className="flex text-yellow-500">
                    <span>★★★★★</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="bg-white/90 backdrop-blur-md border border-gray-200/50 shadow-xl rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0ea5e9] to-[#f59e0b] rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">W</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Web Platform</h3>
                  <p className="text-gray-600">E-commerce Marketplace</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Challenge:</h4>
                  <p className="text-gray-600">Need for a scalable e-commerce platform with multi-vendor support, payment processing, and inventory management</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                  <p className="text-gray-600">Next.js web application with Stripe integration, real-time inventory, and vendor dashboard</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Results:</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                      <div className="text-2xl font-bold text-purple-600">$2M+</div>
                      <div className="text-sm text-gray-600">Revenue Generated</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
                      <div className="text-2xl font-bold text-orange-600">500+</div>
                      <div className="text-sm text-gray-600">Active Vendors</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <p className="text-gray-700 italic mb-2">
                  "The e-commerce platform DevUrs built for us handles thousands of transactions daily. The performance and user experience are exceptional."
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-900">- Sarah Johnson, CMO</span>
                  <div className="flex text-yellow-500">
                    <span>★★★★★</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study 3 */}
            <div className="bg-white/90 backdrop-blur-md border border-gray-200/50 shadow-xl rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#f59e0b] to-[#d97706] rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">C</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">CRM System</h3>
                  <p className="text-gray-600">Customer Relationship Management</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Challenge:</h4>
                  <p className="text-gray-600">Need for a custom CRM system with lead tracking, sales pipeline management, and team collaboration features</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                  <p className="text-gray-600">Custom CRM built with React, Node.js, and MongoDB with real-time updates and mobile access</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Results:</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl">
                      <div className="text-2xl font-bold text-teal-600">60%</div>
                      <div className="text-sm text-gray-600">Sales Increase</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                      <div className="text-2xl font-bold text-indigo-600">3x</div>
                      <div className="text-sm text-gray-600">Faster Deals</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <p className="text-gray-700 italic mb-2">
                  "The custom CRM DevUrs built transformed our sales process. Our team is more organized and we close deals 3x faster than before."
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-900">- Alex Rodriguez, Founder</span>
                  <div className="flex text-yellow-500">
                    <span>★★★★★</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study 4 */}
            <div className="bg-white/90 backdrop-blur-md border border-gray-200/50 shadow-xl rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#d97706] to-[#22c55e] rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">SaaS Platform</h3>
                  <p className="text-gray-600">Software as a Service</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Challenge:</h4>
                  <p className="text-gray-600">Need for a scalable SaaS platform with subscription management, user analytics, and multi-tenant architecture</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                  <p className="text-gray-600">Full-stack SaaS platform with React frontend, Node.js backend, and AWS cloud infrastructure</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Results:</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl">
                      <div className="text-2xl font-bold text-emerald-600">10k+</div>
                      <div className="text-sm text-gray-600">Active Users</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl">
                      <div className="text-2xl font-bold text-rose-600">$1M+</div>
                      <div className="text-sm text-gray-600">ARR Generated</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <p className="text-gray-700 italic mb-2">
                  "The SaaS platform DevUrs developed for us is robust, scalable, and user-friendly. It's been the foundation of our $1M+ ARR growth."
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-900">- David Kim, Managing Partner</span>
                  <div className="flex text-yellow-500">
                    <span>★★★★★</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-[#22c55e]/10 to-[#0ea5e9]/10 rounded-2xl p-8 border border-[#22c55e]/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Transform Your Business?</h3>
            <p className="text-gray-600 mb-6">Join 200+ businesses already growing with our development solutions.</p>
            <button 
              onClick={() => setIsWizardOpen(true)}
              className="bg-gradient-to-r from-[#22c55e] to-[#0ea5e9] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              Get Your Free Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Blogs Section - Simplified */}
      <section id="blogs" className="scroll-section bg-gradient-to-br from-gray-50 via-white to-blue-50 bg-pattern overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl md:text-5xl text-gray-900 mb-4 sm:mb-6 font-bold">
              Latest Insights & Updates
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Stay updated with the latest trends, tips, and insights in mobile app development, web technologies, and software engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "React Native vs Flutter: Choosing the Right Mobile Framework",
                excerpt: "A comprehensive comparison of React Native and Flutter to help you choose the best framework for your mobile app.",
                category: "Mobile",
                readTime: "8 min read",
                date: "Dec 15, 2024"
              },
              {
                title: "Next.js vs React: Which Framework to Choose in 2024",
                excerpt: "Discover the key differences between Next.js and React to make the right choice for your web application.",
                category: "Web",
                readTime: "6 min read",
                date: "Dec 12, 2024"
              },
              {
                title: "Top 10 Development Best Practices for 2024",
                excerpt: "Learn the essential best practices every developer should follow to build scalable and maintainable applications.",
                category: "Tips",
                readTime: "10 min read",
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
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{blog.date}</span>
                    <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm hover:translate-x-1 transition-all duration-300">
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

      {/* Client Wizard Modal */}
      <ClientWizard 
        isOpen={isWizardOpen} 
        onClose={() => setIsWizardOpen(false)} 
      />

      {/* Cookie Consent Banner */}
      <CookieConsent />
      
      {/* Footer */}
      <Footer />
      
      <ScrollToTop />
    </main>
  )
}
