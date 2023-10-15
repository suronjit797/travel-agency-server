import { RequestHandler } from 'express'
import userService from './user.service'
import { IResponsePayload } from '../../../shared/globalInterfaces'
import { IUser } from './user.interface'
import sendResponse from '../../../helper/sendResponse'

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const data = await userService.getAllUsersService()

    return sendResponse(res, data)

  } catch (error) {
    return next(error)
  }
}

export const getSingle: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params
    const data = await userService.getUserService(userId)

    const payload: IResponsePayload<IUser> = {
      statusCode: data.statusCode,
      success: data.success,
      message: data.message,
      data: data.data,
    }

    return res.status(payload.statusCode).send(payload)
  } catch (error) {
    next(error)
  }
}

export const updateOne: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params
    const data = await userService.updateUserService(userId, req.body)

    const payload: IResponsePayload<IUser> = {
      statusCode: data.statusCode,
      success: data.success,
      message: data.message,
      data: data.data,
    }

    return res.status(payload.statusCode).send(payload)
  } catch (error) {
    next(error)
  }
}

export const remove: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params
    const data = await userService.removeUserService(userId)

    const payload: IResponsePayload<IUser> = {
      statusCode: data.statusCode,
      success: data.success,
      message: data.message,
      data: data.data,
    }

    return res.status(payload.statusCode).send(payload)
  } catch (error) {
    next(error)
  }
}


