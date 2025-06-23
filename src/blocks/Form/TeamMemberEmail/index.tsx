'use client'
import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form'
import { Input } from '@/components/ui/input'
import React, { useEffect } from 'react'
import { useParams, usePathname } from 'next/navigation'
import canUseDOM from '@/utilities/canUseDOM'

export const TeamMemberEmail: React.FC<
  TextField & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
    setValue: UseFormSetValue<FieldValues>
  }
> = ({ name, register, setValue }) => {
  const { slug } = useParams()
  const pathname = usePathname()
  const setEmailValue = async () => {
    const teamMembers = await fetch(`/api/team-members?where[slug][equals]=${slug}`).then((res) =>
      res.json().then((json) => json),
    )
    if (teamMembers && teamMembers.docs && teamMembers.docs.length > 0) {
      setValue(name, teamMembers.docs[0].details.email)
    }
  }
  useEffect(() => {
    if (canUseDOM && pathname.includes('team') && slug) {
      setEmailValue()
    }
  }, [])
  return <Input defaultValue="" id={name} type="hidden" {...register(name)} />
}
