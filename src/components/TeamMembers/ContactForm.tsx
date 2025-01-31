'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Listing, TeamMember } from '@/payload-types'
import { Button } from '../ui/button'

export const TeamMemberContactFormSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
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
  teamMember: TeamMember
}

export const ContactForm: React.FC<ContactFormProps> = ({ teamMember }) => {
  const form = useForm<z.infer<typeof TeamMemberContactFormSchema>>({
    resolver: zodResolver(TeamMemberContactFormSchema),
  })

  const onSubmit = (data: z.infer<typeof TeamMemberContactFormSchema>) => {
    console.log('Submitted data:', data)
  }
  return (
    <Form {...form}>
      <form
        className="grid max-[400px]:grid-cols-1 grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="firstName"
          defaultValue=""
          render={({ field }) => {
            return (
              <FormItem
                className={`w-full col-span-1 relative transition-[margin-bottom] ${form.formState.errors[field.name] ? 'mb-8' : 'mb-0'}`}
              >
                <FormControl>
                  <Input
                    placeholder="First Name*"
                    {...field}
                    className="text-sm font-light text-brand-gray-06 py-4 px-6 bg-white"
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
          name="lastName"
          defaultValue=""
          render={({ field }) => {
            return (
              <FormItem
                className={`w-full col-span-1  relative transition-[margin-bottom] ${form.formState.errors[field.name] ? 'mb-8' : 'mb-0'}`}
              >
                <FormControl>
                  <Input
                    placeholder="Last Name*"
                    {...field}
                    className="text-sm font-light text-brand-gray-06 py-4 px-6 bg-white"
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
                className={`w-full col-span-1 relative transition-[margin-bottom] ${form.formState.errors[field.name] ? 'mb-6' : 'mb-0'}`}
              >
                <FormControl>
                  <Input
                    placeholder="Phone"
                    {...field}
                    className="text-sm font-light text-brand-gray-06 py-4 px-6 bg-white"
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
                className={`w-full col-span-1 relative transition-[margin-bottom] ${form.formState.errors[field.name] ? 'mb-6' : 'mb-0'}`}
              >
                <FormControl>
                  <Input
                    placeholder="Email Address*"
                    {...field}
                    className="text-sm font-light text-brand-gray-06 py-4 px-6 bg-white"
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
                className={`w-full max-[400px]:col-span-1 col-span-2 sm:col-span-1 md:col-span-2 relative transition-[margin-bottom] ${form.formState.errors[field.name] ? 'mb-6' : 'mb-0'}`}
              >
                <FormControl>
                  <Textarea
                    placeholder="Comments"
                    {...field}
                    className="text-sm font-light text-brand-gray-06 py-4 px-6 bg-white"
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
        <div>
          <Button type="submit" className="w-full sm:w-auto bg-brand-navy px-8 mt-4">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}
