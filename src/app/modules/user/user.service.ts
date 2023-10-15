import { IResponsePayload } from '../../../shared/globalInterfaces'
import { IUser } from './user.interface'
import UserModel from './user.model'
import httpStatus from 'http-status'
import bcrypt from 'bcrypt'
import config from '../../../config'

export const signUpService = async (payload: IUser): Promise<IResponsePayload<IUser[]>> => {
  const hash = await bcrypt.hash(payload.password, config.SAULT_ROUND)

  const body = { ...payload, password: hash }
  await UserModel.create(body)

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created  successfully',
  }
}

export const getAllService = async (): Promise<IResponsePayload<IUser[]>> => {
  const data = await UserModel.find()

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved  successfully',
    data,
  }
}

export const getSingleService = async (id: string): Promise<IResponsePayload<IUser>> => {
  const data = await UserModel.findById(id)

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved  successfully',
    data,
  }
}

export const updateService = async (id: string, body: Partial<IUser>): Promise<IResponsePayload<IUser>> => {
  const data = await UserModel.findByIdAndUpdate(id, body, { new: true })

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data,
  }
}

export const removeService = async (id: string): Promise<IResponsePayload<IUser>> => {
  const data = await UserModel.findByIdAndDelete(id)

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data,
  }
}
