'use client'

import React from 'react'

import type { Header, Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { useHeaderTheme } from '@/providers/HeaderTheme'

export const NavMenu: React.FC<{ navItems: Header['navItems']; isScrolled: boolean }> = ({
  navItems,
  isScrolled,
}) => {
  const { headerTheme } = useHeaderTheme()
  if (!navItems) return null
  return (
    <NavigationMenu delayDuration={100}>
      <NavigationMenuList className="flex gap-20 justify-center items-center">
        {navItems.map(({ navItem }, i) => {
          if (navItem?.type === 'link') {
            return (
              <NavigationMenuItem key={i}>
                <CMSLink
                  key={i}
                  {...navItem.link}
                  appearance="link"
                  className={`${isScrolled || headerTheme === 'filled' ? 'text-black' : 'text-white'} uppercase font-bold text-base tracking-[1.6px] py-2`}
                />
              </NavigationMenuItem>
            )
          }
          return (
            <NavigationMenuItem key={i}>
              <NavigationMenuTrigger
                className={`bg-transparent px-0 uppercase font-bold text-base tracking-[1.6px] hover:bg-transparent focus-visible:bg-transparent data-[state=open]:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${isScrolled || headerTheme === 'filled' ? 'text-black hover:text-black focus-visible:text-black' : 'text-white hover:text-white focus-visible:text-white'} transition`}
              >
                {navItem?.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-2 bg-white flex flex-col gap-2 w-full">
                {navItem?.childrenLinks?.map((childLink, i) => {
                  return (
                    <NavigationMenuLink
                      key={childLink.id}
                      className={`text-black px-4 py-2 w-full text-base transition-none whitespace-nowrap`}
                      asChild
                    >
                      <CMSLink
                        label={childLink.link.label}
                        url={childLink.link.url}
                        reference={childLink.link.reference}
                        type={childLink.link.type}
                        newTab={childLink.link.newTab}
                      />
                    </NavigationMenuLink>
                  )
                })}
              </NavigationMenuContent>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
