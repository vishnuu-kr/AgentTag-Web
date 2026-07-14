import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://agenttag.me'),
  title: {
    default: "AgentTag - Identity for AI agents · Free public beta",
    template: "%s | AgentTag"
  },
  description: "AgentTag is the control plane that gives an autonomous agent its own credentials, inbox, phone, cards, and compute governed by cryptographic mandates.",
  keywords: ["AI agent governance", "AgentTag", "AI identity", "Agentic AI", "AI security", "agent tagging"],
  openGraph: {
    title: "AgentTag - Identity for AI agents",
    description: "The control plane that gives an autonomous agent its own credentials, inbox, phone, cards, and compute governed by cryptographic mandates.",
    url: 'https://agenttag.me',
    siteName: 'AgentTag',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'AgentTag — Identity for AI agents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "AgentTag - Identity for AI agents",
    description: "The control plane that gives an autonomous agent its own credentials, inbox, phone, cards, and compute governed by cryptographic mandates.",
    images: ['/og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/logo_bgremoved.png", type: "image/png" }
    ],
    apple: "/logo_bgremoved.png",
  },
};

// Global JSON-LD: Organization only — injected on every page
const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://agenttag.me/#organization",
      "name": "AgentTag",
      "url": "https://agenttag.me",
      "logo": "https://agenttag.me/logo.png",
      "description": "AgentTag is a control plane for AI agent identity and governance. It gives every autonomous AI agent its own cryptographic credentials, signed mandates, and a tamper-evident audit ledger.",
      "contactPoint": [
        { "@type": "ContactPoint", "email": "contact@agenttag.me", "contactType": "customer support" },
        { "@type": "ContactPoint", "email": "contact@agenttag.me", "contactType": "security" },
        { "@type": "ContactPoint", "email": "contact@agenttag.me", "contactType": "privacy" }
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${inter.variable} ${bricolage.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground relative">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <Header />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
