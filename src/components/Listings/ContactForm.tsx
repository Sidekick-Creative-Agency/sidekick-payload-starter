'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Listing } from '@/payload-types'
import { Button } from '../ui/button'

export const ListingContactFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email(),
  phone: z
    .string()
    .min(7, { message: 'Phone number must be at least 7 characters' })
    .max(14, { message: 'Phone number must be at most 14 characters' })
    .regex(
      new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/),
      'Invalid phone number',
    )
    .optional(),
  message: z.string(),
})

interface ContactFormProps {
  listing: Listing
}

export const ContactForm: React.FC<ContactFormProps> = ({ listing }) => {
  const form = useForm<z.infer<typeof ListingContactFormSchema>>({
    resolver: zodResolver(ListingContactFormSchema),
  })

  const onSubmit = (data: z.infer<typeof ListingContactFormSchema>) => {
    console.log('Submitted data:', data)
  }
  return (
    <Form {...form}>
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

        <Button type="submit" className="w-full bg-brand-navy mt-4">
          Contact Us
        </Button>
      </form>
    </Form>
  )
}
