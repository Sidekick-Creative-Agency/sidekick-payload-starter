import React from 'react'

import type { Media as MediaType, Page } from '@/payload-types'
import { Media } from '@/components/Media'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  BRAND_BORDER_COLOR_CLASSES,
  BRAND_BACKGROUND_COLOR_CLASSES,
  BRAND_TEXT_COLOR_CLASSES,
  BRAND_TEXT_COLOR_HOVER_CLASSES,
  BRAND_TEXT_COLOR_FOCUS_VISIBLE_CLASSES,
  BRAND_BACKGROUND_COLOR_FOCUS_VISIBLE_CLASSES,
  BRAND_BACKGROUND_COLOR_HOVER_CLASSES,
  SHOULD_USE_DARK_TEXT_BACKGROUND_COLORS,
} from '@/utilities/constants'
import { CMSLink } from '@/components/Link'
import * as motion from 'motion/react-client'

type Props = Extract<Page['layout'][0], { blockType: 'expertiseBlock' }>

export const ExpertiseBlock: React.FC<
  {
    id?: string
  } & Props
> = (props) => {
  const { id, heading, description, expertiseAreas, elementId } = props

  return (
    <div className={`expertise-block-${id}`} {...(elementId ? { id: elementId } : {})}>
      <div className="py-32 container">
        <div className="flex flex-col gap-16 md:gap-20">
          <div className="flex flex-col gap-4 md:flex-row md:gap-10 md:justify-between md:items-center">
            <motion.h2
              className="text-[2.5rem] font-bold text-brand-gray-06"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 'all' }}
            >
              {heading}
            </motion.h2>
            <motion.p
              className="max-w-[30rem] text-brand-gray-04 font-light"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 'all' }}
            >
              {description}
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-6">
            {expertiseAreas &&
              expertiseAreas.map((area, index) => {
                const { title, borderColor, image, link } = area
                return (
                  <div
                    key={index}
                    className={`w-full h-[25rem] md:h-[35rem] flex flex-col justify-end gap-4 p-6 md:p-10 relative border-t-[12px] ${BRAND_BORDER_COLOR_CLASSES[borderColor || 'transparent']}`}
                  >
                    <div className="flex flex-col gap-4 relative z-10">
                      <motion.h3
                        className="text-white uppercase tracking-[.075rem] font-bold text-2xl"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 'all' }}
                      >
                        {title}
                      </motion.h3>
                      {area.link && (
                        <CMSLink
                          {...area.link}
                          className={`${BRAND_TEXT_COLOR_CLASSES[area.link.textColor || 'white']} ${
                            area.link.appearance === 'default'
                              ? `${BRAND_BACKGROUND_COLOR_CLASSES[area.link.backgroundColor || 'navy']} ${BRAND_BACKGROUND_COLOR_HOVER_CLASSES[area.link.backgroundColor || 'navy']} ${BRAND_BACKGROUND_COLOR_FOCUS_VISIBLE_CLASSES[area.link.backgroundColor || 'navy']} hover:bg-opacity-90 focus-visible:bg-opacity-90 ${BRAND_BORDER_COLOR_CLASSES[area.link.backgroundColor || 'navy']}`
                              : `${BRAND_BORDER_COLOR_CLASSES[area.link.borderColor || 'navy']} ${BRAND_BACKGROUND_COLOR_HOVER_CLASSES[area.link.borderColor || 'navy']} ${BRAND_BACKGROUND_COLOR_FOCUS_VISIBLE_CLASSES[area.link.borderColor || 'navy']} ${area.link.borderColor && BRAND_TEXT_COLOR_HOVER_CLASSES[SHOULD_USE_DARK_TEXT_BACKGROUND_COLORS.includes(area.link.borderColor) ? 'navy' : 'white']}`
                          }`}
                        ></CMSLink>
                      )}
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
