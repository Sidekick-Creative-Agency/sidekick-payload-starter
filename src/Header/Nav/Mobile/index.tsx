'use client'

import React, { useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { Menu, SearchIcon, X } from 'lucide-react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { useMotionValueEvent, useScroll } from 'framer-motion'

export const HeaderMobileNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 1) setIsScrolled(true)
    else setIsScrolled(false)
  })

  return (
    <Sheet>
      <SheetTrigger>
        <Menu
          size={32}
          className={`transition-colors duration-200 ${isScrolled ? 'text-primary' : 'text-primary-foreground'}`}
        />
      </SheetTrigger>
      <SheetContent className="p-[1.25rem] bg-primary border-none">
        <SheetHeader className="sr-only">
          <SheetTitle>Mobile Menu</SheetTitle>
        </SheetHeader>
        <NavigationMenu orientation="vertical">
          <NavigationMenuList className="flex-col items-start mt-16 space-x-0 gap-2">
            {navItems.map(({ navItem }, i) => {
              if (navItem?.type === 'link') {
                return (
                  <NavigationMenuItem key={i}>
                    <CMSLink
                      key={i}
                      {...navItem.link}
                      appearance="link"
                      className="text-lg text-primary-foreground"
                    />
                  </NavigationMenuItem>
                )
              }
              return (
                <Accordion type="single" collapsible key={i} className="w-full">
                  <AccordionItem value={navItem?.label || `item-${i}`} className="border-none">
                    <AccordionTrigger>{navItem?.label}</AccordionTrigger>
                    <AccordionContent>
                      {navItem?.childrenLinks?.map((childLink, i) => {
                        return (
                          <Button
                            variant="link"
                            className="px-4 py-2 w-full text-primary-foreground"
                            key={childLink.id}
                          >
                            <Link href={childLink.link.url || ''}>{childLink.link.label}</Link>
                          </Button>
                        )
                      })}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )
            })}
            <Link href="/search">
              <span className="sr-only">Search</span>
              <SearchIcon className="w-5 text-primary-foreground" />
            </Link>
          </NavigationMenuList>
        </NavigationMenu>
        <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
          <X size={24} className="text-primary-foreground" />
        </SheetClose>
      </SheetContent>
    </Sheet>
  )
}
