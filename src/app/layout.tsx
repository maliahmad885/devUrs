import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import ErrorBoundary from "@/components/ErrorBoundary";
import AnalyticsWrapper from "@/components/Analytics";
import {
  AUTHOR_NAME,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_SHORT_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "full-stack developer",
    "Ruby on Rails",
    "React",
    "Next.js",
    "Node.js",
    "n8n",
    "Make",
    "Zapier",
    "workflow automation",
    "LangChain",
    "LangGraph",
    AUTHOR_NAME,
    SITE_NAME,
  ],
  authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
  creator: AUTHOR_NAME,
  publisher: SITE_NAME,
  robots: { index: true, follow: true },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_SHORT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_SHORT_DESCRIPTION,
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "default",
  },
  formatDetection: { telephone: false },
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
    <html lang="en" className={`${montserrat.variable} scroll-smooth`}>
      <body className="font-sans antialiased">
        <ErrorBoundary>{children}</ErrorBoundary>
        <StructuredData />
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
