import { config } from "../config";
import { configureContainer } from "../container";
import { logger } from "../utils/logger";
import { createExpressServer } from "./express-server";
import { createFastifyServer } from "./fastify-server";
import { createKoaServer } from "./koa-server";

export interface Server {
  listen(port: number, host: string, callback: () => void): void;
}

const exitHandler = () => {
  logger.info("shutting down server...");
  logger.info("closing DB connections...");
  logger.info("shutdown complete...");
};

const createServer = () => {
  logger.info("bootstraping server...");

  switch (config.SERVER_TYPE) {
    // case "fastify":
    //   return createFastifyServer(container);
    case "koa":
      return createKoaServer(configureContainer(config.SERVER_TYPE));

    default:
      return createExpressServer(configureContainer("express"));
  }

  // Handle Server Exit
  process.once("SIGINT", exitHandler);
  process.once("SIGUSR2", exitHandler);
};

export { createServer };
