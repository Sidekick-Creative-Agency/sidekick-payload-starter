/* eslint-disable @next/next/no-img-element */
import React from 'react'

const LoginLogo: React.FC = () => {
  return (
    <div>
      <img
        src="/sidekick-logo-login.webp"
        alt="custom logo"
        width={256}
        height={256}
        className="w-64 object-contain"
      />
    </div>
  )
}

export default LoginLogo
