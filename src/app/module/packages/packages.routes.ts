import express from "express";
import * as controller from "./packages.controller";
import { auth } from "../../middleware/auth";
import { userRole } from "../../../shared/globalConstant";
import globalValidator from "../../middleware/globalValidation";
import { userUpdateValidatorZod } from "./packages.validator";

const { admin, user } = userRole;

const packagesRouter = express.Router();

packagesRouter.get("/", auth(admin, user), controller.getAllPackage);
packagesRouter.get("/:id", auth(admin, user), controller.getSinglePackage);
packagesRouter.patch(
  "/:id",
  auth(admin),
  globalValidator(userUpdateValidatorZod),
  controller.updatePackage
);
packagesRouter.delete("/:id", auth(admin), controller.removePackage);

export default packagesRouter;
