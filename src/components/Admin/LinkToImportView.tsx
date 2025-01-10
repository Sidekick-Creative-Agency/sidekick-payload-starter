import { Button, Gutter } from '@payloadcms/ui'
import Link from 'next/link'
import { ServerComponentProps } from 'payload'

export const LinkToImportView: React.FC<ServerComponentProps> = (props) => {
  return (
    <Gutter>
      <Link href={`/admin/import/${props.collectionSlug}`}>
        <Button>
          Import {props.collectionSlug[0].toUpperCase() + props.collectionSlug.slice(1)}
        </Button>
      </Link>
    </Gutter>
  )
}
