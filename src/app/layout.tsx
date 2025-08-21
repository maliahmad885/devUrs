import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nexus Bloom - AI Automation & No-Code Solutions",
  description: "Transform your business with cutting-edge AI automation and no-code tools. Specializing in Integromat, Make.com, Zapier, and ManyChat solutions.",
  keywords: "AI automation, no-code tools, workflow automation, Integromat, Make.com, Zapier, ManyChat, chatbot development",
  authors: [{ name: "Nexus Bloom" }],
  creator: "Nexus Bloom",
  publisher: "Nexus Bloom",
  robots: "index, follow",
  openGraph: {
    title: "Nexus Bloom - AI Automation & No-Code Solutions",
    description: "Transform your business with cutting-edge AI automation and no-code tools.",
    url: "https://nexusbloom.com",
    siteName: "Nexus Bloom",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nexus Bloom - AI Automation Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus Bloom - AI Automation & No-Code Solutions",
    description: "Transform your business with cutting-edge AI automation and no-code tools.",
    images: ["/og-image.jpg"],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#1A202C",
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
