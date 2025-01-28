import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@awesome.me/kit-a7a0dd333d/icons/sharp/regular'
import Link from 'next/link'
import Image from 'next/image'
import { faEnvelope, faPhone } from '@awesome.me/kit-a7a0dd333d/icons/sharp-duotone/thin'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faFacebookF,
  faInstagram,
  faLinkedin,
  faXTwitter,
  faYoutube,
} from '@awesome.me/kit-a7a0dd333d/icons/classic/brands'
import RichText from '@/components/RichText'
import { PageClient } from './page.client'
import { TestimonialCarousel } from '@/components/TeamMembers/TestimonialCarousel'
import { Media } from '@/payload-types'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const teamMembers = await payload.find({
    collection: 'team-members',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  const params = teamMembers.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const payload = await getPayload({ config: configPromise })
  const teamMemberArr = await payload.find({
    collection: 'team-members',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })
  const teamMember = teamMemberArr.docs[0] || null
  if (!teamMember) {
    console.log('No Team Member found')
    return
  }
  return (
    <>
      <PageClient />
      <div>
        {/* HERO */}
        <div className="bg-brand-navy py-20 sm:py-32">
          <div className="container flex gap-32 relative">
            <Button
              variant={'link'}
              className="text-brand-gray-02 flex items-center gap-2 hover:no-underline focus-visible:no-underline absolute -top-16 left-10 2xl:left-20 hover:text-white focus-visible:text-white p-2"
              asChild
            >
              <Link href="/about/team">
                <FontAwesomeIcon icon={faChevronLeft} className="w-2 h-auto" /> Back To Our Team
              </Link>
            </Button>
            <div className="p-6 bg-brand-blue flex flex-col gap-10 w-full max-w-96 sticky top-24 h-fit">
              <div className="relative pb-[115%] overflow-hidden w-full">
                <Image
                  src={(teamMember.featuredImage as Media).url || ''}
                  alt={(teamMember.featuredImage as Media).alt || ''}
                  fill
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full flex flex-col gap-6">
                <div>
                  <h1 className="text-brand-navy text-[2rem] font-bold leading-tight inline">
                    {teamMember.title}
                  </h1>
                  {teamMember.designations && (
                    <span className="inline ml-2 text-brand-navy text-xs font-bold leading-none">
                      {teamMember.designations}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-base text-brand-navy font-bold leading-tight tracking-wider uppercase">
                    {teamMember.jobTitle}
                  </h2>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {teamMember.email && (
                    <Link
                      href={`mailto:${teamMember.email}`}
                      className="py-3 px-4 rounded-xl bg-white border border-brand-gray-01 flex gap-2 items-center hover:bg-brand-gray-01 focus-visible:bg-brand-gray-01 transition-colors"
                    >
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="w-full max-w-8 text-brand-navy"
                      />
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
                          className="py-3 px-4 rounded-xl bg-white border border-brand-gray-01 flex gap-2 items-center hover:bg-brand-gray-01 focus-visible:bg-brand-gray-01 transition-colors"
                        >
                          <FontAwesomeIcon icon={icon} className="w-full max-w-8 text-brand-navy" />
                          <span className="text-base text-brand-gray-06 font-light">
                            {social?.platform?.at(0)?.toUpperCase()}
                            {social.platform?.slice(1)}
                          </span>
                        </Link>
                      )
                    })}
                </div>
                <div>
                  <Button asChild className="w-full">
                    <Link href="#contact-form">Contact Me</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="w-full">
              <div
                className={`py-16 flex flex-col gap-6 border-t border-brand-gray-04 ${!teamMember.notableTransactions && !teamMember.eductationAndCertifications && 'border-b'}`}
              >
                <h2 className="text-[2rem] text-brand-offWhite font-bold leading-tight">About</h2>
                <RichText
                  content={teamMember.bio}
                  className="text-brand-offWhite max-w-none p-0 font-light"
                />
              </div>
              {teamMember.eductationAndCertifications && (
                <div
                  className={`py-16 flex flex-col gap-6 border-t border-brand-gray-04 ${!teamMember.notableTransactions && 'border-b'}`}
                >
                  <h2 className="text-[2rem] text-brand-offWhite font-bold leading-tight">
                    Education & Certifications
                  </h2>
                  <RichText
                    content={teamMember.eductationAndCertifications}
                    className="text-brand-offWhite max-w-none p-0 font-light"
                  />
                </div>
              )}
              {teamMember.notableTransactions && (
                <div className="py-16 flex flex-col gap-6 border-t border-b border-brand-gray-04">
                  <h2 className="text-[2rem] text-brand-offWhite font-bold leading-tight">
                    Notable Transactions
                  </h2>
                  <RichText
                    content={teamMember.notableTransactions}
                    className="text-brand-offWhite max-w-none p-0 font-light"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {/* TESTIMONIALS  */}
        <div className="w-full">
          <h2 className="sr-only">Testimonials</h2>
          <TestimonialCarousel testimonials={teamMember.testimonials} />
        </div>
        {/* AGENT LISTINGS */}
        <div className="bg-white py-20">
          <div className="container"></div>
        </div>
        {/* CONTACT FORM */}
        <div className="flex scroll-my-28" id="contact-form">
          <div className="flex-1 relative h-full min-h-96 p-20">
            <Image
              src="/api/media/file/Image%20(1).webp"
              alt="Image"
              fill
              className="w-full h-full object-cover"
            />
          </div>
          <div className=" p-20 flex-1 border-t-[10px] border-brand-blue bg-brand-offWhite relative flex flex-col gap-6">
            <img
              className="absolute top-0 left-0 object-cover z-0 pointer-events-none"
              alt=""
              src="/pattern-geometric-general.png"
            />
            <div className="flex flex-col gap-4">
              <h2 className="text-brand-gray-06 font-bold">Contact Me</h2>
              <p className="text-brand-gray-04 font-light">
                Call me at{' '}
                <Link href={`tel:${teamMember.phone?.replaceAll('-', '')}`} className="underline">
                  {teamMember.phone}
                </Link>{' '}
                or fill out this form to get in touch!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
