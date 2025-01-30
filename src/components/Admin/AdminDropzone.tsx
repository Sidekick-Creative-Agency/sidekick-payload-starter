'use client'

import { Button, Dropzone, Table, toast } from '@payloadcms/ui'
import React, { useRef, useState } from 'react'
import Papa from 'papaparse'
import { findPropertyTypeIdByTitle } from '@/utilities/ListingImport/findPropertyTypeIdByTitle'
import { findTeamMemberIdByName } from '@/utilities/ListingImport/findAgentIdByName'
import { $generateNodesFromDOM } from '@lexical/html'
import { createHeadlessEditor } from '@lexical/headless'
import { LexicalNode } from 'lexical'
import { stat } from 'fs'
import { Input } from '../ui/input'

interface AdminDropzoneProps {
  collectionSlug: string
}
interface ListingData {
  title: string | null | undefined
  featuredImage: string | null | undefined
  imageGallery: string | null | undefined
  category: string | null | undefined
  description: string | null | undefined
  price: string | null | undefined
  propertyType: string | null | undefined
  transactionType: string | null | undefined
  status: string | null | undefined
  area: string | null | undefined
  acreage: string | null | undefined
  streetAddress: string | null | undefined
  city: string | null | undefined
  state: string | null | undefined
  zipCode: string | null | undefined
  latitude: string | null | undefined
  longitude: string | null | undefined
  attatchments: string | null | undefined
  isFeatured: string | null | undefined
  agents: string | null | undefined
}
export const AdminDropzone: React.FC<AdminDropzoneProps> = ({ collectionSlug }) => {
  const [file, setFile] = useState<File | null>(null)
  const [data, setData] = useState<ListingData[]>([])
  const featuredImageRef = useRef<HTMLInputElement>(null)

  const handleUpload = async () => {
    if (!file) {
      toast.error('No file found')
      return
    }
    if (!data) {
      toast.error('No file data found')
      return
    }
    data.forEach(async (item, index) => {
      if (!item.title) {
        toast.error(`Skipping import on line ${index + 2}. Title is required`)
        return
      }
      if (!item.featuredImage) {
        toast.error(`Skipping import on line ${index + 2}. Featured Image is required`)
        return
      }
      if (!item.streetAddress) {
        toast.error(`Skipping import on line ${index + 2}. Street Address is required`)
        return
      }
      if (!item.city) {
        toast.error(`Skipping import on line ${index + 2}. City is required`)
        return
      }
      if (!item.state) {
        toast.error(`Skipping import on line ${index + 2}. State is required`)
        return
      }
      if (!item.zipCode) {
        toast.error(`Skipping import on line ${index + 2}. Zip Code is required`)
        return
      }
      if (!item.latitude) {
        toast.error(`Skipping import on line ${index + 2}. Latitude is required`)
        return
      }
      if (!item.longitude) {
        toast.error(`Skipping import on line ${index + 2}. Longitude  is required`)
        return
      }
      let featuredImageId: number | undefined = undefined
      const featuredImage =
        featuredImageRef.current && featuredImageRef.current.files
          ? featuredImageRef.current.files[0]
          : null

      if (featuredImage) {
        const formData = new FormData()
        formData.append('file', featuredImage)
        formData.append('alt', '')

        const featuredImageResponse = await fetch('/api/media', {
          method: 'POST',
          body: formData,
          credentials: 'include',
        })
          .then((response) => response.json().then((json) => json))
          .catch((error) => console.error('Error creating image:', error))
        if (featuredImageResponse.doc) {
          featuredImageId = featuredImageResponse.doc.id
          console.log(featuredImageId)
        }
        console.log(featuredImageResponse)
      }
      // const imageGallery = item.imageGallery
      //   ? item.imageGallery.split(',').map((item) => {
      //       return { url: item, alt: '' }
      //     })
      //   : []
      const attachments = item.attatchments ? item.attatchments.split(',') : []
      const propertyType: (number | undefined)[] = item.propertyType
        ? await Promise.all(
            item.propertyType
              .split(',')
              .map(async (propertyType) => await findPropertyTypeIdByTitle(propertyType)),
          )
        : []
      const agents: (number | undefined)[] = item.agents
        ? await Promise.all(
            item.agents.split(',').map(async (name) => await findTeamMemberIdByName(name)),
          )
        : []
      let formattedDescription: LexicalNode[] | undefined = undefined
      const editor = createHeadlessEditor()
      const parser = new DOMParser()

      editor.update(() => {
        const dom = item.description
          ? parser.parseFromString(item.description, 'text/html')
          : undefined

        formattedDescription = dom ? $generateNodesFromDOM(editor, dom) : undefined
      })

      const postData = {
        title: item.title,
        featuredImage: featuredImageId ? featuredImageId : undefined,
        // imageGallery: imageGallery,
        category: item.category,
        description: formattedDescription,
        price: item.price ? Number(item.price) : undefined,
        propertyType: propertyType,
        transactionType: item.transactionType,
        status: item.status,
        area: item.area ? Number(item.area) : undefined,
        acreage: item.acreage ? item.acreage : undefined,
        streetAddress: item.streetAddress,
        city: item.city,
        state: item.state,
        zipCode: item.zipCode,
        latitude: item.latitude ? Number(item.latitude) : undefined,
        longitude: item.longitude ? Number(item.longitude) : undefined,
        attachments: attachments,
        isFeatured: item.isFeatured && item.isFeatured.toLowerCase() === 'true' ? true : false,
        agents: agents,
      }
      console.log(postData)
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(postData),
      })
      const json = await response.json()
      console.log(json)
    })
  }

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
                    setData(successfulRows as ListingData[])
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
      <Input type="file" ref={featuredImageRef} />
      {file && (
        <Button
          onClick={() => {
            handleUpload()
          }}
        >
          Upload File
        </Button>
      )}
    </div>
  )
}
