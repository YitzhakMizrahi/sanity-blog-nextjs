import { previewData } from 'next/headers'
import PreviewSuspense from './../../components/blog/PreviewSuspense';
import PreviewBlogList from './../../components/blog/PreviewBlogList';
import BlogList from './../../components/blog/BlogList';
import { client } from '../../lib/sanity.client'
import { groq } from 'next-sanity'


const query = groq`
*[_type=='post'] {
   ...,
   author->,
   categories[]->
 } | order(_createdAt desc)
`

export default async function IndexPage() {
  if (previewData()?.token) {
    return (
      <PreviewSuspense
        fallback={
          <div role="status">
            <p className="text-center text-lg animate-pulse text-[#F7AB0A]">
              Loading Preview Data...
            </p>
          </div>
        }
      >
        <PreviewBlogList query={query} />
      </PreviewSuspense>
    )
  }

  const posts = await client.fetch(query)
  return <BlogList posts={posts} />
}
