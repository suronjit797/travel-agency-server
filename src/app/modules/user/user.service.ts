import { IResponsePayload } from '../../../shared/globalInterfaces'
import { IUser } from './user.interface'
import UserModel from './user.model'
import httpStatus from 'http-status'

export const getAllService = async (): Promise<IResponsePayload<IUser[]>> => {
  const data = await UserModel.find()

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved  successfully',
    data,
  }
}

export const getSingleService = async (userId: string): Promise<IResponsePayload<IUser>> => {
  const data = await UserModel.findById(userId)

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved  successfully',
    data,
  }
}

export const updateService = async (userId: string, body: Partial<IUser>): Promise<IResponsePayload<IUser>> => {
  const data = await UserModel.findByIdAndUpdate(userId, body, { new: true })

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data,
  }
}

export const removeService = async (userId: string): Promise<IResponsePayload<IUser>> => {
  const data = await UserModel.findByIdAndDelete(userId)

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data,
  }
}
