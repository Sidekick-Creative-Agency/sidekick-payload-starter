import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const MediumImpactHero: React.FC<Page['hero'] & { title: string }> = ({
  media,
  enableOverrideTitle,
  overrideTitle,
  title,
  subtitle,
}) => {
  return (
    <div className="relative -mt-[114px] bg-brand-navy">
      <div className="container relative z-10 pt-40 pb-20 md:pt-48 md:pb-32">
        <div className="flex flex-col gap-16 md:gap-20">
          <div className="flex flex-col gap-4 md:gap-10 md:flex-row justify-between items-start md:items-center">
            <div className="flex-1">
              <h1 className="text-white text-[2.5rem] md:text-[4rem] leading-tight font-bold">
                {enableOverrideTitle ? overrideTitle : title}
              </h1>
            </div>
            <div className="flex-1 md:ml-auto md:max-w-[30rem]">
              <p className="text-lg md:text-xl font-light text-white">{subtitle}</p>
            </div>
          </div>
          {media && typeof media === 'object' && (
            <div>
              <Media
                className="aspect-[4/5] md:aspect-[3/1] relative"
                imgClassName="object-cover absolute inset-0 w-full h-full"
                priority
                resource={media}
              />
            </div>
          )}
        </div>
      </div>
      <img
        src="/pattern-geometric-general.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent to-brand-navy z-0" />
    </div>
  )
}
