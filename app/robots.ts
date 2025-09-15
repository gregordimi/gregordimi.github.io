import { baseUrl } from './sitemap'; // Note: Relative path might be needed

// This forces the route handler to run at build time for static export
export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}