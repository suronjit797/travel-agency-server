import dotenv from 'dotenv'
import { Secret } from 'jsonwebtoken'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI,
  NODE_ENV: process.env.NODE_ENV,
  SAULT_ROUND: Number(process.env.SAULT_ROUND) || 12,
  token: {
    access_token_secret: process.env.ACCESS_TOKEN_SECRET as Secret,
    access_token_time: process.env.ACCESS_TOKEN_TIME,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET as Secret,
    refresh_token_time: process.env.REFRESH_TOKEN_TIME,
  },
}
