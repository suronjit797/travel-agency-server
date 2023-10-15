import { RequestHandler } from 'express'
import ApiError from '../../shared/ApiError'
import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import config from '../../config'
import { CustomJwtPayload } from '../../shared/globalInterfaces'
import UserModel from '../modules/user/user.model'

export const auth =
  (...roles: string[]): RequestHandler =>
  async (req, res, next) => {
    const roleNames = [...roles, 'superAdmin']
    try {
      const token = req.headers.authorization
      if (!token) throw new ApiError(httpStatus.UNAUTHORIZED, 'you are not authorized')

      const decoded = jwt.verify(token, config.token.access_token_secret) as CustomJwtPayload

      const isExist = await UserModel.findById(decoded.userId)

      if (!isExist) {
        throw new ApiError(httpStatus.BAD_REQUEST, `Invalid user`)
      }

      if (!isExist.role || !roleNames.includes(isExist.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, `${isExist.role} is not authorized`)
      }

      req.user = decoded
      next()
    } catch (error) {
      next(error)
    }
  }
