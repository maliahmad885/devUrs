'use client'

import Script from 'next/script'

export default function StructuredData() {
  // TODO: replace url, email, and sameAs with real contact/profile URLs when confirmed
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ali Ahmad",
    "jobTitle": "Full-Stack Developer & Automation Expert",
    "url": "https://codeurs.com",
    "worksFor": {
      "@type": "Organization",
      "name": "DevUrs"
    },
    "description": "Full-Stack Developer & Automation Expert with 5+ years of experience building high-performance web applications and intelligent workflow systems. Specialized in Ruby on Rails, React.js, Next.js, and Node.js. Certified automation professional with 200+ workflow automations using n8n, Make, and Zapier.",
    "knowsAbout": [
      "Ruby on Rails",
      "React.js",
      "Next.js",
      "Node.js",
      "n8n",
      "Make",
      "Zapier",
      "LangChain",
      "LangGraph",
      "Workflow Automation"
    ],
    "sameAs": []
  }

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
