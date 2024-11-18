import * as React from 'react'

export const Error: React.FC = () => {
  return (
    <div className="text-red-500 text-sm absolute left-0 top-[calc(100%+.25rem)]">
      This field is required
    </div>
  )
}
