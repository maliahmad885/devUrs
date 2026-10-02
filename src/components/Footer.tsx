import Image from 'next/image'
import Link from 'next/link'
import { SITE_NAME } from '@/lib/site'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center space-x-3" aria-label={`${SITE_NAME} home`}>
            <div className="relative w-8 h-8">
              <Image
                src="/images/logo.png"
                alt={`${SITE_NAME} logo`}
                fill
                sizes="32px"
                className="object-contain logo-img-dark"
              />
            </div>
            <span className="text-lg font-semibold">{SITE_NAME}</span>
          </Link>

          <Link
            href="/#contact"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Get in touch →
          </Link>
        </div>

        <div className="border-t border-gray-800 mt-6 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <div>
              © {currentYear} {SITE_NAME}. All rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
