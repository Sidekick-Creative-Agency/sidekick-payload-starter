'use client'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormControl, Form, FormField, FormItem, FormLabel } from '../ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faMagnifyingGlass } from '@awesome.me/kit-a7a0dd333d/icons/sharp/regular'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { validateNumberFieldInput } from '@/utilities/validateNumberFieldInput'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { formatNumber } from '@/utilities/formatNumber'
import { usePayloadAPI } from '@payloadcms/ui'

const FormSchema = z.object({
  search: z.string().optional(),
  type: z.string().optional(),
  minPrice: z.number().optional().or(z.string().optional()),
  maxPrice: z.number().optional().or(z.string().optional()),
  minSize: z.number().optional().or(z.string().optional()),
  maxSize: z.number().optional().or(z.string().optional()),
  sizeType: z.string().optional(),
  availability: z.string().optional(),
  listingType: z.string().optional(),
})

export const FilterBar = () => {
  const { toast } = useToast()
  const [sizeText, setSizeText] = useState('Size')
  const [propertyTypes, setPropertyTypes] = useState<string[]>([])
  const propertyTypesResponse = usePayloadAPI(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/property-types`,
  )

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  const handleSizeChange = (
    min: string | number | undefined,
    max: string | number | undefined,
    type: string | undefined,
  ) => {
    if (!type) {
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

  useEffect(() => {
    if (propertyTypesResponse[0].data && propertyTypesResponse[0].data.docs) {
      setPropertyTypes(
        propertyTypesResponse[0].data.docs.map((propertyType) => {
          if (propertyType.title) {
            return propertyType.title
          }
          return null
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
          defaultValue=""
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
          defaultValue=""
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-full text-lg font-light text-brand-navy w-full rounded-none">
                      <SelectValue placeholder="Listing Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white text-brand-navy">
                    <SelectItem value="for-sale">For Sale</SelectItem>
                    <SelectItem value="for-lease">For Lease</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )
          }}
        />
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full border border-input flex justify-between items-center py-2 px-3">
            Price
            <FontAwesomeIcon
              icon={faChevronDown}
              className="text-sm text-brand-gray-03"
              fontSize={14}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-2">
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="minPrice"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>Min</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Min price"
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
                name="maxPrice"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>Max</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Max price"
                          {...field}
                          className="h-full text-lg font-light text-brand-navy"
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
            {sizeText}

            <FontAwesomeIcon
              icon={faChevronDown}
              className="text-sm text-brand-gray-03"
              fontSize={14}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-2">
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="sizeType"
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
                defaultValue=""
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
                defaultValue=""
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
          defaultValue=""
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-full text-lg font-light text-brand-navy w-full rounded-none">
                      <SelectValue placeholder="Listing Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white text-brand-navy">
                    {propertyTypes &&
                      propertyTypes.length > 0 &&
                      propertyTypes.map((type, index) => (
                        <SelectItem key={index} value={type.toLowerCase()}>
                          {type}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )
          }}
        />
        <Button type="submit" className="flex items-center gap-2">
          <FontAwesomeIcon icon={faMagnifyingGlass} fontSize={16} /> Submit
        </Button>
      </form>
    </Form>
  )
}
