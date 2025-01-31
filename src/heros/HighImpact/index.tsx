'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import {
  BRAND_TEXT_COLOR_CLASSES,
  BRAND_BACKGROUND_COLOR_CLASSES,
  BRAND_BACKGROUND_COLOR_HOVER_CLASSES,
  BRAND_BACKGROUND_COLOR_FOCUS_VISIBLE_CLASSES,
  BRAND_BORDER_COLOR_CLASSES,
  BRAND_TEXT_COLOR_HOVER_CLASSES,
  SHOULD_USE_DARK_TEXT_BACKGROUND_COLORS,
} from '@/utilities/constants'

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
                console.log(link)
                return (
                  <li key={i} className="flex-1">
                    <CMSLink
                      {...link}
                      className={`z-10 relative w-full lg:w-auto ${BRAND_TEXT_COLOR_CLASSES[link.textColor || 'white']} ${
                        link.appearance === 'default'
                          ? `${BRAND_BACKGROUND_COLOR_CLASSES[link.backgroundColor || 'navy']} ${BRAND_BACKGROUND_COLOR_HOVER_CLASSES[link.backgroundColor || 'navy']} ${BRAND_BACKGROUND_COLOR_FOCUS_VISIBLE_CLASSES[link.backgroundColor || 'navy']} hover:bg-opacity-90 focus-visible:bg-opacity-90 ${BRAND_BORDER_COLOR_CLASSES[link.backgroundColor || 'navy']}`
                          : `${BRAND_BORDER_COLOR_CLASSES[link.borderColor || 'navy']} ${BRAND_BACKGROUND_COLOR_HOVER_CLASSES[link.borderColor || 'navy']} ${BRAND_BACKGROUND_COLOR_FOCUS_VISIBLE_CLASSES[link.borderColor || 'navy']} ${link.borderColor && BRAND_TEXT_COLOR_HOVER_CLASSES[SHOULD_USE_DARK_TEXT_BACKGROUND_COLORS.includes(link.borderColor) ? 'navy' : 'white']}`
                      }`}
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
