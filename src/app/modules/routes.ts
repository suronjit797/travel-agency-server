import express from 'express'
import userRoute from './user/user.routes'


const router = express.Router()

// routers
router.use('/users', userRoute)


export default router
