import { getBlogPosts } from 'app/blog/utils';
import { MetadataRoute } from 'next';

export const baseUrl = 'https://gregordimi.com';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt), // Ensure date is a Date object
    // Optional: add changeFrequency and priority for better SEO
    // changeFrequency: 'monthly',
    // priority: 0.8,
  }));

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
    },
    // Add other static routes here, e.g., /about, /projects
    // {
    //   url: `${baseUrl}/about`,
    //   lastModified: new Date(),
    //   changeFrequency: 'yearly',
    //   priority: 0.5,
    // },
  ];

  return [...routes, ...blogs];
}