import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
        url: "/og-image.jpg",
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
    images: ["/og-image.jpg"],
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
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
