import type { Metadata } from "next";
import { Inter, Poppins, Open_Sans, Roboto_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import NoSSR from "@/components/NoSSR";
import ErrorBoundary from "@/components/ErrorBoundary";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
});

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins'
});

const openSans = Open_Sans({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-open-sans'
});

const robotoMono = Roboto_Mono({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-roboto-mono'
});



export const metadata: Metadata = {
  title: "Nexus Bloom - Integration Hub | Connect Everything",
  description: "Seamlessly integrate with 500+ apps and services. From CRM to marketing tools, we connect your entire tech stack with AI-powered automation.",
  keywords: "integration hub, app integration, workflow automation, AI automation, no-code tools, Make.com, Zapier, ManyChat, Zoho, HubSpot",
  authors: [{ name: "Nexus Bloom" }],
  creator: "Nexus Bloom",
  publisher: "Nexus Bloom",
  robots: "index, follow",
      openGraph: {
      title: "Nexus Bloom - Integration Hub | Connect Everything",
      description: "Seamlessly integrate with 500+ apps and services. From CRM to marketing tools, we connect your entire tech stack.",
      url: "https://nexusbloom.com",
      siteName: "Nexus Bloom",
      images: [
        {
          url: "/og-image.svg",
          width: 1200,
          height: 630,
          alt: "Nexus Bloom - Integration Hub",
        },
      ],
      locale: "en_US",
      type: "website",
    },
      twitter: {
      card: "summary_large_image",
      title: "Nexus Bloom - Integration Hub | Connect Everything",
      description: "Seamlessly integrate with 500+ apps and services. From CRM to marketing tools, we connect your entire tech stack.",
      images: ["/og-image.svg"],
    },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#8B5CF6",
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
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8B5CF6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Nexus Bloom" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </head>
      <body className={`${inter.className} ${inter.variable} ${poppins.variable} ${openSans.variable} ${robotoMono.variable}`} suppressHydrationWarning={true}>
        <NoSSR>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </NoSSR>
      </body>
    </html>
  );
}
