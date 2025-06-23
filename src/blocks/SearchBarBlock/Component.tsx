import { SearchBarBlock as SearchBarBlockProps } from '@/payload-types'
import { SearchBarBlockClient } from './Component.client'

export const SearchBarBlock: React.FC<
  SearchBarBlockProps & {
    id?: string
  }
> = async ({ category, id, elementId }) => {
  return (
    <div
      className={`search-bar-block-${id} py-10 md:py-6`}
      {...(elementId ? { id: elementId } : {})}
    >
      <div className="container">
        <SearchBarBlockClient category={category} />
      </div>
    </div>
  )
}
