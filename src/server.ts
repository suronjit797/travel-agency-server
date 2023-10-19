
import app from "./app";
import config from "./config";
import { errorLog, successLog } from "./shared/logger";
import { Server } from "http";

let server: Server;

process.on("uncaughtException", (error) => {
  errorLog("uncaughtException: " + error.message);
  process.exit(1);
});

const bootFunction = async () => {
  try {
    server = app.listen(config.port, () => {
      successLog("Server is listening on port: " + config.port);
      successLog(`http://localhost:` + config.port);
    });
  } catch (error) {
    errorLog(error as string);
  }

  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        errorLog("unhandledRejection");
        errorLog(error as string);
        process.exit(1);
      });
    }
  });
};

bootFunction();

process.on("SIGALRM", () => {
  errorLog("SIGTERM is received");
  if (server) {
    server.close();
  }
});

