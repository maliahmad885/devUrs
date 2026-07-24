import type { Metadata, Viewport } from "next";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import ErrorBoundary from "@/components/ErrorBoundary";
import AnalyticsWrapper from "@/components/Analytics";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "DevUrs | Ali Ahmad — Full-Stack Developer & Automation Expert",
  description: "Ali Ahmad — Full-Stack Developer & Automation Expert with 5+ years building high-performance web apps and intelligent workflows. Rails, React, Next.js, Node.js, n8n, Make, Zapier, LangChain.",
  keywords: "full-stack developer, Ruby on Rails, React, Next.js, Node.js, n8n, Make, Zapier, workflow automation, LangChain, LangGraph, Ali Ahmad, DevUrs",
  authors: [{ name: "Ali Ahmad" }],
  creator: "Ali Ahmad / DevUrs",
  publisher: "DevUrs",
  robots: "index, follow",
  openGraph: {
    title: "DevUrs | Ali Ahmad — Full-Stack Developer & Automation Expert",
    description: "5+ years building high-performance web applications and intelligent workflow systems. Rails, React, Next.js, automation, and AI agents.",
    url: "https://codeurs.com",
    siteName: "DevUrs",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "DevUrs — Ali Ahmad, Full-Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevUrs | Ali Ahmad — Full-Stack Developer & Automation Expert",
    description: "5+ years building high-performance web applications and intelligent workflow systems.",
    images: ["/og-image.svg"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    shortcut: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#059669",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning={true}>
      <head>
        <StructuredData />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#059669" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DevUrs" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#059669" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className="font-sans" suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ErrorBoundary>
            {children}
            <AnalyticsWrapper />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
