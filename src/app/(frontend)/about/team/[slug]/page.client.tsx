'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import React from 'react'
import { useEffect } from 'react'

export const PageClient = () => {
  const { setHeaderTheme } = useHeaderTheme()
  useEffect(() => {
    setHeaderTheme('filled')
  }, [])
  return <React.Fragment />
}
