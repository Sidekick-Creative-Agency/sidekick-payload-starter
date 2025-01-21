import React from 'react'
import type { Page } from '@/payload-types'
import { formatNumber } from '@/utilities/formatNumber'
import SlotCounter from 'react-slot-counter'

type Props = Extract<Page['layout'][0], { blockType: 'numberCountersBlock' }>

export const NumberCountersBlock: React.FC<
  {
    id?: string
  } & Props
> = (props) => {
  const { id, numberCounters } = props

  return (
    <>
      <div className={`number-counters-block-${id} bg-brand-navy`}>
        <div className="py-20 container">
          <div className="flex flex-col md:flex-row justify-around gap-10 flex-wrap">
            {numberCounters &&
              numberCounters.length > 0 &&
              numberCounters.map((numberCounter, index) => {
                const { number, label, prefix, suffix } = numberCounter

                return (
                  <div key={index} className="flex flex-col gap-2 items-center">
                    <div className="text-white text-5xl md:text-7xl font-bold text-center">
                      <div>
                        {prefix && <span className="leading-none">{prefix}</span>}
                        <SlotCounter value={formatNumber(number)} />
                        {suffix && <span className="leading-none">{suffix}</span>}
                      </div>
                    </div>
                    <div className="text-white text-base leading-none uppercase text-brand-offWhite font-light tracking-wider text-center">
                      {label}
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}
