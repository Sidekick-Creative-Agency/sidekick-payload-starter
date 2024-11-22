'use client'

import React, { useEffect, useState } from 'react'

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
import { useMotionValueEvent, useScroll } from 'framer-motion'

export const HeaderNav: React.FC<{ header: HeaderType; isScrolled: boolean }> = ({
  header,
  isScrolled,
}) => {
  const navItems = header?.navItems || []
  return (
    <nav className="flex gap-4 items-center">
      <NavigationMenu>
        <NavigationMenuList className="flex gap-4">
          {navItems.map(({ navItem }, i) => {
            if (navItem?.type === 'link') {
              return (
                <NavigationMenuItem key={i}>
                  <CMSLink
                    key={i}
                    {...navItem.link}
                    appearance="link"
                    className={`${isScrolled ? 'text-primary' : 'text-primary-foreground'}`}
                  />
                </NavigationMenuItem>
              )
            }
            return (
              <NavigationMenuItem key={i}>
                <NavigationMenuTrigger>{navItem?.label}</NavigationMenuTrigger>
                <NavigationMenuContent className="p-2 bg-primary">
                  {navItem?.childrenLinks?.map((childLink, i) => {
                    return (
                      <Button
                        variant="ghost"
                        className="text-primary-foreground px-4 py-2 w-full"
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
        <SearchIcon
          className={`w-5 transition-colors duration-200 ${isScrolled ? 'text-primary' : 'text-primary-foreground'}`}
        />
      </Link>
    </nav>
  )
}
