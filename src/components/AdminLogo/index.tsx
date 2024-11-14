/* eslint-disable @next/next/no-img-element */
import React from 'react'

const AdminLogo: React.FC = () => {
  return (
    <div>
      <img
        src="/sidekick-logo-admin.png"
        alt="custom logo"
        width={256}
        height={128}
        className="w-full object-contain"
      />
    </div>
  )
}

export default AdminLogo
