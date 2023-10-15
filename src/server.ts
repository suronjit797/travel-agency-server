import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { Server } from 'http'

let server: Server
process.on('uncaughtException', (error) => {
  console.log('uncaughtException: ' + error.message)
  process.exit(1)
})

const bootFunction = async () => {
  try {
    await mongoose.connect(config.DB_URI as string)
    console.log('🛢 Database connection established...')
    server = app.listen(config.PORT, () => {
      console.log(`Server is listening on ${config.PORT}...`)
      console.log(config.DB_URI as string)
    })
  } catch (error) {
    console.log('Database connection failed')
  }

  process.on('unhandledRejection', (error) => {
    if (server) {
      server.close(() => {
        console.log('unhandledRejection: ' + error)
        process.exit(1)
      })
    }
  })
}

process.on('SIGALRM', () => {
  console.log('SIGTERM is received')
  if (server) {
    server.close()
  }
})

bootFunction()
