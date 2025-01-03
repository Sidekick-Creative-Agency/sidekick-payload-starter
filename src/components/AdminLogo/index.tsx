/* eslint-disable @next/next/no-img-element */
import React from 'react'

const AdminLogo: React.FC = () => {
  return (
    <div>
      <img
        src="/onward-logoicon-color-light.webp"
        alt="custom logo"
        width={256}
        height={144}
        className="w-full object-contain"
      />
    </div>
  )
}

export default AdminLogo
