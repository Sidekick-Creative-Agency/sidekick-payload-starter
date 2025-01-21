'use client'

import { BRAND_COLORS, BRAND_BACKGROUND_COLOR_CLASSES } from '@/utilities/constants'
import { Button, useField } from '@payloadcms/ui'
import './styles.scss'
import { useConfig } from '@payloadcms/ui'
import { Field } from 'payload'
import { useEffect } from 'react'

const ColorPicker = ({ path }: { path: string }) => {
  const { value, setValue } = useField({ path })

  return (
    <div className="flex gap-2 background-color-picker">
      <style>
        {`.background-color-picker {
        ${BRAND_COLORS.map(
          (color) => `
            & .bg-${color} {
                background-color: var(--brand-${color});
            }`,
        ).join('\n')}
        }`}
      </style>
      {BRAND_COLORS.map((color) => {
        return (
          <Button
            key={color.label}
            className={`color-picker-swatch ${BRAND_BACKGROUND_COLOR_CLASSES[color.label]} ${value === color.label ? 'active' : ''} border border-solid border-transparent border-spacing-1 p-0 w-8 h-8 rounded-full relative overflow-hidden`}
            onClick={() => setValue(color.label)}
          ></Button>
        )
      })}
    </div>
  )
}

export default ColorPicker
