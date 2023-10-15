import { RequestHandler } from 'express'
import * as userService from './user.service'
import sendResponse from '../../../helper/sendResponse'

export const signUp: RequestHandler = async (req, res, next) => {
  try {
    const data = await userService.signUpService(req.body)
    return sendResponse(res, data)
  } catch (error) {
    return next(error)
  }
}
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
    const { id } = req.params
    const data = await userService.getSingleService(id)
    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}

export const updateOne: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await userService.updateService(id, req.body)
    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}

export const remove: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await userService.removeService(id)
    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}
