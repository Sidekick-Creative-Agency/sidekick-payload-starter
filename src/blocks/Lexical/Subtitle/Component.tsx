import { cn } from 'src/utilities/cn'
import React from 'react'
import RichText from '@/components/RichText'

export type SubtitleBlockProps = {
  subtitle: string
  color: string
  blockType: 'subtitle'
}

export const SubtitleLexicalBlock: React.FC<SubtitleBlockProps> = (props) => {
  const { subtitle, color } = props

  return (
    <div>
      <span className={`${color} text-base tracking-widest uppercase mb-2`}>{subtitle}</span>
    </div>
  )
}
