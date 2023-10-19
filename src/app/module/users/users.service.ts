import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { userSelect } from "../../../shared/globalConstant";
import ApiError from "../../../shared/ApiError";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../../config";
import { IPagination } from "../../../shared/globalInterfaces";

export const createUserService = async (data: User): Promise<Partial<User> | null> => {
  const isExist = await prisma.user.findUnique({ where: { email: data.email } });
  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User already exists");
  }
  const password = await bcrypt.hash(data.password, bcrypt.genSaltSync(config.sault_round));
  const userData = { ...data, password };

  const newUser = await prisma.user.create({ data: userData });
  const result: Partial<User> = { ...newUser };
  delete result.password;
  return result;
};

export const loginService = async (payload: User) => {
  // existence of user
  const isExist = await prisma.user.findUnique({ where: { email: payload.email } });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User and Password dose not matched");
  }
  const { id, password } = isExist;

  // if no password
  if (!password) throw new ApiError(httpStatus.FORBIDDEN, "Server error occurred");
  if (!payload.password) throw new ApiError(httpStatus.FORBIDDEN, "Password is required");

  // verify
  const isVerified = await bcrypt.compare(payload.password, password);

  if (!isVerified) throw new ApiError(httpStatus.BAD_REQUEST, "User and Password dose not matched");

  const accessToken = jwt.sign({ userId: id }, config.token.access_token_secret, {
    expiresIn: config.token.access_token_time,
  });
  const refreshToken = jwt.sign({ userId: id }, config.token.refresh_token_secret, {
    expiresIn: config.token.refresh_token_time,
  });

  return { accessToken, refreshToken };
};

export const getAllUserService = async (
  filter: Object,
  pagination: IPagination
): Promise<Partial<User>[]> => {
  const { size, skip, sortCondition } = pagination;

  const result = await prisma.user.findMany({
    where: filter,
    take: size,
    skip,
    orderBy: sortCondition,
    select: userSelect,
  });
  return result;
};

export const getSingleUserService = async (id: string): Promise<Partial<User> | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    select: userSelect,
  });
  return result;
};

export const updateUserService = async (
  id: string,
  data: Partial<User>
): Promise<Partial<User> | null> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data,
    select: userSelect,
  });
  return result;
};

export const removeUserService = async (id: string): Promise<void> => {
  await prisma.user.delete({
    where: {
      id,
    },
  });
};
