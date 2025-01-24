'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero'] & { title: string }> = ({
  links,
  media,
  enableOverrideTitle,
  overrideTitle,
  title,
}) => {
  return (
    <div className="relative flex items-center -mt-[114px] max-h-screen pt-40 pb-32 md:pt-48 md:pb-40">
      <div className="container z-10 relative flex flex-col items-center justify-center gap-16">
        <h1 className="text-white text-center text-[2.5rem] sm:text-5xl md:text-[4rem] leading-tight font-bold">
          {enableOverrideTitle ? overrideTitle : title}
        </h1>
        <div className="flex flex-col gap-6 w-full items-center justify-center">
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex justify-stretch flex-wrap gap-4 md:gap-6">
              {links.map(({ link }, i) => {
                return (
                  <li key={i} className="flex-1">
                    <CMSLink
                      {...link}
                      className={`w-full border ${link.appearance === 'default' && 'bg-white text-brand-navy hover:bg-brand-navy focus-visible:bg-brand-navy hover:text-white focus-visible:text-white border-white hover:border-brand-navy focus-visible:border-brand-navy'} ${link.appearance === 'outline' && 'bg-transparent border-white text-white'}`}
                    />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="h-[25rem] md:h-[35rem] 2xl:min-h-[60vh] max-h-screen select-none">
        {media && typeof media === 'object' && (
          <React.Fragment>
            <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
            <div className="absolute pointer-events-none left-0 bottom-0 w-full h-full bg-black opacity-50" />
          </React.Fragment>
        )}
      </div>
    </div>
  )
}
