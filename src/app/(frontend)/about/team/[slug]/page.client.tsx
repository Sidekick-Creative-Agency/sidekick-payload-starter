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
  useEffect(() => {
    if (canUseDOM) {
      const form = document.querySelector('form')
      const teamMemberEmailField = form?.querySelector('#team-member-email')
      if (teamMember.email && teamMemberEmailField) {
        ;(teamMemberEmailField as HTMLInputElement).value = teamMember.email
      }
    }
  }, [teamMember])
  return <React.Fragment />
}
