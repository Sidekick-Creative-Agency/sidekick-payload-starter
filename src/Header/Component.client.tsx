'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav/Desktop'
import { Media } from '@/components/Media'
import useWindowDimensions from '@/utilities/useWindowDimensions'
import defaultTheme from 'tailwindcss/defaultTheme'
import { HeaderMobileNav } from './Nav/Mobile'

interface HeaderClientProps {
  header: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const { width } = useWindowDimensions()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
      className="px-[1.25rem] md:px-[2.5rem] relative z-20 py-8 flex justify-between"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      {header.logo && (
        <Link href="/">
          <Media resource={header.logo} imgClassName="max-w-[9.375rem] invert dark:invert-0" />
        </Link>
      )}

      {width && width > parseInt(defaultTheme.screens.md) && <HeaderNav header={header} />}
      {width && width <= parseInt(defaultTheme.screens.md) && <HeaderMobileNav header={header} />}
    </header>
  )
}
