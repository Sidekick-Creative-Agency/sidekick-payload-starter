import { cn } from 'src/utilities/cn'
import React from 'react'
import RichText from '@/components/RichText'
import defaultTheme from 'tailwindcss/defaultTheme'

import type { Page } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { Media } from '@/components/Media'
import {
  BRAND_BORDER_COLOR_CLASSES,
  BRAND_BACKGROUND_COLOR_CLASSES,
  BRAND_BEFORE_BACKGROUND_COLOR_CLASSES,
  BRAND_TEXT_COLOR_CLASSES,
  BRAND_BACKGROUND_COLOR_HOVER_CLASSES,
  BRAND_BACKGROUND_COLOR_FOCUS_VISIBLE_CLASSES,
  BRAND_TEXT_COLOR_HOVER_CLASSES,
  SHOULD_USE_DARK_TEXT_BACKGROUND_COLORS,
} from '@/utilities/constants'

type Props = Extract<Page['layout'][0], { blockType: 'columnsBlock' }>

export const ColumnsBlock: React.FC<
  {
    id?: string
  } & Props
> = (props) => {
  const { id, columns, styles } = props
  const width = styles?.global?.width || 'boxed'
  const blockBgColor = styles?.global?.backgroundColor
  const reverseWrap = styles?.resp?.reverseWrap
  const enableDivider = styles?.global?.enableDivider
  const dividerColor = styles?.global?.dividerColor

  const widthClasses = {
    full: 'max-w-full',
    boxed: '',
  }
  const flexDirection = reverseWrap ? 'columnReverse' : 'column'
  const colsSpanClasses = {
    full: 'w-full sm:col-span-4 lg:col-span-12',
    half: 'w-full sm:col-span-2 lg:col-span-6',
    oneThird: 'w-full sm:col-span-2 lg:col-span-4',
    twoThirds: 'w-full sm:col-span-2 lg:col-span-8',
  }
  const flexDirectionClasses = {
    column: 'flex-col',
    columnReverse: 'flex-col-reverse',
  }
  const mediaBorderRadiusClasses = {
    none: 'rounded-none',
    small: 'rounded-mediaSm',
    medium: 'rounded-mediaMd',
    large: 'rounded-mediaLg',
    xl: 'rounded-mediaXl',
    xxl: 'rounded-media2Xl',
    full: 'rounded-full',
  }
  const subtitleAlignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }
  const blockTwBackgroundColor = BRAND_BACKGROUND_COLOR_CLASSES[blockBgColor || 'transparent']
  return (
    <div className={`columns-block-${id} ${blockTwBackgroundColor} `}>
      <div
        className={`${widthClasses[width]} ${width !== 'full' ? 'py-20 md:py-24 lg:py-32 container' : ''}`}
      >
        <div
          className={cn(
            `flex ${flexDirectionClasses[flexDirection]} sm:grid sm:grid-cols-4 lg:grid-cols-12  ${width !== 'full' && !enableDivider && 'gap-y-8'}`,
          )}
        >
          {columns &&
            columns.length > 0 &&
            columns.map((col, index) => {
              const {
                enableLinks,
                links,
                enableSubtitle,
                subtitle,
                subtitleAlign,
                subtitleColor,
                richText,
                size,
                media,
                type,
                mediaBorderRadius,
                backgroundColor: colBgColor,
                backgroundImage,
                styles,
              } = col
              const colTwBackgroundColor =
                BRAND_BACKGROUND_COLOR_CLASSES[colBgColor || 'transparent']

              return (
                <div
                  className={`relative ${colsSpanClasses[size || 'full']} 
                    ${
                      type === 'text'
                        ? width === 'full'
                          ? `px-5 py-20 sm:px-10 sm:py-32 lg:px-20 ${styles && styles.enableTopBorder && styles.borderColor && `border-t-[.625rem]`} ${BRAND_BORDER_COLOR_CLASSES[styles?.borderColor || 'transparent']}`
                          : enableDivider
                            ? index === 0
                              ? 'sm:pr-20'
                              : index === columns.length - 1
                                ? 'pt-10 sm:pl-20 sm:pt-0'
                                : 'pt-10 sm:px-10 sm:pt-0'
                            : size !== 'full'
                              ? index === 0
                                ? 'sm:pr-12 md:pr-16'
                                : index === columns.length - 1
                                  ? 'sm:pl-12 md:pl-16'
                                  : 'sm:px-5'
                              : ''
                        : width === 'full'
                          ? `${styles && styles.enableTopBorder && styles.borderColor && `border-t-[.625rem]`} ${BRAND_BORDER_COLOR_CLASSES[styles?.borderColor || 'transparent']}`
                          : size !== 'full'
                            ? index === 0
                              ? 'sm:pr-12 md:pr-16'
                              : index === columns.length - 1
                                ? 'sm:pl-12 md:pl-16'
                                : 'sm:px-5'
                            : ''
                    } flex flex-col justify-center items-stretch sm:items-start ${colTwBackgroundColor} ${index !== 0 && enableDivider && `before:absolute before:content-[""] before:left-0 before:top-0 before:h-[1px] sm:before:h-full before:w-full sm:before:w-[1px] ${BRAND_BEFORE_BACKGROUND_COLOR_CLASSES[dividerColor || 'transparent']} before:opacity-50`}`}
                  key={index}
                >
                  {type === 'text' && (
                    <div
                      className={`relative ${width !== 'full' ? `${styles && styles.enableTopBorder && styles.borderColor && `border-t-[.625rem]`} ${BRAND_BORDER_COLOR_CLASSES[styles?.borderColor || 'transparent']}` : 'w-[40rem] max-w-full mx-auto'}  `}
                    >
                      {enableSubtitle && subtitle && (
                        <span
                          className={`inline-block w-full uppercase tracking-widest leading-none text-base font-basic-sans font-bold mb-2 z-10 relative ${subtitleAlignClasses[subtitleAlign || 'left']} ${BRAND_TEXT_COLOR_CLASSES[subtitleColor || 'tan']}`}
                        >
                          {subtitle}
                        </span>
                      )}
                      {richText && (
                        <RichText
                          content={richText}
                          enableGutter={false}
                          className="z-10 relative"
                        />
                      )}
                      {enableLinks && links && links.length > 0 && (
                        <div className="mt-10 flex gap-4 lg:gap-6 flex-wrap justify-stretch">
                          {links.map((link) => {
                            return (
                              <CMSLink
                                key={link.id}
                                {...link.link}
                                className={`z-10 relative w-full lg:w-auto ${BRAND_TEXT_COLOR_CLASSES[link.link.textColor || 'white']} ${
                                  link.link.appearance === 'default'
                                    ? `${BRAND_BACKGROUND_COLOR_CLASSES[link.link.backgroundColor || 'navy']} ${BRAND_BACKGROUND_COLOR_HOVER_CLASSES[link.link.backgroundColor || 'navy']} ${BRAND_BACKGROUND_COLOR_FOCUS_VISIBLE_CLASSES[link.link.backgroundColor || 'navy']} hover:bg-opacity-90 focus-visible:bg-opacity-90 ${BRAND_BORDER_COLOR_CLASSES[link.link.backgroundColor || 'navy']}`
                                    : `${BRAND_BORDER_COLOR_CLASSES[link.link.borderColor || 'navy']} ${BRAND_BACKGROUND_COLOR_HOVER_CLASSES[link.link.borderColor || 'navy']} ${BRAND_BACKGROUND_COLOR_FOCUS_VISIBLE_CLASSES[link.link.borderColor || 'navy']} ${link.link.borderColor && BRAND_TEXT_COLOR_HOVER_CLASSES[SHOULD_USE_DARK_TEXT_BACKGROUND_COLORS.includes(link.link.borderColor) ? 'navy' : 'white']}`
                                }`}
                              />
                            )
                          })}
                        </div>
                      )}
                      {backgroundImage && (
                        <Media
                          resource={backgroundImage}
                          className={`absolute top-0 left-0 w-full h-full pointer-events-none z-0 `}
                          imgClassName="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  )}
                  {type === 'media' && media && (
                    <Media
                      resource={media}
                      className={`relative aspect-[5/4] overflow-hidden w-full h-auto z-0 ${styles && styles.enableTopBorder && styles.borderColor && `border-t-[.625rem]`} ${BRAND_BORDER_COLOR_CLASSES[styles?.borderColor || 'transparent']} ${width !== 'full' ? `md:aspect-square ${mediaBorderRadiusClasses[mediaBorderRadius || 'none']}` : 'md:aspect-auto md:h-full'}`}
                      imgClassName="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  )}
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
