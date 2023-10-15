import { Request } from 'express'
import { Document } from 'mongoose'
import { IPartialSearchableFields } from '../shared/globalInterfaces'
import { pic } from './paginationHelper'

const filterHelper = (
  req: Request,
  schemaName: Document,
  partialSearching: IPartialSearchableFields
): { [key: string]: object } => {
  const schemaKeys = Object.keys(schemaName.schema.obj)
  const filter = pic(req.query, ['query', 'minPrice', 'maxPrice', ...schemaKeys])
  const { query, minPrice, maxPrice, ...filterData } = filter
  const andCondition = []

  if (query && partialSearching.length > 0) {
    andCondition.push({
      $or: partialSearching.map((field) => ({
        [field]: {
          $regex: query,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      $and: Object.entries(filterData).map(([key, value]) => ({ [key]: value })),
    })
  }

  //   min price
  if (minPrice) {
    andCondition.push({
      price: { $gte: minPrice },
    })
  }
  //   max price
  if (maxPrice) {
    andCondition.push({
      price: { $lte: maxPrice },
    })
  }

  return andCondition.length > 0 ? { $and: andCondition } : {}
}

export default filterHelper
