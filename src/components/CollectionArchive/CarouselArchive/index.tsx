import { cn } from 'src/utilities/cn'
import React from 'react'

import type { Post } from '@/payload-types'

import { Card } from '@/components/Card'
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export type Props = {
  posts: Post[]
  navigationType?: string
}

export const CollectionArchiveCarousel: React.FC<Props> = (props) => {
  const { posts, navigationType } = props

  return (
    <div className={cn('container')}>
      <div>
        <Carousel opts={{ align: 'start', duration: 18 }} className="w-full">
          <CarouselContent>
            {posts?.map((result, index) => {
              if (typeof result === 'object' && result !== null) {
                return (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="h-full" doc={result} relationTo="posts" showCategories />
                  </CarouselItem>
                )
              }

              return null
            })}
          </CarouselContent>
          {(navigationType === 'arrows' || navigationType === 'both') && (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          )}
          {(navigationType === 'dots' || navigationType === 'both') && <CarouselDots />}
        </Carousel>
      </div>
    </div>
  )
}
