import { cn } from 'src/utilities/cn'
import React from 'react'
import RichText from '@/components/RichText'

export type SubtitleLexicalBlockProps = {
  subtitle: string
  color: string
  blockType: 'subtitle'
}

export const SubtitleLexicalBlock: React.FC<SubtitleLexicalBlockProps> = (props) => {
  const { subtitle, color } = props

  return (
    <div>
      <span className={`${color} text-base tracking-widest uppercase mb-2`}>{subtitle}</span>
    </div>
  )
}
