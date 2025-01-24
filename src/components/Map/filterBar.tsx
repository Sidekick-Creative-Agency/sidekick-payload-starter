'use client'
import React, { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FormControl, Form, FormField, FormItem, FormLabel } from '../ui/form'
import { z } from 'zod'

import { useToast } from '@/hooks/use-toast'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,
  faCircleNotch,
  faMagnifyingGlass,
} from '@awesome.me/kit-a7a0dd333d/icons/sharp/regular'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'

import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { formatNumber } from '@/utilities/formatNumber'
import { usePayloadAPI } from '@payloadcms/ui'
import { formatPrice } from '@/utilities/formatPrice'
import { filterMapListings } from '@/app/(frontend)/api/filterMapListings'
import { Listing } from '@/payload-types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FormSchema } from '@/app/(frontend)/listings/map/page.client'

interface FilterBarProps {
  setActiveListings: (listings: Listing[]) => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  form: UseFormReturn<z.infer<typeof FormSchema>>
}

export const FilterBar: React.FC<FilterBarProps> = ({
  setActiveListings,
  isLoading,
  setIsLoading,

  form,
}) => {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [sizeText, setSizeText] = useState('Size')
  const [priceText, setPriceText] = useState('Price')
  const [propertyTypes, setPropertyTypes] = useState<{ value: string; label: string }[]>([])
  const router = useRouter()
  const pathname = usePathname()
  const propertyTypesResponse = usePayloadAPI(
    `${process.env.VERCEL === '1' ? process.env.VERCEL_PROJECT_PRODUCTION_URL! : process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/property-types`,
  )

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true)
    const newSearchParams = new URLSearchParams(searchParams)
    if (data.search) {
      newSearchParams.set('search', data.search)
    }
    if (data.type) {
      newSearchParams.set('type', data.type)
    }
    if (data.minPrice) {
      newSearchParams.set('min_price', data.minPrice.toString())
    }
    if (data.maxPrice) {
      newSearchParams.set('max_price', data.maxPrice.toString())
    }
    if (data.minSize) {
      newSearchParams.set('min_size', data.minSize.toString())
    }
    if (data.maxSize) {
      newSearchParams.set('max_size', data.maxSize.toString())
    }
    if (data.availability) {
      newSearchParams.set('availability', data.availability.toString())
    }
    if (data.listingType) {
      newSearchParams.set('listing_type', data.listingType.toString())
    }
    if (data.sizeType) {
      newSearchParams.set('size_type', data.sizeType.toString())
    }
    router.replace(pathname + '?' + newSearchParams.toString(), { scroll: false })
    const filteredListings = await filterMapListings({
      search: data.search,
      type: data.type,
      minPrice: data.minPrice,
      maxPrice: data.maxPrice,
      minSize: data.minSize,
      maxSize: data.maxSize,
      sizeType: data.sizeType,
      availability: data.availability,
      listingType: data.listingType,
    })
    setActiveListings(filteredListings.docs)
    toast({
      title: `Found ${filteredListings.totalDocs} listings`,
    })
    setIsLoading(false)
  }

  const handleSizeChange = (
    min: string | number | undefined,
    max: string | number | undefined,
    type: string | undefined,
  ) => {
    if ((min || max) && !type) {
      form.setValue('sizeType', 'sqft')
    }
    if (min && max) {
      setSizeText(`${formatNumber(Number(min))} - ${formatNumber(Number(max))} ${type}`)
    } else if (min) {
      setSizeText(`From ${formatNumber(Number(min))} ${type}`)
    } else if (max) {
      setSizeText(`Up to ${formatNumber(Number(max))} ${type}`)
    } else {
      setSizeText('Size')
    }
  }

  const handlePriceChange = (
    min: string | number | undefined,
    max: string | number | undefined,
  ) => {
    if (min && max) {
      setPriceText(`${formatPrice(Number(min))} - ${formatPrice(Number(max))}`)
    } else if (min) {
      setPriceText(`From ${formatPrice(Number(min))}`)
    } else if (max) {
      setPriceText(`Up to ${formatPrice(Number(max))}`)
    } else {
      setPriceText('Price')
    }
  }

  useEffect(() => {
    if (propertyTypesResponse[0].data && propertyTypesResponse[0].data.docs) {
      setPropertyTypes(
        propertyTypesResponse[0].data.docs.map((propertyType) => {
          return { value: propertyType.id, label: propertyType.title }
        }),
      )
    }
  }, [propertyTypesResponse])

  return (
    <Form {...form}>
      <form className="w-full p-10 bg-white flex gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="search"
          defaultValue={searchParams.get('search') || ''}
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Search"
                    {...field}
                    className="h-full text-lg font-light text-brand-navy"
                  />
                </FormControl>
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name="listingType"
          defaultValue={searchParams.get('listing_type') || ''}
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-full text-lg font-light text-brand-navy w-full rounded-none">
                      <SelectValue placeholder="Listing Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white text-brand-navy rounded-none">
                    <SelectItem value="for-sale" className="hover:bg-brand-blue rounded-none">
                      For Sale
                    </SelectItem>
                    <SelectItem value="for-lease" className="hover:bg-brand-blue rounded-none">
                      For Lease
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )
          }}
        />
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full border border-input flex justify-between items-center py-2 px-3">
            <span className="text-lg font-light text-brand-navy">{priceText}</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="text-sm text-brand-gray-03 w-3.5"
              fontSize={14}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-2 rounded-none" tabIndex={0}>
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="minPrice"
                defaultValue={searchParams.get('min_price') || ''}
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>Min</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Min price"
                          {...field}
                          className="h-full text-lg font-light text-brand-navy"
                          onChange={(event) => {
                            field.onChange(event)
                            handlePriceChange(form.getValues().minPrice, form.getValues().maxPrice)
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                name="maxPrice"
                defaultValue={searchParams.get('max_price') || ''}
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>Max</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Max price"
                          {...field}
                          className="h-full text-lg font-light text-brand-navy"
                          onChange={(event) => {
                            field.onChange(event)
                            handlePriceChange(form.getValues().minPrice, form.getValues().maxPrice)
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )
                }}
              />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="w-full border border-input flex justify-between items-center py-2 px-3">
            <span className="text-lg font-light text-brand-navy">{sizeText}</span>

            <FontAwesomeIcon
              icon={faChevronDown}
              className="text-sm text-brand-gray-03 w-3.5"
              fontSize={14}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-2 rounded-none">
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="sizeType"
                defaultValue={searchParams.get('size_type') || ''}
                render={({ field }) => {
                  return (
                    <FormItem className="space-y-2">
                      <FormLabel>Size Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            handleSizeChange(
                              form.getValues().minSize,
                              form.getValues().maxSize,
                              value,
                            )
                            field.onChange(value)
                          }}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="sqft" />
                            </FormControl>
                            <FormLabel className="font-normal">Sqft</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="acres" />
                            </FormControl>
                            <FormLabel className="font-normal">Acres</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                name="minSize"
                defaultValue={searchParams.get('min_size') || ''}
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>Min</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Min size"
                          {...field}
                          className="h-full text-lg font-light text-brand-navy"
                          onKeyUp={() => {
                            handleSizeChange(
                              form.getValues().minSize,
                              form.getValues().maxSize,
                              form.getValues().sizeType,
                            )
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                name="maxSize"
                defaultValue={searchParams.get('max_size') || ''}
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>Max</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Max size"
                          {...field}
                          className="h-full text-lg font-light text-brand-navy"
                          onKeyUp={() => {
                            handleSizeChange(
                              form.getValues().minSize,
                              form.getValues().maxSize,
                              form.getValues().sizeType,
                            )
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )
                }}
              />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <FormField
          control={form.control}
          name="type"
          defaultValue={searchParams.get('type') || ''}
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <Select
                  onValueChange={(value) => {
                    field.onChange(value)
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-full text-lg font-light text-brand-navy w-full rounded-none">
                      <SelectValue placeholder="Type">
                        {propertyTypes.find((type) => type.value.toString() === field.value)?.label}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white text-brand-navy rounded-none">
                    {propertyTypes &&
                      propertyTypes.length > 0 &&
                      propertyTypes.map((type, index) => (
                        <SelectItem
                          key={index}
                          value={type.value}
                          className="hover:bg-brand-blue rounded-none"
                        >
                          {type.label}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )
          }}
        />
        <Button type="submit" className="flex items-center gap-2 min-w-40" disabled={isLoading}>
          {!isLoading && (
            <>
              <FontAwesomeIcon icon={faMagnifyingGlass} fontSize={16} className="w-4" /> Search
            </>
          )}
          {isLoading && (
            <>
              <FontAwesomeIcon icon={faCircleNotch} spin fontSize={16} className="w-4" />
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}
