import { ErrorRequestHandler } from "express";
import { IErrorMessages, IErrorPayload } from "../../shared/globalInterfaces";
import config from "../../config";
import zodErrorHandler from "../errorHandler/zodErrorHandler";
import { errorLog } from "../../shared/logger";
import { Prisma } from "@prisma/client";
import handleValidationError from "../errorHandler/handleValidationError";
import handleClientError from "../errorHandler/handleClientError";
import { ZodError } from "zod";

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const globalError: ErrorRequestHandler = (error, req, res, next) => {
  let status: number = error.statusCode || 500;
  let message: string = error.message || "Internal server error occurred";
  let errorMessages: IErrorMessages[] = [
    {
      path: "",
      message: error.message || "Server error occurred",
    },
  ];

  if (error instanceof ZodError) {
    const result = zodErrorHandler(error);
    status = result.statusCode || 500;
    message = result.message;
    errorMessages = result.errorMessages;
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    const simplifiedError = handleValidationError(error);
    status = simplifiedError.statusCode || 400;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const simplifiedError = handleClientError(error);
    status = simplifiedError.statusCode || 400;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }

  const errorPayload: IErrorPayload = {
    success: false,
    message,
    errorMessages,
    stack: config.NODE_ENV !== "production" && error?.stack,
  };

  errorLog(` [${status}]: ${message}`);

  return res.status(status).send(errorPayload);
};

export default globalError;
