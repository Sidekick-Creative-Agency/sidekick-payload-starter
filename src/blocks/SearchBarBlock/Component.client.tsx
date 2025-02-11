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
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,
  faChevronRight,
  faChevronUp,
  faMagnifyingGlass,
} from '@awesome.me/kit-a7a0dd333d/icons/sharp/regular'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import { usePayloadAPI } from '@payloadcms/ui'
import { PropertyType } from '@/payload-types'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Label } from '@/components/ui/label'

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
  const searchRef = useRef<HTMLInputElement | null>(null)
  const submitRef = useRef<HTMLButtonElement | null>(null)
  const searchRefMb = useRef<HTMLInputElement | null>(null)
  const submitRefMb = useRef<HTMLButtonElement | null>(null)
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  const propertyTypesResult = usePayloadAPI('/api/property-types')

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const searchParams = new URLSearchParams()
    searchParams.append('category', category || '')
    if (data.search) {
      searchParams.append('search', data.search)
    }
    if (data.propertyType) {
      searchParams.append('property_type', data.propertyType)
    }
    router.push(`/listings/map?${searchParams.toString()}`)
  }

  useEffect(() => {
    if (!propertyTypes && propertyTypesResult[0]?.data?.docs) {
      setPropertyTypes(propertyTypesResult[0].data.docs)
    }
  }, [propertyTypesResult])
  return (
    <Form {...form}>
      <form
        className="w-full bg-white flex flex-col lg:flex-row gap-6 lg:gap-2 relative"
        onSubmit={form.handleSubmit(onSubmit)}
        ref={formRef}
      >
        {width && width <= parseInt(defaultTheme.screens.md) && (
          <>
            <div
              className="flex items-center gap-4 p-4 pl-6 border border-brand-gray-01 w-full group has-[input:focus-visible]:border-brand-navy cursor-text"
              onClick={(e) => {
                if (searchRefMb.current && e.target !== submitRefMb?.current) {
                  searchRefMb.current.focus()
                }
              }}
            >
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
                          className="h-full p-0 lg:pl-2 text-base font-light text-brand-navy border-none focus-visible:border-none focus-visible:ring-0"
                          ref={searchRefMb}
                        />
                      </FormControl>
                    </FormItem>
                  )
                }}
              />
              <Button
                type="submit"
                className="flex items-center gap-2 p-4 lg:py-4 lg:px-8 focus-visible:ring-brand-navy focus-visible:ring-offset-2"
                ref={submitRefMb}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />{' '}
              </Button>
            </div>
            <div className="flex items-center gap-10 flex-col w-full">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="propertyType">
                  <AccordionTrigger
                    closedIcon={faChevronDown}
                    openIcon={faChevronUp}
                    className="text-brand-navy uppercase font-bold tracking-widest [&_svg]:text-brand-navy [&_svg]:w-3 hover:no-underline focus-visible:no-underline relative"
                  >
                    <span className="uppercase tracking-wider text-brand-gray-03 block text-xs font-light absolute left-0 top-0">
                      Search
                    </span>
                    <div className="flex gap-4 items-center whitespace-nowrap">
                      <span className="text-brand-navy">{category}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <FormField
                      control={form.control}
                      name="propertyType"
                      defaultValue={''}
                      render={({ field }) => {
                        return (
                          <FormItem className="w-full">
                            <RadioGroup value={field.value} onValueChange={field.onChange}>
                              <div className="flex items-center gap-2 w-full">
                                <RadioGroupItem value="" id="property_type_r0" className="" />
                                <Label
                                  htmlFor="property_type_r0"
                                  className="font-light text-base text-brand-navy w-full"
                                >
                                  All
                                </Label>
                              </div>

                              {propertyTypes &&
                                propertyTypes.length > 0 &&
                                propertyTypes.map((propertyType) => (
                                  <div
                                    key={propertyType.id}
                                    className="flex items-center gap-2 w-full"
                                  >
                                    <RadioGroupItem
                                      key={propertyType.id}
                                      value={String(propertyType.id)}
                                      id={`property_type_r${propertyType.id}`}
                                      className=""
                                    />
                                    <Label
                                      htmlFor={`property_type_r${propertyType.id}`}
                                      className="font-light text-base text-brand-navy w-full"
                                    >
                                      {propertyType.title}
                                    </Label>
                                  </div>
                                ))}
                            </RadioGroup>
                          </FormItem>
                        )
                      }}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Link
                href="/about/team"
                className="w-full flex flex-col justify-between items-start relative py-6 rounded-none focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2 border-b"
              >
                <span className="uppercase tracking-wider text-brand-gray-03 block text-xs font-light absolute top-0 left-0">
                  Find an
                </span>
                <div className="flex gap-4 items-center justify-between whitespace-nowrap w-full">
                  <span className="text-brand-navy uppercase font-bold tracking-widest">
                    Onward Agent
                  </span>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-sm text-brand-navy w-2 h-auto"
                    fontSize={14}
                  />
                </div>
              </Link>
            </div>
          </>
        )}
        {width && width > parseInt(defaultTheme.screens.md) && (
          <div className="flex items-center gap-10 w-full">
            <div
              className="flex items-center gap-4 p-4 border border-brand-gray-01 w-full group has-[input:focus-visible]:border-brand-navy cursor-text"
              onClick={(e) => {
                if (searchRef.current && e.target !== submitRef?.current) {
                  searchRef.current.focus()
                }
              }}
            >
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
                          className="h-full p-0 lg:pl-2 text-lg font-light text-brand-navy border-none focus-visible:border-none focus-visible:ring-0"
                          ref={searchRef}
                        />
                      </FormControl>
                    </FormItem>
                  )
                }}
              />
              <Button
                type="submit"
                className="flex items-center gap-2 p-4 lg:py-4 lg:px-8 focus-visible:ring-brand-navy focus-visible:ring-offset-2"
                ref={submitRef}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />{' '}
                <span className="hidden lg:inline-block">Search</span>
              </Button>
            </div>
            <div className="flex items-center gap-10">
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full flex flex-col justify-between items-start py-2 px-3 rounded-none focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2">
                  <span className="uppercase tracking-wider text-brand-gray-03 block text-xs font-light">
                    Search
                  </span>
                  <div className="flex gap-4 items-center whitespace-nowrap">
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
                  <DropdownMenuLabel className="font-light border-b mb-2">
                    Property Type
                  </DropdownMenuLabel>
                  <FormField
                    control={form.control}
                    name="propertyType"
                    defaultValue={''}
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full">
                          <DropdownMenuRadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <DropdownMenuRadioItem
                              value=""
                              id="property_type_r0"
                              className="text-brand-gray-06 rounded-none hover:bg-brand-blue/25 focus-visible:bg-brand-blue/25"
                            >
                              All
                            </DropdownMenuRadioItem>

                            {propertyTypes &&
                              propertyTypes.length > 0 &&
                              propertyTypes.map((propertyType) => (
                                <DropdownMenuRadioItem
                                  key={propertyType.id}
                                  value={String(propertyType.id)}
                                  id={`property_type_r${propertyType.id}`}
                                  className="text-brand-gray-06 rounded-none hover:bg-brand-blue/25 focus-visible:bg-brand-blue/25"
                                >
                                  {propertyType.title}
                                </DropdownMenuRadioItem>
                              ))}
                          </DropdownMenuRadioGroup>
                        </FormItem>
                      )
                    }}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
              <Link
                href="/about/team"
                className="w-full flex flex-col justify-between items-start py-2 px-3 rounded-none focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2 group"
              >
                <span className="uppercase tracking-wider text-brand-gray-03 block text-xs font-light">
                  Find an
                </span>
                <div className="flex gap-4 items-center whitespace-nowrap">
                  <span className="text-lg font-light text-brand-navy capitalize">
                    Onward Agent
                  </span>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-sm text-brand-navy w-3.5 transition-transform group-hover:translate-x-2"
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
