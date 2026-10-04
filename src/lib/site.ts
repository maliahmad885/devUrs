/**
 * Single source of truth for site-wide constants.
 * Update values here instead of hunting through components.
 */

export const SITE_URL = 'https://devurs.com'
export const SITE_NAME = 'DevUrs'
export const AUTHOR_NAME = 'Ali Ahmad'


export const YEARS_EXPERIENCE = '8+'
export const AUTOMATIONS_SHIPPED = '100+'
export const PLATFORMS_SHIPPED = '35+'
export const HOURS_SAVED_PER_WEEK = '20+'

export const SITE_TITLE = `${AUTHOR_NAME} — Full-Stack Developer & Automation Expert`
/** Meta description. Keep under 155 characters so Google does not truncate it. */
export const SITE_DESCRIPTION = `${AUTHOR_NAME}, Full-Stack Developer & Automation Expert. ${YEARS_EXPERIENCE} years, ${PLATFORMS_SHIPPED} apps shipped with Rails, React, Next.js, Node.js, n8n, Zapier and LangChain.`
export const SITE_SHORT_DESCRIPTION = `${YEARS_EXPERIENCE} years building high-performance web applications and intelligent workflow systems. Rails, React, Next.js, automation, and AI agents.`

/** About section intro. First person, one idea per paragraph. */
export const ABOUT_PARAGRAPHS = [
  `I'm a Full-Stack Developer and Automation Expert with ${YEARS_EXPERIENCE} years of experience and ${PLATFORMS_SHIPPED} applications shipped across fintech, healthtech, e-commerce, construction-tech, travel-tech, and SaaS. I handle the full lifecycle: requirements, system design, development, deployment, and maintenance.`,
  `My core stack is Ruby on Rails, React.js, Next.js, and Node.js, backed by Express.js, Nest.js, MongoDB, and PostgreSQL. I've led a team of 8 developers, introduced code review processes, and mentored junior engineers.`,
  `I build Generative AI applications and chatbots with LangChain and LangGraph, and I'm a certified automation professional with ${AUTOMATIONS_SHIPPED} workflows shipped on n8n, Make, and Zapier, saving clients ${HOURS_SAVED_PER_WEEK} hours of manual work every week.`,
]

/** Shown on the Privacy Policy and Terms pages. Bump when the text changes. */
export const LEGAL_LAST_UPDATED = 'October 2, 2026'
