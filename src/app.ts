import express, { Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import sendRes from "./shared/sendRes";
import httpStatus from "http-status";
import router from "./app/module/routes";
import cookieParser from "cookie-parser";
import { IErrorPayload } from "./shared/globalInterfaces";
import globalError from "./app/middleware/globalError";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(cookieParser());


// home route
app.get("/", (req: Request, res: Response) =>
  sendRes(res, httpStatus.OK, { success: true, message: "Welcome to server" })
);

// main routing
app.use("/api/v1", router);


//global error handler
app.use(globalError);

// routes not found
app.use((req: Request, res: Response) => {
  const errorPayload: IErrorPayload = {
    success: false,
    message: "Route not found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "Route not found",
      },
    ],
  };
  return res.status(404).send(errorPayload);
});

export default app;

