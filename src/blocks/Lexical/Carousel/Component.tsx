'use client'
import { cn } from 'src/utilities/cn'
import React from 'react'
import RichText from '@/components/RichText'
import defaultTheme from 'tailwindcss/defaultTheme'

import type { Media as MediaType, Page } from '@/payload-types'

import { CMSLink } from '../../../components/Link'
import { Media } from '@/components/Media'
import { brandColorClasses } from '@/utilities/constants'
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import useWindowDimensions from '@/utilities/useWindowDimensions'

export type CarouselBlockProps = {
  items: {
    icon: MediaType
    heading: string
    content: string
  }[]
  blockType: 'carousel'
}

export const CarouselLexicalBlock: React.FC<CarouselBlockProps> = ({ items }) => {
  const { width } = useWindowDimensions()

  return (
    <>
      <div className={`carousel-lexical-block`}>
        <Carousel opts={{ align: 'start', duration: 18 }} className="w-full">
          <CarouselContent>
            {items?.map((item, index) => {
              if (typeof item === 'object' && item !== null) {
                return (
                  <CarouselItem key={index} className="basis-full">
                    <div className="p-4 flex flex-col gap-6 items-start">
                      <span className="font-basic-sans text-brand-tan text-2xl font-light pb-2 border-b-2 border-brand-tan leading-none">
                        {index < 9 ? `0${index + 1}` : index + 1}
                      </span>
                      <div className="flex items-center gap-4">
                        {item.icon && (
                          <Media
                            resource={item.icon}
                            className="w-16"
                            imgClassName="w-full h-full object-contain m-0"
                          />
                        )}
                        <h3 className="text-white">{item.heading}</h3>
                      </div>
                      <div>
                        <p className="m-0 text-brand-offWhite">{item.content}</p>
                      </div>
                    </div>
                  </CarouselItem>
                )
              }

              return null
            })}
          </CarouselContent>
          {width && width > parseInt(defaultTheme.screens.sm) && (
            <>
              <CarouselPrevious
                className={`bg-transparent border-none text-brand-blue hover:bg-transparent focus-visible:bg-transparent hover:text-white focus-visible:text-white ${width && width < parseInt(defaultTheme.screens.lg) && '-left-8'}`}
              />
              <CarouselNext
                className={`bg-transparent border-none text-brand-blue hover:bg-transparent focus-visible:bg-transparent hover:text-white focus-visible:text-white ${width && width < parseInt(defaultTheme.screens.lg) && '-right-8'}`}
              />
            </>
          )}

          <CarouselDots
            className="flex gap-2"
            dotClassName="h-[2px] w-full bg-brand-tan rounded-none hover:bg-brand-tan focus-visible:bg-brand-tan"
          />
        </Carousel>
      </div>
      {/* <div className={`columns-block-${id} ${blockTwBackgroundColor} `}>
        <div
          className={`${widthClasses[width]} ${width !== 'full' ? 'py-20 md:py-24 lg:py-32 container' : ''}`}
        >
          <div
            className={cn(
              `flex ${flexDirectionClasses[flexDirection]} sm:grid sm:grid-cols-4 lg:grid-cols-12  ${width !== 'full' && 'gap-y-8 gap-x-20'}`,
            )}
          >
            {columns &&
              columns.length > 0 &&
              columns.map((col, index) => {
                const {
                  enableLink,
                  link,
                  enableSubtitle,
                  subtitle,
                  richText,
                  size,
                  media,
                  type,
                  mediaBorderRadius,
                  backgroundColor: colBgColor,
                  backgroundImage,
                } = col
                const colTwBackgroundColor = brandColorClasses[colBgColor || 'transparent']

                return (
                  <div
                    className={cn(
                      `relative lg:col-span-${colsSpanClasses[size || 'full']} ${type === 'text' && width === 'full' && 'px-5 py-20 sm:px-10 sm:py-32 lg:px-20'} flex flex-col justify-center items-stretch sm:items-start ${colTwBackgroundColor}`,
                      {
                        'sm:col-span-2': size !== 'full',
                      },
                    )}
                    key={index}
                  >
                    {type === 'text' && (
                      <>
                        {enableSubtitle && subtitle && (
                          <span className="uppercase tracking-widest leading-none text-base font-basic-sans text-brand-tan font-bold mb-2">
                            {subtitle}
                          </span>
                        )}
                        {richText && (
                          <RichText content={richText} enableGutter={false} className="z-10" />
                        )}
                        {enableLink && <CMSLink {...link} className="mt-10 z-10" />}
                        {backgroundImage && (
                          <Media
                            resource={backgroundImage}
                            className="absolute top-0 left-0 w-full h-full pointer-events-none"
                            imgClassName="w-full h-full object-cover"
                          />
                        )}
                      </>
                    )}
                    {type === 'media' && media && (
                      <Media
                        resource={media}
                        className={cn(
                          `${mediaBorderRadiusClasses[mediaBorderRadius || 'none']} overflow-hidden w-full aspect-[3/2] z-0`,
                        )}
                        imgClassName="w-full h-full object-cover"
                      />
                    )}
                  </div>
                )
              })}
          </div>
        </div>
      </div> */}
    </>
  )
}
