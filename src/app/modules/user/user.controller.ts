import { RequestHandler } from 'express'
import * as userService from './user.service'
import sendResponse from '../../../helper/sendResponse'

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const data = await userService.getAllService()
    return sendResponse(res, data)
  } catch (error) {
    return next(error)
  }
}

export const getSingle: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params
    const data = await userService.getSingleService(userId)
    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}

export const updateOne: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params
    const data = await userService.updateService(userId, req.body)
    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}

export const remove: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params
    const data = await userService.removeService(userId)
    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}
