'use client'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'
import { useHeaderTheme } from '@/providers/HeaderTheme'

export const LowImpactHero: React.FC<Page['hero'] & { title: string }> = ({
  enableOverrideTitle,
  overrideTitle,
  title,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('filled')
  }, [setHeaderTheme])
  return (
    <div className="container py-20">
      <h1 className="text-center text-brand-navy text-[2.5rem] sm:text-[4rem] font-bold">
        {enableOverrideTitle ? overrideTitle : title}
      </h1>
    </div>
  )
}
