'use client'

import React from 'react'

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
import { NavigationMenuItem } from '@/components/ui/navigation-menu'

export const HeaderMobileNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []

  return (
    <Sheet>
      <SheetTrigger>
        <Menu size={32} />
      </SheetTrigger>
      <SheetContent className="p-[1.25rem]">
        <SheetHeader className="sr-only">
          <SheetTitle>Mobile Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-3 items-start mt-16">
          {navItems.map(({ navItem }, i) => {
            if (navItem?.type === 'link') {
              return (
                <NavigationMenuItem key={i}>
                  <CMSLink key={i} {...navItem.link} appearance="link" />
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
                        <Button variant="link" className="px-4 py-2 w-full" key={childLink.id}>
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
            <SearchIcon className="w-5 text-primary" />
          </Link>
        </nav>
        <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
          <X size={24} />
        </SheetClose>
      </SheetContent>
    </Sheet>
  )
}
