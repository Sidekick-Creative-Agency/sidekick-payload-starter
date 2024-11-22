import { cn } from 'src/utilities/cn'
import React from 'react'
import RichText from '@/components/RichText'
import defaultTheme from 'tailwindcss/defaultTheme'

import type { Page } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { Media } from '@/components/Media'

type Props = Extract<Page['layout'][0], { blockType: 'columnsBlock' }>

export const ColumnsBlock: React.FC<
  {
    id?: string
  } & Props
> = (props) => {
  const { id, columns, styles } = props
  const {
    // @ts-ignore error type checking Styles Field
    global: { width },
    // @ts-ignore error type checking Styles Field
    responsive: {
      paddingVerticalDesktopValue: pyDesktopVal,
      paddingVerticalDesktopUnit: pyDesktopUnit,
      paddingHorizontalDesktopValue: pxDesktopVal,
      paddingHorizontalDesktopUnit: pxDesktopUnit,
      paddingVerticalTabletValue: pyTabletVal,
      paddingVerticalTabletUnit: pyTabletUnit,
      paddingHorizontalTabletValue: pxTabletVal,
      paddingHorizontalTabletUnit: pxTabletUnit,
      paddingVerticalMobileValue: pyMobileVal,
      paddingVerticalMobileUnit: pyMobileUnit,
      paddingHorizontalMobileValue: pxMobileVal,
      paddingHorizontalMobileUnit: pxMobileUnit,
      reverseWrap,
    },
  } = styles

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
  const pyDesktop = pyDesktopVal && pyDesktopUnit ? `${pyDesktopVal}${pyDesktopUnit}` : '0'
  const pxDesktop = pxDesktopVal && pxDesktopUnit ? `${pxDesktopVal}${pxDesktopUnit}` : '0'
  const pyTablet = pyTabletVal && pyTabletUnit ? `${pyTabletVal}${pyTabletUnit}` : '0'
  const pxTablet = pxTabletVal && pxTabletUnit ? `${pxTabletVal}${pxTabletUnit}` : '0'
  const pyMobile = pyMobileVal && pyMobileUnit ? `${pyMobileVal}${pyMobileUnit}` : '0'
  const pxMobile = pxMobileVal && pxMobileUnit ? `${pxMobileVal}${pxMobileUnit}` : '0'

  return (
    <>
      <style>
        {`.columns-block-${id} {
        padding: ${pyMobile} ${pxMobile};
       

       @media screen and (min-width: ${defaultTheme.screens.md}) {
       padding: ${pyTablet} ${pxTablet};
          @media screen and (min-width: ${defaultTheme.screens.lg}) {
          padding: ${pyDesktop} ${pxDesktop};
       }
      }`}
      </style>
      <div className={`container columns-block-${id} ${widthClasses[width]}`}>
        <div
          className={cn(
            `flex ${flexDirectionClasses[flexDirection]} sm:grid sm:grid-cols-4 lg:grid-cols-12  ${width !== 'full' && 'gap-y-8 gap-x-16'}`,
          )}
        >
          {columns &&
            columns.length > 0 &&
            columns.map((col, index) => {
              const { enableLink, link, richText, size, media, type, mediaBorderRadius } = col

              return (
                <div
                  className={cn(
                    `lg:col-span-${colsSpanClasses[size || 'full']} ${type === 'text' && width === 'full' && 'px-5 py-10 sm:px-10 sm:py-20 md:px-20 md:py-20'} flex flex-col justify-center items-stretch sm:items-start gap-4`,
                    {
                      'sm:col-span-2': size !== 'full',
                    },
                    {},
                  )}
                  key={index}
                >
                  {type === 'text' && (
                    <>
                      {richText && <RichText content={richText} enableGutter={false} />}
                      {enableLink && <CMSLink {...link} />}
                    </>
                  )}
                  {type === 'media' && media && (
                    <Media
                      resource={media}
                      className={cn(
                        `${mediaBorderRadiusClasses[mediaBorderRadius || 'none']} overflow-hidden`,
                      )}
                    />
                  )}
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}
