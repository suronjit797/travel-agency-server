import { Response } from "express";
import { IMeta } from "./globalInterfaces";

type TPayload<T> = {
  success: boolean;
  message: string;
  data?: T;
  meta?: IMeta;
};

const sendRes = <T>(res: Response, status: number, payload: TPayload<T>) => {
  const { success, message, data, meta } = payload;
  const response: TPayload<T> = { success, message, data };
  if (meta) {
    response.meta = meta;
  }

  return res.status(status).send(response);
};

export default sendRes;
