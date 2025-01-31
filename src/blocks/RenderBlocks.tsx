import React, { Fragment } from 'react'
import type { Page } from '@/payload-types'
import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { FAQBlock } from './FAQBlock/Component'
import { ColumnsBlock } from './ColumnsBlock/Component'
import { NumberCountersBlock } from './NumberCounterBlock/Component'
import { ExpertiseBlock } from './ExpertiseBlock/Component'
import { TimelineBlock } from './TimelineBlock/Component'
import { ReviewsBlock } from './ReviewsBlock/Component'
import { JobListingsBlock } from './JobListingsBlock/Component'
import { SocialProofCarouselBlock } from './SocialProofCarouselBlock/Component'
import { MediaCarouselBlock } from './MediaCarouselBlock/Component'
import { CardGridBlock } from './CardGridBlock/Component'
import { FeaturedListingsBlock } from './FeaturedListingsBlock/Component'

const blockComponents = {
  archiveBlock: ArchiveBlock,
  formBlock: FormBlock,
  faqBlock: FAQBlock,
  columnsBlock: ColumnsBlock,
  numberCountersBlock: NumberCountersBlock,
  expertiseBlock: ExpertiseBlock,
  timelineBlock: TimelineBlock,
  reviewsBlock: ReviewsBlock,
  jobListingsBlock: JobListingsBlock,
  socialProofCarouselBlock: SocialProofCarouselBlock,
  mediaCarouselBlock: MediaCarouselBlock,
  cardGridBlock: CardGridBlock,
  featuredListingsBlock: FeaturedListingsBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index}>
                  {/* @ts-ignore */}
                  <Block {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
