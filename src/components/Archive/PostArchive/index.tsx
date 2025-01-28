import React from 'react'

import { DataFromCollectionSlug } from 'payload'
import { PostCard } from '@/components/Posts/PostCard'

interface PostArchiveGridProps {
  data: DataFromCollectionSlug<'posts'>[]
}

export const PostArchiveGrid: React.FC<PostArchiveGridProps> = (props) => {
  const { data } = props
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-x-10 md:gap-y-20">
      {data?.map((post, index) => {
        if (typeof post === 'object' && post !== null) {
          return (
            <div className="w-full" key={post.id}>
              <PostCard post={post} />
            </div>
          )
        }
        return null
      })}
    </div>
  )
}
