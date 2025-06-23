import React from 'react'
import type { Page } from '@/payload-types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import RichText from '@/components/RichText'
import * as motion from 'motion/react-client'

type Props = Extract<Page['layout'][0], { blockType: 'faqBlock' }>

export const FAQBlock: React.FC<
  {
    id?: string
  } & Props
> = (props) => {
  const { id, enableHeading, heading, faqs, size, elementId } = props

  const maxWidthClasses = {
    sm: 'max-w-4xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    full: 'max-w-full',
  }

  return (
    <>
      <div
        className={`faq-block-${id} flex flex-col items-stretch`}
        {...(elementId ? { id: elementId } : {})}
      >
        <div className="container py-20 sm:py-32 flex flex-col gap-20">
          {enableHeading && heading && (
            <motion.h2
              className="text-center text-[2.5rem] text-brand-gray-06 font-bold"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 'all' }}
            >
              {heading}
            </motion.h2>
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
                    {question && (
                      <AccordionTrigger className="text-2xl text-brand-navy font-bold text-start hover:no-underline focus-visible:no-underline">
                        <motion.span
                          initial={{ y: 20, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          viewport={{ once: true, amount: 'all' }}
                        >
                          {question}
                        </motion.span>
                      </AccordionTrigger>
                    )}
                    {content && (
                      <AccordionContent>
                        <RichText
                          content={content}
                          enableGutter={false}
                          className="text-base font-light text-brand-gray-04"
                        />
                      </AccordionContent>
                    )}
                  </AccordionItem>
                )
              })}
          </Accordion>
        </div>
      </div>
    </>
  )
}
