'use client'

import React, { useEffect, useState } from 'react'

import type { Header, Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { appearanceOptions } from '../../../../fields/link'
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
import { NavMenu } from '../NavMenu'

export const RightHeaderNav: React.FC<{ navItems: Header['navItems']; isScrolled: boolean }> = ({
  navItems,
  isScrolled,
}) => {
  return (
    <div className="flex items-center justify-center">
      <NavMenu navItems={navItems} isScrolled={isScrolled} />
    </div>
  )
}
