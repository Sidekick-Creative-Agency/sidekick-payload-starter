import type { CardGridBlock as CardGridBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { BRAND_BACKGROUND_COLOR_CLASSES } from '@/utilities/constants'
import { Media } from '@/components/Media'
import useWindowDimensions from '../../utilities/useWindowDimensions'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { CardGridBlockClient } from './Component.client'

export const CardGridBlock: React.FC<
  CardGridBlockProps & {
    id?: string
  }
> = async (props) => {
  // const { width } = useWindowDimensions()
  const { id, headingAlign = 'left', heading, subtitle, cards, styles, elementId } = props

  const {
    // @ts-ignore
    global: { backgroundColor },
  } = styles

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  const flexJustifyClasses = {
    left: 'md:justify-between',
    center: 'md:justify-center',
    right: 'md:justify-between',
  }

  const flexDirectionClasses = {
    left: 'md:flex-row',
    center: 'md:flex-col',
    right: 'md:flex-row-reverse',
  }

  return (
    <div
      className={`card-grid-block-${id} ${BRAND_BACKGROUND_COLOR_CLASSES[backgroundColor || 'transparent']} overflow-hidden`}
      {...(elementId ? { id: elementId } : {})}
    >
      <div className="container py-20 md:py-32 flex flex-col gap-16 md:gap-20">
        <div
          className={`flex flex-col gap-4 md:gap-4 md:items-center ${headingAlign && flexJustifyClasses[headingAlign]} ${headingAlign && flexDirectionClasses[headingAlign]}`}
        >
          <h2
            className={`text-[2.5rem] font-bold text-brand-gray-06 flex-1 ${headingAlign && alignClasses[headingAlign]}`}
          >
            {heading}
          </h2>
          {subtitle && (
            <p
              className={`max-w-[30rem] text-brand-gray-04 font-light flex-1 ${headingAlign && headingAlign !== 'right' && alignClasses[headingAlign]}`}
            >
              {subtitle}
            </p>
          )}
        </div>
        <CardGridBlockClient cards={cards} />
      </div>
    </div>
  )
}
