'use client'
import type { StaticImageData } from 'next/image'
import React from 'react'
import type { Page } from '@/payload-types'
import { Media } from '../../components/Media'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

type Props = Extract<Page['layout'][0], { blockType: 'mediaCarouselBlock' }>

export const MediaCarouselBlock: React.FC<Props> = (props) => {
  const { carouselItems, enableAutoPlay, elementId } = props

  if (!carouselItems || carouselItems.length === 0) {
    return null
  }
  return (
    <div className="w-full" {...(elementId ? { id: elementId } : {})}>
      <Carousel
        {...(enableAutoPlay
          ? {
              plugins: [
                Autoplay({
                  delay: 5000,
                }),
              ],
            }
          : {})}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {carouselItems.map((item, index) => (
            <CarouselItem key={index} className="basis-1/2 md:basis-1/4 p-0 relative aspect-[5/4]">
              {item.image && (
                <Media
                  resource={item.image}
                  className="relative w-full h-full"
                  imgClassName="w-full h-full object-cover top-0 left-0"
                  fill
                  size="(max-width: 768px) 100vw, (min-width: 769px) 33vw"
                />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
