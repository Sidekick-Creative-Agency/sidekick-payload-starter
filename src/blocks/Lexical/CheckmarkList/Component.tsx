import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@awesome.me/kit-a7a0dd333d/icons/sharp/regular'
import { BRAND_TEXT_COLOR_CLASSES } from '@/utilities/constants'

export type CheckmarkListLexicalBlockProps = {
  items: {
    iconColor: string
    text: string
    textColor: string
  }[]
  blockType: 'checkmarkList'
}

export const CheckmarkListLexicalBlock: React.FC<CheckmarkListLexicalBlockProps> = ({ items }) => {
  return (
    <ul className="flex flex-col gap-4 pl-0">
      {items &&
        items.map((item, index) => {
          return (
            <li key={index} className="flex gap-4 m-0">
              <FontAwesomeIcon
                icon={faCheck}
                className={`w-4 h-auto ${BRAND_TEXT_COLOR_CLASSES[item.iconColor]} `}
              />
              <span
                className={`text-base font-light ${BRAND_TEXT_COLOR_CLASSES[item.textColor]} leading-[180%]`}
              >
                {item.text}
              </span>
            </li>
          )
        })}
    </ul>
  )
}
