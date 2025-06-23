'use server'
import DigestClient from 'digest-fetch'
import { XMLParser } from 'fast-xml-parser'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { $getRoot, $getSelection, SerializedEditorState } from 'lexical'
import { createHeadlessEditor } from '@lexical/headless'
import { $generateNodesFromDOM } from '@lexical/html'
import { JSDOM } from 'jsdom'

type RETSSearchResponse = {
  RETS: {
    DELIMITER: string
    COLUMNS: string
    DATA: string[]
  }
}
type RETSObjectResponse = {
  RETS: string
}
type RETSListing = {
  ListingKeyNumeric: number | undefined
  City: number | undefined
  Latitude: number | undefined
  ListAgentFullName: string | undefined
  ListAgentKeyNumeric: number | undefined
  ListOfficeKeyNumeric: number | undefined
  ListOfficeName: string | undefined
  ListPrice: number | undefined
  LivingArea: number | undefined
  Longitude: number | undefined
  ModificationTimestamp: string | undefined
  PhotosChangeTimestamp: string | undefined
  PhotosCount: number | undefined
  PostalCode: string | undefined
  PropertySubType: string | undefined
  PropertyType: string | undefined
  PublicRemarks: string | undefined
  StateOrProvince: string | undefined
  StreetName: string | undefined
  StreetNumber: string | undefined
  StreetSuffix: string | undefined
  LotSizeAcres: number | undefined
  LotSizeArea: number | undefined
  LotSizeSquareFeet: number | undefined
  LotSizeUnits: string | undefined
  BedroomsTotal: number | undefined
  BathroomsTotalInteger: number | undefined
}

const fetchRETSListings = async () => {
  const searchParams = new URLSearchParams()
  searchParams.append('searchType', 'Property')
  searchParams.append('class', 'Property')
  searchParams.append('query', '(City=1550),(MlsStatus=ACT)')
  searchParams.append('format', 'COMPACT')
  searchParams.append(
    'select',
    'ListingKeyNumeric,City,Latitude,ListAgentFullName,ListAgentKeyNumeric,ListOfficeKeyNumeric,ListOfficeName,ListPrice,LivingArea,Longitude,ModificationTimestamp,PhotosChangeTimestamp,PhotosCount,PostalCode,PropertySubType,PropertyType,PublicRemarks,StateOrProvince,StreetName,StreetNumber,StreetSuffix,LotSizeAcres,LotSizeArea,LotSizeSquareFeet,LotSizeUnits,BedroomsTotal,BathroomsTotalInteger',
  )

  const client = new DigestClient(process.env.RETS_USERNAME, process.env.RETS_PASSWORD, {
    algorithm: 'MD5',
  })
  const listings = await client
    .fetch(`https://ntrdd.mlsmatrix.com/rets/Search.ashx?${searchParams.toString()}`)
    .then((res) =>
      res.text().then((text) => {
        const parser = new XMLParser()
        const parsedObj = parser.parse(text) as RETSSearchResponse
        const columns = parsedObj.RETS.COLUMNS.split('\t')
        const data = parsedObj.RETS.DATA
        return data.map((listingString, i) => {
          const listingData = listingString.split('\t')
          const listing: RETSListing = {
            ListingKeyNumeric: listingData[columns.indexOf('ListingKeyNumeric')]
              ? Number(listingData[columns.indexOf('ListingKeyNumeric')])
              : undefined,
            City: listingData[columns.indexOf('City')]
              ? Number(listingData[columns.indexOf('City')])
              : undefined,
            Latitude: listingData[columns.indexOf('Latitude')]
              ? Number(listingData[columns.indexOf('Latitude')])
              : undefined,
            ListAgentFullName: listingData[columns.indexOf('ListAgentFullName')] || undefined,
            ListAgentKeyNumeric: listingData[columns.indexOf('ListAgentKeyNumeric')]
              ? Number(listingData[columns.indexOf('ListAgentKeyNumeric')])
              : undefined,
            ListOfficeKeyNumeric: listingData[columns.indexOf('ListOfficeKeyNumeric')]
              ? Number(listingData[columns.indexOf('ListOfficeKeyNumeric')])
              : undefined,
            ListOfficeName: listingData[columns.indexOf('ListOfficeName')] || undefined,
            ListPrice: listingData[columns.indexOf('ListPrice')]
              ? Number(listingData[columns.indexOf('ListPrice')])
              : undefined,
            LivingArea: listingData[columns.indexOf('LivingArea')]
              ? Number(listingData[columns.indexOf('LivingArea')])
              : undefined,
            Longitude: listingData[columns.indexOf('Longitude')]
              ? Number(listingData[columns.indexOf('Longitude')])
              : undefined,
            ModificationTimestamp:
              listingData[columns.indexOf('ModificationTimestamp')] || undefined,
            PhotosChangeTimestamp:
              listingData[columns.indexOf('PhotosChangeTimestamp')] || undefined,
            PhotosCount: listingData[columns.indexOf('PhotosCount')]
              ? Number(listingData[columns.indexOf('PhotosCount')])
              : undefined,
            PostalCode: listingData[columns.indexOf('PostalCode')] || undefined,
            PropertySubType: listingData[columns.indexOf('PropertySubType')] || undefined,
            PropertyType: listingData[columns.indexOf('PropertyType')] || undefined,
            PublicRemarks: listingData[columns.indexOf('PublicRemarks')] || undefined,
            StateOrProvince: listingData[columns.indexOf('StateOrProvince')] || undefined,
            StreetName: listingData[columns.indexOf('StreetName')] || '',
            StreetNumber: listingData[columns.indexOf('StreetNumber')] || '',
            StreetSuffix: listingData[columns.indexOf('StreetSuffix')] || '',
            LotSizeAcres: listingData[columns.indexOf('LotSizeAcres')]
              ? Number(listingData[columns.indexOf('LotSizeAcres')])
              : undefined,
            LotSizeArea: listingData[columns.indexOf('LotSizeArea')]
              ? Number(listingData[columns.indexOf('LotSizeArea')])
              : undefined,
            LotSizeSquareFeet: listingData[columns.indexOf('LotSizeSquareFeet')]
              ? Number(listingData[columns.indexOf('LotSizeSquareFeet')])
              : undefined,
            LotSizeUnits: listingData[columns.indexOf('LotSizeUnits')] || undefined,
            BedroomsTotal: listingData[columns.indexOf('BedroomsTotal')]
              ? Number(listingData[columns.indexOf('BedroomsTotal')])
              : undefined,
            BathroomsTotalInteger: listingData[columns.indexOf('BathroomsTotalInteger')]
              ? Number(listingData[columns.indexOf('BathroomsTotalInteger')])
              : undefined,
          }
          return listing
        })
      }),
    )
  console.log(`Fetched ${listings.length} listings from RETS`)
  return listings
}

