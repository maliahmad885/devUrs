import type { Metadata } from 'next'
import { FileText, CheckCircle, AlertTriangle, Scale, Globe, Handshake } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { LEGAL_LAST_UPDATED, SITE_NAME } from '@/lib/site'

export const metadata: Metadata = {
  title: `Terms of Service | ${SITE_NAME}`,
  description: `Terms that apply to using the ${SITE_NAME} website and requesting a project consultation.`,
  robots: { index: true, follow: true },
}

const sections = [
  {
    icon: CheckCircle,
    title: 'Using This Site',
    content: `By browsing this website or submitting a contact or consultation request, you agree to these terms. The site is provided for information about my services and as a way to get in touch.`,
  },
  {
    icon: Handshake,
    title: 'Consultation Requests',
    content:
      'Submitting the consultation wizard or contact form is a request for information, not a contract. Any project work is governed by a separate written agreement that we both sign before work begins.',
  },
  {
    icon: Scale,
    title: 'Intellectual Property',
    content: `The design, text, and code of this website belong to ${SITE_NAME} unless stated otherwise. Logos and product names of past clients belong to their respective owners and appear here only to describe work I have delivered.`,
  },
  {
    icon: AlertTriangle,
    title: 'No Warranty & Limitation of Liability',
    content: `The content on this site is provided "as is" without warranties of any kind. To the extent permitted by law, ${SITE_NAME} is not liable for any indirect or consequential loss arising from use of this website.`,
  },
  {
    icon: Globe,
    title: 'Availability',
    content:
      'I aim to keep the site available at all times but may take it offline for maintenance or updates without notice.',
  },
  {
    icon: FileText,
    title: 'Changes',
    content:
      'These terms may be updated from time to time. The date below shows when they were last changed, and the latest version is always the one published on this page.',
  },
]

export default function TermsOfService() {
  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <div className="w-20 h-20 bg-gradient-to-br from-[#3B82F6] to-[#10B981] rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Terms of Service</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              These terms govern your use of the {SITE_NAME} website. Please read them before using
              the contact forms.
            </p>
            <div className="mt-6 text-sm text-gray-500">Last updated: {LEGAL_LAST_UPDATED}</div>
          </div>

          <div className="space-y-8">
            {sections.map((section) => (
              <section key={section.title} className="glass-card rounded-2xl p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#10B981] rounded-xl flex items-center justify-center">
                      <section.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{section.title}</h2>
                    <p className="text-gray-600 leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </section>
            ))}

            <section className="glass-card rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About These Terms?</h2>
              <p className="text-gray-600 mb-4">Get in touch and I will be happy to clarify.</p>
              <Link href="/#contact" className="text-[#3B82F6] hover:text-[#2563EB] font-semibold">
                Use the contact form →
              </Link>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
