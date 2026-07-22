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
  title = "DevUrs | Ali Ahmad — Full-Stack Developer & Automation Expert",
  description = "Ali Ahmad — Full-Stack Developer & Automation Expert with 5+ years building high-performance web apps and intelligent workflows. Rails, React, Next.js, Node.js, n8n, Make, Zapier, LangChain.",
  keywords = "full-stack developer, Ruby on Rails, React, Next.js, Node.js, n8n, Make, Zapier, workflow automation, LangChain, Ali Ahmad, DevUrs",
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
      <meta name="author" content="Ali Ahmad" />
      
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
      <meta name="theme-color" content="#059669" />
      <meta name="msapplication-TileColor" content="#059669" />
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
      
      {/* Structured Data — sameAs left empty until real profile URLs are provided */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Ali Ahmad",
            "jobTitle": "Full-Stack Developer & Automation Expert",
            "description": description,
            "url": url,
            "worksFor": {
              "@type": "Organization",
              "name": "DevUrs",
              "logo": image
            },
            "sameAs": []
          })
        }}
      />
    </Head>
  )
}
