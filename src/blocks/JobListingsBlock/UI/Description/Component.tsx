import Link from 'next/link'

export const DescriptionField: React.FC = () => {
  return (
    <div className="field-description">
      <span>
        Job Listings can be managed <Link href="/admin/collections/job-listings">here</Link>
      </span>
    </div>
  )
}
