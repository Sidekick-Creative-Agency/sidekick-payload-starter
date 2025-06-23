'use client'

import React from 'react'
import defaultTheme from 'tailwindcss/defaultTheme'
import type { Media as MediaType, Page } from '@/payload-types'
import { Media } from '@/components/Media'

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import useWindowDimensions from '@/utilities/useWindowDimensions'
import { motion } from 'motion/react'

export type CarouselLexicalBlockProps = {
  items: {
    icon: MediaType
    heading: string
    content: string
  }[]
  blockType: 'carousel'
}

export const CarouselLexicalBlock: React.FC<CarouselLexicalBlockProps> = ({ items }) => {
  const { width } = useWindowDimensions()

  return (
    <div className={`carousel-lexical-block`}>
      <Carousel opts={{ align: 'start', duration: 18 }} className="w-full">
        <CarouselContent>
          {items?.map((item, index) => {
            if (typeof item === 'object' && item !== null) {
              return (
                <CarouselItem key={index} className="basis-full">
                  <div className="p-4 flex flex-col gap-6 items-start">
                    <motion.span
                      className="font-basic-sans text-brand-tan text-2xl font-light pb-2 border-b-2 border-brand-tan leading-none"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true, amount: 'all' }}
                    >
                      {index < 9 ? `0${index + 1}` : index + 1}
                    </motion.span>
                    <div className="flex items-center gap-4">
                      {item.icon && (
                        <Media
                          resource={item.icon}
                          className="w-16"
                          imgClassName="w-full h-full object-contain m-0"
                        />
                      )}
                      <motion.h3
                        className="text-white"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 'some' }}
                      >
                        {item.heading}
                      </motion.h3>
                    </div>
                    <div>
                      <motion.p
                        className="m-0 text-brand-offWhite"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 'some' }}
                      >
                        {item.content}
                      </motion.p>
                    </div>
                  </div>
                </CarouselItem>
              )
            }

            return null
          })}
        </CarouselContent>
        {width && width > parseInt(defaultTheme.screens.sm) && (
          <>
            <CarouselPrevious
              className={`bg-transparent border-none text-brand-blue hover:bg-transparent focus-visible:bg-transparent hover:text-white focus-visible:text-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy -left-8 lg:-left-12 [&_svg]:w-full [&_svg]:h-auto [&_svg]:max-h-full`}
            />
            <CarouselNext
              className={`bg-transparent border-none text-brand-blue hover:bg-transparent focus-visible:bg-transparent hover:text-white focus-visible:text-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy -right-8 lg:-right-12 [&_svg]:w-full [&_svg]:h-auto [&_svg]:max-h-full`}
            />
          </>
        )}

        <CarouselDots
          className="flex gap-2"
          dotClassName="pt-[2px] h-0 w-full bg-brand-tan rounded-none hover:bg-brand-tan focus-visible:bg-brand-tan"
        />
      </Carousel>
    </div>
  )
}
