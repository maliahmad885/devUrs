'use client'

import { Github, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  // TODO: replace with real profile URLs when provided
  const socialLinks = [
    { name: 'GitHub', icon: Github, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex items-center justify-center">
              <img 
                src="/images/logo.png" 
                alt="DevUrs Logo" 
                className="w-full h-full object-contain logo-img-dark"
              />
            </div>
            <span className="text-lg font-semibold">DevUrs</span>
          </div>

          {/* Social Links */}
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

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-6 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <div>
              © {currentYear} DevUrs. All rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
