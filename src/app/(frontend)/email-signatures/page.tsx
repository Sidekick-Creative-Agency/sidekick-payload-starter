import { EmailSignature, EmailSignatureProps } from '@/components/EmailSignature'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import './styles.scss'
import { PageClient } from './page.client'

const emailSignatureData: EmailSignatureProps[] = [
  {
    name: 'Adam Voight',
    title: 'Director of Commercial Operations',
    email: 'avoight@onwardRET.com',
    officePhone: '254.870.0050',
    cellPhone: '254.870.0050',
    designations: '',
    isRealtor: true,
    isAlliance: false,
    imageSrc: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media/file/Adam%20Voight.webp`,
  },
  {
    name: 'Brad Harrell',
    title: 'Broker, Owner, Commercial Specialist',
    email: 'bharrell@OnwardRET.com',
    officePhone: '254.870.0050',
    cellPhone: '254.870.0050',
    designations: 'CCIM',
    isRealtor: true,
    isAlliance: false,
    imageSrc: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media/file/Brad%20Harrell.webp`,
  },
  {
    name: 'Brittany Woods',
    title: 'Residential Transaction Coordinator',
    email: 'bwoods@onwardRET.com',
    officePhone: '254.870.9800',
    cellPhone: '254.218.6107',
    designations: '',
    isRealtor: true,
    isAlliance: false,
    imageSrc: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media/file/Brittany_Woods.webp`,
  },
  {
    name: 'Chandler Steinke',
    title: 'Assistant Property Manager',
    email: 'csteinke@leasetexasnow.com',
    officePhone: '254.870.0101',
    cellPhone: '',
    designations: '',
    isRealtor: false,
    isAlliance: true,
    imageSrc: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media/file/Chandler%20Steinke.webp`,
  },
  {
    name: 'Christopher "CJ" Jackson',
    title: 'Residential Specialist',
    email: 'cj@onwardRET.com',
    officePhone: '254.870.9800',
    cellPhone: '',
    designations: '',
    isRealtor: true,
    isAlliance: false,
    imageSrc: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media/file/CJ%20Jackson.webp`,
  },
  {
    name: 'Danielle Smith',
    title: 'Director of Marketing',
    email: 'dsmith@onwardRET.com',
    officePhone: '254.870.9769',
    cellPhone: '254.218.5761',
    designations: '',
    isRealtor: false,
    isAlliance: false,
    imageSrc: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media/file/Danielle%20Smith.webp`,
  },
  {
    name: 'David Haragan',
    title: 'Commercial Transaction Coordinator',
    email: 'dharagan@onwardRET.com',
    officePhone: '254.870.0050',
    cellPhone: '',
    designations: '',
    isRealtor: true,
    isAlliance: false,
    imageSrc: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media/file/David%20Haragan.webp`,
  },
  {
    name: 'Derek Houser',
    title: 'Commercial Buyer Tenant Specialist',
    email: 'dhouser@onwardRET.com',
    officePhone: '254.870.0050',
    cellPhone: '254.855.7534',
    designations: '',
    isRealtor: true,
    isAlliance: false,
    imageSrc: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media/file/Derek%20Houser.webp`,
  },
  {
    name: 'Donna Bettinger',
    title: 'Director of Human Resources and Finance',
    email: 'dbettinger@leasetexasnow.com',
    officePhone: '254.870.0101',
    cellPhone: '',
    designations: '',
    isRealtor: false,
    isAlliance: false,
    imageSrc: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media/file/Donna%20Bettinger.webp`,
  },
  {
    name: 'Kyle Cox',
    title: 'Chief Operating Officer',
    email: 'kcox@OnwardRET.com',
    officePhone: '254.870.0050',
    cellPhone: '254.744.1287',
    designations: '',
    isRealtor: true,
    isAlliance: false,
    imageSrc: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media/file/Kyle%20Cox.webp`,
  },
  {
    name: 'Logan Taylor',
    title: 'Commercial Buyer Tenant Specialist',
    email: 'ltaylor@onwardRET.com',
    officePhone: '254.870.0050',
    cellPhone: '254.301.9045',
    designations: '',
    isRealtor: true,
    isAlliance: false,
    imageSrc: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media/file/Logan%20Taylor.webp`,
  },
  {
    name: 'Mason Frucci',
    title: 'Director of Property Management',
    email: 'mfrucci@leasetexasnow.com',
    officePhone: '254.870.0101',
    cellPhone: '254.218.3917',
    designations: 'GRI',
    isRealtor: true,
    isAlliance: true,
    imageSrc: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media/file/Mason%20Frucci.webp`,
  },
  {
    name: 'Mellissa Harrell',
    title: 'Owner, Residential Specialist',
    email: 'mharrell@OnwardRET.com',
    officePhone: '254.870.9800',
    cellPhone: '254.749.6036',
    designations: 'GRI, PSA, ALHS, CLHMS',
    isRealtor: true,
    isAlliance: false,
    imageSrc: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media/file/Mellissa%20Harrell.webp`,
  },
  {
    name: 'Michael Warren',
    title: 'Commercial Buyer Tenant Specialist',
    email: 'mwarren@onwardRET.com',
    officePhone: '254.870.0050',
    cellPhone: '254.723.0934',
    designations: '',
    isRealtor: true,
    isAlliance: false,
    imageSrc: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media/file/Michael%20Warren.webp`,
  },
  {
    name: 'Xavier Rosas',
    title: 'Commercial Specialist',
    email: 'xrosas@onwardRET.com',
    officePhone: '254.870.0050',
    cellPhone: '254.633.9515',
    designations: '',
    isRealtor: true,
    isAlliance: false,
    imageSrc: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media/file/Xavier%20Rosas.webp`,
  },
  {
    name: 'Trisha Young',
    title: 'Field Manager and Staging Consultant',
    email: 'tyoung@leasetexasnow.com',
    officePhone: '254.870.0101',
    cellPhone: '',
    designations: '',
    isRealtor: false,
    isAlliance: true,
    imageSrc: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media/file/Trisha%20Young.webp`,
  },
  {
    name: 'Thad Barker',
    title: 'Commercial Buyer Tenant Specialist',
    email: 'tbarker@onwardRET.com',
    officePhone: '254.870.0050',
    cellPhone: '254.424.3075',
    designations: '',
    isRealtor: true,
    isAlliance: false,
    imageSrc: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media/file/Thad%20Barker.webp`,
  },
  {
    name: 'Taylor Wilson',
    title: 'Residential Specialist',
    email: 'twilson@onwardRET.com',
    officePhone: '254.870.9800',
    cellPhone: '254.633.9712',
    designations: 'GRI',
    isRealtor: true,
    isAlliance: false,
    imageSrc: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media/file/Taylor%20Wilson.webp`,
  },
  {
    name: 'Stacy Duong',
    title: 'Marketing Specialist',
    email: 'sduong@onwardRET.com',
    officePhone: '254.870.9769',
    cellPhone: '254.900.7220',
    designations: '',
    isRealtor: false,
    isAlliance: false,
    imageSrc: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media/file/Stacy%20Duong.webp`,
  },
  {
    name: 'Selene Perez',
    title: 'Residential Specialist',
    email: 'sperez@onwardRET.com',
    officePhone: '254.870.9800',
    cellPhone: '',
    designations: '',
    isRealtor: true,
    isAlliance: false,
    imageSrc: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media/file/Selene%20Perez.webp`,
  },
]

