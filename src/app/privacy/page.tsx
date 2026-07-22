'use client'

import { motion } from 'framer-motion'
import { Shield, Eye, Lock, Database, Users, Globe } from 'lucide-react'
import Navigation from '@/components/Navigation'

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: Eye,
      title: "Information We Collect",
      content: "We collect information you provide directly to us, such as when you create an account, contact us, or use our services. This may include your name, email address, company information, and any other information you choose to provide."
    },
    {
      icon: Database,
      title: "How We Use Your Information",
      content: "We use the information we collect to provide, maintain, and improve our services, communicate with you, and develop new features. We may also use your information to send you technical notices, updates, and support messages."
    },
    {
      icon: Users,
      title: "Information Sharing",
      content: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share information with service providers who assist us in operating our website and providing services."
    },
    {
      icon: Lock,
      title: "Data Security",
      content: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure."
    },
    {
      icon: Globe,
      title: "International Transfers",
      content: "Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and that your information receives adequate protection."
    },
    {
      icon: Shield,
      title: "Your Rights",
      content: "You have the right to access, correct, or delete your personal information. You may also have the right to restrict or object to certain processing of your information. Contact us to exercise these rights."
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
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="heading-2 md:text-5xl text-gray-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-body-large text-gray-600 max-w-3xl mx-auto">
              We respect your privacy and are committed to protecting your personal information. 
              This policy explains how we collect, use, and safeguard your data.
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
                    <h2 className="heading-5 text-gray-900 mb-4">
                      {section.title}
                    </h2>
                    <p className="text-body text-gray-600">
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
              <h2 className="heading-5 text-gray-900 mb-4">
                Contact Us
              </h2>
              <p className="text-body text-gray-600 mb-6">
                If you have any questions about this Privacy Policy or our data practices, 
                please contact us:
              </p>
              <div className="space-y-2 text-gray-600">
                {/* TODO: confirm real contact email before launch */}
                <p>Email: hello@codeurs.com</p>
                <p>Or use the contact form on the homepage.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  )
} 