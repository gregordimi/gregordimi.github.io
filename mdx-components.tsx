import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { MDXRemoteProps } from 'next-mdx-remote/rsc' // Import the MDXRemoteProps type
import { highlight } from 'sugar-high'
import React from 'react'
import UniChart from './app/blog/chart/unichart'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { Tabs } from 'app/mdx-components/tabs'


function Table({ data }) {
  const headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ))
  const rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table className={data.class}>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function CustomLink(props) {
  const href = props.href

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function RoundedImage(props) {
  return <div className='p-10'><Image alt={props.alt} className="rounded-lg" {...props} /></div>
}

function Code({ children, ...props }) {
  const codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

function createHeading(level) {
  const Heading = ({ children }) => {
    const slug = slugify(children)
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    )
  }

  Heading.displayName = `Heading${level}`

  return Heading
}

export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '2px',
      color: '#fff',
      padding: '0.2rem',
    }}>
    {children}
  </span>
);

const components: MDXComponents = { // Explicitly type the components object
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
  UniChart,
  Highlight,
  Tabs,
}

const options = {
  mdxOptions: {
    remarkPlugins: [remarkMath, remarkGfm],
    rehypePlugins: [rehypeKatex],
  }
}

// Corrected function signature and component rendering
export function CustomMDX({ source, ...props }: MDXRemoteProps) {
  return (
    <MDXRemote
      source={source} // Pass the source prop explicitly
      components={{ ...components, ...(props.components || {}) }}
      options={options}
    />
  )
}