export default async function Page() {
  return (
    <>
      <PageClient />
      <div className="my-20 md:my-24 lg:my-32">
        <div className="container max-w-7xl flex flex-col gap-20">
          <div className="flex flex-col gap-6">
            <h1 className="text-brand-navy text-[2.5rem] sm:text-[4rem] text-center font-bold">
              Email Signatures
            </h1>
            <p className="text-center font-light text-brand-gray-04">
              The email signatures below have been coded for consistency across most email clients
              on multiple desktop platforms (PC, Mac, Linux) and mobile devices (IOS, Android). You
              will need to add your signature to every mail client you use to send emails for Onward
              Real Estate. This could include your phone’s email app, Outlook on your desktop, or a
              browser-based email suite.
              <br />
              <br /> A video walkthrough of how to install your email signature can be found{' '}
              <a
                href="https://www.loom.com/share/aa0799be7bb24061b3abd4ab16a2ba53?sid=b7400ed9-f860-482d-b435-a5b4f045a86d"
                target="_blank"
                rel="noreferrer noopener"
                className="underline text-brand-navy"
              >
                here
              </a>
              .
              <br />
              <br />
              <span className="font-bold">
                Select your name from the list below to navigate to your email signature.
              </span>
            </p>
            <ul className="flex gap-y-2 justify-center flex-wrap items-center">
              {emailSignatureData.map((item, index) => (
                <li key={index} className="px-4 border-r border-brand-gray-01">
                  <a
                    className="text-brand-navy underline text-center"
                    href={`#email-signature-${item.name.replaceAll(' ', '-').toLowerCase()}`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {emailSignatureData.map((item, index) => (
            <div
              key={index}
              className="mb-16 scroll-mt-40"
              id={`email-signature-${item.name.replaceAll(' ', '-').toLowerCase()}`}
            >
              <div className="mb-20 border-b border-brand-navy">Start copy after this line</div>
              <EmailSignature {...item} />
              <div className="mt-20 border-t border-brand-navy">End copy before this line</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
