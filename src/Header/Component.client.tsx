'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { createContext, useEffect, useState } from 'react'
import type { Header } from '@/payload-types'
import { RightHeaderNav } from './Nav/Desktop/Right'
import { Media } from '@/components/Media'
import useWindowDimensions from '@/utilities/useWindowDimensions'
import defaultTheme from 'tailwindcss/defaultTheme'
import { HeaderMobileNav } from './Nav/Mobile'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { LeftHeaderNav } from './Nav/Desktop/Left'

interface HeaderClientProps {
  header: Header
}

type HeaderContextProps = {
  isScrolled: boolean
}
export const HeaderContext = createContext<HeaderContextProps>({ isScrolled: false })

export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const { width } = useWindowDimensions()
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 1) setIsScrolled(true)
    else setIsScrolled(false)
  })

  return (
    <HeaderContext.Provider value={{ isScrolled }}>
      <header
        className={`px-[1.25rem] md:px-[2.5rem] z-20 flex md:grid md:grid-cols-3 justify-between sticky top-0 border-b transition-all duration-200 ${
          isScrolled
            ? 'bg-white border-brand-gray-00 py-4'
            : headerTheme !== 'filled'
              ? 'bg-transparent py-8 border-transparent'
              : 'bg-white border-brand-gray-00 py-8'
        }`}
      >
        {width && width > parseInt(defaultTheme.screens.lg) && (
          <LeftHeaderNav
            navItems={header?.navItems?.filter((item) => item.navItem?.side === 'left') || []}
            isScrolled={isScrolled}
          />
        )}
        {width && width <= parseInt(defaultTheme.screens.lg) && <div className="pr-6"></div>}
        {header.logo && (
          <Link href="/" className=" md:col-start-2 md:justify-self-center">
            {!header.logoAlt && <Media resource={header.logo} imgClassName={`max-w-[9.375rem]`} />}
            {!isScrolled && headerTheme === 'transparent' && header.logoAlt && (
              <Media resource={header.logo} imgClassName={`max-w-[9.375rem]`} />
            )}
            {(isScrolled || headerTheme === 'filled') && header.logoAlt && (
              <Media resource={header.logoAlt} imgClassName={`max-w-[9.375rem]`} />
            )}
          </Link>
        )}

        {width && width > parseInt(defaultTheme.screens.lg) && (
          <RightHeaderNav
            navItems={header?.navItems?.filter((item) => item.navItem?.side === 'right') || []}
            isScrolled={isScrolled}
          />
        )}
        {width && width <= parseInt(defaultTheme.screens.lg) && <HeaderMobileNav header={header} />}
      </header>
    </HeaderContext.Provider>
  )
}
