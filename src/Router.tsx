import { useEffect, useState, lazy, Suspense } from 'react'
import App from './App'
import { isSupportHash, readStubSlug, STUB_ROUTES, type StubSlug } from './routes'

// This is the MARKETING site only — there is no console here (that's a
// separate repo/deployment at app.agenttag.me). No login route, no Clerk,
// no Dashboard: just the landing page plus its support/blog/legal pages.
const SupportPage = lazy(() => import('./SupportPage'))
const StubPage = lazy(() => import('./StubPage'))
const NotFoundPage = lazy(() => import('./NotFoundPage'))
const BlogPage = lazy(() => import('./BlogPage'))
const BlogPostPage = lazy(() => import('./BlogPostPage'))

export type { StubSlug } from './routes'

type RouteState = 'support' | 'notfound' | 'blog-index' | StubSlug | null
type BlogPostRoute = { type: 'blog-post'; slug: string }

function detectRoute(): RouteState | BlogPostRoute {
  if (isSupportHash()) return 'support'
  const path = window.location.pathname
  const hash = window.location.hash

  // /blog/:slug — individual post
  const blogPostMatch = path.match(/^\/blog\/([^/]+)\/?$/)
  if (blogPostMatch) return { type: 'blog-post', slug: blogPostMatch[1] }

  // /blog — index
  if (path === '/blog' || path === '/blog/') return 'blog-index'

  const stub = readStubSlug()
  if (stub) return stub

  if ((path === '/' || path === '') && (hash === '' || hash === '#/')) return null
  return 'notfound'
}

export default function Router() {
  const [route, setRoute] = useState<RouteState | BlogPostRoute>(detectRoute)

  useEffect(() => {
    const on = () => setRoute(detectRoute())
    window.addEventListener('hashchange', on)
    window.addEventListener('popstate', on)

    // Intercept client-side clicks on clean path links (e.g. href="/blog")
    const handleRouteClicks = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a')
      if (anchor && anchor.origin === window.location.origin) {
        const href = anchor.getAttribute('href')
        if (href && href.startsWith('/') && !href.startsWith('/#/')) {
          e.preventDefault()
          window.history.pushState(null, '', href)
          window.dispatchEvent(new PopStateEvent('popstate'))
        }
      }
    }
    document.addEventListener('click', handleRouteClicks)

    return () => {
      window.removeEventListener('hashchange', on)
      window.removeEventListener('popstate', on)
      document.removeEventListener('click', handleRouteClicks)
    }
  }, [])

  const fallback = (
    <div className="flex h-screen w-screen items-center justify-center bg-background text-muted-foreground text-sm font-medium">
      <div className="flex items-center gap-2">
        <svg className="animate-spin h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" style={{ height: "16px", width: "16px" }}>
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <span>Loading...</span>
      </div>
    </div>
  )

  if (route === 'support') {
    return (
      <Suspense fallback={fallback}>
        <SupportPage />
      </Suspense>
    )
  }
  if (route === 'blog-index') {
    return (
      <Suspense fallback={fallback}>
        <BlogPage />
      </Suspense>
    )
  }
  if (route && typeof route === 'object' && route.type === 'blog-post') {
    return (
      <Suspense fallback={fallback}>
        <BlogPostPage slug={route.slug} />
      </Suspense>
    )
  }
  if (route === 'notfound') {
    return (
      <Suspense fallback={fallback}>
        <NotFoundPage />
      </Suspense>
    )
  }
  if (route && typeof route === 'string' && (STUB_ROUTES as readonly string[]).includes(route)) {
    return (
      <Suspense fallback={fallback}>
        <StubPage slug={route as StubSlug} />
      </Suspense>
    )
  }
  return <App />
}
