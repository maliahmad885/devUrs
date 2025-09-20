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
        <div className="min-h-screen bg-gradient-to-br from-[#F85B5D]/10 via-white to-[#7661FB]/10 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#F85B5D] to-[#7661FB] rounded-full animate-spin mx-auto mb-4"></div>
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
      <section id="home" className="scroll-section bg-gradient-to-br from-[#F85B5D]/10 via-white to-[#7661FB]/10 bg-pattern overflow-hidden">
        <Hero />
      </section>

      {/* Innovative Section Divider */}
      <Suspense fallback={null}>
        <SectionDivider variant="magnetic" />
      </Suspense>

      {/* About Section - Enhanced with Credibility */}
      <section id="about" className="scroll-section bg-gradient-to-br from-[#F85B5D]/5 via-white to-[#7661FB]/5 relative overflow-hidden">
        {/* Simplified background without heavy 3D elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#F85B5D]/20 to-[#7661FB]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-[#DB4DBA]/20 to-[#FCA207]/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          {/* About content - enhanced version */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-gray-900 mb-6 sm:mb-8 font-bold">
              Why <span className="bg-gradient-to-r from-[#F85B5D] to-[#7661FB] bg-clip-text text-transparent">500+ Businesses</span> Trust Us
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto px-4 sm:px-0">
              We&apos;re not just another automation company. We&apos;re certified experts who deliver measurable results and guaranteed ROI. Here&apos;s why businesses choose us over competitors.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Credibility & Story */}
            <div className="space-y-8">
              {/* Certifications */}
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-xl rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Certified Expertise</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-[#F85B5D]/10 to-[#7661FB]/10 rounded-xl">
                    <div className="text-2xl mb-2">🏆</div>
                    <div className="text-sm font-semibold text-gray-800">Make.com Certified</div>
                    <div className="text-xs text-gray-600">Expert Level</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-[#7661FB]/10 to-[#DB4DBA]/10 rounded-xl">
                    <div className="text-2xl mb-2">🎯</div>
                    <div className="text-sm font-semibold text-gray-800">n8n Certified</div>
                    <div className="text-xs text-gray-600">Advanced</div>
                  </div>
                </div>
              </div>

              {/* Client Testimonial */}
              <div className="bg-gradient-to-br from-[#F85B5D]/10 to-[#7661FB]/10 rounded-2xl p-6 border border-[#F85B5D]/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#F85B5D] to-[#7661FB] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">S</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Sarah Johnson</div>
                    <div className="text-sm text-gray-600">CEO, TechStart Inc.</div>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  "AI Solutions saved us 25 hours per week and increased our lead conversion by 300%. The ROI was evident within the first month. Best investment we've made."
                </p>
                <div className="flex text-yellow-500">
                  <span>★★★★★</span>
                </div>
              </div>

              {/* Our Mission */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  We eliminate the manual work that's costing your business thousands every month. Our certified experts don't just build automations – we deliver measurable results that pay for themselves.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Every client gets a dedicated automation expert, guaranteed results, and ongoing support. We're so confident in our work that we offer a free automation audit to show you exactly how much you can save.
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
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-[#F85B5D] to-[#7661FB] bg-clip-text text-transparent mb-2">$5M+</h3>
                    <p className="text-sm text-gray-600 font-medium">Client Savings</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-[#7661FB] to-[#DB4DBA] bg-clip-text text-transparent mb-2">300%</h3>
                    <p className="text-sm text-gray-600 font-medium">Avg Lead Increase</p>
                </div>
                <div className="text-center">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-[#DB4DBA] to-[#FCA207] bg-clip-text text-transparent mb-2">25h</h3>
                  <p className="text-sm text-gray-600 font-medium">Hours Saved Weekly</p>
                </div>
                <div className="text-center">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-[#FCA207] to-[#F85B5D] bg-clip-text text-transparent mb-2">99%</h3>
                    <p className="text-sm text-gray-600 font-medium">Client Satisfaction</p>
                  </div>
                </div>
              </div>

              {/* Process */}
              <div className="bg-gradient-to-br from-[#7661FB]/10 to-[#DB4DBA]/10 rounded-2xl p-6 border border-[#7661FB]/20">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Process</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#F85B5D] to-[#7661FB] rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                    <span className="text-gray-700">Free automation audit & consultation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#7661FB] to-[#DB4DBA] rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                    <span className="text-gray-700">Custom automation strategy & timeline</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#DB4DBA] to-[#FCA207] rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                    <span className="text-gray-700">Implementation & testing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#FCA207] to-[#F85B5D] rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                    <span className="text-gray-700">Training & ongoing support</span>
                  </div>
                </div>
              </div>

              {/* Free Consultation */}
              <div className="text-center bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                <div className="text-4xl mb-2">🎯</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Automation Audit</h3>
                <p className="text-sm text-gray-600">Get a free consultation and discover exactly how much time and money you're losing to manual work.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="scroll-section bg-gradient-to-br from-[#FCA207]/5 via-white to-[#F85B5D]/5 bg-pattern overflow-hidden">
        <Features />
      </section>

      {/* Enhanced Features Section */}
      <EnhancedFeatures />


      {/* Case Studies Section - Client Success Stories */}
      <section id="projects" className="scroll-section bg-gradient-to-br from-[#FCA207]/5 via-white to-[#F85B5D]/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl text-gray-900 mb-6 font-bold">
              <span className="text-gray-900">Real </span>
              <span className="bg-gradient-to-r from-[#F85B5D] to-[#7661FB] bg-clip-text text-transparent">Success Stories</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              See how our clients transformed their businesses and saved thousands with our automation solutions. These are real results from real businesses.
            </p>
          </div>

          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Case Study 1 */}
            <div className="bg-white/90 backdrop-blur-md border border-gray-200/50 shadow-xl rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#F85B5D] to-[#7661FB] rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">E</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">E-commerce Store</h3>
                  <p className="text-gray-600">Online Retail Business</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Challenge:</h4>
                  <p className="text-gray-600">Manual order processing taking 20 hours/week, inventory sync issues, customer support overload</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                  <p className="text-gray-600">Automated order management, inventory sync, AI customer support chatbot</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Results:</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                      <div className="text-2xl font-bold text-green-600">18h</div>
                      <div className="text-sm text-gray-600">Hours Saved/Week</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600">40%</div>
                      <div className="text-sm text-gray-600">Revenue Increase</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <p className="text-gray-700 italic mb-2">
                  "AI Solutions automated our entire order process. We went from 20 hours of manual work to 2 hours of oversight. Revenue increased 40% in 3 months."
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
                <div className="w-16 h-16 bg-gradient-to-br from-[#7661FB] to-[#DB4DBA] rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">SaaS Company</h3>
                  <p className="text-gray-600">Software as a Service</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Challenge:</h4>
                  <p className="text-gray-600">Lead qualification taking 15 hours/week, missed follow-ups, low conversion rates</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                  <p className="text-gray-600">AI voice agents for lead qualification, automated CRM workflows, smart follow-up sequences</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Results:</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                      <div className="text-2xl font-bold text-purple-600">300%</div>
                      <div className="text-sm text-gray-600">Lead Increase</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
                      <div className="text-2xl font-bold text-orange-600">25h</div>
                      <div className="text-sm text-gray-600">Hours Saved/Week</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <p className="text-gray-700 italic mb-2">
                  "Our lead qualification went from 15 hours of manual work to fully automated. We now get 300% more qualified leads and close deals 3x faster."
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
                <div className="w-16 h-16 bg-gradient-to-br from-[#DB4DBA] to-[#FCA207] rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Agency</h3>
                  <p className="text-gray-600">Digital Marketing Agency</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Challenge:</h4>
                  <p className="text-gray-600">Client reporting taking 30 hours/week, manual social media posting, scattered data</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                  <p className="text-gray-600">Automated reporting dashboards, social media scheduling, data integration across platforms</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Results:</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl">
                      <div className="text-2xl font-bold text-teal-600">28h</div>
                      <div className="text-sm text-gray-600">Hours Saved/Week</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                      <div className="text-2xl font-bold text-indigo-600">50%</div>
                      <div className="text-sm text-gray-600">More Clients</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <p className="text-gray-700 italic mb-2">
                  "We automated our entire reporting process. Now we can handle 50% more clients with the same team. The ROI was immediate."
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
                <div className="w-16 h-16 bg-gradient-to-br from-[#FCA207] to-[#F85B5D] rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">C</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Consulting Firm</h3>
                  <p className="text-gray-600">Business Consulting</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Challenge:</h4>
                  <p className="text-gray-600">Client onboarding taking 12 hours per client, manual proposal creation, scheduling conflicts</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                  <p className="text-gray-600">Automated onboarding workflows, AI proposal generation, smart scheduling system</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Results:</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl">
                      <div className="text-2xl font-bold text-emerald-600">10h</div>
                      <div className="text-sm text-gray-600">Hours Saved/Client</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl">
                      <div className="text-2xl font-bold text-rose-600">80%</div>
                      <div className="text-sm text-gray-600">Faster Onboarding</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <p className="text-gray-700 italic mb-2">
                  "Client onboarding went from 12 hours to 2 hours. We can now onboard 5x more clients and our team is much happier."
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
          <div className="text-center bg-gradient-to-r from-[#F85B5D]/10 to-[#7661FB]/10 rounded-2xl p-8 border border-[#F85B5D]/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to See Similar Results?</h3>
            <p className="text-gray-600 mb-6">Join 500+ businesses already saving thousands with our automation solutions.</p>
            <button className="bg-gradient-to-r from-[#F85B5D] to-[#7661FB] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
              Get Your Free Automation Audit
            </button>
          </div>
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
