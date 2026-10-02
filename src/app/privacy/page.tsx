import type { Metadata } from 'next'
import { Shield, Eye, Database, Users, Lock, BarChart3 } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { LEGAL_LAST_UPDATED, SITE_NAME } from '@/lib/site'

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_NAME}`,
  description: `How ${SITE_NAME} handles the information you share through the contact forms and analytics on this site.`,
  robots: { index: true, follow: true },
}

const sections = [
  {
    icon: Eye,
    title: 'Information I Collect',
    content:
      'When you use the contact form or project consultation wizard, I receive what you enter: your name, email address, phone number, company, and the details of your project. The request also records your IP address and browser user-agent to help filter spam.',
  },
  {
    icon: Database,
    title: 'How I Use It',
    content:
      'Your submission is emailed to me so I can reply to your enquiry and prepare a proposal. I do not use it for marketing lists, and I do not send newsletters.',
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    content:
      'If you allow it in the banner, this site loads Vercel Analytics and Speed Insights to measure page views and performance. These tools are privacy-focused and do not use cross-site tracking cookies. Your choice is stored in your browser so the banner does not reappear.',
  },
  {
    icon: Users,
    title: 'Sharing',
    content:
      'I do not sell or trade your information. Submissions pass through the email provider used to deliver them (Google Workspace / Gmail) and the hosting provider that runs this site (Vercel). No other third parties receive your data.',
  },
  {
    icon: Lock,
    title: 'Security & Retention',
    content:
      'Form submissions travel over HTTPS and are stored only in my mailbox. I keep enquiry emails for as long as needed to follow up on the conversation, after which they can be deleted on request.',
  },
  {
    icon: Shield,
    title: 'Your Rights',
    content:
      'You can ask me to access, correct, or delete anything you have sent at any time. Email me and I will take care of it promptly.',
  },
]

export default function PrivacyPolicy() {
  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <div className="w-20 h-20 bg-gradient-to-br from-[#3B82F6] to-[#10B981] rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              This site is run by Ali Ahmad ({SITE_NAME}). This policy explains, in plain language,
              what information the site collects and what happens to it.
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions?</h2>
              <p className="text-gray-600 mb-4">
                If anything here is unclear or you want to exercise your rights, get in touch.
              </p>
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
