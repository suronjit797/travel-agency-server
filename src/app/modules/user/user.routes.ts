import express from 'express'
import * as userController from './user.controller'
import globalValidator from '../../middleware/globalValidation'
import { userCreateValidatorZod, userUpdateValidatorZod } from './user.validator'

const userRoute = express.Router()

// auth
userRoute.get('/sign-up', globalValidator(userCreateValidatorZod), userController.signUp)

// user
userRoute.get('/', userController.getAll)

userRoute.get('/:id', userController.getSingle)
userRoute.patch('/:id', globalValidator(userUpdateValidatorZod), userController.updateOne)
userRoute.delete('/:id', userController.remove)

export default userRoute
