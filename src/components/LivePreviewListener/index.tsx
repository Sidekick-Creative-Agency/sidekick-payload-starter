'use client'
import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export const LivePreviewListener: React.FC = () => {
  const router = useRouter()
  return (
    <PayloadLivePreview
      refresh={router.refresh}
      serverURL={
        process.env.VERCEL === '1'
          ? process.env.VERCEL_PROJECT_PRODUCTION_URL!
          : process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
      }
    />
  )
}
