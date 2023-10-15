import express from 'express'
import * as userController from './user.controller'
import globalValidator from '../../middleware/globalValidation'
import { userCreateValidatorZod, userLoginValidatorZod, userUpdateValidatorZod } from './user.validator'
import { auth } from '../../middleware/auth'
import { userRole } from '../../../shared/globalConstant'

const userRoute = express.Router()

// auth
userRoute.post('/sign-up', globalValidator(userCreateValidatorZod), userController.signUp)
userRoute.post('/login', globalValidator(userLoginValidatorZod), userController.login)

// user
userRoute.get('/', auth(userRole.admin), userController.getAll)
userRoute.get('/:id', auth(userRole.admin), userController.getSingle)
userRoute.patch('/:id', globalValidator(userUpdateValidatorZod), auth(userRole.admin), userController.updateOne)
userRoute.delete('/:id', auth(userRole.admin), userController.remove)

export default userRoute
