import { RequestHandler } from 'express'
import * as userService from './user.service'
import sendResponse from '../../../helper/sendResponse'
import ApiError from '../../../shared/ApiError'
import httpStatus from 'http-status'
import config from '../../../config'

export const signUp: RequestHandler = async (req, res, next) => {
  try {
    const data = await userService.signUpService(req.body)
    return sendResponse(res, data)
  } catch (error) {
    return next(error)
  }
}

export const login: RequestHandler = async (req, res, next) => {
  try {
    const payload = await userService.loginService(req.body)
    if (!payload.data) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal server error')
    const { accessToken, refreshToken } = payload.data

    const cookieOptions = {
      secure: config.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 365 * 24 * 60 * 60 * 1000,
    }

    res.cookie('refreshToken', refreshToken, cookieOptions)

    const data = { ...payload, data: { accessToken } }

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
