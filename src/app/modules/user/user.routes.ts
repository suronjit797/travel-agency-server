import express from 'express'
import * as userController from './user.controller'
import globalValidator from '../../middleware/globalValidation'
import userUpdateValidatorZod from './user.validator'

const userRoute = express.Router()

userRoute.get('/', userController.getAll)

userRoute.get('/:userId', userController.getSingle)
userRoute.patch('/:userId', globalValidator(userUpdateValidatorZod), userController.updateOne)
userRoute.delete('/:userId', userController.remove)

export default userRoute
