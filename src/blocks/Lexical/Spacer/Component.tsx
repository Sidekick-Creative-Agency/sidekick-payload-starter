import { cn } from 'src/utilities/cn'
import React from 'react'
import RichText from '@/components/RichText'

export type SpacerLexicalBlockProps = {
  size: 'small' | 'medium' | 'large' | undefined | null
  blockType: 'spacer'
}

export const SpacerLexicalBlock: React.FC<SpacerLexicalBlockProps> = ({ size }) => {
  const sizeClassNames = {
    small: 'py-1',
    medium: 'py-2',
    large: 'py-4',
  }

  return <div className={`${size && sizeClassNames[size]} w-full h-0`}></div>
}
