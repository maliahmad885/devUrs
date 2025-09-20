'use client'

import Link from 'next/link'
import { Github, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  ]

  const quickLinks = [
    { name: 'Free Audit', href: '#contact' },
    { name: 'Case Studies', href: '#projects' },
    { name: 'Features', href: '#features' },
    { name: 'FAQ', href: '#contact' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <img 
                  src="/images/logo.png" 
                  alt="AI Solutions Logo" 
                  className="w-full h-full object-contain logo-img-dark"
                />
              </div>
              <span className="text-lg font-semibold">AI Solutions</span>
            </div>
            <p className="text-gray-400 text-sm">
              Certified automation experts helping businesses save 20+ hours weekly with AI-powered solutions.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>AI Voice Agents</li>
              <li>n8n & Make.com Automation</li>
              <li>CRM Integration</li>
              <li>Lead Generation</li>
              <li>Social Media Automation</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>hello@nexusbloom.com</p>
              <p>+1 (555) 123-4567</p>
              <p>San Francisco, CA</p>
              <div className="mt-4">
                <p className="text-xs text-gray-500">Response time: 24 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Client Logos */}
            <div className="flex items-center space-x-8 opacity-60">
              <div className="text-sm font-bold text-gray-500">Trusted by:</div>
              <div className="text-lg font-bold text-gray-600">TechCorp</div>
              <div className="text-lg font-bold text-gray-600">DataFlow</div>
              <div className="text-lg font-bold text-gray-600">WorkflowPro</div>
              <div className="text-lg font-bold text-gray-600">InsightCorp</div>
            </div>

            {/* Certifications */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-r from-[#F85B5D] to-[#7661FB] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">M</span>
                </div>
                <span className="text-sm text-gray-400">Make.com Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-r from-[#7661FB] to-[#DB4DBA] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">n</span>
                </div>
                <span className="text-sm text-gray-400">n8n Certified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 mt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-400">
              © {currentYear} AI Solutions. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
