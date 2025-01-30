'use client'
import type { CardGridBlock as CardGridBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { BRAND_BACKGROUND_COLOR_CLASSES } from '@/utilities/constants'
import { Media } from '@/components/Media'
import useWindowDimensions from '../../utilities/useWindowDimensions'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

interface CardGridBlockClientProps {
  cards: CardGridBlockProps['cards']
}
export const CardGridBlockClient: React.FC<CardGridBlockClientProps> = ({ cards }) => {
  const { width } = useWindowDimensions()

  return (
    <>
      {width && width > 767 && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-wrap">
          {cards &&
            cards.length > 0 &&
            cards.map((card) => {
              return (
                <div
                  key={card.id}
                  className="p-10 w-full rounded-[1.25rem] shadow-md flex flex-col justify-center gap-4 bg-white"
                >
                  {card.icon && <Media resource={card.icon} className="w-full max-w-20 mx-auto" />}
                  {card.content && (
                    <RichText
                      content={card.content}
                      className="[&_p:last-child]:m-0 [&_h2]:mb-2 [&_h3]:mb-2 text-brand-gray-06 text-center max-w-none p-0"
                    />
                  )}
                </div>
              )
            })}
        </div>
      )}
      {width && width <= 767 && (
        <Carousel className="overflow-visible">
          <CarouselContent className="overflow-visible h-full" showOverflow>
            {cards &&
              cards.length > 0 &&
              cards.map((card) => {
                return (
                  <CarouselItem key={card.id}>
                    <div className="p-10 w-full h-full rounded-[1.25rem] shadow-md flex flex-col justify-center gap-4 bg-white">
                      {card.icon && (
                        <Media resource={card.icon} className="w-full max-w-20 mx-auto" />
                      )}
                      {card.content && (
                        <RichText
                          content={card.content}
                          className="[&_p:last-child]:m-0 [&_h2]:mb-2 [&_h3]:mb-2 text-brand-gray-06 text-center max-w-none p-0"
                        />
                      )}
                    </div>
                  </CarouselItem>
                )
              })}
          </CarouselContent>
        </Carousel>
      )}
    </>
  )
}
