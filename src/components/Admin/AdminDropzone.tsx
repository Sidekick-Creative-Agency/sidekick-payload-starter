'use client'

import { Button, Dropzone, Table, toast } from '@payloadcms/ui'
import React, { useState } from 'react'
import Papa from 'papaparse'

interface AdminDropzoneProps {
  collectionSlug: string
}
export const AdminDropzone: React.FC<AdminDropzoneProps> = ({ collectionSlug }) => {
  const [file, setFile] = useState<File | null>(null)
  const [data, setData] = useState<any[]>([])

  return (
    <div>
      <Dropzone
        onChange={(fileList) => {
          console.log(fileList)
          if (fileList.length > 0) {
            const firstFile = fileList[0]
            const firstFileType = firstFile.type
            if (firstFileType === 'text/csv') {
              console.log('CSV file detected')
              setFile(firstFile)
              Papa.parse(firstFile, {
                header: true,
                complete: (results) => {
                  console.log(results)
                  const errors = results.errors
                  const errorIndices: number[] = []
                  if (errors.length > 0) {
                    errors.forEach((error) => {
                      if (error.row) {
                        errorIndices.push(error.row)
                      }
                      toast.error(`Error parsing row ${error.row}:  ${error.message}`)
                    })
                  }
                  const successfulRows = results.data.filter((_, index) => {
                    return !errorIndices.includes(index)
                  })
                  if (successfulRows && successfulRows.length > 0) {
                    setData(successfulRows)
                    toast.success(
                      `Successfully read ${successfulRows.length} rows from file ${firstFile.name}`,
                    )
                  }
                },
              })
            } else {
              console.log('Unsupported file type')
              toast.error('Unsupported file type. Only CSV files are allowed')
            }
          }
        }}
        dropzoneStyle="default"
        multipleFiles={false}
      >
        <span>{file?.name ? file.name : 'Drag or Drop CSV file here'}</span>
      </Dropzone>
      {file && (
        <Button
          onClick={() => {
            if (file) {
              Papa.parse(file, {
                header: true,
                complete: (results) => {
                  console.log(results)
                  setFile(null)
                  toast.success(`File ${file.name} uploaded successfully`)
                },
              })
            } else {
              setFile(null)
              toast.error('No file selected')
            }
          }}
        >
          Upload File
        </Button>
      )}
    </div>
  )
}
