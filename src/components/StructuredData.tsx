import {
  AUTHOR_NAME,
  AUTOMATIONS_SHIPPED,
  SITE_NAME,
  SITE_URL,
  YEARS_EXPERIENCE,
} from '@/lib/site'

/**
 * JSON-LD for search engines. Rendered on the server as a plain <script>
 * so crawlers see it without executing JavaScript.
 */
export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: AUTHOR_NAME,
    jobTitle: 'Full-Stack Developer & Automation Expert',
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    worksFor: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    description: `Full-Stack Developer & Automation Expert with ${YEARS_EXPERIENCE} years of experience building high-performance web applications and intelligent workflow systems. Specialized in Ruby on Rails, React.js, Next.js, and Node.js. Certified automation professional with ${AUTOMATIONS_SHIPPED} workflow automations using n8n, Make, and Zapier.`,
    knowsAbout: [
      'Ruby on Rails',
      'React.js',
      'Next.js',
      'Node.js',
      'n8n',
      'Make',
      'Zapier',
      'LangChain',
      'LangGraph',
      'Workflow Automation',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
