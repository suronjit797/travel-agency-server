import { IResponsePayload } from '../../../shared/globalInterfaces'
import { IUser } from './user.interface'
import UserModel from './user.model'
import httpStatus from 'http-status'
import bcrypt from 'bcrypt'
import config from '../../../config'
import ApiError from '../../../shared/ApiError'
import jwt from 'jsonwebtoken'

export const signUpService = async (payload: IUser): Promise<IResponsePayload<IUser>> => {
  const isExist = await UserModel.findOne({ email: payload.email })
  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already exist')
  }

  const hash = await bcrypt.hash(payload.password, config.SAULT_ROUND)

  const body = { ...payload, password: hash }
  await UserModel.create(body)

  return {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created  successfully',
  }
}

export const loginService = async (payload: {
  password: string
  email: string
}): Promise<IResponsePayload<{ accessToken: string; refreshToken: string }>> => {
  const user = await UserModel.findOne({ email: payload.email }).select({ password: 1 })

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User and password not matched')
  }
  const { password, _id } = user

  const isMatched = await bcrypt.compare(payload.password, password)
  if (!isMatched) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User and password not matched')
  }

  const accessToken = jwt.sign({ userId: _id }, config.token.access_token_secret, {
    expiresIn: config.token.access_token_time,
  })
  const refreshToken = jwt.sign({ userId: _id }, config.token.refresh_token_secret, {
    expiresIn: config.token.refresh_token_time,
  })

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login  successfully',
    data: { accessToken, refreshToken },
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
