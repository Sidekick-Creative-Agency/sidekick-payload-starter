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
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
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
  const blockTwBackgroundColor = BRAND_BACKGROUND_COLOR_CLASSES[blockBgColor || 'transparent']
  return (
    <div className={`columns-block-${id} ${blockTwBackgroundColor} `}>
      <div
        className={`${widthClasses[width]} ${width !== 'full' ? 'py-20 md:py-24 lg:py-32 container' : ''}`}
      >
        <div
          className={cn(
            `flex ${flexDirectionClasses[flexDirection]} sm:grid sm:grid-cols-4 lg:grid-cols-12  ${width !== 'full' && !enableDivider ? 'gap-y-8' : 'gap-y-8 '}`,
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
                styles,
              } = col
              const colTwBackgroundColor =
                BRAND_BACKGROUND_COLOR_CLASSES[colBgColor || 'transparent']

              return (
                <div
                  className={cn(
                    `relative lg:col-span-${colsSpanClasses[size || 'full']} ${type === 'text' && width === 'full' ? 'px-5 py-20 sm:px-10 sm:py-32 lg:px-20' : `${enableDivider ? (index === 0 ? 'sm:pr-20' : index === columns.length - 1 ? 'pt-10 sm:pl-20 sm:pt-0' : 'pt-10 sm:px-10 sm:pt-0') : index === 0 ? 'sm:pr-10' : index === columns.length - 1 ? 'sm:pl-10' : 'sm:px-5'}`} flex flex-col justify-center items-stretch sm:items-start ${colTwBackgroundColor} ${styles && styles.enableTopBorder && styles.borderColor && `border-t-[.625rem]`} ${BRAND_BORDER_COLOR_CLASSES[styles?.borderColor || 'transparent']} ${index !== 0 && enableDivider && `before:absolute before:content-[""] before:left-0 before:top-0 before:h-[1px] sm:before:h-full before:w-full sm:before:w-[1px] ${BRAND_BEFORE_BACKGROUND_COLOR_CLASSES[dividerColor || 'transparent']} before:opacity-50`}`,
                    {
                      'sm:col-span-2': size !== 'full',
                    },
                  )}
                  key={index}
                >
                  {type === 'text' && (
                    <div className={`${width === 'full' && 'w-[40rem] max-w-full mx-auto'}`}>
                      {enableSubtitle && subtitle && (
                        <span className="uppercase tracking-widest leading-none text-base font-basic-sans text-brand-tan font-bold mb-2 z-10 relative">
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
                      {enableLink && <CMSLink {...link} className="mt-10 z-10 relative" />}
                      {backgroundImage && (
                        <Media
                          resource={backgroundImage}
                          className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
                          imgClassName="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  )}
                  {type === 'media' && media && (
                    <Media
                      resource={media}
                      className={cn(
                        `${mediaBorderRadiusClasses[mediaBorderRadius || 'none']} overflow-hidden w-full h-full z-0`,
                      )}
                      imgClassName="w-full h-full object-cover"
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
