import { notFound } from 'next/navigation'
import { CustomMDX } from '../../../mdx-components'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'
import Image from 'next/image'
import Link from 'next/link'

export async function generateStaticParams() {
  const posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export function generateMetadata({ params }) {
  const post = getBlogPosts().find((post) => post.slug === params.slug)
  if (!post) {
    return
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
    category,
    author,
  } = post.metadata
  const ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      category,
      author,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default function Blog({ params }) {
  const allPosts = getBlogPosts();
  const post = allPosts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }
  
  // Find related posts based on slugs in frontmatter
  const relatedPosts = allPosts.filter((otherPost) =>
      post.metadata.relatedPosts?.includes(otherPost.slug)
  );

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            articleSection: post.metadata.category,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'My Portfolio',
            },
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <hr className='border-neutral-300 dark:border-neutral-700'/>
      <p className="text-lg text-neutral-700 dark:text-neutral-300 mt-2">
        {post.metadata.summary}
      </p>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {post.metadata.author}
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {post.metadata.category}
        </p>
      </div>
      <hr className='border-neutral-300 dark:border-neutral-700'/>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>

      {/* 👇 Related Posts Section */}
      {relatedPosts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="block p-4 border border-neutral-300 dark:border-neutral-700 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <h3 className="font-semibold">{relatedPost.metadata.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  {relatedPost.metadata.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <footer className="mt-8">
        <div className="flex items-center justify-center mt-8">
          <hr className="w-1/2 border-neutral-300 dark:border-neutral-700" />
          <div className="relative w-12 h-12 bg-white rounded-full shadow-lg">
            <Image
              src="/assets/images/profile.png"
              width={60}
              height={60}
              alt="Avatar"
              className="absolute top-0 left-0 w-full h-full rounded-full object-cover aspect-square"
            />
          </div>
          <hr className="w-1/2 border-neutral-300 dark:border-neutral-700" />
        </div>
        <Link href="/blog" className="text-primary-600 dark:text-primary-400 font-thin">
          ← Back to Blog
        </Link>
      </footer>
    </section>
  )
}