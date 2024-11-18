'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { appearanceOptions } from '../../../fields/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []
  return (
    <nav className="flex gap-3 items-center">
      <NavigationMenu>
        <NavigationMenuList>
          {navItems.map(({ navItem }, i) => {
            if (navItem?.type === 'link') {
              return (
                <NavigationMenuItem key={i}>
                  <CMSLink key={i} {...navItem.link} appearance="link" />
                </NavigationMenuItem>
              )
            }
            return (
              <NavigationMenuItem key={i}>
                <NavigationMenuTrigger>{navItem?.label}</NavigationMenuTrigger>
                <NavigationMenuContent className="p-2">
                  {navItem?.childrenLinks?.map((childLink, i) => {
                    return (
                      <Button
                        variant="ghost"
                        className="text-primary px-4 py-2 w-full"
                        key={childLink.id}
                      >
                        <Link href={childLink.link.url || ''}>{childLink.link.label}</Link>
                      </Button>
                    )
                  })}
                </NavigationMenuContent>
              </NavigationMenuItem>
            )
          })}
        </NavigationMenuList>
      </NavigationMenu>

      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  )
}
