import type { Page, ReviewsBlock as ReviewsBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { DataFromCollectionSlug, getPayload } from 'payload'
import React from 'react'

import { CollectionArchiveGrid } from '@/components/CollectionArchive/GridArchive'
import { CollectionArchiveCarousel } from '@/components/CollectionArchive/CarouselArchive'
import { Media } from '@/components/Media'

type Props = Extract<Page['layout'][0], { blockType: 'reviewsBlock' }>

export const ReviewsBlock: React.FC<
  Props & {
    id?: string
  }
> = async (props) => {
  const { id, heading, subtitle, reviews, elementId } = props

  return (
    <div className={`reviews-block-${id}`} {...(elementId ? { id: elementId } : {})}>
      <div className="container py-20 md:py-32 flex flex-col gap-16 md:gap-20">
        <div className="flex flex-col gap-4 md:flex-row md:gap-10 md:justify-between md:items-center">
          <h2 className="text-[2.5rem] font-bold text-brand-gray-06 flex-1">{heading}</h2>
          <p className="max-w-[30rem] text-brand-gray-04 font-light flex-1">{subtitle}</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {reviews &&
            reviews.map((review, index) => {
              const { reviewerName, reviewerTitle, image, review: reviewText } = review
              return (
                <div key={index} className="flex flex-col">
                  <div className="px-6 py-10 md:p-10 bg-brand-offWhite flex-1">
                    <p className="text-brand-gray-04 font-light">{reviewText}</p>
                  </div>
                  <div className="p-6 md:p-10 bg-brand-green flex items-center gap-4">
                    <Media
                      resource={image}
                      className="w-12 h-12 min-w-12 min-h-12 rounded-full overflow-hidden relative"
                      imgClassName="absolute top-0 left-0 w-full h-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h3 className="text-xl font-bold text-white">{reviewerName}</h3>
                      <h4 className="text-sm font-normal text-brand-tan">{reviewerTitle}</h4>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
