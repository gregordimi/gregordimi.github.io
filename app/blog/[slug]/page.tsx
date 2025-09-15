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
  } = post.metadata
  const ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
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
  const post = getBlogPosts().find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

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
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {post.metadata.category}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
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
