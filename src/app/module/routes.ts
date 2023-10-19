import express from "express";
import userRouter from "./users/users.routes";

const router = express.Router();

router.use("/users", userRouter);


export default router;
