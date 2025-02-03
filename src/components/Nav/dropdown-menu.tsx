'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '../ui/button'
import { faChevronDown } from '@awesome.me/kit-a7a0dd333d/icons/sharp/regular'
import { createContext, useContext, useEffect, useState } from 'react'
import { useDebounce } from '@/utilities/useDebounce'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import { HeaderContext } from '@/Header/Component.client'

interface DropdownMenuProps {
  children: React.ReactNode
  className?: string
}

type DropdownMenuContextType = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}
const DropdownMenuContext = createContext<DropdownMenuContextType>({
  isOpen: false,
  setIsOpen: () => {},
})

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children, className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const debouncedIsOpen = useDebounce(isOpen, 200)

  return (
    <DropdownMenuContext.Provider value={{ isOpen: debouncedIsOpen, setIsOpen }}>
      <div className={`relative ${className}`}>{children}</div>
    </DropdownMenuContext.Provider>
  )
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode
  className?: string
}
export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({
  children,
  className,
}) => {
  const context = useContext(DropdownMenuContext)
  const headerContext = useContext(HeaderContext)
  const { headerTheme } = useHeaderTheme()
  return (
    <Button
      className={`bg-transparent p-2 uppercase flex gap-2 rounded-none border-none font-bold text-base tracking-[1.6px] hover:bg-transparent focus-visible:bg-transparent data-[state=open]:bg-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-2 ${headerContext.isScrolled || headerTheme === 'filled' ? 'text-black hover:text-black focus-visible:text-black' : 'text-white hover:text-white focus-visible:text-white'} transition ${className}`}
      onMouseEnter={() => context.setIsOpen(true)}
      onMouseLeave={() => context.setIsOpen(false)}
      onFocus={() => context.setIsOpen(true)}
      onBlur={() => context.setIsOpen(false)}
      aria-expanded={context.isOpen}
    >
      {children}
      <FontAwesomeIcon
        icon={faChevronDown}
        className={`w-2 h-auto transition-transform ${context.isOpen ? 'rotate-180' : 'rotate-0'}`}
      />
    </Button>
  )
}

interface DropdownMenuContentProps {
  children: React.ReactNode
  className?: string
}
export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({
  className,
  children,
}) => {
  const context = useContext(DropdownMenuContext)
  return (
    <div
      className={`absolute top-full z-10 w-auto min-w-full p-2 rounded-sm bg-white shadow-[0_0px_10px_rgba(0,0,0,0.1)] transition-all delay-0 ${context.isOpen ? 'visible scale-100' : 'invisible scale-95'} ${className}`}
      onMouseEnter={() => context.setIsOpen(true)}
      onMouseLeave={() => context.setIsOpen(false)}
      onFocus={() => context.setIsOpen(true)}
      onBlur={() => context.setIsOpen(false)}
    >
      {children}
    </div>
  )
}
