'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Listing } from '@/payload-types'
import { Button } from '../ui/button'
import { useState } from 'react'
import { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { faCircleNotch } from '@awesome.me/kit-a7a0dd333d/icons/sharp/regular'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Data } from 'payload'
import { useRouter } from 'next/navigation'
import RichText from '../RichText'

export const ListingContactFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email(),
  phone: z
    .string()
    .min(7, { message: 'Phone number too short' })
    .max(14, { message: 'Phone number too long' })
    .regex(
      new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/),
      'Invalid phone number',
    )
    .optional(),
  message: z.string(),
  'property-title-sidebar': z.string(),
})

interface SidebarFormProps {
  listing: Listing
  payloadForm: FormType
}

export const SidebarForm: React.FC<SidebarFormProps> = ({ listing, payloadForm }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()
  const form = useForm<z.infer<typeof ListingContactFormSchema>>({
    resolver: zodResolver(ListingContactFormSchema),
  })

  const onSubmit = (data: Data) => {
    const submitForm = async () => {
      setIsLoading(true)
      setError(undefined)

      const dataToSend = Object.entries(data).map(([name, value]) => ({
        field: name,
        value,
      }))

      try {
        const req = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/form-submissions`,
          {
            body: JSON.stringify({
              form: payloadForm.id,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          },
        )

        const res = await req.json()

        if (req.status >= 400) {
          setIsLoading(false)

          setError({
            message: res.errors?.[0]?.message || 'Internal Server Error',
            status: res.status,
          })

          return
        }

        setIsLoading(false)
        setHasSubmitted(true)

        if (payloadForm.confirmationType === 'redirect' && payloadForm.redirect) {
          const { url } = payloadForm.redirect

          const redirectUrl = url

          if (redirectUrl) router.push(redirectUrl)
        }
      } catch (err) {
        console.warn(err)
        setIsLoading(false)
        setError({
          message: 'Something went wrong.',
        })
      }
    }

    void submitForm()
  }
  return (
    <Form {...form}>
      {!hasSubmitted && (
        <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            defaultValue=""
            render={({ field }) => {
              return (
                <FormItem
                  className={`w-full relative transition-[margin-bottom] ${form.formState.errors[field.name] ? 'mb-8' : 'mb-0'}`}
                >
                  <FormControl>
                    <Input
                      placeholder="Full Name*"
                      {...field}
                      className="h-full text-lg font-light text-brand-gray-06 p-4 border-0 border-b border-brand-gray-01 focus-visible:border-brand-navy focus-visible:ring-0"
                    />
                  </FormControl>
                  {form.formState.errors[field.name] && (
                    <FormMessage className="absolute left-0 top-[calc(100%+.5rem)] font-light">
                      {form.formState.errors[field.name]?.message}
                    </FormMessage>
                  )}
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name="email"
            defaultValue=""
            render={({ field }) => {
              return (
                <FormItem
                  className={`w-full relative transition-[margin-bottom] ${form.formState.errors[field.name] ? 'mb-6' : 'mb-0'}`}
                >
                  <FormControl>
                    <Input
                      placeholder="Email Address*"
                      // type="email"
                      // required
                      {...field}
                      className="h-full text-lg font-light text-brand-gray-06 p-4 border-0 border-b border-brand-gray-01 focus-visible:border-brand-navy focus-visible:ring-0"
                    />
                  </FormControl>
                  {form.formState.errors[field.name] && (
                    <FormMessage className="absolute left-0 top-[calc(100%+.5rem)] font-light">
                      {form.formState.errors[field.name]?.message}
                    </FormMessage>
                  )}
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name="phone"
            defaultValue=""
            render={({ field }) => {
              return (
                <FormItem
                  className={`w-full relative transition-[margin-bottom] ${form.formState.errors[field.name] ? 'mb-6' : 'mb-0'}`}
                >
                  <FormControl>
                    <Input
                      placeholder="Phone"
                      {...field}
                      className="h-full text-lg font-light text-brand-gray-06 p-4 border-0 border-b border-brand-gray-01 focus-visible:border-brand-navy focus-visible:ring-0"
                    />
                  </FormControl>
                  {form.formState.errors[field.name] && (
                    <FormMessage className="absolute left-0 top-[calc(100%+.5rem)] font-light">
                      {form.formState.errors[field.name]?.message}
                    </FormMessage>
                  )}
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name="message"
            defaultValue=""
            render={({ field }) => {
              return (
                <FormItem
                  className={`w-full relative transition-[margin-bottom] ${form.formState.errors[field.name] ? 'mb-6' : 'mb-0'}`}
                >
                  <FormControl>
                    <Textarea
                      placeholder={`I would like to know more about ${listing.streetAddress}, ${listing.city}, ${listing.state} ${listing.zipCode}`}
                      {...field}
                      className="text-lg font-light text-brand-gray-06 p-4 border-0 border-b border-brand-gray-01 focus-visible:border-brand-navy h-32 focus-visible:ring-0"
                    />
                  </FormControl>
                  {form.formState.errors[field.name] && (
                    <FormMessage className="absolute left-0 top-[calc(100%+.5rem)] font-light">
                      {form.formState.errors[field.name]?.message}
                    </FormMessage>
                  )}
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name="property-title-sidebar"
            defaultValue={listing.title}
            render={({ field }) => {
              return (
                <FormItem
                  className={`w-full relative transition-[margin-bottom] ${form.formState.errors[field.name] ? 'mb-8' : 'mb-0'}`}
                >
                  <FormControl>
                    <Input type="hidden" {...field} />
                  </FormControl>
                  {form.formState.errors[field.name] && (
                    <FormMessage className="absolute left-0 top-[calc(100%+.5rem)] font-light">
                      {form.formState.errors[field.name]?.message}
                    </FormMessage>
                  )}
                </FormItem>
              )
            }}
          />

          <Button type="submit" className="w-full bg-brand-navy mt-4">
            {!isLoading ? (
              payloadForm.submitButtonLabel
            ) : (
              <FontAwesomeIcon icon={faCircleNotch} className="animate-spin" />
            )}
          </Button>
        </form>
      )}

      {!isLoading && hasSubmitted && payloadForm.confirmationType === 'message' && (
        <RichText content={payloadForm.confirmationMessage} enableGutter={false} />
      )}
      {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
    </Form>
  )
}
