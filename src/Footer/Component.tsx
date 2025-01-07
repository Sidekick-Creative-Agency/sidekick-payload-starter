import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export async function Footer() {
  const footer: Footer = (await getCachedGlobal('footer', 1)()) as Footer
  const navMenus = footer?.navMenus

  return (
    <footer className="bg-brand-navy text-white">
      <div className="px-[1.25rem] py-8 md:py-20 md:px-10 gap-8 flex flex-col items-center md:flex-row md:justify-between">
        {footer.logo && (
          <Link href="/">
            <Media resource={footer.logo} imgClassName="max-w-16" />
          </Link>
        )}

        <div className="flex flex-1 flex-col items-start justify-around md:flex-row gap-4 md:items-center">
          {navMenus &&
            navMenus.map((navMenu, index) => {
              const title = navMenu?.title
              const navItems = navMenu?.navItems
              if (!title || !navItems) return
              return (
                <div key={index} className="flex flex-col gap-2">
                  <span className="text-white text-base font-bold leading-none uppercase tracking-wider">
                    {title}
                  </span>
                  <nav className="flex flex-col gap-2">
                    {navItems.map((navItem, index) => {
                      return (
                        <CMSLink
                          className="text-brand-gray-04 hover:text-white focus-visible:text-white"
                          key={index}
                          {...navItem}
                        />
                      )
                    })}
                  </nav>
                </div>
              )
            })}
        </div>
      </div>
      <div className="w-full flex px-[1.25rem] md:px-[2.5rem] py-4">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Onward Real Estate Team
        </p>
      </div>
    </footer>
  )
}
