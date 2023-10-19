import { RequestHandler } from "express";
import ApiError from "../../shared/ApiError";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "../../config";
import { CustomJwtPayload } from "../../shared/globalInterfaces";
import prisma from "../../shared/prisma";
import { userRole } from "../../shared/globalConstant";

export const auth =
  (...roles: string[]): RequestHandler =>
  async (req, res, next) => {
    const roleNames = [...roles, userRole.superAdmin];
    try {
      const token = req.headers.authorization;
      if (!token) throw new ApiError(httpStatus.UNAUTHORIZED, "you are not authorized");

      const decoded = jwt.verify(token, config.token.access_token_secret) as CustomJwtPayload;

      const isExist = await prisma.user.findUnique({ where: { id: decoded.userId } });

      if (!isExist) {
        throw new ApiError(httpStatus.BAD_REQUEST, `Invalid user`);
      }

      if (!roleNames.includes(isExist.role))
        throw new ApiError(httpStatus.FORBIDDEN, `Unauthorized Access`);

      req.user = decoded;
      next();
    } catch (error) {
      next(error);
    }
  };
