// Homepage prerender: renders the client-side React landing into static HTML so
// non-JS crawlers and AI engines see real content instead of an empty #root.
//
// Runs after `vite build`. Serves dist/ locally, loads it in headless Chromium
// (Playwright, already a dev dependency), waits past the reveal-observer failsafe
// (~5s) so every section is in its final visible state, then writes the fully
// rendered <html> back over dist/index.html. Fails loudly if the hero <h1> never
// renders, so a blank prerender can never ship.
import { createServer } from 'node:http'
import { readFile, writeFile } from 'node:fs/promises'
import { existsSync, statSync, createReadStream } from 'node:fs'
import { join, extname, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from '@playwright/test'

const DIST = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'dist')
const PORT = 5055
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.mp4': 'video/mp4', '.txt': 'text/plain', '.xml': 'application/xml',
  '.json': 'application/json', '.woff2': 'font/woff2', '.ico': 'image/x-icon',
}

// Minimal static server with SPA fallback to index.html.
const server = createServer((req, res) => {
  try {
    const urlPath = decodeURIComponent(new URL(req.url, `http://localhost:${PORT}`).pathname)
    let filePath = normalize(join(DIST, urlPath))
    if (!filePath.startsWith(DIST)) { res.writeHead(403).end(); return } // path-traversal guard
    if (!existsSync(filePath) || statSync(filePath).isDirectory()) filePath = join(DIST, 'index.html')
    res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' })
    createReadStream(filePath).pipe(res)
  } catch {
    res.writeHead(500).end()
  }
})

await new Promise((resolve) => server.listen(PORT, resolve))

let browser
try {
  browser = await chromium.launch()
} catch (err) {
  // Chromium isn't installed (e.g. a CI/Vercel image without browsers). Don't
  // fail the build — ship the client-rendered index.html and warn loudly.
  console.warn(`⚠ Prerender skipped: could not launch Chromium (${err.message.split('\n')[0]}).`)
  console.warn('  Shipping client-rendered index.html. Run `npx playwright install chromium` to enable prerendering.')
  server.close()
  process.exit(0)
}
try {
  const routes = [
    { path: '/', file: 'index.html', selector: '#root h1' },
    { path: '/blog', file: 'blog.html', selector: '#root' },
    { path: '/research', file: 'research.html', selector: '#root' },
    { path: '/case-studies', file: 'case-studies.html', selector: '#root' },
    { path: '/terms', file: 'terms.html', selector: '#root' },
    { path: '/privacy', file: 'privacy.html', selector: '#root' },
    { path: '/data-tos', file: 'data-tos.html', selector: '#root' },
    { path: '/support', file: 'support.html', selector: '#root' }
  ]

  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })

  for (const route of routes) {
    await page.goto(`http://localhost:${PORT}${route.path}`, { waitUntil: 'domcontentloaded', timeout: 15000 })
    await page.waitForSelector(route.selector, { timeout: 20000 })

    if (route.path === '/') {
      // Nudge the IntersectionObserver through the whole page, then wait past the 5s
      // failsafe so every section settles into its revealed (visible) state.
      await page.evaluate(async () => {
        for (let y = 0; y <= document.body.scrollHeight; y += window.innerHeight) {
          window.scrollTo(0, y)
          await new Promise((r) => setTimeout(r, 150))
        }
        window.scrollTo(0, 0)
      })
      await page.waitForTimeout(6000)
    } else {
      await page.waitForTimeout(1000)
    }

    const html = '<!doctype html>\n' + (await page.content()).replace(/^<!doctype html>/i, '').trimStart()
    await writeFile(join(DIST, route.file), html, 'utf8')
    console.log(`✓ Prerendered ${route.path} -> dist/${route.file} (${(html.length / 1024).toFixed(1)} KB)`)
  }
} finally {
  await browser.close()
  server.close()
}
