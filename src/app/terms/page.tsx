'use client'

import { motion } from 'framer-motion'
import { FileText, CheckCircle, AlertTriangle, Scale, Users, Globe } from 'lucide-react'
import Navigation from '@/components/Navigation'

export default function TermsOfService() {
  const sections = [
    {
      icon: CheckCircle,
      title: "Acceptance of Terms",
      content: "By accessing and using Nexus Bloom's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
    },
    {
      icon: Users,
      title: "User Responsibilities",
      content: "You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You must not use our services for any illegal or unauthorized purpose."
    },
    {
      icon: Scale,
      title: "Intellectual Property",
      content: "The content, features, and functionality of our services are owned by Nexus Bloom and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws."
    },
    {
      icon: AlertTriangle,
      title: "Limitation of Liability",
      content: "In no event shall Nexus Bloom be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses."
    },
    {
      icon: Globe,
      title: "Service Availability",
      content: "We strive to maintain high availability of our services, but we do not guarantee uninterrupted access. We may temporarily suspend services for maintenance, updates, or other operational reasons."
    },
    {
      icon: FileText,
      title: "Modifications",
      content: "We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new terms on our website and updating the effective date."
    }
  ]

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h1 className="heading-2 md:text-5xl text-gray-900 mb-6">
              Terms of Service
            </h1>
            <p className="text-body-large text-gray-600 max-w-3xl mx-auto">
              These terms govern your use of Nexus Bloom's services. 
              Please read them carefully before using our platform.
            </p>
            <div className="mt-6 text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </motion.div>

          {/* Content */}
          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="glass-card rounded-2xl p-8"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <section.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {section.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="glass-card rounded-2xl p-8 text-center"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Questions About These Terms?
              </h2>
              <p className="text-gray-600 mb-6">
                If you have any questions about these Terms of Service, 
                please contact our legal team:
              </p>
              <div className="space-y-2 text-gray-600">
                <p>Email: legal@nexusbloom.com</p>
                <p>Address: 123 Integration Street, Tech City, TC 12345</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  )
} 