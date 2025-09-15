import { formatDate } from 'app/blog/utils'
import resumeData from 'app/resume/resume.json'
import Link from 'next/link'
import { Tabs } from 'app/mdx-components/tabs'

export const metadata = {
  title: 'Resume',
  description: 'Resume of the author.',
}

// async function getData() {
//   //const res = await fetch('https://registry.jsonresume.org/gregordimi.json', { next: { revalidate: 0 } })
//   const res = await fetch('https://gist.githubusercontent.com/gregordimi/9d09a2d8a58aa4d80cb060ff2c76ced3/raw/resume2.json', { next: { revalidate: 0 } })
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.
 
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data')
//   }
 
//   return res.json()
// }

export default async function Resume() {

  // const resumeData = await getData();

  if (!resumeData) {
    return <div>Loading...</div>;
  }

  return (
<>

    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Resume</h1>

      <div className="m-2">
        <h2 className="mb-5">Current Projects</h2>
        <ul>
          {resumeData.projects.map((proj, index) => (
            <li key={index} className='mb-3'>
              <div className="w-full flex-row space-x-2">
              <p className="text-neutral-600 dark:text-neutral-400 w-[600px] tabular-nums">
                {formatDate(proj.startDate, false, true)} - {formatDate(proj.endDate, false, true) } / {proj.location}
                {/* {formatDate(proj.startDate, false)} - {formatDate(proj.endDate, false) } */}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
              <Link href={proj.url}><strong>{proj.name}</strong></Link> {proj.description}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
              {proj.highlights.map((hl, idx) => (
                <span key={idx} className="inline-block bg-neutral-200 dark:bg-neutral-800 text-sm px-2 py-1 mr-2 rounded mb-1">{hl}</span>
              ))}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
              {/* {proj.description} */}
              </p>
            </div>
            </li>
          ))}
        </ul>
      </div>
  
      
      <div className="m-2">
        <h2 className="mb-5">Past Projects</h2>
        <ul>
          {resumeData.work.map((work, index) => (
            <li key={index} className='mb-3'>
              <div className="w-full flex-row space-x-2">
              <p className="text-neutral-600 dark:text-neutral-400 w-[600px] tabular-nums">
                {formatDate(work.startDate, false, true)} - {formatDate(work.endDate, false, true) } / {work.location}
                {/* {formatDate(work.startDate, false)} - {formatDate(work.endDate, false) } */}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
              <strong>{work.position}</strong> at <Link href={work.url}>{work.name}</Link> 
              </p>
            </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="m-2">
        <h2 className="mb-5">Education</h2>
        <ul>
          {resumeData.education.map((edu, index) => (
            <li key={index} className='mb-3'>
                            <div className="w-full flex-row space-x-2">
              <p className="text-neutral-600 dark:text-neutral-400 w-[600px] tabular-nums">
                {formatDate(edu.startDate, false, true)} - {formatDate(edu.endDate, false, true) } / {edu.location}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
              <strong>{edu.studyType}</strong> at <Link href={edu.url}>{edu.institution}</Link> 
              </p>
            </div>
              {/* <strong>{edu.institution}</strong> - {edu.studyType} ({edu.startDate} - {edu.endDate}) */}
            </li>
          ))}
        </ul>
      </div>
      <div className="m-2">
      <h2 className="mb-5">Publications and conferences</h2>
        <ul>
          {resumeData.publications.map((pub, index) => (
            <li key={index} className='mb-3'>
              <strong>{pub.name}</strong> @ {pub.publisher} on {formatDate(pub.releaseDate, false, true)} - {pub.type}
              <Link href={pub.url}> (Link)</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
    </>
  );
  
}
