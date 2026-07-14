import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "AgentTag - Identity & Governance for AI Agents",
  description:
    "AgentTag is the control plane that gives an autonomous agent its own credentials, inbox, phone, cards, and compute governed by cryptographic mandates.",
  keywords: [
    "AI agent governance",
    "AgentTag",
    "AI identity",
    "Agentic AI",
    "AI security",
    "agent tagging",
  ],
  alternates: { canonical: "https://agenttag.me" },
  openGraph: {
    title: "AgentTag - Identity & Governance for AI Agents",
    description:
      "AgentTag is the control plane that gives an autonomous agent its own credentials, inbox, phone, cards, and compute governed by cryptographic mandates.",
    url: "https://agenttag.me",
    siteName: "AgentTag",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "AgentTag — Identity & Governance for AI Agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentTag - Identity & Governance for AI Agents",
    description:
      "AgentTag is the control plane that gives an autonomous agent its own credentials, inbox, phone, cards, and compute governed by cryptographic mandates.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

// Homepage specific JSON-LD: WebSite + FAQPage
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://agenttag.me/#website",
      "url": "https://agenttag.me",
      "name": "AgentTag",
      "description": "AI agent identity and governance platform",
      "publisher": { "@id": "https://agenttag.me/#organization" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": { "@type": "EntryPoint", "urlTemplate": "https://agenttag.me/support?q={search_term_string}" },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What exactly is an agent passport?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "An agent passport is the agent's own cryptographic identity — an Ed25519 keypair bound to a W3C DID. It signs requests and audit entries so permissions can be scoped and revoked cleanly, and so every action is attributable to a specific agent rather than to whoever has your API key."
          }
        },
        {
          "@type": "Question",
          "name": "How is this different from giving an agent my API keys?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "API keys give broad access to whoever has them. AgentTag gives each agent a separate identity with narrow, policy-based permissions — spend caps, allowed tools, expiring scopes — and a signed audit trail you can verify after the fact."
          }
        },
        {
          "@type": "Question",
          "name": "What does 'governed by mandates' mean in practice?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Mandates are signed policy documents that define what an agent can do, how much it can spend, when it must ask for human approval, and when access expires. They are version-controlled, revocable, and evaluated at request time by the policy engine."
          }
        },
        {
          "@type": "Question",
          "name": "How do I install AgentTag for the first time?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Run `agenttag mcp add --client claude` to mint a passport and register your first mandate. The CLI walks you through the rest, and you can finish setup from the Setup and CLI tab in the control plane."
          }
        },
        {
          "@type": "Question",
          "name": "Is the audit ledger really tamper-evident?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Each entry includes the hash of the previous entry, so the chain is verifiable end-to-end and any retro-edit would break every hash that follows. You can export and re-verify the chain yourself at any time."
          }
        },
        {
          "@type": "Question",
          "name": "What does it cost during the beta?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nothing — the public beta is free with generous usage limits. When we move to general availability, you will get 30 days notice and founding-user pricing will be locked in."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need to replace my existing MCP clients?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. AgentTag sits in front of your existing MCP servers as a policy surface — your Claude Desktop, CrewAI, or LangChain clients keep working unchanged, but every request now flows through signed mandates first."
          }
        },
        {
          "@type": "Question",
          "name": "What happens if a passport is compromised?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Revoke it. The mandate stops being honored on the next request, in-flight sessions are killed, and the audit ledger records the revocation event with a reason. You can also pre-issue scoped, short-lived passports so a single leak is bounded."
          }
        }
      ]
    }
  ]
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HomeClient />
    </>
  );
}
