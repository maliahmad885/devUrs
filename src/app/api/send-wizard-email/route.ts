import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { SITE_NAME } from '@/lib/site'

export const runtime = 'nodejs'

// ---------------------------------------------------------------------------
// Rate limiting (per IP, in-memory). Good enough for a portfolio contact form;
// each serverless instance keeps its own window.
// ---------------------------------------------------------------------------
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX_REQUESTS = 5
const hits = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  if (recent.length >= RATE_MAX_REQUESTS) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear()
  return false
}

function clientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function str(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function strList(value: unknown, maxItems = 20, maxLen = 100): string[] {
  if (!Array.isArray(value)) return []
  return value
    .filter((v): v is string => typeof v === 'string')
    .map((v) => v.trim().slice(0, maxLen))
    .filter(Boolean)
    .slice(0, maxItems)
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function nl2br(value: string): string {
  return escapeHtml(value).replace(/\n/g, '<br />')
}

interface Submission {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  businessType: string
  industry: string
  teamSize: string
  currentChallenges: string[]
  aiGoals: string[]
  specificUseCase: string
  automationPriority: string
  budget: string
  timeline: string
  additionalInfo: string
}

function parseSubmission(body: unknown): { data?: Submission; error?: string; honeypot?: boolean } {
  if (!body || typeof body !== 'object') return { error: 'Invalid request body.' }
  const raw = body as Record<string, unknown>

  // Hidden field that real users never fill in.
  if (str(raw.website, 200)) return { honeypot: true }

  const data: Submission = {
    firstName: str(raw.firstName, 100),
    lastName: str(raw.lastName, 100),
    email: str(raw.email, 254),
    phone: str(raw.phone, 50),
    company: str(raw.company, 150),
    businessType: str(raw.businessType, 100),
    industry: str(raw.industry, 100),
    teamSize: str(raw.teamSize, 100),
    currentChallenges: strList(raw.currentChallenges),
    aiGoals: strList(raw.aiGoals),
    specificUseCase: str(raw.specificUseCase, 5000),
    automationPriority: str(raw.automationPriority, 100),
    budget: str(raw.budget, 100),
    timeline: str(raw.timeline, 100),
    additionalInfo: str(raw.additionalInfo, 5000),
  }

  if (!data.firstName) return { error: 'Name is required.' }
  if (!EMAIL_RE.test(data.email)) return { error: 'A valid email address is required.' }
  if (!data.specificUseCase && !data.additionalInfo) {
    return { error: 'Please tell me a bit about your project.' }
  }

  return { data }
}

// ---------------------------------------------------------------------------
// Email rendering
// ---------------------------------------------------------------------------
function renderText(d: Submission, meta: { ip: string; ua: string; when: string }): string {
  const list = (items: string[]) => (items.length ? items.join(', ') : '—')
  const v = (s: string) => s || '—'
  return `
New Project Consultation Request

=== BASIC INFORMATION ===
Name: ${d.firstName} ${d.lastName}
Email: ${d.email}
Phone: ${v(d.phone)}
Company: ${d.company || 'Individual/Freelancer'}

=== BUSINESS DETAILS ===
Business Type: ${v(d.businessType)}
Industry: ${v(d.industry)}
Team Size: ${v(d.teamSize)}
Current Challenges: ${list(d.currentChallenges)}

=== PROJECT GOALS ===
Goals: ${list(d.aiGoals)}
Specific Use Case: ${v(d.specificUseCase)}
Priority: ${v(d.automationPriority)}

=== BUDGET & TIMELINE ===
Budget Range: ${v(d.budget)}
Timeline: ${v(d.timeline)}
Additional Information: ${v(d.additionalInfo)}

=== SUBMISSION DETAILS ===
Submitted: ${meta.when}
IP Address: ${meta.ip}
User Agent: ${meta.ua}

---
Sent from the ${SITE_NAME} website project consultation form.
`.trim()
}

function renderHtml(d: Submission, meta: { ip: string; ua: string; when: string }): string {
  const row = (label: string, value: string) =>
    `<p style="margin:6px 0"><strong>${label}:</strong> ${value || '—'}</p>`
  const block = (title: string, rows: string) => `
    <div style="background:#f8f9fa;padding:20px;border-radius:8px;margin:20px 0">
      <h3 style="color:#10B981;margin-top:0">${title}</h3>
      ${rows}
    </div>`
  const list = (items: string[]) => (items.length ? escapeHtml(items.join(', ')) : '')

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#111">
      <h2 style="color:#3B82F6;border-bottom:2px solid #3B82F6;padding-bottom:10px">
        New Project Consultation Request
      </h2>
      ${block(
        'Basic Information',
        row('Name', escapeHtml(`${d.firstName} ${d.lastName}`.trim())) +
          row('Email', `<a href="mailto:${escapeHtml(d.email)}">${escapeHtml(d.email)}</a>`) +
          row('Phone', escapeHtml(d.phone)) +
          row('Company', escapeHtml(d.company || 'Individual/Freelancer'))
      )}
      ${block(
        'Business Details',
        row('Business Type', escapeHtml(d.businessType)) +
          row('Industry', escapeHtml(d.industry)) +
          row('Team Size', escapeHtml(d.teamSize)) +
          row('Current Challenges', list(d.currentChallenges))
      )}
      ${block(
        'Project Goals',
        row('Goals', list(d.aiGoals)) +
          row('Specific Use Case', nl2br(d.specificUseCase)) +
          row('Priority', escapeHtml(d.automationPriority))
      )}
      ${block(
        'Budget &amp; Timeline',
        row('Budget Range', escapeHtml(d.budget)) +
          row('Timeline', escapeHtml(d.timeline)) +
          row('Additional Information', nl2br(d.additionalInfo))
      )}
      <div style="background:#e9ecef;padding:15px;border-radius:8px;margin:20px 0;font-size:12px;color:#6c757d">
        ${row('Submitted', escapeHtml(meta.when))}
        ${row('IP Address', escapeHtml(meta.ip))}
        ${row('User Agent', escapeHtml(meta.ua))}
      </div>
      <hr style="border:none;border-top:1px solid #dee2e6;margin:30px 0">
      <p style="color:#6c757d;font-size:12px;text-align:center">
        Sent from the ${SITE_NAME} website project consultation form.
      </p>
    </div>`
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  const ip = clientIp(request)

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, message: 'Too many requests. Please try again in a few minutes.' },
      { status: 429 }
    )
  }

  const emailUser = process.env.EMAIL_USER
  const emailPass = process.env.EMAIL_PASS
  if (!emailUser || !emailPass) {
    console.error('[send-wizard-email] EMAIL_USER / EMAIL_PASS are not configured.')
    return NextResponse.json(
      { success: false, message: 'Email service is not configured. Please try again later.' },
      { status: 500 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid JSON body.' }, { status: 400 })
  }

  const parsed = parseSubmission(body)
  if (parsed.honeypot) {
    // Pretend it worked so bots don't learn anything.
    return NextResponse.json({ success: true, message: 'Message sent' })
  }
  if (!parsed.data) {
    return NextResponse.json({ success: false, message: parsed.error }, { status: 400 })
  }

  const data = parsed.data
  const meta = {
    ip,
    ua: request.headers.get('user-agent') || 'Unknown',
    when: new Date().toISOString(),
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: emailUser, pass: emailPass },
    })

    const fullName = `${data.firstName} ${data.lastName}`.trim()

    await transporter.sendMail({
      from: `"${SITE_NAME} Website" <${emailUser}>`,
      to: process.env.EMAIL_TO || emailUser,
      replyTo: `"${fullName.replace(/"/g, '')}" <${data.email}>`,
      subject: `New Project Consultation Request - ${fullName} (${data.company || 'Individual'})`,
      text: renderText(data, meta),
      html: renderHtml(data, meta),
    })

    return NextResponse.json({ success: true, message: 'Message sent' })
  } catch (error) {
    console.error('[send-wizard-email] Failed to send:', error instanceof Error ? error.message : error)
    return NextResponse.json(
      { success: false, message: 'Failed to send your message. Please try again later.' },
      { status: 500 }
    )
  }
}
