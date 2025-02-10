'use client'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import useWindowDimensions from '@/utilities/useWindowDimensions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import defaultTheme from 'tailwindcss/defaultTheme'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faMagnifyingGlass } from '@awesome.me/kit-a7a0dd333d/icons/sharp/regular'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import { usePayloadAPI } from '@payloadcms/ui'
import { PropertyType } from '@/payload-types'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const FormSchema = z.object({
  search: z.string().optional(),
  propertyType: z.string().optional(),
})

interface SearchBarClientBlockProps {
  category: 'commercial' | 'residential' | null | undefined
}

export const SearchBarBlockClient: React.FC<SearchBarClientBlockProps> = ({ category }) => {
  const { width } = useWindowDimensions()
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[] | undefined>(undefined)
  const formRef = useRef<HTMLFormElement | null>(null)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  //   const propertyTypesResult = usePayloadAPI('/api/property-types')

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log('Submitted data:', data)
  }

  //   useEffect(() => {
  //     // if (propertyTypesResult[0]?.data) {
  //     //   setPropertyTypes(propertyTypesResult[0].data)
  //     // }
  //     // console.log(propertyTypes)
  //   }, [propertyTypesResult])
  return (
    <Form {...form}>
      <form
        className="w-full p-10 bg-white flex gap-2 relative"
        onSubmit={form.handleSubmit(onSubmit)}
        ref={formRef}
      >
        {width && width <= parseInt(defaultTheme.screens.md) && (
          <>
            <FormField
              control={form.control}
              name="search"
              defaultValue={''}
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        placeholder="Search by Address, City, Zipcode..."
                        {...field}
                        className="h-full text-lg font-light text-brand-navy"
                      />
                    </FormControl>
                  </FormItem>
                )
              }}
            />
            {/* <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant={'link'}
                    className="flex items-center gap-2 text-brand-gray-03 font-medium bg-transparent p-2 hover:no-underline focus-visible:no-underline normal-case tracking-normal"
                  >
                    Filters <FontAwesomeIcon icon={faBarsFilter} className="" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="max-h-screen overflow-scroll">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <Accordion type="multiple">
                    <AccordionItem value="category">
                      <AccordionTrigger
                        className="text-lg text-brand-navy hover:no-underline focus-visible:no-underline"
                        iconClassName="text-brand-navy"
                        closedIcon={faChevronDown}
                        openIcon={faChevronUp}
                      >
                        Category
                      </AccordionTrigger>
                      <AccordionContent className="px-2">
                        <FormField
                          control={form.control}
                          name="category"
                          defaultValue={searchParams.get('category') || ''}
                          render={({ field }) => {
                            return (
                              <FormItem className="w-full">
                                <RadioGroup onValueChange={field.onChange}>
                                  <div className="flex items-center gap-x-2 text-brand-gray-06">
                                    <RadioGroupItem value="all" id="category_r0" />
                                    <Label htmlFor="category_r0">All</Label>
                                  </div>
                                  <div className="flex items-center gap-x-2 text-brand-gray-06">
                                    <RadioGroupItem value="commercial" id="category_r1" />
                                    <Label htmlFor="category_r1">Commercial</Label>
                                  </div>
                                  <div className="flex items-center gap-x-2 text-brand-gray-06">
                                    <RadioGroupItem value="residential" id="category_r2" />
                                    <Label htmlFor="category_r2">Residential</Label>
                                  </div>
                                </RadioGroup>
                              </FormItem>
                            )
                          }}
                        />
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="transactionType">
                      <AccordionTrigger
                        className="text-lg text-brand-navy hover:no-underline focus-visible:no-underline"
                        iconClassName="text-brand-navy"
                        closedIcon={faChevronDown}
                        openIcon={faChevronUp}
                      >
                        Transaction Type
                      </AccordionTrigger>
                      <AccordionContent className="px-2">
                        <FormField
                          control={form.control}
                          name="transactionType"
                          defaultValue={searchParams.get('transaction_type') || ''}
                          render={({ field }) => {
                            return (
                              <FormItem className="w-full">
                                <RadioGroup onValueChange={field.onChange}>
                                  <div className="flex items-center gap-x-2 text-brand-gray-06">
                                    <RadioGroupItem value="all" id="transaction_type_r0" />
                                    <Label htmlFor="transaction_type_r0">All</Label>
                                  </div>
                                  <div className="flex items-center gap-x-2 text-brand-gray-06">
                                    <RadioGroupItem value="for-sale" id="transaction_type_r1" />
                                    <Label htmlFor="transaction_type_r1">For Sale</Label>
                                  </div>
                                  <div className="flex items-center gap-x-2 text-brand-gray-06">
                                    <RadioGroupItem value="for-lease" id="transaction_type_r2" />
                                    <Label htmlFor="transaction_type_r2">For Lease</Label>
                                  </div>
                                </RadioGroup>
                              </FormItem>
                            )
                          }}
                        />
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="price">
                      <AccordionTrigger
                        className="text-lg text-brand-navy hover:no-underline focus-visible:no-underline"
                        iconClassName="text-brand-navy"
                        closedIcon={faChevronDown}
                        openIcon={faChevronUp}
                      >
                        Price
                      </AccordionTrigger>
                      <AccordionContent className="px-2">
                        <div className="flex flex-col gap-4">
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
                                        handlePriceChange(
                                          form.getValues().minPrice,
                                          form.getValues().maxPrice,
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
                                        handlePriceChange(
                                          form.getValues().minPrice,
                                          form.getValues().maxPrice,
                                        )
                                      }}
                                    />
                                  </FormControl>
                                </FormItem>
                              )
                            }}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="size">
                      <AccordionTrigger
                        className="text-lg text-brand-navy hover:no-underline focus-visible:no-underline"
                        iconClassName="text-brand-navy"
                        closedIcon={faChevronDown}
                        openIcon={faChevronUp}
                      >
                        Size
                      </AccordionTrigger>
                      <AccordionContent className="px-2">
                        <div className="flex flex-col gap-4">
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
                                      <FormItem className="flex items-center gap-2">
                                        <FormControl>
                                          <RadioGroupItem value="sqft" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Sqft</FormLabel>
                                      </FormItem>
                                      <FormItem className="flex items-center gap-2">
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
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="propertyType">
                      <AccordionTrigger
                        className="text-lg text-brand-navy hover:no-underline focus-visible:no-underline"
                        iconClassName="text-brand-navy"
                        closedIcon={faChevronDown}
                        openIcon={faChevronUp}
                      >
                        Property Type
                      </AccordionTrigger>
                      <AccordionContent className="px-2">
                        <FormField
                          control={form.control}
                          name="propertyType"
                          defaultValue={
                            propertyTypes
                              ? propertyTypes.find(
                                  (type) => type.value === searchParams.get('property_type'),
                                )?.value
                              : ''
                          }
                          render={({ field }) => {
                            return (
                              <FormItem className="w-full">
                                <RadioGroup onValueChange={field.onChange}>
                                  <div className="flex items-center gap-x-2 text-brand-gray-06">
                                    <RadioGroupItem value="all" id="property_type_r0" />
                                    <Label htmlFor="property_type_r0">All</Label>
                                  </div>
                                  {propertyTypes &&
                                    propertyTypes.map((propertyType, index) => {
                                      return (
                                        <div
                                          key={propertyType.value}
                                          className="flex items-center gap-x-2 text-brand-gray-06"
                                        >
                                          <RadioGroupItem
                                            value={String(propertyType.value)}
                                            id={`property_type_r${index + 1}`}
                                          />
                                          <Label htmlFor={`property_type_r${index + 1}`}>
                                            {propertyType.label}
                                          </Label>
                                        </div>
                                      )
                                    })}
                                </RadioGroup>
                              </FormItem>
                            )
                          }}
                        />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Button
                    type="submit"
                    className="flex items-center gap-4 w-full mt-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-2"
                    disabled={isLoading}
                    onClick={(e) => {
                      e.preventDefault()
                      console.log(form.formState.errors)
                      if (formRef.current) {
                        formRef.current.requestSubmit()
                      }
                    }}
                  >
                    <FontAwesomeIcon
                      icon={!isLoading ? faMagnifyingGlass : faCircleNotch}
                      fontSize={16}
                      className={`w-4 ${isLoading && 'animate-spin'}`}
                    />{' '}
                    <span>Search</span>
                  </Button>
                </SheetContent>
              </Sheet> */}
          </>
        )}
        {width && width > parseInt(defaultTheme.screens.md) && (
          <div className="flex items-center gap-10 w-full">
            <div className="flex items-center gap-4 p-4 border border-brand-gray-01 w-full">
              <FormField
                control={form.control}
                name="search"
                defaultValue={''}
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          placeholder="Search by Address, City, Zipcode..."
                          {...field}
                          className="h-full text-lg font-light text-brand-navy border-none"
                        />
                      </FormControl>
                    </FormItem>
                  )
                }}
              />
              <Button type="submit" className="flex items-center gap-2">
                <FontAwesomeIcon icon={faMagnifyingGlass} /> Search
              </Button>
            </div>
            <div className="flex items-center gap-10">
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full flex flex-col justify-between items-start py-2 px-3 rounded-none focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2">
                  <span className="uppercase tracking-wider text-brand-gray-03 block text-xs font-light">
                    Search
                  </span>
                  <div className="flex gap-4 items-center">
                    <span className="text-lg font-light text-brand-navy capitalize">
                      {category}
                    </span>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="text-sm text-brand-navy w-3.5"
                      fontSize={14}
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-2 rounded-none" tabIndex={0}>
                  <FormField
                    control={form.control}
                    name="propertyType"
                    defaultValue={''}
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full">
                          <RadioGroup onValueChange={field.onChange}>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="all" id="property_type_r0" />
                              </FormControl>
                              <FormLabel htmlFor="property_type_r0">All</FormLabel>
                            </FormItem>
                            {propertyTypes &&
                              propertyTypes.length > 0 &&
                              propertyTypes.map((propertyType) => (
                                <FormItem
                                  key={propertyType.id}
                                  className="flex items-center space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <RadioGroupItem
                                      value={propertyType.title}
                                      id={`property_type_r${propertyType.id}`}
                                    />
                                  </FormControl>
                                  <FormLabel htmlFor={`property_type_r${propertyType.id}`}>
                                    {propertyType.title}
                                  </FormLabel>
                                </FormItem>
                              ))}
                          </RadioGroup>
                        </FormItem>
                      )
                    }}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
              <Link
                href="/about/team"
                className="w-full flex flex-col justify-between items-start py-2 px-3 rounded-none focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2"
              >
                <span className="uppercase tracking-wider text-brand-gray-03 block text-xs font-light">
                  Find an
                </span>
                <div className="flex gap-4 items-center">
                  <span className="text-lg font-light text-brand-navy capitalize">
                    Onward Agent
                  </span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="text-sm text-brand-navy w-3.5"
                    fontSize={14}
                  />
                </div>
              </Link>
            </div>
          </div>
        )}
      </form>
    </Form>
  )
}
