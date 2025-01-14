import { TeamMember, Media as MediaType } from '@/payload-types'
import React from 'react'
import { Media } from '../Media'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@awesome.me/kit-a7a0dd333d/icons/sharp-duotone/thin'
import { Button } from '../ui/button'
import Link from 'next/link'

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
        <div className="flex gap-2 justify-start">
          {teamMember.email && (
            <Button
              variant={'outline'}
              className="p-2 rounded-xl border border-brand-gray-01 flex gap-2 items-center capitalize tracking-normal"
              asChild
            >
              <Link
                className="p-2 rounded-xl border border-brand-gray-01 flex gap-2 items-center"
                href={`mailto:${teamMember.email}`}
              >
                <FontAwesomeIcon icon={faEnvelope} className="w-6 text-brand-navy" />
                <span className="text-base text-brand-navy font-light">Email</span>
              </Link>
            </Button>
          )}
          {teamMember.phone && (
            <Button
              variant={'outline'}
              className="p-2 rounded-xl border border-brand-gray-01 flex gap-2 items-center capitalize tracking-normal"
              asChild
            >
              <Link href={`tel:${teamMember.phone.replaceAll(' ', '').replaceAll('-', '')}`}>
                <FontAwesomeIcon icon={faPhone} className="w-6 text-brand-navy" />
                <span className="text-base text-brand-navy font-light">Phone</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
