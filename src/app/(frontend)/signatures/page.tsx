import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import React, { cache } from 'react'

import type { Media, Page as PageType } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'

import { getPayload } from 'payload'
import { queryPageByUrl } from '@/utilities/queryPageByUrl'
import PageClient from './page.client'
import './styles.scss'


export default async function Page() {

  const payload = await getPayload({ config: configPromise })
  const teamMembersResponse = await payload.find({
    collection: 'team-members',
    pagination: false
  })
  const teamMembers = teamMembersResponse.docs

  return (
    <div>
      <PageClient />
      {/* Allows redirects for valid pages too */}
      {/* <PayloadRedirects disableNotFound url={'/email-signatures'} /> */}
      <div className='flex flex-col items-start gap-40'>


        {teamMembers && teamMembers.length > 0 && teamMembers.map((teamMember) => {
          return (
            <table style={{ margin: 0, padding: 0 }} key={teamMember.id}>
              <tbody style={{ margin: 0, padding: 0 }}>
                <tr style={{ margin: 0, padding: 0 }}>
                  <td style={{ margin: 0, padding: 0 }}>
                    <table style={{ margin: 0, padding: 0 }}>
                      <tbody style={{ margin: 0, padding: 0 }}>
                        <tr style={{ margin: 0, padding: 0 }}>
                          <td colSpan={2} style={{ margin: 0, padding: 0 }}>
                            <p
                              style={{
                                lineHeight: '1.5',
                                fontSize: '10px',
                                fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                                color: '#ccb6a6',
                                width: '450px',
                                margin: 0,
                                padding: 0
                              }}
                            >
                              Texas Law requires Real Estate Brokers to provide the attached Information About Brokerage Services and Consumer Protection Notice. Please click on the links  below for more information.
                            </p>
                          </td>
                        </tr>
                        <tr style={{ margin: 0, padding: 0 }}>
                          <td style={{ width: '183px', margin: 0, padding: 0, paddingTop: '8px' }}>
                            <a
                              style={{
                                fontSize: '10px',
                                fontFamily:
                                  'Helvetica Neue, Helvetica, Arial, sans-serif',
                                color: '#ccb6a6',
                                textDecoration: 'none',
                                fontWeight: '600',
                                whiteSpace: 'nowrap',
                                margin: 0,
                                padding: 0
                              }}
                              href="https://onwardrealestateteam.com/wp-content/uploads/2025/04/IABS-1-1-03052025-1.pdf"
                              target="_blank"
                              rel="noopener noreferrer"
                            >Information About Brokerage Services</a>
                          </td>
                          <td style={{ margin: 0, padding: 0, paddingTop: '8px' }}>
                            <a
                              style={{
                                fontSize: '10px',
                                fontFamily:
                                  'Helvetica Neue, Helvetica, Arial, sans-serif',
                                color: '#ccb6a6',
                                textDecoration: 'none',
                                fontWeight: '600',
                                whiteSpace: 'nowrap',
                                margin: 0,
                                padding: 0,
                                marginLeft: '32px'
                              }}
                              href="https://onwardrealestateteam.com/wp-content/uploads/2024/02/TREC-CPN-09-2023.pdf"
                              target="_blank"
                              rel="noopener noreferrer"
                            >Consumer Protection Notice</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td style={{ margin: 0, padding: 0, paddingLeft: '64px' }}>
                    {teamMember.details.company === 'onward' ? (
                      <img
                        src="https://onward-real-estate.vercel.app/api/media/file/onward-logoprimary-kellerw-color-dark-300x120.png"
                        width="160"
                        style={{
                          objectFit: 'contain',
                          width: '160px',
                          minWidth: '160px',
                          maxWidth: '160px',
                          height: 'auto',
                          margin: 0,
                          padding: 0
                        }}
                        alt="Onward Real Estate Logo"
                      />
                    ) : (
                      <img
                        src="https://onward-real-estate.vercel.app/api/media/file/onward-alliance-logo-primary-color-dark.webp"
                        width="160"
                        height="48"
                        style={{
                          objectFit: 'contain',
                          width: '160px',
                          minWidth: '160px',
                          maxWidth: '160px',
                          height: 'auto',
                          margin: 0,
                          padding: 0
                        }}
                        alt="Alliance Property Management Logo"
                      />
                    )}

                  </td>
                </tr>
                <tr style={{ margin: 0, padding: 0 }}>
                  <td style={{ margin: 0, padding: 0, paddingTop: '24px', paddingBottom: '24px' }} colSpan={2}><hr style={{ borderTop: '1px solid #dddddd' }} /></td>
                </tr>
                <tr style={{ margin: 0, padding: 0 }}>
                  <td colSpan={2} style={{ margin: 0, padding: 0 }}>
                    <table style={{ margin: 0, padding: 0 }}>
                      <tbody style={{ margin: 0, padding: 0 }}>
                        <tr style={{ margin: 0, padding: 0 }}>
                          <td style={{ margin: 0, padding: 0 }}>
                            <img
                              src={(teamMember.details.featuredImage as Media).url || ''}
                              width="128px"
                              height="128px"
                              alt="Adam Voight Headshot"
                              style={{
                                width: '128px',
                                height: '128px',
                                objectFit: 'cover',
                                objectPosition: '50% 15%',
                                borderRadius: '50%',
                                minWidth: '128px',
                                maxWidth: '128px',
                                margin: 0,
                                padding: 0
                              }}
                            />
                          </td>
                          <td style={{ margin: 0, paddingLeft: '24px' }}>
                            <table style={{ margin: 0, padding: 0 }}>
                              <tbody style={{ margin: 0, padding: 0 }}>
                                <tr style={{ margin: 0, padding: 0 }}>
                                  <td style={{ margin: 0, padding: 0 }}>
                                    <h2
                                      style={{
                                        fontFamily: 'Georgia, Times New Roman, Times, serif',
                                        margin: '0',
                                        padding: 0,
                                        lineHeight: '1',
                                        fontWeight: 'bold',
                                        color: '#0b2a35',
                                        fontSize: '20px',
                                      }}
                                    >
                                      {teamMember.title}
                                    </h2>
                                  </td>
                                </tr>
                                <tr style={{ margin: 0, padding: 0 }}>
                                  <td style={{ margin: 0, padding: 0 }}>
                                    <p
                                      style={{
                                        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                                        margin: '0',
                                        padding: 0,
                                        lineHeight: '1',
                                        fontSize: '11px',
                                        color: '#0b2a35',
                                        fontWeight: '700',
                                        paddingTop: '8px',
                                        paddingBottom: '8px',
                                      }}
                                    >
                                      {teamMember.details.jobTitle.replaceAll('(Alliance Property Management)', '')}
                                    </p>
                                  </td>
                                </tr>
                                <tr style={{ margin: 0, padding: 0 }}>
                                  <td style={{ margin: 0, padding: 0 }}>
                                    <div style={{
                                      padding: '4px 8px',
                                      backgroundColor: '#ccb6a6',
                                      marginRight: 'auto',
                                      width: 'fit-content'
                                    }}>
                                      <span
                                        style={{
                                          fontFamily:
                                            'Helvetica Neue, Helvetica, Arial, sans-serif',
                                          fontWeight: 'bold',
                                          fontSize: '11px',
                                          lineHeight: '1',
                                          color: '#ffffff',
                                          margin: 0,

                                        }}
                                      >
                                        REALTOR<sup>®</sup>
                                      </span>
                                    </div>

                                  </td>
                                </tr>
                                <tr>
                                  {teamMember.details.email && (
                                    <td style={{ margin: 0, padding: 0, paddingTop: '12px', lineHeight: '1' }} colSpan={1}>
                                      <img
                                        style={{
                                          width: '12px',
                                          minWidth: '12px',
                                          maxWidth: '12px',
                                          verticalAlign: 'middle',
                                          objectFit: 'contain',
                                          display: 'inline-block',
                                          margin: 0,
                                          padding: 0
                                        }}
                                        width="12"
                                        src="https://onward-real-estate.vercel.app/api/media/file/envelope-duotone-solid-300x300.png"
                                        alt="Envelope icon"
                                      />
                                      <a
                                        style={{
                                          lineHeight: '1',
                                          verticalAlign: 'middle',
                                          color: '#0b2a35',
                                          fontFamily:
                                            'Helvetica Neue, Helvetica, Arial, sans-serif',
                                          fontSize: '12px',
                                          textDecoration: 'none',
                                          display: 'inline-block',
                                          margin: 0,
                                          padding: 0,
                                          paddingLeft: '4px',
                                          whiteSpace: 'nowrap'


                                        }}
                                        href={`mailto:${teamMember.details.email}`}
                                        target="_blank"
                                      >{teamMember.details.email}</a>
                                    </td>
                                  )}
                                  {teamMember.details.phone && (
                                    <td style={{ margin: 0, padding: 0, paddingTop: '12px', paddingLeft: '8px', lineHeight: '1' }} colSpan={1}>
                                      <img
                                        style={{
                                          width: '12px',
                                          minWidth: '12px',
                                          maxWidth: '12px',
                                          verticalAlign: 'middle',
                                          objectFit: 'contain',
                                          display: 'inline-block',
                                          margin: 0,
                                          padding: 0
                                        }}
                                        width="12"
                                        src="https://onward-real-estate.vercel.app/api/media/file/phone-duotone-solid (1)-300x300.png"
                                        alt="Phone icon"
                                      />
                                      <a
                                        style={{
                                          lineHeight: '1',
                                          verticalAlign: 'middle',
                                          color: '#0b2a35',
                                          fontFamily:
                                            'Helvetica Neue, Helvetica, Arial, sans-serif',
                                          fontSize: '12px',
                                          textDecoration: 'none',
                                          display: 'inline-block',
                                          margin: 0,
                                          padding: 0,
                                          paddingLeft: '4px',
                                          whiteSpace: 'nowrap'
                                        }}
                                        href={`tel:${teamMember.details.phone}`}
                                        target="_blank"
                                      >{teamMember.details.phone}</a>
                                    </td>
                                  )}

                                  <td style={{ margin: 0, padding: 0, paddingTop: '12px', paddingLeft: '8px', lineHeight: '1' }} colSpan={1}>
                                    <img
                                      style={{
                                        width: '8px',
                                        minWidth: '8px',
                                        maxWidth: '8px',
                                        verticalAlign: 'middle',
                                        objectFit: 'contain',
                                        display: 'inline-block',
                                        margin: 0,
                                        padding: 0
                                      }}
                                      width="8"
                                      src="https://onward-real-estate.vercel.app/api/media/file/arrow-pointer-duotone-solid-300x480.png"
                                      alt="Arrow pointer icon"
                                    />
                                    <a
                                      style={{
                                        lineHeight: '1',
                                        verticalAlign: 'middle',
                                        color: '#0b2a35',
                                        fontFamily:
                                          'Helvetica Neue, Helvetica, Arial, sans-serif',
                                        fontSize: '12px',
                                        textDecoration: 'none',
                                        display: 'inline-block',
                                        margin: 0,
                                        padding: 0,
                                        paddingLeft: '4px',
                                        whiteSpace: 'nowrap'
                                      }}
                                      href="https://www.onwardret.com"
                                      target="_blank">www.OnwardRET.com
                                    </a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          )
        })}
      </div>
    </div >
  )
}
