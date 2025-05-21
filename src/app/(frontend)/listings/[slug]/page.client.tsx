'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import canUseDOM from '@/utilities/canUseDOM'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const PageClient: React.FC = () => {
  const { setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  useEffect(() => {
    setHeaderTheme('filled')
    if (canUseDOM) {
      const sidebarFormMessageField = document.getElementById(
        'message',
      ) as HTMLTextAreaElement | null
      if (sidebarFormMessageField) {
        sidebarFormMessageField.placeholder = 'I would like to know more about ' + document.title.split(' | ')[0]
        sidebarFormMessageField.rows = 4
      }
    }
  }, [])
  return <React.Fragment />
}

export default PageClient
