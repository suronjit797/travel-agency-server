import { Response } from 'express'
import { IResponsePayload } from '../shared/globalInterfaces'

const sendResponse = <T>(res: Response, payload: IResponsePayload<T>) => {
  return res.status(payload.statusCode).send({
    success: payload.success,
    message: payload?.message,
    meta: payload?.meta,
    data: payload.data,
  })
}

export default sendResponse