const fetchRETSPhotos = async (listingKeyNumeric: number, photosCount: number | undefined) => {
  if (!photosCount || photosCount === 0) {
    console.log('NO PHOTOS COUNT PROVIDED OR ZERO PHOTOS COUNT')
    return []
  }
  const searchParams = new URLSearchParams()
  searchParams.append('type', 'HighRes')
  searchParams.append('resource', 'Property')
  searchParams.append('location', '1')
  searchParams.append('ID', listingKeyNumeric.toString() + ':')
  const client = new DigestClient(process.env.RETS_USERNAME, process.env.RETS_PASSWORD, {
    algorithm: 'MD5',
  })
  const urls = await Promise.all(
    Array.from(Array(photosCount)).map(async (_, index) => {
      if (index > 0) {
        const url = await client
          .fetch(
            `https://ntrdd.mlsmatrix.com/rets/GetObject.ashx?${searchParams.toString()}${index}`,
          )
          .then((res) =>
            res.text().then((text) => {
              const parser = new XMLParser()
              const parsedObj = parser.parse(text) as RETSObjectResponse
              const url = parsedObj.RETS.split('Location=')[1]
              return url
            }),
          )
        return url || undefined
      }
    }),
  )
  return urls.filter((url) => url !== undefined)
}

function getFirstTwoSentences(text) {
  const sentences = text.split(/(?<=[.?!])\s+/)
  return sentences.length >= 2 ? sentences.slice(0, 2).join(' ') : text
}

