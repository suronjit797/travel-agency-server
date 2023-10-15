import { IResponsePayload } from '../../../shared/globalInterfaces'
import { IUser } from './user.interface'
import UserModel from './user.model'
import httpStatus from 'http-status'


const getAllUsersService = async (): Promise<IResponsePayload<IUser[]>> => {
  const data = await UserModel.find()

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved  successfully',
    data,
  }
}

const getUserService = async (userId: string): Promise<IResponsePayload<IUser>> => {
  const data = await UserModel.findById(userId)

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved  successfully',
    data,
  }
}

const updateUserService = async (userId: string, body: Partial<IUser>): Promise<IResponsePayload<IUser>> => {
  const data = await UserModel.findByIdAndUpdate(userId, body, { new: true })

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data,
  }
}

const removeUserService = async (userId: string): Promise<IResponsePayload<IUser>> => {
  const data = await UserModel.findByIdAndDelete(userId)

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data,
  }
}

const userService = {
  getAllUsersService,
  getUserService,
  updateUserService,
  removeUserService,
}

export default userService
