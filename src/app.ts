import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import httpStatus from 'http-status'
import globalError from './app/middleware/globalError'
import { IErrorPayload } from './shared/globalInterfaces'
import router from './app/modules/routes'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('tiny'))

// router
app.use('/api/v1', router)

app.get('/', async (req: Request, res: Response) => {
  res.status(httpStatus.OK).send('Welcome to Travel service')
})

app.use(globalError)

// handle not found route

app.use((req: Request, res: Response) => {
  const errorPayload: IErrorPayload = {
    success: false,
    message: 'Route not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Route not found',
      },
    ],
  }
  return res.status(httpStatus.NOT_FOUND).send(errorPayload)
})

export default app
