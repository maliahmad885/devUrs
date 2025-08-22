'use client'

import { motion, useSpring, useTransform, useMotionValue, AnimatePresence } from 'framer-motion'
import { Zap, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Github, ArrowUp, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  
  // Spring animations for interactive elements
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { stiffness: 300, damping: 20 }
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig)
  
  // Scroll to top functionality
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  // Check if scroll to top button should be visible
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setIsVisible(window.scrollY > 300)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Services", href: "#services" },
        { name: "Tools", href: "#tools" },
        { name: "Pricing", href: "/pricing" },
        { name: "API", href: "/api" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#about" },
        { name: "Blog", href: "#blogs" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" },
        { name: "Partners", href: "/partners" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "/help" },
        { name: "Documentation", href: "/docs" },
        { name: "Contact", href: "#contact" },
        { name: "Status", href: "/status" },
        { name: "Community", href: "/community" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "GDPR", href: "/gdpr" },
        { name: "Security", href: "/security" }
      ]
    }
  ]

  const socialLinks = [
    { name: "LinkedIn", href: "https://linkedin.com/company/nexus-bloom", icon: Linkedin },
    { name: "Twitter", href: "https://twitter.com/nexusbloom", icon: Twitter },
    { name: "Facebook", href: "https://facebook.com/nexusbloom", icon: Facebook },
    { name: "GitHub", href: "https://github.com/nexus-bloom", icon: Github }
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{ 
            y: [0, 20, 0],
            scale: [1, 0.9, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Company Info */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <motion.div 
                className="flex items-center space-x-3 mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.div 
                  className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg"
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.1,
                    boxShadow: "0 0 30px rgba(139, 92, 246, 0.5)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Zap className="w-6 h-6 text-white" />
                </motion.div>
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Nexus Bloom
                </span>
              </motion.div>
              
              <p className="text-sm sm:text-base text-gray-300 mb-6 leading-relaxed">
                Seamlessly integrate with 500+ apps and services. From CRM to marketing tools, 
                we connect your entire tech stack with AI-powered automation.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2 sm:space-y-3">
                <motion.div 
                  className="flex items-center space-x-3 text-gray-300 text-sm sm:text-base"
                  whileHover={{ x: 5, color: "#ffffff" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Mail className="w-4 h-4 text-purple-400" />
                  <span>contact@nexusbloom.com</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3 text-gray-300 text-sm sm:text-base"
                  whileHover={{ x: 5, color: "#ffffff" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>+1 (555) 123-4567</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3 text-gray-300 text-sm sm:text-base"
                  whileHover={{ x: 5, color: "#ffffff" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <MapPin className="w-4 h-4 text-green-400" />
                  <span className="hidden sm:inline">123 Integration Street, Tech City, TC 12345</span>
                  <span className="sm:hidden">Tech City, TC 12345</span>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              viewport={{ once: true }}
              className="col-span-1"
            >
              <motion.h3 
                className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white"
                whileHover={{ color: "#a855f7" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {section.title}
              </motion.h3>
              <ul className="space-y-2 sm:space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: sectionIndex * 0.1 + linkIndex * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm block py-1"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 pt-6 sm:pt-8 mb-6 sm:mb-8"
        >
          <div className="text-center">
            <motion.h3 
              className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Stay Updated with Nexus Bloom
            </motion.h3>
            <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 max-w-2xl mx-auto px-4 sm:px-0">
              Get the latest insights on automation, integration trends, and product updates 
              delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto px-4 sm:px-0">
              <motion.input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                whileFocus={{ scale: 1.02, borderColor: "#a855f7" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              <motion.button 
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 hover:shadow-lg text-sm sm:text-base"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 pt-6 sm:pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <motion.div 
              className="text-gray-400 text-xs sm:text-sm text-center md:text-left"
              whileHover={{ color: "#a855f7" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              © {currentYear} Nexus Bloom. All rights reserved.
            </motion.div>

            {/* Social Links */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200"
                  aria-label={`Follow us on ${social.name}`}
                  whileHover={{ 
                    scale: 1.2, 
                    y: -3,
                    boxShadow: "0 10px 25px rgba(139, 92, 246, 0.3)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.6 + index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  viewport={{ once: true }}
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-2xl hover:shadow-purple-500/25 z-50 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={{ 
              scale: 1.1, 
              y: -3,
              boxShadow: "0 15px 35px rgba(139, 92, 246, 0.4)"
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Floating Sparkles */}
      <motion.div
        className="fixed bottom-4 left-4 text-purple-400 z-40"
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles className="w-6 h-6" />
      </motion.div>
      
      <motion.div
        className="fixed bottom-8 right-20 text-blue-400 z-40"
        animate={{ 
          y: [0, 15, 0],
          rotate: [360, 180, 0],
          scale: [1, 0.8, 1]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <Sparkles className="w-4 h-4" />
      </motion.div>
    </footer>
  )
} 