import { Model } from 'mongoose'

export type IUser = {
  name: {
    firstName: string
    lastName: string
  }
  email: string
  password: string
  address: string
  phoneNumber: string
  role: 'user' | 'admin' | 'superAdmin'
}

export type IUserModel = Model<IUser, Record<string, unknown>>
