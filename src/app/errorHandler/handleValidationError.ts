import { Prisma } from '@prisma/client';
import { IErrorPayload } from '../../shared/globalInterfaces';

const handleValidationError = (
  error: Prisma.PrismaClientValidationError
): IErrorPayload => {
  const errors = [{
    path: "",
    message: error.message,
  }]
  const statusCode = 400;
  return {
    success: false,
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleValidationError;
