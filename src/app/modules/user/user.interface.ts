import { Model } from 'mongoose'

export type IUser = {
  address: string
  budget?: number
  income?: number
  name: {
    firstName: string
    lastName: string
  }
  password: string
  phoneNumber: string
  role: 'seller' | 'buyer'
}

export type IUserModel = Model<IUser, Record<string, unknown>>
