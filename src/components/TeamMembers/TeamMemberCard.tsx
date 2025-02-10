import { TeamMember, Media as MediaType } from '@/payload-types'
import React from 'react'
import { Media } from '../Media'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowUpRightFromSquare,
  faEnvelope,
  faPhone,
} from '@awesome.me/kit-a7a0dd333d/icons/sharp-duotone/thin'
import { Button } from '../ui/button'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { faPlus } from '@awesome.me/kit-a7a0dd333d/icons/sharp/regular'
import RichText from '../RichText'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faFacebookF,
  faInstagram,
  faLinkedin,
  faXTwitter,
  faYoutube,
} from '@awesome.me/kit-a7a0dd333d/icons/classic/brands'

interface TeamMemberCardProps {
  teamMember: TeamMember
}
export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ teamMember }) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <Media
        resource={teamMember.featuredImage}
        className="aspect-square relative"
        imgClassName="absolute top-0 left-0 object-cover w-full h-full"
      />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Link href={`/about/team/${teamMember.slug}`}>
            <h3 className="text-2xl text-brand-gray-06 font-bold inline leading-tight">
              {teamMember.title}
            </h3>
            {teamMember.designations && (
              <span className="inline text-xs text-brand-gray-06 font-bold ml-2 leading-tight">
                {teamMember.designations}
              </span>
            )}
          </Link>
        </div>
        <span className="text-gray-600 text-base font-light leading-tight">
          {teamMember.jobTitle}
        </span>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={'ghost'} className="flex gap-2 items-center p-4 w-fit rounded-lg">
              <FontAwesomeIcon icon={faPlus} className="w-full max-w-3" />
              <span>Read Bio</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[60rem] max-w-[calc(100vw-5rem)] p-16 h-fit max-h-screen overflow-scroll">
            <DialogHeader className="flex flex-row gap-8 items-center">
              <Media
                resource={teamMember.featuredImage}
                className="aspect-square rounded-full overflow-hidden relative w-20"
                imgClassName="absolute top-0 left-0 object-cover w-full h-full"
              />
              <div className="flex flex-col gap-2">
                <DialogTitle hidden>{teamMember.title}</DialogTitle>
                <div>
                  <span className="text-[2rem] text-brand-gray-06 font-bold inline leading-tight">
                    {teamMember.title}
                  </span>
                  {teamMember.designations && (
                    <span className="inline text-xs text-brand-gray-06 font-bold ml-2">
                      {teamMember.designations}
                    </span>
                  )}
                </div>
                <span className="text-gray-600 text-base font-light leading-tight">
                  {teamMember.jobTitle}
                </span>
              </div>
            </DialogHeader>

            <RichText
              content={teamMember?.bio || {}}
              className="text-brand-gray-04 font-light max-w-none p-0"
            />
            <div className="flex gap-2 flex-wrap">
              {teamMember.email && (
                <Link
                  href={`mailto:${teamMember.email}`}
                  className="py-3 px-4 rounded-xl bg-white border border-brand-gray-01 flex gap-2 items-center hover:bg-brand-gray-01 focus-visible:bg-brand-gray-01 transition-colors"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="w-full max-w-8 text-brand-navy" />
                  <span className="text-base text-brand-gray-06 font-light">Email</span>
                </Link>
              )}
              {teamMember.phone && (
                <Link
                  href={`tel:${teamMember.phone.replaceAll('-', '')}`}
                  className="py-3 px-4 rounded-xl bg-white border border-brand-gray-01 flex gap-2 items-center hover:bg-brand-gray-01 focus-visible:bg-brand-gray-01 transition-colors"
                >
                  <FontAwesomeIcon icon={faPhone} className="w-full max-w-8 text-brand-navy" />
                  <span className="text-base text-brand-gray-06 font-light">Phone</span>
                </Link>
              )}
              {teamMember.socials &&
                teamMember.socials.length > 0 &&
                teamMember.socials.map((social) => {
                  let icon: IconDefinition | undefined = undefined
                  switch (social.platform) {
                    case 'facebook':
                      icon = faFacebookF
                      break
                    case 'twitter':
                      icon = faXTwitter
                      break
                    case 'instagram':
                      icon = faInstagram
                      break
                    case 'youtube':
                      icon = faYoutube
                      break
                    case 'linkedin':
                      icon = faLinkedin
                      break
                    default:
                      icon = undefined
                  }
                  if (!icon) return
                  return (
                    <Link
                      key={social.id}
                      href={social.url || ''}
                      target="_blank"
                      className="py-3 px-4 rounded-xl w-fit whitespace-nowrap bg-white border border-brand-gray-01 flex gap-2 items-center hover:bg-brand-gray-01 focus-visible:bg-brand-gray-01 transition-colors"
                    >
                      <FontAwesomeIcon icon={icon} className="w-full max-w-8 text-brand-navy" />
                      <span className="text-base text-brand-gray-06 font-light">
                        {social?.platform?.at(0)?.toUpperCase()}
                        {social.platform?.slice(1)}
                      </span>
                    </Link>
                  )
                })}
              <Link
                href={`/about/team/${teamMember.slug}`}
                className="py-3 px-4 rounded-xl w-fit whitespace-nowrap bg-white border border-brand-gray-01 flex gap-2 items-center hover:bg-brand-gray-01 focus-visible:bg-brand-gray-01 transition-colors"
              >
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="w-full max-w-8 text-brand-navy"
                />
                <span className="text-base text-brand-gray-06 font-light">Learn More</span>
              </Link>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
