'use client'

import React from 'react'
import defaultTheme from 'tailwindcss/defaultTheme'
import type { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import useWindowDimensions from '@/utilities/useWindowDimensions'

export type MediaGridLexicalBlockProps = {
  items: {
    media: MediaType
    aspectRatio?: string
  }[]
  blockType: 'mediaGrid'
  elementId?: string
  customCss?: string
}

const aspectRatioClasses = {
  auto: 'aspect-auto',
  square: 'aspect-square',
  video: 'aspect-video',
}

export const MediaGridLexicalBlock: React.FC<MediaGridLexicalBlockProps> = ({
  items,
  elementId,
  customCss,
}) => {
  const { width } = useWindowDimensions()
  console.log(customCss)
  return (
    <>
      {customCss && <style>{customCss}</style>}
      <div
        className={`media-grid-lexical-block flex flex-wrap gap-10`}
        {...(elementId ? { id: elementId } : {})}
      >
        {items?.map((item, index) => {
          if (typeof item === 'object' && item !== null) {
            let maxWidth = ''
            switch (items.length) {
              case 1:
                maxWidth = ''
                break
              case 2:
                maxWidth = 'md:max-w-[calc(50%-1.25rem))]'
                break
              default:
                maxWidth = 'md:max-w-[calc(50%-1.25rem))] md:max-w-[calc(33.33%-.75rem))]'
                break
            }
            return (
              <div key={index} className={`max-w-full ${maxWidth}`}>
                {item.media && (
                  <Media
                    resource={item.media}
                    className={`w-full `}
                    imgClassName={`object-cover m-0 ${aspectRatioClasses[item.aspectRatio || 'auto']}`}
                  />
                )}
              </div>
            )
          }

          return null
        })}
      </div>
    </>
  )
}
