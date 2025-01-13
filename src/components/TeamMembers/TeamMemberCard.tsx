import { TeamMember, Media as MediaType } from '@/payload-types'
import React from 'react'
import { Media } from '../Media'

interface TeamMemberProps {
  teamMember: TeamMember
}
export const TeamMemberCard: React.FC<TeamMemberProps> = ({ teamMember }) => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <Media
          resource={teamMember.featuredImage}
          alt={
            typeof teamMember.featuredImage === 'object'
              ? teamMember?.featuredImage?.alt
              : `${teamMember.title} headshot`
          }
          className="aspect-square relative border-t-[10px] border-brand-navy"
          imgClassName="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold text-brand-navy">{teamMember.title}</h3>
          <h4 className="text-xs font-bold text-brand-gray-03 uppercase tracking-wider">
            {teamMember.jobTitle} {teamMember.designations && `, ${teamMember.designations}`}
          </h4>
        </div>
      </div>
    </div>
  )
}
