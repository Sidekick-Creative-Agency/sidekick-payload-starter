
import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import React, { cache } from 'react'

import type { Media, Page as PageType } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'

import { getPayload } from 'payload'
import { queryPageByUrl } from '@/utilities/queryPageByUrl'
import PageClient from './page.client'
import './styles.scss'


export default async function Page() {

  const payload = await getPayload({ config: configPromise })
  const teamMembersResponse = await payload.find({
    collection: 'team-members',
    pagination: false
  })
  const teamMembers = teamMembersResponse.docs

  return (
    <div className='container'>
      <PageClient teamMembers={teamMembers} />
    </div>
  )
}
