'use client'
import { cn } from 'src/utilities/cn'
import React, { useState } from 'react'
import RichText from '@/components/RichText'
import defaultTheme from 'tailwindcss/defaultTheme'

import type { Page } from '@/payload-types'
import { Media } from '@/components/Media'
import { time } from 'console'

type Props = Extract<Page['layout'][0], { blockType: 'timelineBlock' }>

export const TimelineBlock: React.FC<
  {
    id?: string
  } & Props
> = (props) => {
  const { id, heading, timelineItems } = props
  const tabs = timelineItems?.map((timelineItem) => timelineItem.tab)
  const contents = timelineItems?.map((timelineItem) => timelineItem.content)
  const [activeIndex, setActiveIndex] = useState(0)

  const handlePrev = () => {
    if (!timelineItems) return
    if (activeIndex > 0) {
      setActiveIndex((current) => current - 1)
    } else {
      setActiveIndex(timelineItems.length - 1)
    }
  }

  const handleNext = () => {
    if (!timelineItems) return
    if (activeIndex < timelineItems.length - 1) {
      setActiveIndex((current) => current + 1)
    } else {
      setActiveIndex(0)
    }
  }

  if (!timelineItems) return
  return (
    <div className={`timeline-block-${id} bg-brand-navy`}>
      <div className="py-20 md:py-24 lg:py-32 container flex flex-col gap-16">
        <h2 className="text-white text-center text-[2.5rem] font-bold">{heading}</h2>
        <div className="flex flex-col items-center gap-28">
          <div className="relative w-full flex gap-4 sm:gap-6 justify-between item-center max-w-5xl">
            {tabs &&
              tabs.map((tab, index) => {
                const { icon, title } = tab
                return (
                  <div key={index} className="flex-1 flex justify-center relative">
                    <button
                      className="flex flex-col items-center gap-4 flex-1 relative z-10"
                      onClick={() => setActiveIndex(index)}
                    >
                      <div
                        className={`rounded-full w-14 h-14 sm:w-16 sm:h-16 ${activeIndex === index ? 'bg-white' : 'bg-brand-blue'}  flex justify-center items-center`}
                      >
                        {icon && typeof icon === 'object' && (
                          <Media resource={icon} className="w-8 h-8" />
                        )}
                      </div>
                      <span
                        className={`${activeIndex === index ? 'text-white' : 'text-brand-blue'} text-center text-base font-light leading-tight`}
                      >
                        {title}
                      </span>
                    </button>
                    {index !== 0 && (
                      <div className="absolute top-8 right-1/2 h-[1px] w-full bg-brand-gray-04 opacity-50"></div>
                    )}
                  </div>
                )
              })}
          </div>
          <div className="flex flex-col md:flex-row justify-around gap-10 w-full">
            {contents &&
              contents.length > 0 &&
              contents.map((content, index) => {
                const image = content?.image
                const richText = content?.richText
                if (!image || !richText) return
                return index === activeIndex ? (
                  <div key={index} className={`w-full grid grid-cols-1 md:grid-cols-5`}>
                    {image && typeof image === 'object' && (
                      <Media
                        resource={image}
                        className="flex-1 col-span-3 relative aspect-square sm:aspect-[3/2] md:aspect-auto"
                        imgClassName="absolute top-0 left-0 w-full h-full object-cover "
                      />
                    )}

                    <div className="p-8 lg:px-10 lg:py-20 xl:p-20 col-span-2 bg-brand-offWhite flex-1 flex flex-col gap-10">
                      <RichText content={richText} className="p-0 max-w-none" />
                      <div className="flex gap-4 justify-between">
                        <button
                          className="text-brand-navy text-lg tracking-widest uppercase font-light p-2"
                          onClick={handlePrev}
                          aria-label="Previous Timeline Item"
                        >
                          Previous
                        </button>
                        <button
                          className="text-brand-navy text-lg tracking-widest uppercase font-light p-2"
                          onClick={handleNext}
                          aria-label="Next Timeline Item"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
