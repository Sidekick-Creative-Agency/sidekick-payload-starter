import React from 'react'
import { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import {
  BRAND_TEXT_COLOR_CLASSES,
  BRAND_BACKGROUND_COLOR_CLASSES,
  BRAND_BACKGROUND_COLOR_HOVER_CLASSES,
  BRAND_BACKGROUND_COLOR_FOCUS_VISIBLE_CLASSES,
  BRAND_BORDER_COLOR_CLASSES,
  BRAND_TEXT_COLOR_HOVER_CLASSES,
  SHOULD_USE_DARK_TEXT_BACKGROUND_COLORS,
} from '@/utilities/constants'

export type LinkGroupLexicalBlockProps = {
  links: {
    link: {
      type?: ('reference' | 'custom') | null
      newTab?: boolean | null
      reference?: {
        relationTo: 'pages'
        value: number | Page
      } | null
      url?: string | null
      label: string
      /**
       * Choose how the link should be rendered.
       */
      appearance?: ('default' | 'outline') | null
      backgroundColor?: string | null
      borderColor?: string | null
      textColor?: string | null
    }
    id?: string | null
  }[]
  blockType: 'linkGroup'
}

export const LinkGroupLexicalBlock: React.FC<LinkGroupLexicalBlockProps> = (props) => {
  const { links } = props
  return (
    <div className="w-full">
      {Array.isArray(links) && links.length > 0 && (
        <ul className="flex justify-stretch flex-wrap gap-4 md:gap-4 p-0 m-0 list-none w-full">
          {links.map(({ link }, i) => {
            return (
              <li
                key={i}
                className={`flex-1 p-0 m-0 ${links.length > 1 ? 'w-full flex flex-col' : ''}`}
              >
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
  )
}
