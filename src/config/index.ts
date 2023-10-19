import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT || 5000,
  sault_round: Number(process.env.SAULT_ROUND) || 6,
  NODE_ENV: process.env.NODE_ENV || "development",
  token: {
    refresh_token_time: process.env.REFRESH_TOKEN_TIME as string,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET as string,
    access_token_time: process.env.ACCESS_TOKEN_TIME as string,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET as string,
  },
};
