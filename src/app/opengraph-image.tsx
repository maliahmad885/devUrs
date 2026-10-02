import { ImageResponse } from 'next/og'
import { AUTHOR_NAME, AUTOMATIONS_SHIPPED, SITE_NAME, YEARS_EXPERIENCE } from '@/lib/site'

export const alt = `${SITE_NAME} — ${AUTHOR_NAME}, Full-Stack Developer & Automation Expert`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const STACK = ['Ruby on Rails', 'React / Next.js', 'Node.js', 'n8n · Make · Zapier', 'LangChain']

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '72px 80px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #065f46 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 8, textTransform: 'uppercase', opacity: 0.8 }}>
          {SITE_NAME}
        </div>
        <div style={{ fontSize: 88, fontWeight: 700, marginTop: 12, lineHeight: 1.05 }}>{AUTHOR_NAME}</div>
        <div style={{ fontSize: 38, marginTop: 14, opacity: 0.92 }}>
          Full-Stack Developer &amp; Automation Expert
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 44, fontSize: 22 }}>
          {STACK.map((item) => (
            <div
              key={item}
              style={{
                padding: '10px 20px',
                borderRadius: 999,
                border: '2px solid rgba(255,255,255,0.35)',
                background: 'rgba(255,255,255,0.08)',
              }}
            >
              {item}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 44, fontSize: 26, opacity: 0.85 }}>
          {`${YEARS_EXPERIENCE} years experience · ${AUTOMATIONS_SHIPPED} automations shipped · devurs.com`}
        </div>
      </div>
    ),
    { ...size }
  )
}
