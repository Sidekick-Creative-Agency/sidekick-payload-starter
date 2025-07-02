'use client'

import { TeamMember } from '@/payload-types'
import { useHeaderTheme } from '@/providers/HeaderTheme'

import React, { useEffect } from 'react'
import { TeamMemberSignature } from './TeamMemberSignature'

const PageClient: React.FC<{ teamMembers: TeamMember[] }> = ({ teamMembers }) => {
  /* Force the header to be dark mode while we have an image behind it */
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('filled')
  }, [setHeaderTheme])
  return (
    <div className='flex flex-col items-start gap-40'>
      {teamMembers && teamMembers.length > 0 && teamMembers.map((teamMember, index) => {
        return (
          <TeamMemberSignature teamMember={teamMember} key={index} />
        )
      })}
    </div>)
}

export default PageClient
