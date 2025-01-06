import React from 'react'

import type { Media as MediaType, Page } from '@/payload-types'
import { Media } from '@/components/Media'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  brandBorderColorClasses,
  brandBgColorClasses,
  brandTextColorClasses,
  brandTextHoverColorClasses,
  brandTextFocusVisibleColorClasses,
} from '@/utilities/constants'

type Props = Extract<Page['layout'][0], { blockType: 'expertiseBlock' }>

export const ExpertiseBlock: React.FC<
  {
    id?: string
  } & Props
> = (props) => {
  const { id, heading, description, expertiseAreas } = props

  return (
    <div className={`expertise-block-${id}`}>
      <div className="py-32 container">
        <div className="flex flex-col gap-16 md:gap-20">
          <div className="flex flex-col gap-4 md:flex-row md:gap-10 md:justify-between md:items-center">
            <h2 className="text-[2.5rem] font-bold text-brand-gray-06">{heading}</h2>
            <p className="max-w-[30rem] text-brand-gray-04 font-light">{description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-6">
            {expertiseAreas &&
              expertiseAreas.map((area, index) => {
                const { title, accentColor, image, link } = area
                return (
                  <div
                    key={index}
                    className={`w-full h-[25rem] md:h-[35rem] flex flex-col justify-end gap-4 p-6 md:p-10 relative border-t-[12px] ${brandBorderColorClasses[accentColor || 'transparent']}`}
                  >
                    <div className="flex flex-col gap-4 relative z-10">
                      <h3 className="text-white uppercase tracking-[.075rem] font-bold text-2xl">
                        {title}
                      </h3>
                      <Link href="/">
                        <Button
                          className={`w-full ${brandBgColorClasses[accentColor || 'transparent']} hover:bg-white ${brandTextHoverColorClasses[accentColor || 'white']} focus-visible:bg-white ${brandTextFocusVisibleColorClasses[accentColor || 'white']}`}
                        >
                          Learn More
                        </Button>
                      </Link>
                    </div>
                    <Media
                      resource={image as MediaType}
                      className="absolute top-0 left-0 w-full h-full object-cover z-0"
                      imgClassName="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/75 via-transparent to-transparent"></div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
