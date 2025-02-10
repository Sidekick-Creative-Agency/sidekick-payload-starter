import { SearchBarBlock as SearchBarBlockProps } from '@/payload-types'
import { SearchBarBlockClient } from './Component.client'

export const SearchBarBlock: React.FC<
  SearchBarBlockProps & {
    id?: string
  }
> = async ({ category, id, elementId }) => {
  return (
    <div className={`search-bar-block-${id}`} {...(elementId ? { id: elementId } : {})}>
      <SearchBarBlockClient category={category} />
    </div>
  )
}
