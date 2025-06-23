'use client'

import { TeamMember } from '@/payload-types'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import canUseDOM from '@/utilities/canUseDOM'
import React from 'react'
import { useEffect } from 'react'

export const PageClient: React.FC<{ teamMember: TeamMember }> = ({ teamMember }) => {
  const { setHeaderTheme } = useHeaderTheme()
  useEffect(() => {
    setHeaderTheme('filled')
  }, [])

  return <React.Fragment />
}
