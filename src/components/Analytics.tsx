'use client'

import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { CONSENT_EVENT, CONSENT_STORAGE_KEY, hasAnalyticsConsent } from '@/lib/consent'

/**
 * Loads Vercel Analytics and Speed Insights only after the visitor has
 * accepted analytics in the cookie banner. Re-checks when the banner
 * dispatches a consent change or when another tab updates storage.
 */
export default function AnalyticsWrapper() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const sync = () => setEnabled(hasAnalyticsConsent())
    sync()

    const onStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_STORAGE_KEY) sync()
    }

    window.addEventListener(CONSENT_EVENT, sync)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener(CONSENT_EVENT, sync)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  )
}
