import DigestClient from 'digest-fetch'
import { XMLParser } from 'fast-xml-parser'
import { RETSListing, RETSSearchResponse } from '../types/types'
import { formatAddress } from './formatAddress'

const RETS_COUNTIES = {
  bell: 14,
  bosque: 18,
  coryell: 50,
  falls: 73,
  hill: 109,
  limestone: 147,
  mclennan: 161,
}

export const fetchRETSListings = async (limit: string, offset: string) => {
  const searchParams = new URLSearchParams()
  searchParams.append('searchType', 'Property')
  searchParams.append('class', 'Property')
  searchParams.append(
    'query',
    `(CountyOrParish=${Object.values(RETS_COUNTIES).join(',')}),(MlsStatus=ACT)`,
  )
  searchParams.append('format', 'COMPACT-DECODED')
  searchParams.append('limit', String(limit))
  searchParams.append('offset', String(offset))
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
        if (!parsedObj.RETS.COLUMNS) {
          console.log('ERROR: Columns not found')
          return
        }

        const columns = parsedObj.RETS.COLUMNS.split('\t')
        const data = parsedObj.RETS.DATA
        return data.map((listingString, i) => {
          const listingData = listingString.split('\t')
          const listing: RETSListing = {
            ListingKeyNumeric: listingData[columns.indexOf('ListingKeyNumeric')]
              ? Number(listingData[columns.indexOf('ListingKeyNumeric')])
              : undefined,
            City: listingData[columns.indexOf('City')]
              ? listingData[columns.indexOf('City')]
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
  return listings
}
