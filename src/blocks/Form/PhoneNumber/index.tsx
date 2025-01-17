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

export const PhoneNumber: React.FC<
  TextField & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
    setValue: UseFormSetValue<FieldValues>
    className?: string
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
  placeholder,
}) => {
  const [error, setError] = useState<
    FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  >(errors[name])

  const formatPhoneNumber = (value: string) => {
    // Format phone number as (XXX) XXX-XXXX
    if (!value) return value
    const digits = value.replaceAll(/\D/g, '')
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }
  useEffect(() => {
    setError(errors[name])
  }, [errors, name])
  return (
    <div className={className}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input
        defaultValue={defaultValue}
        id={name}
        maxLength={14}
        type="tel"
        placeholder={placeholder}
        {...register(name, {
          required: requiredFromProps,
          minLength: 14,
          maxLength: 14,
        })}
        onChange={(e) => {
          setValue(name, formatPhoneNumber(e.target.value))
        }}
      />
      {requiredFromProps && errors[name] && <Error error={error} />}
    </div>
  )
}
