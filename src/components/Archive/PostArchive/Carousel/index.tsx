import React from 'react'

import { DataFromCollectionSlug } from 'payload'
import { PostCard } from '@/components/Posts/PostCard'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

interface PostArchiveCarouselProps {
  data: DataFromCollectionSlug<'posts'>[]
  buttonColor?: string | null | undefined
  enableExcerpt?: boolean | null | undefined
  enableDate?: boolean | null | undefined
  enableGutter?: boolean | null | undefined
}

export const PostArchiveCarousel: React.FC<PostArchiveCarouselProps> = (props) => {
  const { data, enableExcerpt, enableDate, enableGutter, buttonColor } = props
  return (
    <div className="relative w-full">
      <Carousel
        className="flex justify-center [&>div]:w-full [&>div]:px-4"
        opts={{ align: 'start' }}
      >
        <CarouselContent className="flex gap-4 w-full">
          {data?.map((post, index) => {
            if (typeof post === 'object' && post !== null) {
              return (
                <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
                  <div className={`w-full duration-1000`} key={post.id}>
                    <PostCard
                      post={post}
                      buttonColor={buttonColor}
                      enableExcerpt={enableExcerpt}
                      enableDate={enableDate}
                      enableGutter={enableGutter}
                    />
                  </div>
                </CarouselItem>
              )
            }
            return null
          })}
        </CarouselContent>
        <CarouselPrevious className="border-none w-10 h-10 p-2 flex justify-center items-center hover:bg-transparent hover:text-brand-navy focus-visible:ring-brand-navy focus-visible:ring-offset-2 [&_svg]:max-h-full top-[calc(100%+1rem)] left-auto right-12 translate-y-0 sm:top-1/2 sm:-translate-y-1/2 sm:-left-8 xl:-left-12" />
        <CarouselNext className="border-none w-10 h-10 p-2 flex justify-center items-center hover:bg-transparent hover:text-brand-navy focus-visible:ring-brand-navy focus-visible:ring-offset-2 [&_svg]:max-h-full  top-[calc(100%+1rem)] left-auto right-0 translate-y-0 sm:top-1/2 sm:-translate-y-1/2 sm:-right-8 xl:-right-12" />
      </Carousel>
    </div>
  )
}
