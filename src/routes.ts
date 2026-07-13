export const STUB_ROUTES = [
  'case-studies',
  'blog',
  'research',
  'terms',
  'privacy',
  'data-tos',
] as const

export type StubSlug = (typeof STUB_ROUTES)[number]

export const isAppHash = () => 
  window.location.hostname.startsWith('app.') ||
  window.location.hash.startsWith('#/app') || 
  window.location.pathname.startsWith('/app')

// Support page (standalone) is reachable at #/support or /support.
export const isSupportHash = () =>
  window.location.hash === '#/support' || window.location.pathname.replace(/\/$/, '') === '/support'

export const isLoginHash = () =>
  window.location.hash === '#/login' || 
  window.location.hash === '#/app/login' || 
  window.location.pathname.replace(/\/$/, '') === '/login' ||
  window.location.pathname.replace(/\/$/, '') === '/app/login'

export const readStubSlug = (): StubSlug | null => {
  const hashSlug = window.location.hash.replace(/^#\//, '').trim()
  if ((STUB_ROUTES as readonly string[]).includes(hashSlug)) {
    return hashSlug as StubSlug
  }
  const pathSlug = window.location.pathname.replace(/^\//, '').replace(/\/$/, '').trim()
  return (STUB_ROUTES as readonly string[]).includes(pathSlug) ? (pathSlug as StubSlug) : null
}

