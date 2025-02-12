'use client'

import React from 'react'

import type { Header, Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/Nav/dropdown-menu'

export const NavMenu: React.FC<{ navItems: Header['navItems']; isScrolled: boolean }> = ({
  navItems,
  isScrolled,
}) => {
  const { headerTheme } = useHeaderTheme()
  if (!navItems) return null
  return (
    <nav className="w-full">
      <ul className="flex w-full gap-10 justify-evenly items-center">
        {navItems.map(({ navItem }, i) => {
          if (navItem?.type === 'link') {
            return (
              <li key={i}>
                <CMSLink
                  key={i}
                  {...navItem.link}
                  appearance="link"
                  className={`hover:no-underline focus-visible:no-underline ${isScrolled || headerTheme === 'filled' ? 'text-black' : 'text-white'} uppercase font-bold text-base tracking-[1.6px] py-2`}
                />
              </li>
            )
          }
          return (
            <li key={i}>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  {navItem?.enableParentLink && navItem?.parentLink ? (
                    <CMSLink
                      key={i}
                      {...navItem.parentLink}
                      appearance="link"
                      className={`hover:no-underline focus-visible:no-underline ${isScrolled || headerTheme === 'filled' ? 'text-black' : 'text-white'} uppercase font-bold text-base tracking-[1.6px]`}
                    />
                  ) : (
                    navItem?.label
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {navItem?.childrenLinks &&
                    navItem.childrenLinks.map((link) => {
                      return (
                        <CMSLink
                          key={link.id}
                          {...link.link}
                          appearance="link"
                          className={`text-brand-gray-06 uppercase text-sm font-bold tracking-widest p-4 rounded-sm hover:no-underline focus-visible:no-underline hover:bg-brand-gray-00 focus-visible:bg-brand-gray-00 w-full`}
                        />
                      )
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
