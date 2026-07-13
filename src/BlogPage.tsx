import { getAllPosts } from '@/lib/blog'
import { BlogsSection, type BlogType } from '@/components/blogs-section'

export default function BlogPage() {
  const posts = getAllPosts()

  const blogs: BlogType[] = posts.map((post) => ({
    title: post.metadata.title,
    date: post.metadata.date,
    description: post.metadata.description,
    category: post.metadata.category,
    author: post.metadata.author,
    href: `/blog/${post.metadata.slug}`,
  }))

  return (
    <main
      style={{
        color: 'var(--ink)',
        backgroundColor: '#000000',
        minHeight: '100vh',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', paddingTop: 120 }}>
        <BlogsSection
          blogs={blogs}
          title="AgentTag Blog"
          description="The practical, opinionated guide to safe, governed AI agents in production."
        />
      </div>
    </main>
  )
}
