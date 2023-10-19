import { RequestHandler } from "express";
import * as service from "./users.service";
import sendRes from "../../../shared/sendRes";
import httpStatus from "http-status";
import config from "../../../config";
import { userRole } from "../../../shared/globalConstant";
import filterHelper from "../../../helper/filterHelper";
import { paginationHelper } from "../../../helper/paginationHelper";

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const data = await service.createUserService(req.body);

    sendRes(res, httpStatus.CREATED, {
      success: true,
      message: "User Created Successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const loginController: RequestHandler = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = await service.loginService(req.body);

    const cookieOptions = {
      secure: config.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 365 * 24 * 60 * 60 * 1000,
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);

    return res.status(httpStatus.OK).send({
      success: true,
      statusCode: httpStatus.OK,
      message: "User login successfully",
      token: accessToken,
    });

    // return sendRes(res, httpStatus.OK, {
    //   success: true,
    //   message: "User Login Successfully",
    //   data: { token: accessToken },
    // });
  } catch (error) {
    return next(error);
  }
};

export const getAllUser: RequestHandler = async (req, res, next) => {
  try {
    const filter = filterHelper(req, ["name", "email", "address", "phoneNumber", "role"], []);
    const pagination = paginationHelper(req.query);

    const data = await service.getAllUserService(filter, pagination);

    sendRes(res, httpStatus.OK, {
      success: true,
      message: "Users fetched Successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleUser: RequestHandler = async (req, res, next) => {
  try {
    const data = await service.getSingleUserService(req.params.id);

    sendRes(res, httpStatus.OK, {
      success: true,
      message: "User fetched Successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    if (!userRole.superAdmin) {
      delete req.body.role;
    }

    const data = await service.updateUserService(req.params.id, req.body);

    sendRes(res, httpStatus.OK, {
      success: true,
      message: "User Updated Successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const removeUser: RequestHandler = async (req, res, next) => {
  try {
    const data = await service.removeUserService(req.params.id);

    sendRes(res, httpStatus.OK, {
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user;
    const data = await service.getSingleUserService(user.userId);

    sendRes(res, httpStatus.OK, {
      success: true,
      message: "Profile get Successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};
