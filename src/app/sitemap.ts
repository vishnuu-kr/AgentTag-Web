import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';

export default function sitemap(): MetadataRoute.Sitemap {
  // If you are merging this into the main agenttag.me sitemap,
  // simply copy this block into your existing sitemap.ts
  const posts = getAllPosts();

  const blogUrls = posts.map((post) => ({
    url: `https://agenttag.me/blog/${post.metadata.slug}`,
    lastModified: new Date(post.metadata.date).toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://agenttag.me/',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://agenttag.me/about',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://agenttag.me/case-studies',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://agenttag.me/integrations',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://agenttag.me/pricing',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://agenttag.me/security',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://agenttag.me/research',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://agenttag.me/glossary',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://agenttag.me/use-cases',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://agenttag.me/compare',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://agenttag.me/support',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://agenttag.me/changelog',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://agenttag.me/privacy',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://agenttag.me/terms',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://agenttag.me/data-tos',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...blogUrls,
  ];
}
