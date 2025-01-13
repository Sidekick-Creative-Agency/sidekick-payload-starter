'use client'

import * as React from 'react'
import { DropdownMenuTriggerProps } from '@radix-ui/react-dropdown-menu'
import { CheckIcon, ClipboardIcon } from 'lucide-react'
import { Button, ButtonProps } from '../ui/button'
import { cn } from '@/utilities/cn'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard, faClipboardCheck } from '@awesome.me/kit-a7a0dd333d/icons/sharp/light'

interface CopyButtonProps extends ButtonProps {
  value: string
  src?: string
}

export function CopyButton({
  value,
  className,
  src,
  variant = 'ghost',
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <Button
      size="icon"
      variant={variant}
      className={cn(
        'relative z-10 h-12 w-12 text-black bg-white hover:bg-brand-gray-00 rounded-full border border-brand-gray-00 shadow-md p-2 [&_svg]:h-6 [&_svg]:w-6',
        className,
      )}
      onClick={() => {
        navigator.clipboard.writeText(value)
        setHasCopied(true)
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? (
        <FontAwesomeIcon icon={faClipboardCheck} />
      ) : (
        <FontAwesomeIcon icon={faClipboard} />
      )}
    </Button>
  )
}

interface CopyWithClassNamesProps extends DropdownMenuTriggerProps {
  value: string
  classNames: string
  className?: string
}

export function CopyWithClassNames({
  value,
  classNames,
  className,
  ...props
}: CopyWithClassNamesProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  const copyToClipboard = React.useCallback((value: string) => {
    navigator.clipboard.writeText(value)
    setHasCopied(true)
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            'relative z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50',
            className,
          )}
        >
          {hasCopied ? <CheckIcon className="h-3 w-3" /> : <ClipboardIcon className="h-3 w-3" />}
          <span className="sr-only">Copy</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => copyToClipboard(value)}>Component</DropdownMenuItem>
        <DropdownMenuItem onClick={() => copyToClipboard(classNames)}>Classname</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
