'use client'

import Script from 'next/script'

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "DevUrs",
    "url": "https://codeurs.com",
    "logo": "https://codeurs.com/favicon.svg",
    "description": "Leading software development agency specializing in mobile apps, web applications, CRM systems, and custom software solutions.",
    "foundingDate": "2023",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "hello@codeurs.com"
    },
    "sameAs": [
      "https://linkedin.com/company/codeurs",
      "https://twitter.com/codeurs",
      "https://facebook.com/codeurs"
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
      "name": "Software Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mobile App Development",
            "description": "Native iOS and Android apps built with React Native, Flutter, and modern technologies."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web Development",
            "description": "Modern web applications built with React, Next.js, and full-stack technologies."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "CRM & SaaS Development",
            "description": "Custom CRM systems and SaaS platforms tailored to your business needs."
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