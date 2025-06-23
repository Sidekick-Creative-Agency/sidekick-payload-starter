'use client'
import Link from 'next/link'
import React, { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { useHeaderTheme } from '@/providers/HeaderTheme'

export default function NotFound() {
  const { setHeaderTheme } = useHeaderTheme()
  useEffect(() => {
    setHeaderTheme('filled')
  }, [])
  return (
    <div className="container py-28">
      <div className="prose max-w-none">
        <h1>404</h1>
        <p className="mb-4">This page could not be found.</p>
      </div>
      <Button asChild variant="default">
        <Link href="/">Go home</Link>
      </Button>
    </div>
  )
}
