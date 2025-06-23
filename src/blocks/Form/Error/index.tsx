import React, { useEffect, useState } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

interface ErrorProps {
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>
}

export const Error: React.FC<ErrorProps> = ({ error }) => {
  const [errorMessage, setErrorMessage] = useState('This field is invalid')
  useEffect(() => {
    console.log(error)
    if (error) {
      switch (error.type) {
        case 'required':
          setErrorMessage('This field is required')
          break
        case 'minLength':
          setErrorMessage('This field is too short')
          break
        default:
          setErrorMessage('This field is invalid')
          break
      }
    }
  }, [error])
  return (
    <div className="text-destructive text-sm font-light absolute left-0 top-[calc(100%+.5rem)]">
      {errorMessage}
    </div>
  )
}
