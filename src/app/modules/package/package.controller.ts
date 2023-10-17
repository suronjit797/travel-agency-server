import { RequestHandler } from 'express'
import * as packageService from './package.service'
import sendResponse from '../../../helper/sendResponse'

export const create: RequestHandler = async (req, res, next) => {
  try {
    const data = await packageService.createService(req.body)
    return sendResponse(res, data)
  } catch (error) {
    return next(error)
  }
}

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const data = await packageService.getAllService()
    return sendResponse(res, data)
  } catch (error) {
    return next(error)
  }
}

export const getSingle: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await packageService.getSingleService(id)
    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}

export const updateOne: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await packageService.updateService(id, req.body)
    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}

export const remove: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await packageService.removeService(id)
    return sendResponse(res, data)
  } catch (error) {
    next(error)
  }
}
