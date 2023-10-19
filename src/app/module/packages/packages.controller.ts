import { RequestHandler } from "express";
import * as service from "./packages.service";
import sendRes from "../../../shared/sendRes";
import httpStatus from "http-status";
import config from "../../../config";
import filterHelper from "../../../helper/filterHelper";
import { paginationHelper } from "../../../helper/paginationHelper";

export const createPackage: RequestHandler = async (req, res, next) => {
  try {
    const data = await service.createPackageService(req.body);

    sendRes(res, httpStatus.CREATED, {
      success: true,
      message: "Package Created Successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllPackage: RequestHandler = async (req, res, next) => {
  try {
    const filter = filterHelper(req, ["name", "email", "address", "phoneNumber", "role"], []);
    const pagination = paginationHelper(req.query);

    const data = await service.getAllPackageService(filter, pagination);

    sendRes(res, httpStatus.OK, {
      success: true,
      message: "Package fetched Successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getSinglePackage: RequestHandler = async (req, res, next) => {
  try {
    const data = await service.getSinglePackageService(req.params.id);

    sendRes(res, httpStatus.OK, {
      success: true,
      message: "Package fetched Successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePackage: RequestHandler = async (req, res, next) => {
  try {

    const data = await service.updatePackageService(req.params.id, req.body);

    sendRes(res, httpStatus.OK, {
      success: true,
      message: "Package Updated Successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const removePackage: RequestHandler = async (req, res, next) => {
  try {
    const data = await service.removePackageService(req.params.id);

    sendRes(res, httpStatus.OK, {
      success: true,
      message: "Package Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

