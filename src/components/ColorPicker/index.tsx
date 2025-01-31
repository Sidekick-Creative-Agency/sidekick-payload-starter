'use client'

import { BRAND_COLORS, BRAND_BACKGROUND_COLOR_CLASSES } from '@/utilities/constants'
import { Button, useField } from '@payloadcms/ui'
import './styles.scss'

const ColorPicker = ({ path }: { path: string }) => {
  const { value, setValue } = useField({ path })

  return (
    <div className="flex gap-2 color-picker flex-wrap mt-4">
      <style>
        {`.color-picker {
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
            className={`color-picker-swatch ${BRAND_BACKGROUND_COLOR_CLASSES[color.label]} ${value === color.label ? 'active' : ''} outline outline-2 outline-offset-2 p-0 w-8 h-8 rounded-full relative overflow-hidden m-0`}
            onClick={() => {
              if (value === color.label) {
                setValue('')
              } else {
                setValue(color.label)
              }
            }}
          ></Button>
        )
      })}
      <Button
        className={`color-picker-swatch bg-white ${value === 'white' ? 'active' : ''} outline outline-2 outline-offset-2 p-0 w-8 h-8 rounded-full relative overflow-hidden m-0`}
        onClick={() => {
          if (value === 'white') {
            setValue('')
          } else {
            setValue('white')
          }
        }}
      ></Button>
      <Button
        className={`color-picker-swatch bg-black ${value === 'black' ? 'active' : ''} outline outline-2 outline-offset-2 p-0 w-8 h-8 rounded-full relative overflow-hidden m-0`}
        onClick={() => {
          if (value === 'black') {
            setValue('')
          } else {
            setValue('black')
          }
        }}
      ></Button>
    </div>
  )
}

export default ColorPicker
