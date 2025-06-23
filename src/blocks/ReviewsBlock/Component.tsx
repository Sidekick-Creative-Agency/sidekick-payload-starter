import type { Page, ReviewsBlock as ReviewsBlockProps } from '@/payload-types'
import React from 'react'
import { Media } from '@/components/Media'
import * as motion from 'motion/react-client'

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
          <motion.h2
            className="text-[2.5rem] font-bold text-brand-gray-06 flex-1"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 'all' }}
          >
            {heading}
          </motion.h2>
          <motion.p
            className="max-w-[30rem] text-brand-gray-04 font-light flex-1"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 'all' }}
          >
            {subtitle}
          </motion.p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {reviews &&
            reviews.map((review, index) => {
              const { reviewerName, reviewerTitle, image, review: reviewText } = review
              return (
                <div key={index} className="flex flex-col">
                  <div className="px-6 py-10 md:p-10 bg-brand-offWhite flex-1">
                    <motion.p
                      className="text-brand-gray-04 font-light"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true, amount: 'all' }}
                    >
                      {reviewText}
                    </motion.p>
                  </div>
                  <div className="p-6 md:p-10 bg-brand-green flex items-center gap-4">
                    <Media
                      resource={image}
                      className="w-12 h-12 min-w-12 min-h-12 rounded-full overflow-hidden relative"
                      imgClassName="absolute top-0 left-0 w-full h-full object-cover"
                    />
                    <div className="flex flex-col">
                      <motion.h3
                        className="text-xl font-bold text-white"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 'all' }}
                      >
                        {reviewerName}
                      </motion.h3>
                      <motion.h4
                        className="text-sm font-normal text-brand-tan"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 'all' }}
                      >
                        {reviewerTitle}
                      </motion.h4>
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
