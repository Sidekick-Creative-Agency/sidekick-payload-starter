import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import type { CookieBanner } from '@/payload-types'
import { CookieBannerClient } from './Component.client'

export async function CookieBanner() {


  const cookieBanner = (await getCachedGlobal('cookie-banner', 1)()) as CookieBanner
  const { content, links } = cookieBanner

  if (!cookieBanner) return
  return (

    <CookieBannerClient content={content} links={links} />

  )
}
