

This is a porfolio site template complete with a blog. Includes:

- MDX and Markdown support
- Optimized for SEO (sitemap, robots, JSON-LD schema)
- RSS Feed
- Dynamic OG images
- Syntax highlighting
- Tailwind v4
- Vercel Speed Insights / Web Analytics
- Geist font

---

The demo contains both mdx(under blog2) and mdx remote(under blog/[slug])

The resume schema is based on `jsonresume`

Currently meant to be served as a static website on github thus: 

```
  output: 'export',
  images: {
    unoptimized: true,
},
```
