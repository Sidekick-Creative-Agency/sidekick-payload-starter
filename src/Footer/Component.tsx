import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footer?.navItems || []
  return (
    <footer className="border-t border-border bg-black dark:bg-card text-white">
      <div className="px-[1.25rem] md:px-[2.5rem] py-8 gap-8 flex flex-col items-center md:flex-row md:justify-between">
        {footer.logo && (
          <Link href="/">
            <Media resource={footer.logo} imgClassName="max-w-[8rem] invert-0" />
          </Link>
        )}

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />
            })}
          </nav>
        </div>
      </div>
      <div className="w-full flex px-[1.25rem] md:px-[2.5rem] py-4">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Sidekick Creative Agency
        </p>
      </div>
    </footer>
  )
}
