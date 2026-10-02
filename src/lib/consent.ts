export const CONSENT_STORAGE_KEY = 'cookie-consent'
export const CONSENT_EVENT = 'cookie-consent-changed'

export type ConsentValue = 'accepted' | 'declined'

export function readConsent(): ConsentValue | null {
  try {
    const value = localStorage.getItem(CONSENT_STORAGE_KEY)
    // 'all' is the legacy value written by the previous banner.
    if (value === 'accepted' || value === 'all') return 'accepted'
    if (value === 'declined' || value === 'essential') return 'declined'
    return null
  } catch {
    return null
  }
}

export function writeConsent(value: ConsentValue) {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, value)
  } catch {
    // Storage can be unavailable (private mode, blocked). The banner will
    // simply show again next visit.
  }
  window.dispatchEvent(new Event(CONSENT_EVENT))
}

export function hasAnalyticsConsent(): boolean {
  return readConsent() === 'accepted'
}
