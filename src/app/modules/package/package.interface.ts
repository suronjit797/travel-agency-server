import { Model } from 'mongoose'

export type IPackage = {
  _id?: string
  title: string
  country: string
  destination: string
  duration: string
  date: string
  amount: number
  type: 'luxury' | 'budget'
  lastBookingDate: string
  image: string
}

export type IPackageModel = Model<IPackage, Record<string, unknown>>
