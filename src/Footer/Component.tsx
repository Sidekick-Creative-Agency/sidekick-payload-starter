import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import type { Footer } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faPinterestP,
  faTwitter,
  faXTwitter,
  faYoutube,
} from '@awesome.me/kit-a7a0dd333d/icons/classic/brands'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import Image from 'next/image'

export async function Footer() {
  const footer: Footer = (await getCachedGlobal('footer', 1)()) as Footer
  const navMenus = footer?.navMenus

  return (
    <footer className="bg-brand-navy text-white px-[1.25rem] md:px-10 2xl:px-20 pt-20 pb-10">
      <div className=" pb-10  gap-8 flex flex-col items-center md:items-start md:flex-row md:justify-between">
        {footer.logo && (
          <Link href="/">
            <Media resource={footer.logo} imgClassName="max-w-16" />
          </Link>
        )}

        <div className="flex flex-1 flex-col items-center justify-around md:flex-row gap-10 md:items-start">
          {navMenus &&
            navMenus.map((navMenu, index) => {
              const title = navMenu?.title
              const navItems = navMenu?.navItems
              if (!title || !navItems) return
              return (
                <div key={index} className="flex flex-col gap-4">
                  <span className="text-white text-base font-bold leading-none uppercase tracking-wider text-center md:text-left">
                    {title}
                  </span>
                  <nav className="flex flex-col gap-2">
                    {navItems.map((navItem, index) => {
                      return (
                        <CMSLink
                          className="text-brand-gray-02 transition-colors hover:text-white focus-visible:text-white text-center md:text-left"
                          key={index}
                          {...navItem.link}
                        />
                      )
                    })}
                  </nav>
                </div>
              )
            })}
        </div>
      </div>
      <div className="grid grid-cols-2 lg:flex justify-between items-center gap-10 lg:gap-20 py-10 border-t border-b border-brand-gray-04/50">
        <div className="flex justify-center lg:justify-start gap-10 sm:gap-20 min-w-fit col-span-2">
          <Image
            src="/kw_advantage.png"
            alt="KW Advantage logo"
            width={200}
            height={32}
            className="w-28 h-auto object-contain"
          />
          <Image
            src="/kw_commercial.png"
            alt="KW Advantage logo"
            width={200}
            height={32}
            className="w-32 h-auto object-contain"
          />
        </div>
        <div className="max-w-[32rem] mx-auto col-span-2 sm:col-span-1">
          <span className="block text-center sm:text-left mb-1 text-sm font-white font-bold leading-none uppercase tracking-wide">
            Brokerage Services
          </span>
          <p className="text-sm text-center sm:text-left font-light leading-tight text-brand-gray-02">
            Texas law requires all real estate license holders to give the following information
            about brokerage services to prospective buyers, tenants, sellers and landlords. A broker
            is responsible for all brokerage activities, including acts performed by sales agents
            sponsored by the broker.
          </p>
        </div>
        <div className="max-w-[32rem] mx-auto col-span-2 sm:col-span-1">
          <span className="block text-center sm:text-left mb-1 text-sm font-white font-bold leading-none uppercase tracking-wide">
            Consumer Protection
          </span>
          <p className="text-sm text-center sm:text-left font-light leading-tight text-brand-gray-02">
            The Texas Real Estate Commission (TREC) regulates real estate brokers and sales agents,
            real estate inspectors, home warranty companies, easement and right-of-way agents, and
            timeshare interest providers. You can find more information and check the status of a
            license holder at TREC.Texas.gov.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col-reverse gap-10 md:flex-row justify-between items-center pt-10">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Onward Real Estate Team
        </p>
        <div className="flex gap-2">
          {footer.socials &&
            footer.socials.map((social, index) => {
              if (!social) return null
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
                  icon = faLinkedinIn
                  break
                case 'pinterest':
                  icon = faPinterestP
                  break
                default:
                  icon = undefined
              }
              return (
                <Link
                  key={social.id}
                  href={social.url || '/'}
                  target="_blank"
                  className="w-8 h-8 p-2 rounded-full bg-[rgba(148,148,148,0.25)] flex justify-center items-center"
                >
                  {icon && <FontAwesomeIcon icon={icon} className="w-full text-brand-gray-02" />}
                </Link>
              )
            })}
        </div>
      </div>
    </footer>
  )
}