export const importResidentialListings = async () => {
  const payload = await getPayload({ config: configPromise })
  const listings = await fetchRETSListings()
  const createdListings = await Promise.all(
    listings.map(async (listing, index) => {
      console.log(index)
      if (listing.ListingKeyNumeric) {
        const matchingListing = await payload.find({
          collection: 'listings',
          limit: 1,
          where: {
            title: {
              equals: `${listing.StreetNumber} ${listing.StreetName}${listing.StreetSuffix && ` ${listing.StreetSuffix}`}, Waco, ${listing.StateOrProvince} ${listing.PostalCode}`,
            },
          },
        })
        if (matchingListing.docs && matchingListing.docs[0]) {
          console.log('LISTING ALREADY EXISTS: ' + matchingListing.docs[0].title)
          if (matchingListing.docs[0].area !== listing.LivingArea) {
            console.log(
              `UPDATING AREA FOR LISTING: ${matchingListing.docs[0].title} to ${listing.LivingArea}`,
            )
            await payload.update({
              collection: 'listings',
              id: matchingListing.docs[0].id,
              data: {
                area: listing.LivingArea,
              },
            })
            console.log(
              `UPDATED AREA FOR LISTING: ${matchingListing.docs[0].title} to ${listing.LivingArea}`,
            )
          }
          return
        }
        const urls = await fetchRETSPhotos(listing.ListingKeyNumeric, listing.PhotosCount)
        if (!urls || urls.length === 0) {
          console.log(
            `NO PHOTOS FOUND FOR LISTING: ${listing.StreetNumber} ${listing.StreetName} ${listing.StreetSuffix}, ${listing.City}, ${listing.StateOrProvince} ${listing.PostalCode}`,
          )
          return
        }
        let formattedDescription: SerializedEditorState | undefined = undefined
        const editorNodes = []
        const editor = createHeadlessEditor({ nodes: editorNodes })
        editor.update(
          () => {
            const dom = new JSDOM(listing.PublicRemarks || '')
            const nodes = $generateNodesFromDOM(editor, dom.window.document)
            $getRoot().select()
            $getSelection()?.insertNodes(nodes)
          },
          { discrete: true },
        )
        formattedDescription = editor.getEditorState().toJSON()
        const agentsResponse = await payload.find({
          collection: 'team-members',
          pagination: false,
        })
        const matchingAgent = agentsResponse?.docs?.find(
          (agent) => agent.title === listing.ListAgentFullName,
        )
        if (matchingAgent) {
          console.log('MATCHING AGENT FOUND')
        } else {
          console.log('NO AGENT FOUND')
        }
        let featuredImageId: number | undefined = undefined
        const filename = `${listing.StreetNumber}_${listing.StreetName?.replaceAll(' ', '_')}_${listing.StreetSuffix}_featured`
        const existingMedia = await payload.find({
          collection: 'media',
          where: {
            filename: {
              like: filename,
            },
          },
        })
        if (existingMedia.docs && existingMedia.docs[0]) {
          // MEDIA EXISTS
          console.log('EXISTING MEDIA FOUND WITH FILENAME: ' + existingMedia.docs[0].filename)
          featuredImageId = existingMedia.docs[0].id
        } else {
          // MEDIA DOES NOT EXIST. CREATE NEW MEDIA
          console.log(`CREATING MEDIA WITH FILENAME: ${filename}`)
          const mediaBlob = await fetch(urls[0] || '/').then((res) =>
            res.blob().then((blob) => blob),
          )
          const formData = new FormData()
          formData.append('file', mediaBlob, filename)

          const createMediaResponse = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media`,
            {
              method: 'POST',
              body: formData,
              credentials: 'include',
            },
          )
            .then((response) => response.json().then((json) => json))
            .catch((error) => {
              console.error('Error creating Media:', error)
              return undefined
            })
          if (!createMediaResponse || createMediaResponse?.errors) {
            console.error(createMediaResponse)
            console.error('Error creating Media:', createMediaResponse?.err.message)
            return
          } else {
            console.log(
              `SUCCESSFULLY CREATED MEDIA WITH FILENAME: ${createMediaResponse.doc.filename}`,
            )
            if (createMediaResponse?.doc.id) {
              featuredImageId = createMediaResponse.doc.id
            }
          }
        }

        return await payload.create({
          collection: 'listings',
          data: {
            title: `${listing.StreetNumber} ${listing.StreetName}${listing.StreetSuffix && ` ${listing.StreetSuffix}`}, Waco, ${listing.StateOrProvince} ${listing.PostalCode}`,
            streetAddress: `${listing.StreetNumber} ${listing.StreetName} ${listing.StreetSuffix}`,
            city: 'Waco',
            state: listing.StateOrProvince || '',
            zipCode: listing.PostalCode || '',
            category: ['RESI', 'RINC', 'RLSE'].includes(listing?.PropertyType || '')
              ? 'residential'
              : 'commercial',
            price: listing.ListPrice,
            area: listing.LivingArea,
            acreage: listing.LotSizeAcres,
            // Default to Waco coordinates if not provided
            coordinates: [listing.Longitude || -97.2753695, listing.Latitude || 31.5532499],
            bedrooms: listing.BedroomsTotal,
            bathrooms: listing.BathroomsTotalInteger,
            featuredImage: featuredImageId || 0,
            availability: 'available',
            transactionType: listing.PropertyType === 'RLSE' ? 'for-lease' : 'for-sale',
            // @ts-ignore
            description: formattedDescription,
            ...(listing.PropertyType === 'RLSE'
              ? {
                  textAfterPrice: '/MO',
                }
              : {}),
            ...(matchingAgent
              ? {
                  agents: [matchingAgent.id],
                }
              : {}),
            meta: {
              title: `${listing.StreetNumber} ${listing.StreetName} ${listing.StreetSuffix}, ${listing.City}, ${listing.StateOrProvince} ${listing.PostalCode} | Residential Properties | Onward Real Estate Team`,
              image: featuredImageId,
              description: getFirstTwoSentences(listing.PublicRemarks),
            },
            MLS: {
              ListingKeyNumeric: listing.ListingKeyNumeric,
              MlsStatus: 'Active',
              ListAgentKeyNumeric: listing.ListAgentKeyNumeric,
              ListAgentFullName: listing.ListAgentFullName,
              ListOfficeKeyNumeric: listing.ListOfficeKeyNumeric,
              ListOfficeName: listing.ListOfficeName,
              ModificationTimestamp: listing.ModificationTimestamp,
              PhotosChangeTimestamp: listing.PhotosChangeTimestamp,
              PhotosCount: listing.PhotosCount,
              PropertySubType: listing.PropertySubType,
              FeaturedImageUrl: urls[0] || undefined,
              ImageGalleryUrls: urls.slice(1).map((url) => ({ url: url })),
            },
            _status: 'published',
          },
        })
      }
      return undefined
    }),
  )
  return createdListings.filter((listing) => listing)
}
