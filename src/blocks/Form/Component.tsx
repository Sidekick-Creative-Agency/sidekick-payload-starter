'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'

import { buildInitialFormState } from './buildInitialFormState'
import { fields } from './fields'
import { PhoneNumberField } from './PhoneNumber/Field'
import defaultTheme from 'tailwindcss/defaultTheme'
export type Value = unknown

export interface Property {
  [key: string]: Value
}

export interface Data {
  [key: string]: Property | Property[]
}

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType & { fields: (FormFieldBlock | PhoneNumberField)[] }
  introContent?: {
    [k: string]: unknown
  }[]
  theme?: 'default' | 'thin'
  styles?: {
    global: { width?: string }
    resp: {
      padVertDeskVal?: number
      padVertDeskUnit?: string
      padHorDeskVal?: number
      padHorDeskUnit?: string
      padVertTabVal?: number
      padVertTabUnit?: string
      padHorTabVal?: number
      padHorTabUnit?: string
      padVertMbVal?: number
      padVertMbUnit?: string
      padHorMbVal?: number
      padHorMbUnit?: string
    }
  }
  elementId?: string
}

export const fieldWidthClasses = {
  oneThird: 'col-span-12 sm:col-span-4',
  half: 'col-span-12 sm:col-span-6',
  twoThirds: 'col-span-12 sm:col-span-8',
  full: 'col-span-12',
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const { enableIntro, form: formFromProps, introContent, styles, elementId } = props
  const {
    id: formID = '',
    confirmationMessage = '',
    confirmationType = '',
    redirect = undefined,
    submitButtonLabel = '',
  } = formFromProps

  const {
    // @ts-ignore
    global: { width = 'full', theme = 'default' },
    // @ts-ignore
    resp: {
      padVertDeskVal: pyDesktopVal = 0,
      padVertDeskUnit: pyDesktopUnit = 'rem',
      padHorDeskVal: pxDesktopVal = 0,
      padHorDeskUnit: pxDesktopUnit = 'rem',
      padVertTabVal: pyTabletVal = 0,
      padVertTabUnit: pyTabletUnit = 'rem',
      padHorTabVal: pxTabletVal = 0,
      padHorTabUnit: pxTabletUnit = 'rem',
      padVertMbVal: pyMobileVal = 0,
      padVertMbUnit: pyMobileUnit = 'rem',
      padHorMbVal: pxMobileVal = 0,
      padHorMbUnit: pxMobileUnit = 'rem',
    },
  } = styles
  const pyDesktop = pyDesktopVal && pyDesktopUnit ? `${pyDesktopVal}${pyDesktopUnit}` : '0'
  const pxDesktop = pxDesktopVal && pxDesktopUnit ? `${pxDesktopVal}${pxDesktopUnit}` : '0'
  const pyTablet = pyTabletVal && pyTabletUnit ? `${pyTabletVal}${pyTabletUnit}` : '0'
  const pxTablet = pxTabletVal && pxTabletUnit ? `${pxTabletVal}${pxTabletUnit}` : '0'
  const pyMobile = pyMobileVal && pyMobileUnit ? `${pyMobileVal}${pyMobileUnit}` : '0'
  const pxMobile = pxMobileVal && pxMobileUnit ? `${pxMobileVal}${pxMobileUnit}` : '0'

  const widthClasses = {
    full: 'max-w-full',
    boxed: '',
    narrow: 'max-w-48',
  }

  const formMethods = useForm({
    defaultValues: buildInitialFormState(formFromProps.fields),
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: Data) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/form-submissions`,
            {
              body: JSON.stringify({
                form: formID,
                submissionData: dataToSend,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'POST',
            },
          )

          const res = await req.json()

          clearTimeout(loadingTimerID)

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

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

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
    },
    [router, formID, redirect, confirmationType],
  )

  useEffect(() => {
    console.log(errors)
  }, [errors])

  return (
    <>
      <style>
        {`.form-block-${formID} {
        padding: ${pyMobile} ${pxMobile};
       

       @media screen and (min-width: ${defaultTheme.screens.md}) {
       padding: ${pyTablet} ${pxTablet};
          @media screen and (min-width: ${defaultTheme.screens.lg}) {
          padding: ${pyDesktop} ${pxDesktop};
       }
      }`}
      </style>
      <div
        className={`container ${widthClasses[width]} form-block-${formID}`}
        {...(elementId ? { id: elementId } : {})}
      >
        <FormProvider {...formMethods}>
          {enableIntro && introContent && !hasSubmitted && (
            <RichText className="mb-10" content={introContent} enableGutter={false} />
          )}
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
            <RichText content={confirmationMessage} />
          )}
          {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
          {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
          {!hasSubmitted && (
            <form id={formID} onSubmit={handleSubmit(onSubmit)}>
              <div className={`mb-4 grid grid-cols-12 ${theme === 'default' ? 'gap-4' : 'gap-10'}`}>
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields?.map((field, index) => {
                    const Field: React.FC<any> = fields?.[field.blockType]
                    if (Field) {
                      return (
                        <Field
                          form={formFromProps}
                          {...field}
                          {...formMethods}
                          control={control}
                          errors={errors}
                          register={register}
                          className={`inline-block ${'width' in field ? fieldWidthClasses[field.width || 'full'] : ''} ${'name' in field && field.name && !errors[field.name] && 'mb-0'} relative transition-[margin] duration-300 ${'name' in field && field.name && errors[field.name] && 'mb-6'} `}
                          fieldClassName={`${theme === 'thin' && 'border-t-0 border-r-0 border-l-0 border-b text-lg font-light focus-visible:border-b-brand-navy focus-visible:ring-0'} `}
                          setValue={setValue}
                          key={index}
                        />
                      )
                    }
                    return null
                  })}
              </div>

              <Button form={formID} type="submit" variant="default" className="mt-6">
                {submitButtonLabel}
              </Button>
            </form>
          )}
        </FormProvider>
      </div>
    </>
  )
}
