'use client'

import Head from 'next/head'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
}

export default function SEO({
  title = "DevUrs - Software Development Agency | Mobile Apps & Web Development",
  description = "Leading software development agency specializing in mobile apps, web applications, CRM systems, and custom software solutions. Transform your business with cutting-edge technology.",
  keywords = "mobile app development, web development, CRM development, SaaS development, e-commerce development, custom software, React Native, Next.js, Node.js, software development agency",
  image = "/og-image.svg",
  url = "https://codeurs.com",
  type = "website"
}: SEOProps) {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="DevUrs" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="DevUrs" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#8B5CF6" />
      <meta name="msapplication-TileColor" content="#8B5CF6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="DevUrs" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/favicon.svg" />
      
      {/* Manifest */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "DevUrs",
            "description": description,
            "url": url,
            "logo": image,
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-555-123-4567",
              "contactType": "customer service",
              "email": "hello@codeurs.com"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "San Francisco",
              "addressRegion": "CA",
              "addressCountry": "US"
            },
            "sameAs": [
              "https://github.com",
              "https://twitter.com",
              "https://linkedin.com"
            ],
            "offers": {
              "@type": "Offer",
              "name": "Software Development Services",
              "description": "Professional mobile app development, web applications, and custom software solutions"
            }
          })
        }}
      />
    </Head>
  )
}
