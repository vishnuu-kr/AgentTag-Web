// Vite-native blog loader — reads MDX files as raw strings via import.meta.glob
// and extracts YAML frontmatter without any extra dependencies.

export type PostMeta = {
  slug: string
  title: string
  date: string
  description: string
  category: string
  author: string
}

export type Post = {
  metadata: PostMeta
  content: string // raw markdown body (frontmatter stripped)
}

// import.meta.glob with { as: 'raw', eager: true } loads every .mdx file as a
// plain string at build time — no MDX compiler needed.
const rawFiles = import.meta.glob('/content/blog/*.mdx', {
  as: 'raw',
  eager: true,
}) as Record<string, string>

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)/)
  if (!match) return { meta: {}, body: raw }
  const meta: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim()
    const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '')
    if (key) meta[key] = value
  }
  return { meta, body: match[2].trim() }
}

function filePathToSlug(path: string): string {
  return path.replace(/^.*\//, '').replace(/\.mdx$/, '')
}

let _cache: Post[] | null = null

export function getAllPosts(): Post[] {
  if (_cache) return _cache
  _cache = Object.entries(rawFiles)
    .map(([path, raw]) => {
      const slug = filePathToSlug(path)
      const { meta, body } = parseFrontmatter(raw)
      return {
        metadata: {
          slug,
          title: meta.title ?? slug,
          date: meta.date ?? '',
          description: meta.description ?? '',
          category: meta.category ?? '',
          author: meta.author ?? '',
        },
        content: body,
      }
    })
    .sort((a, b) => (a.metadata.date < b.metadata.date ? 1 : -1))
  return _cache
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.metadata.slug === slug)
}
