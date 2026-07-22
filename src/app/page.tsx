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

// Loading component for lazy-loaded components
const LoadingFallback = () => (
  <div className="w-full h-32 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-lg" />
)

export default function Home() {
  const [isWizardOpen, setIsWizardOpen] = useState(false)

  useEffect(() => {
    // Ensure page starts at the top
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
  }, [])

  const sections = ['home', 'about', 'features', 'services', 'projects', 'contact']

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

      {/* About Section */}
      <section id="about" className="scroll-section bg-gradient-to-br from-[#3B82F6]/5 via-white to-[#10B981]/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#3B82F6]/20 to-[#10B981]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-[#10B981]/20 to-[#3B82F6]/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-gray-900 mb-6 sm:mb-8 font-bold">
              About <span className="bg-gradient-to-r from-[#3B82F6] to-[#10B981] bg-clip-text text-transparent">Ali Ahmad</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto px-4 sm:px-0 leading-relaxed">
              Ali Ahmad — Full-Stack Developer &amp; Automation Expert with 5+ years of experience building high-performance web applications and intelligent workflow systems. Specialized in Ruby on Rails, React.js, Next.js, and Node.js. Certified automation professional with 200+ workflow automations shipped using n8n, Make, and Zapier. Currently expanding into AI agent development with LangChain and LangGraph.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column — What I bring */}
            <div className="space-y-8">
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-xl rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Core Stack</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-[#3B82F6]/10 to-[#10B981]/10 rounded-xl">
                    <div className="text-2xl mb-2">⚙️</div>
                    <div className="text-sm font-semibold text-gray-800">Ruby on Rails</div>
                    <div className="text-xs text-gray-600">Backend &amp; APIs</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-[#10B981]/10 to-[#3B82F6]/10 rounded-xl">
                    <div className="text-2xl mb-2">⚛️</div>
                    <div className="text-sm font-semibold text-gray-800">React / Next.js</div>
                    <div className="text-xs text-gray-600">Frontend</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-[#3B82F6]/10 to-[#10B981]/10 rounded-xl">
                    <div className="text-2xl mb-2">🔗</div>
                    <div className="text-sm font-semibold text-gray-800">n8n / Make / Zapier</div>
                    <div className="text-xs text-gray-600">Automation</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-[#10B981]/10 to-[#3B82F6]/10 rounded-xl">
                    <div className="text-2xl mb-2">🤖</div>
                    <div className="text-sm font-semibold text-gray-800">LangChain / LangGraph</div>
                    <div className="text-xs text-gray-600">AI Agents</div>
                  </div>
                </div>
              </div>

              {/* What I bring — replaces fake testimonials */}
              <div className="bg-gradient-to-br from-[#3B82F6]/10 to-[#10B981]/10 rounded-2xl p-6 border border-[#3B82F6]/20">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">What I Bring</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex gap-3">
                    <span className="text-[#3B82F6] font-bold">→</span>
                    <span>Full-stack delivery: Rails, React/Next.js, Node.js — from architecture to production</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#3B82F6] font-bold">→</span>
                    <span>200+ shipped automations with n8n, Make, and Zapier</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#3B82F6] font-bold">→</span>
                    <span>Billing &amp; integrations: Stripe, Xero, Shopify, Brevo, Craftcloud</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#3B82F6] font-bold">→</span>
                    <span>Solo ownership of backend and DevOps when needed (CI/CD, AWS, Sidekiq)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#3B82F6] font-bold">→</span>
                    <span>Actively building AI agents with LangChain and LangGraph</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900">How I Work</h3>
                <p className="text-gray-600 leading-relaxed">
                  I build production web platforms and automation systems that reduce manual work and scale with the business. Clients get clear communication, pragmatic architecture, and software that ships.
                </p>
              </div>
            </div>
            
            {/* Right Column — Stats & Process */}
            <div className="space-y-8">
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-xl rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">By the Numbers</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#10B981] bg-clip-text text-transparent mb-2">5+</h3>
                    <p className="text-sm text-gray-600 font-medium">Years Experience</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent mb-2">200+</h3>
                    <p className="text-sm text-gray-600 font-medium">Automations Delivered</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#10B981] bg-clip-text text-transparent mb-2">8+</h3>
                    <p className="text-sm text-gray-600 font-medium">Platforms Shipped</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent mb-2">20+</h3>
                    <p className="text-sm text-gray-600 font-medium">Hours/Week Saved for Clients</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#3B82F6]/10 to-[#10B981]/10 rounded-2xl p-6 border border-[#3B82F6]/20">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Working Together</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#3B82F6] to-[#10B981] rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                    <span className="text-gray-700">Discovery &amp; project scoping</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#10B981] to-[#3B82F6] rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                    <span className="text-gray-700">Architecture &amp; tech plan</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#3B82F6] to-[#10B981] rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                    <span className="text-gray-700">Build, test &amp; iterate</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#10B981] to-[#3B82F6] rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                    <span className="text-gray-700">Deploy &amp; ongoing support</span>
                  </div>
                </div>
              </div>

              <div className="text-center bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                <div className="text-4xl mb-2">🎯</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Let&apos;s Talk</h3>
                <p className="text-sm text-gray-600">Have a web app, platform, or automation challenge? Reach out and we&apos;ll figure out the right approach together.</p>
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


      {/* Portfolio / Projects Section */}
      <section id="projects" className="scroll-section bg-gradient-to-br from-[#f59e0b]/5 via-white to-[#22c55e]/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl text-gray-900 mb-6 font-bold">
              <span className="text-gray-900">Selected </span>
              <span className="bg-gradient-to-r from-[#22c55e] to-[#0ea5e9] bg-clip-text text-transparent">Work</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Real platforms I&apos;ve built and shipped — web apps, marketplaces, travel-tech, and automation-heavy products.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {[
              {
                initial: 'M',
                gradient: 'from-[#22c55e] to-[#0ea5e9]',
                title: 'MYSMSF',
                subtitle: 'SMSF Property & Asset Admin',
                url: 'https://mysmsfproperty.com.au',
                description: 'SMSF property, crypto, and gold administration platform with payments and accounting integrations.',
                stack: ['Ruby on Rails', 'Angular', 'Stripe', 'Xero', 'Brevo'],
              },
              {
                initial: 'i',
                gradient: 'from-[#0ea5e9] to-[#f59e0b]',
                title: 'iRevise',
                subtitle: 'Study Platform',
                url: 'https://irevise.com',
                description: 'Study platform for students and teachers with subscription billing, Zapier automation, and background job processing.',
                stack: ['Ruby on Rails', 'Stripe', 'Zapier', 'Sidekiq'],
              },
              {
                initial: 'T',
                gradient: 'from-[#f59e0b] to-[#d97706]',
                title: 'Teleport / Radiangen',
                subtitle: '3D Modeling & Design',
                url: undefined,
                description: '3D modeling and design platform with Craftcloud API integration. Solo ownership of backend and DevOps.',
                stack: ['Backend', 'Craftcloud API', 'DevOps'],
              },
              {
                initial: 'A',
                gradient: 'from-[#d97706] to-[#22c55e]',
                title: 'AirAsia (Vidi)',
                subtitle: 'Travel-Tech Booking',
                url: 'https://airasia.com',
                description: 'Activity booking platform within AirAsia\'s travel-tech stack — bookings, Rails/React services, and AWS CI/CD.',
                stack: ['Ruby on Rails', 'React', 'MySQL', 'AWS CI/CD'],
              },
              {
                initial: 'I',
                gradient: 'from-[#3B82F6] to-[#10B981]',
                title: 'Intocities',
                subtitle: '360° Virtual Tours',
                url: 'https://intocities.com',
                description: '360° virtual tour platform for German cities, built with Rails and Vue.js on AWS.',
                stack: ['Ruby on Rails', 'Vue.js', 'AWS'],
              },
              {
                initial: 'D',
                gradient: 'from-[#10B981] to-[#3B82F6]',
                title: 'Dear Brightly',
                subtitle: 'Teledermatology',
                url: 'https://dearbrightly.com',
                description: 'Teledermatology platform — led Django-to-Rails migration and React frontend work.',
                stack: ['Ruby on Rails', 'React', 'Django → Rails'],
              },
              {
                initial: 'K',
                gradient: 'from-[#22c55e] to-[#f59e0b]',
                title: 'KitchenConnection',
                subtitle: 'Live Cooking Community',
                url: 'https://kitchenconnection.org',
                description: 'Live cooking class community with Rails, React, and Shopify commerce integration.',
                stack: ['Ruby on Rails', 'React', 'Shopify'],
              },
              {
                initial: 'S',
                gradient: 'from-[#0ea5e9] to-[#22c55e]',
                title: 'Simply Made Local',
                subtitle: 'Handmade Goods Marketplace',
                url: 'https://simplymadelocal.com',
                description: 'Marketplace for handmade goods, built with Ruby on Rails and served via NGINX.',
                stack: ['Ruby on Rails', 'NGINX'],
              },
            ].map((project) => (
              <div
                key={project.title}
                className="bg-white/90 backdrop-blur-md border border-gray-200/50 shadow-xl rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${project.gradient} rounded-2xl flex items-center justify-center`}>
                    <span className="text-white font-bold text-xl">{project.initial}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                    <p className="text-gray-600">{project.subtitle}</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gradient-to-r from-[#3B82F6]/10 to-[#10B981]/10 text-[#3B82F6] text-xs font-medium rounded-lg border border-[#3B82F6]/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-semibold text-[#3B82F6] hover:text-[#2563EB] transition-colors"
                  >
                    Visit site →
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="text-center bg-gradient-to-r from-[#22c55e]/10 to-[#0ea5e9]/10 rounded-2xl p-8 border border-[#22c55e]/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Have a project in mind?</h3>
            <p className="text-gray-600 mb-6">Web apps, platforms, integrations, or automation — let&apos;s talk about what you need to ship.</p>
            <button 
              onClick={() => setIsWizardOpen(true)}
              className="bg-gradient-to-r from-[#22c55e] to-[#0ea5e9] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              Start a Conversation
            </button>
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
