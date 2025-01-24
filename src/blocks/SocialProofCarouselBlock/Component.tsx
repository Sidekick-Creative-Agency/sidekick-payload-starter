import React from 'react'
import type { Page } from '@/payload-types'

import { Media } from '@/payload-types'
import { Marquee } from '@/components/Marquee'

type Props = Extract<Page['layout'][0], { blockType: 'socialProofCarouselBlock' }>

export const SocialProofCarouselBlock: React.FC<
  {
    id?: string
  } & Props
> = (props) => {
  const { id, heading, subtitle, logos } = props

  return (
    <>
      <div
        className={`social-proof-carousel-block-${id} flex flex-col items-stretch bg-brand-offWhite overflow-hidden`}
      >
        <div className="container py-20 sm:py-32 flex flex-col gap-16 sm:gap-20">
          {(heading || subtitle) && (
            <div className="flex flex-col gap-2 items-center">
              {subtitle && (
                <span className="text-brand-tan uppercase text-base font-bold tracking-wider leading-none text-center">
                  {subtitle}
                </span>
              )}
              {heading && (
                <h2 className="text-center text-[2rem] sm:text-[2.5rem] text-brand-navy font-bold">
                  {heading}
                </h2>
              )}
            </div>
          )}
          {logos && (
            <Marquee speed={40}>
              {logos.map((logo, index) => {
                return (
                  <img
                    key={index}
                    src={(logo.logo as Media).url || ''}
                    alt={(logo.logo as Media).alt || ''}
                    className="max-w-40 sm:max-w-48 mr-16 w-auto"
                  />
                )
              })}
            </Marquee>
          )}
        </div>
      </div>
    </>
  )
}
