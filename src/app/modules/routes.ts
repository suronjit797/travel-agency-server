import express from 'express'
import userRoute from './user/user.routes'
import packageRoute from './package/package.routes'

const router = express.Router()

// routers
router.use('/users', userRoute)
router.use('/packages', packageRoute)

export default router
