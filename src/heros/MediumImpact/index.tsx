import React from 'react'
import type { Page } from '@/payload-types'
import { Media } from '@/components/Media'
import * as motion from 'motion/react-client'

export const MediumImpactHero: React.FC<Page['hero'] & { title: string }> = ({
  media,
  enableOverrideTitle,
  overrideTitle,
  title,
  subtitle,
}) => {
  return (
    <div className="relative -mt-[114px] bg-brand-navy">
      <div className="container relative z-10 pt-40 pb-20 md:pt-48 md:pb-32">
        <div className="flex flex-col gap-16 md:gap-20">
          <div className="flex flex-col gap-4 md:gap-10 md:flex-row justify-between items-start md:items-center">
            <div className="flex-1">
              <motion.h1
                className="text-white text-[2.5rem] md:text-[4rem] leading-tight font-bold"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 'some', margin: '-128px 0px -16px 0px' }}
              >
                {enableOverrideTitle ? overrideTitle : title}
              </motion.h1>
            </div>
            <div className="flex-1 md:ml-auto md:max-w-[30rem]">
              <motion.p
                className="text-lg md:text-xl font-light text-white"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 'some', margin: '-128px 0px -16px 0px' }}
              >
                {subtitle}
              </motion.p>
            </div>
          </div>
          {media && typeof media === 'object' && (
            <div>
              <Media
                className="aspect-[4/5] md:aspect-[3/1] relative"
                imgClassName="object-cover absolute inset-0 w-full h-full"
                priority
                resource={media}
                size="100vw"
              />
            </div>
          )}
        </div>
      </div>
      <img
        src="/pattern-geometric-general.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent to-brand-navy z-0" />
    </div>
  )
}
