'use client'

import Script from 'next/script'

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Nexus Bloom",
    "url": "https://nexusbloom.com",
    "logo": "https://nexusbloom.com/favicon.svg",
    "description": "Seamlessly integrate with 500+ apps and services. From CRM to marketing tools, we connect your entire tech stack with AI-powered automation.",
    "foundingDate": "2023",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "contact@nexusbloom.com"
    },
    "sameAs": [
      "https://linkedin.com/company/nexus-bloom",
      "https://twitter.com/nexusbloom",
      "https://facebook.com/nexusbloom"
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 40.7128,
        "longitude": -74.0060
      },
      "geoRadius": "50000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Integration Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Workflow Automation",
            "description": "Automate repetitive tasks and streamline your business processes with intelligent workflows."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "App Integration",
            "description": "Connect 500+ applications seamlessly with our robust integration platform."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Data Security",
            "description": "Enterprise-grade security with SOC 2 compliance and end-to-end encryption."
          }
        }
      ]
    }
  }

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
} 