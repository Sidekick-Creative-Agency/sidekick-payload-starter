'use client'
import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'

import { Error } from '../Error'
import { usePathname } from 'next/navigation'
import canUseDOM from '@/utilities/canUseDOM'

export const PageTitle: React.FC<
  TextField & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
    setValue: UseFormSetValue<FieldValues>
    className?: string
    fieldClassName?: string
    placeholder?: string
  }
> = ({
  name,
  defaultValue,
  errors,
  label,
  register,
  required: requiredFromProps,
  setValue,
  className,
  fieldClassName,
  placeholder,
}) => {
  useEffect(() => {
    if (canUseDOM) {
      setValue(name, document.title.split('|')[0])
    }
  }, [])
  return (
    <Input
      defaultValue=""
      id={name}
      maxLength={14}
      type="hidden"
      placeholder={placeholder}
      className={fieldClassName}
      {...register(name)}
    />
  )
}
