'use client'

import type { StaticImageData } from 'next/image'

import { cn } from 'src/utilities/cn'
import NextImage from 'next/image'
import React, { useEffect, useState } from 'react'

import type { Props as MediaProps } from '../types'

import cssVariables from '@/cssVariables'

const { breakpoints } = cssVariables

export const ImageMedia: React.FC<MediaProps> = (props) => {
  const {
    alt: altFromProps,
    fill,
    imgClassName,
    onClick,
    onLoad: onLoadFromProps,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
  } = props

  const [isLoading, setIsLoading] = useState(true)
  const [width, setWidth] = useState<number | undefined>(undefined)
  const [height, setHeight] = useState<number | undefined>(undefined)
  const [alt, setAlt] = useState<string | undefined>(altFromProps || '')
  const [src, setSrc] = useState<StaticImageData | string>(srcFromProps || '')

  useEffect(() => {
    if (!src && resource && typeof resource === 'number') {
      fetch(`/api/media/${resource}`).then((response) =>
        response.json().then((json) => {
          const {
            alt: altFromResource,
            filename: fullFilename,
            height: fullHeight,
            url,
            width: fullWidth,
          } = json

          setWidth(fullWidth!)
          setHeight(fullHeight!)
          setAlt(altFromResource || '')
          setSrc(`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}${url}`)
        }),
      )
    } else if (!src && resource && typeof resource === 'object') {
      const {
        alt: altFromResource,
        filename: fullFilename,
        height: fullHeight,
        url,
        width: fullWidth,
      } = resource

      setWidth(fullWidth!)
      setHeight(fullHeight!)
      setAlt(altFromResource || '')
      setSrc(`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}${url}`)
    }
  }, [resource])

  // NOTE: this is used by the browser to determine which image to download at different screen sizes
  const sizes = sizeFromProps
    ? sizeFromProps
    : Object.entries(breakpoints)
        .map(([, value]) => `(max-width: ${value}px) ${value}px`)
        .join(', ')

  if (!src) return

  return (
    <NextImage
      alt={alt || ''}
      className={cn(imgClassName)}
      fill={fill}
      height={!fill ? height : undefined}
      onClick={onClick}
      onLoad={() => {
        setIsLoading(false)
        if (typeof onLoadFromProps === 'function') {
          onLoadFromProps()
        }
      }}
      priority={priority}
      quality={90}
      sizes={sizes}
      src={src}
      width={!fill ? width : undefined}
    />
  )
}
