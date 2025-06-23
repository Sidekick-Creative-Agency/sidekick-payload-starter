'use client'

import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form } from '@/payload-types'
import { faCircleNotch } from '@awesome.me/kit-a7a0dd333d/icons/sharp/regular'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

interface NewsletterFormProps {
  form: Form
}

export const NewsletterForm: React.FC<NewsletterFormProps> = ({ form }) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const submitRef = useRef<HTMLButtonElement | null>(null)

  const formMethods = useForm<{ email: string }>()
  const {
    formState: { errors },
    handleSubmit,
    register,
    setFocus,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()
  const onSubmit = (data: { email: string }) => {
    if (!form) return
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
              form: form.id,
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

        if (form.confirmationType === 'redirect' && form.redirect) {
          const { url } = form.redirect

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
    <form onSubmit={handleSubmit(onSubmit)}>
      {!hasSubmitted && (
        <div
          className="p-2 pl-4 sm:pl-6 bg-white/25 flex gap-6 group has-[input:focus]:ring-white has-[input:focus]:ring-2 has-[input:focus]:ring-offset-2 has-[input:focus]:ring-offset-brand-navy"
          onClick={(e) => {
            if (e.target !== submitRef.current) {
              setFocus('email')
            }
          }}
        >
          <Input
            className="border-none p-0 bg-transparent text-white font-light focus-visible:ring-0 focus-visible:border-none leading-none focus-visible:ring-offset-0 h-auto placeholder:text-brand-gray-02"
            // @ts-ignore
            placeholder={form.fields?.at(0)?.placeholder || 'Enter your email address'}
            required
            type="email"
            {...register('email')}
          />
          <Button ref={submitRef}>
            {!isLoading ? (
              form.submitButtonLabel
            ) : (
              <FontAwesomeIcon icon={faCircleNotch} className="animate-spin" />
            )}
          </Button>
        </div>
      )}

      {!isLoading && hasSubmitted && form.confirmationType === 'message' && (
        <RichText content={form.confirmationMessage || {}} enableGutter={false} />
      )}
      {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
    </form>
  )
}
