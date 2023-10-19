import express from "express";
import * as controller from "./users.controller";
import { auth } from "../../middleware/auth";
import { userRole } from "../../../shared/globalConstant";
import globalValidator from "../../middleware/globalValidation";
import {
  userCreateValidatorZod,
  userLoginValidatorZod,
  userUpdateValidatorZod,
} from "./user.validator";

const userRouter = express.Router();

userRouter.post("/sign-up", globalValidator(userCreateValidatorZod), controller.createUser);
userRouter.post("/login", globalValidator(userLoginValidatorZod), controller.loginController);
userRouter.get("/all", auth(userRole.admin), controller.getAllUser);
userRouter.get("/:id", auth(userRole.admin), controller.getSingleUser);
userRouter.patch(
  "/:id",
  auth(userRole.admin),
  globalValidator(userUpdateValidatorZod),
  controller.updateUser
);
userRouter.delete("/:id", auth(userRole.admin), controller.removeUser);

export default userRouter;
