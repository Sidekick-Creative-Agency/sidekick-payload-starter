'use client'

import { Dropzone, toast } from '@payloadcms/ui'
import { useState } from 'react'

export const AdminDropzone = () => {
  const [fileName, setFileName] = useState<string | null>(null)
  return (
    <Dropzone
      onChange={(fileList) => {
        console.log(fileList)
        if (fileList.length > 0) {
          const firstFile = fileList[0]
          const firstFileType = firstFile.type
          if (firstFileType === 'text/csv') {
            console.log('CSV file detected')
            setFileName(firstFile.name)
          } else {
            console.log('Unsupported file type')
            toast.error('Unsupported file type. Only CSV files are allowed')
          }
        }
      }}
      dropzoneStyle="default"
      multipleFiles={false}
    >
      <span>{fileName ? fileName : 'Drag or Drop .csv file here'}</span>
    </Dropzone>
  )
}
