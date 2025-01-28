import { notFound, redirect } from 'next/navigation'
import { RenderHero } from '@/heros/RenderHero'
import { RenderBlocks } from '@/blocks/RenderBlocks'

import { queryPageBySlug } from '@/utilities/queryPageBySlug'

export default async function Page() {
  const page = await queryPageBySlug({ slug: 'about' })
  if (page) {
    return (
      <div>
        {/* Allows redirects for valid pages too */}
        {/* <PayloadRedirects disableNotFound url={url} /> */}

        <RenderHero {...page.hero} title={page.title} />
        <RenderBlocks blocks={page.layout} />
      </div>
    )
  } else {
    redirect('/')
  }
}
