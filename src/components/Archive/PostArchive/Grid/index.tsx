'use client'
import React, { useEffect, useState } from 'react'

import { DataFromCollectionSlug } from 'payload'
import { PostCard } from '@/components/Posts/PostCard'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@awesome.me/kit-a7a0dd333d/icons/sharp/regular'
import { Category } from '@/payload-types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'

interface PostArchiveGridProps {
  data: DataFromCollectionSlug<'posts'>[]
  limit?: number
  hasNextPage?: boolean
  enableFilter?: boolean | null
}

export const PostArchiveGrid: React.FC<PostArchiveGridProps> = ({
  data,
  limit,
  hasNextPage: _hasNextPage,
  enableFilter,
}) => {
  const [posts, setPosts] = useState(data)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(_hasNextPage)
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState<Category[] | undefined>(undefined)
  const [activeCategory, setActiveCategory] = useState<Category | undefined>(undefined)

  const fetchMorePosts = async () => {
    setIsLoading(true)
    if (!hasNextPage) return
    try {
      const response = await fetch(
        `/api/posts?limit=${limit}&page=${currentPage + 1}${activeCategory ? `&where[category.title][equals]=${activeCategory?.title}` : ''}`,
      )
      if (response.ok) {
        const newData = await response.json()
        const newDocs = newData.docs
        const hasNextPage = newData.hasNextPage
        setPosts((prevPosts) => [...prevPosts, ...newDocs])
        if (hasNextPage) {
          setCurrentPage((current) => current + 1)
        }
        console.log(hasNextPage)
        setHasNextPage(hasNextPage)
      }
    } catch (error: any) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterPosts = async (categoryTitle: string) => {
    setIsLoading(true)
    setActiveCategory(categories?.find((category) => category.title === categoryTitle))
    setPosts([])
    try {
      const response = await fetch(
        `/api/posts?limit=${limit}${categoryTitle !== 'all' ? `&where[category.title][equals]=${categoryTitle}` : ''}`,
      )
      if (response.ok) {
        const newData = await response.json()
        const newDocs = newData.docs
        const hasNextPage = newData.hasNextPage
        setPosts(newDocs)
        setCurrentPage(1)
        setHasNextPage(hasNextPage)
      }
    } catch (error: any) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCategories = async () => {
    const fetchedCategories = await fetch('/api/categories?sort=title')
    if (fetchedCategories.ok) {
      const fetchedCategoriesJson = await fetchedCategories.json()
      setCategories(fetchedCategoriesJson.docs)
    } else {
      console.error('Error fetching categories')
    }
  }

  useEffect(() => {
    if (enableFilter) {
      fetchCategories()
    }
  }, [])
  return (
    <div className="relative w-full flex flex-col gap-10 items-center">
      {enableFilter && (
        <Select onValueChange={(value) => filterPosts(value)} value={activeCategory?.title || ''}>
          <SelectTrigger className="text-base font-light rounded-none ml-auto w-full sm:w-fit sm:min-w-64">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-white rounded-none">
            <SelectItem
              value="all"
              className="rounded-none text-base font-light hover:bg-brand-blue/50"
            >
              All
            </SelectItem>
            {categories &&
              categories.map((category, index) => {
                return (
                  <SelectItem
                    key={category.id}
                    value={category.title}
                    className="rounded-none text-base font-light hover:bg-brand-blue/50"
                  >
                    {category.title}
                  </SelectItem>
                )
              })}
          </SelectContent>
        </Select>
      )}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts &&
          posts.length > 0 &&
          posts?.map((post, index) => {
            if (typeof post === 'object' && post !== null) {
              return (
                <div key={index} className="w-full">
                  <div className={`w-full duration-1000`}>
                    <PostCard post={post} />
                  </div>
                </div>
              )
            }
            return null
          })}
        {isLoading &&
          (!posts || posts.length === 0) &&
          Array.from(Array(3).keys())

            .map((_, index) => {
              return (
                <div key={index} className="w-full">
                  <div className="relative w-full pb-[80%] rounded-none overflow-hidden">
                    <Skeleton className="w-full h-full absolute top-0 left-0 rounded-none" />
                  </div>
                  <div className="p-4 flex flex-col gap-10">
                    <Skeleton className="w-full h-12" />
                    <Skeleton className="w-1/2 h-8" />
                  </div>
                </div>
              )
            })}
        {!isLoading && (!posts || posts.length === 0) && (
          <div className="col-span-full">
            <p className="text-lg text-center">No posts found</p>
          </div>
        )}
      </div>
      {hasNextPage && (
        <Button onClick={fetchMorePosts} className="w-fit min-w-44">
          {isLoading ? (
            <FontAwesomeIcon icon={faCircleNotch} className="animate-spin" />
          ) : (
            'Load more'
          )}
        </Button>
      )}
    </div>
  )
}
