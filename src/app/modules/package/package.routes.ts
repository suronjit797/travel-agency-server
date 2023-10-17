import express from 'express'
import * as packageController from './package.controller'
import globalValidator from '../../middleware/globalValidation'
import { packageUpdateValidatorZod } from './package.validator'
import { auth } from '../../middleware/auth'
import { userRole } from '../../../shared/globalConstant'

const packageRoute = express.Router()

packageRoute.get('/', auth(userRole.admin), packageController.getAll)
packageRoute.post(
  '/',
  auth(userRole.admin, userRole.user),
  globalValidator(packageUpdateValidatorZod),
  packageController.create
)
packageRoute.get('/:id', auth(userRole.admin, userRole.user), packageController.getSingle)
packageRoute.patch(
  '/:id',
  globalValidator(packageUpdateValidatorZod),
  auth(userRole.admin),
  packageController.updateOne
)
packageRoute.delete('/:id', auth(userRole.admin), packageController.remove)

export default packageRoute
