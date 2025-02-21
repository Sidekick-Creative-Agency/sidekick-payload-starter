'use client'
import { syncResidentialListings } from '@/app/(frontend)/api/residential/syncResidentialListings'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Gutter, NavGroup } from '@payloadcms/ui'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { ServerComponentProps } from 'payload'

export const Actions: React.FC<ServerComponentProps> = (props) => {
  return (
    <div className="flex-grow flex items-end">
      <Link href="/" target="_blank" aria-label="Go to live site">
        <ExternalLink className="w-6 text-white" />
      </Link>
      <Button
        onClick={() => {
          syncResidentialListings()
        }}
      >
        Sync
      </Button>
    </div>
  )
}
