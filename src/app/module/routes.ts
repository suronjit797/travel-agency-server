import express from "express";
import userRouter from "./users/users.routes";
import packagesRouter from "./packages/packages.routes";

const router = express.Router();

router.use("/users", userRouter);
router.use("/package", packagesRouter);


export default router;
