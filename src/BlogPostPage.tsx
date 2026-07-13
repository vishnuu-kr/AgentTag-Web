import { getPostBySlug } from '@/lib/blog'
import { useEffect } from 'react'

// Lightweight markdown → HTML — handles the subset used in AgentTag blog posts.
// No external dep needed; runs entirely client-side.
function mdToHtml(md: string): string {
  let html = md
    // Headings
    .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Horizontal rule
    .replace(/^---$/gm, '<hr />')
    // Blockquote
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    // Unordered list items
    .replace(/^\s*[-*+] (.+)$/gm, '<li>$1</li>')
    // Ordered list items
    .replace(/^\s*\d+\. (.+)$/gm, '<li>$1</li>')
    // Bold + italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')

  // Wrap consecutive <li> in <ul>
  html = html.replace(/(<li>[\s\S]+?<\/li>)(?=\s*<li>|$)/gm, (m) => m)
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/gm, '<ul>$1</ul>')

  // Paragraphs — lines not starting with a block tag
  const blockTags = /^<(h[1-6]|ul|ol|li|blockquote|hr|pre|div)/
  const lines = html.split('\n')
  const result: string[] = []
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) { result.push(''); continue }
    if (blockTags.test(trimmed)) { result.push(trimmed); continue }
    result.push(`<p>${trimmed}</p>`)
  }
  return result.join('\n')
}

type Props = { slug: string }

export default function BlogPostPage({ slug }: Props) {
  const post = getPostBySlug(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!post) {
    return (
      <main style={{ minHeight: '100vh', backgroundColor: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 32, marginBottom: 16 }}>Post not found</h1>
          <a href="/blog" style={{ color: 'var(--muted)', fontSize: 14 }}>← Back to Blog</a>
        </div>
      </main>
    )
  }

  const readTime = Math.ceil(post.content.split(/\s+/).length / 200)
  const bodyHtml = mdToHtml(post.content)

  return (
    <main style={{ backgroundColor: '#000000', minHeight: '100vh', paddingBottom: 120 }}>
      <article style={{ maxWidth: 720, margin: '0 auto', padding: '120px 24px 0' }}>

        {/* Back link */}
        <a
          href="/blog"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 13, color: 'var(--muted)', textDecoration: 'none', marginBottom: 40,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to Blog
        </a>

        {/* Header */}
        <header style={{ marginBottom: 48, textAlign: 'center' }}>
          <div style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
            {post.metadata.category}
          </div>
          <h1 style={{
            fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700, lineHeight: 1.15,
            letterSpacing: '-0.02em', marginBottom: 24,
            fontFamily: "'Bricolage Grotesque', sans-serif", color: 'var(--ink)',
          }}>
            {post.metadata.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, fontSize: 13, color: 'var(--muted)' }}>
            <span>{post.metadata.author}</span>
            <span>·</span>
            <time>{post.metadata.date}</time>
            <span>·</span>
            <span>{readTime} min read</span>
          </div>
        </header>

        {/* Body */}
        <div
          className="blog-prose"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />

        {/* CTA block */}
        <div style={{
          marginTop: 64, padding: '40px 32px', borderRadius: 16,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          textAlign: 'center',
        }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, fontFamily: "'Bricolage Grotesque', sans-serif", color: 'var(--ink)' }}>
            Join the AgentTag Beta
          </h3>
          <p style={{ fontSize: 15, color: 'var(--muted)', marginBottom: 24, maxWidth: 480, margin: '0 auto 24px' }}>
            If you're building agents that need real credentials, mandates, and audit trails, get early access to our control plane.
          </p>
          <a
            href="https://app.agenttag.me"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              height: 44, padding: '0 28px', borderRadius: 999,
              background: 'var(--ink)', color: '#000',
              fontSize: 14, fontWeight: 600, textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
          >
            Join the Beta
          </a>
        </div>
      </article>

      {/* Sticky bottom CTA */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40,
        background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(12px)',
        padding: '12px 24px',
        boxShadow: '0 -8px 24px rgba(0,0,0,0.4)',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>Ready to secure your AI agents?</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>Give your agents real identity and audit trails.</div>
          </div>
          <a
            href="https://app.agenttag.me"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              height: 36, padding: '0 20px', borderRadius: 8,
              background: 'var(--ink)', color: '#000',
              fontSize: 13, fontWeight: 600, textDecoration: 'none',
            }}
          >
            Join the Beta
          </a>
        </div>
      </div>
    </main>
  )
}
