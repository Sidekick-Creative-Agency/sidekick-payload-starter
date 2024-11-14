import React from 'react'
import type { Page } from '@/payload-types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import defaultTheme from 'tailwindcss/defaultTheme'
import RichText from '@/components/RichText'

type Props = Extract<Page['layout'][0], { blockType: 'faqBlock' }>

export const FAQBlock: React.FC<
  {
    id?: string
  } & Props
> = (props) => {
  const {
    id,
    enableHeading,
    heading,
    headingAlign,
    headingSpacingValue,
    headingSpacingUnit,
    faqs,
    size,
    paddingVerticalDesktopValue: pyDesktopVal,
    paddingVerticalDesktopUnit: pyDesktopUnit,
    paddingVerticalTabletValue: pyTabletVal,
    paddingVerticalTabletUnit: pyTabletUnit,
    paddingVerticalMobileValue: pyMobileVal,
    paddingVerticalMobileUnit: pyMobileUnit,
  } = props
  const pyDesktop = pyDesktopVal && pyDesktopUnit ? `${pyDesktopVal}${pyDesktopUnit}` : ''
  const pyTablet = pyTabletVal && pyTabletUnit ? `${pyTabletVal}${pyTabletUnit}` : ''
  const pyMobile = pyMobileVal && pyMobileUnit ? `${pyMobileVal}${pyMobileUnit}` : ''

  const maxWidthClasses = {
    sm: 'max-w-4xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    full: 'max-w-full',
  }
  const headingAlignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  }

  return (
    <>
      <style>
        {`.faq-block-${id} {
       padding-top: ${pyMobile};
       padding-bottom: ${pyMobile};
      ${headingSpacingValue && headingSpacingUnit && `gap: ${headingSpacingValue}${headingSpacingUnit};`}

       @media screen and (min-width: ${defaultTheme.screens.md}) {
          padding-top: ${pyTablet};
          padding-bottom: ${pyTablet};
       }
          @media screen and (min-width: ${defaultTheme.screens.lg}) {
          padding-top: ${pyDesktop};
          padding-bottom: ${pyDesktop};
       }
      }`}
      </style>
      <div className={`container faq-block-${id} flex flex-col items-stretch`}>
        {enableHeading && heading && (
          <h2
            className={`${headingAlignClasses[headingAlign || 'left']} ${maxWidthClasses[size || 'full']} w-full mx-auto`}
          >
            {heading}
          </h2>
        )}
        <Accordion
          type="single"
          collapsible
          className={`${maxWidthClasses[size || 'full']} w-full mx-auto`}
        >
          {faqs &&
            faqs.length > 0 &&
            faqs.map((faq, index) => {
              const { question, content, id: faqId } = faq
              if (!faqId) {
                return
              }
              return (
                <AccordionItem key={faqId} value={faqId}>
                  {question && <AccordionTrigger>{question}</AccordionTrigger>}
                  {content && (
                    <AccordionContent>
                      <RichText content={content} enableGutter={false} />
                    </AccordionContent>
                  )}
                </AccordionItem>
              )
            })}
        </Accordion>
      </div>
    </>
  )
}
