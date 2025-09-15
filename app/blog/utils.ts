import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml' // 👈 Import js-yaml

type Metadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
  author?: string
  category: string
  showInList?: string
  relatedPosts?: string[] // 👈 Add relatedPosts to the type
}

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  const match = frontmatterRegex.exec(fileContent)
  
  // Throw an error if no frontmatter is found
  if (!match) {
    throw new Error('No frontmatter found in the file.')
  }

  const frontMatterBlock = match[1]
  const content = fileContent.replace(frontmatterRegex, '').trim()
  
  // Use js-yaml to parse the frontmatter block
  const metadata = yaml.load(frontMatterBlock) as Metadata

  return { metadata, content }
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file))
    const slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content,
    }
  })
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), 'app', 'blog', 'posts')).filter(
    (post) => post.metadata.showInList !== 'false'
  )
}

export function formatDate(date: string, includeRelative = false, resumeFormat: boolean = false) {
  const currentDate = new Date()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  const targetDate = new Date(date)

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  const daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  const fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const resumeDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    year: 'numeric',
  })

  if (!includeRelative) {
    if (!resumeFormat) {
      return fullDate
    }
    if (resumeFormat) {
      return resumeDate
    }
  }

  return `${fullDate} (${formattedDate})`
}