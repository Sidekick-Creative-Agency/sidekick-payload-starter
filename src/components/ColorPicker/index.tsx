'use client'

import { BRAND_COLORS } from '@/utilities/constants'
import { Button, useField } from '@payloadcms/ui'
import { Props } from '@payloadcms/ui/fields/Text'
import { useState, useEffect } from 'react'
import defaultTheme from 'tailwindcss/defaultTheme'

const colorClasses = BRAND_COLORS.reduce(
  (prev, current) => ({ ...prev, [current]: `bg-brand-${current}` }),
  {},
)

export const ColorPicker = () => {
  const { value, setValue } = useField({ path: 'backgroundColor' })
  useEffect(() => {
    console.log(value)
  }, [value])
  return (
    <div className="flex gap-2 background-color-picker">
      <style>
        {`.background-color-picker {
        ${BRAND_COLORS.map(
          (color) => `
            & .bg-${color} {
                background-color: hsl(var(--brand-${color}));
            }`,
        ).join('\n')}
        }`}
      </style>
      {BRAND_COLORS.map((color) => {
        return (
          <Button
            key={color}
            className={`bg-${color} p-0 w-8 h-8 rounded-full `}
            onClick={() => setValue(color)}
          ></Button>
        )
      })}
    </div>
  )
}
