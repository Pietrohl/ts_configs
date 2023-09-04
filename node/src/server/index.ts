import { config } from "../config";
import { configureContainer } from "../container";
import { logger } from "../utils/logger";
import { createExpressServer } from "./express-server";
import { createFastifyServer } from "./fastify-server";
import { createKoaServer } from "./koa-server";

export interface Server {
  listen(port: number, host: string, callback: () => void): void;
}

const createServer = () => {
  logger.info("bootstraping server...");

  let app;

  switch (config.SERVER_TYPE) {
    case "fastify":
      return createFastifyServer(configureContainer(config.SERVER_TYPE));
    case "koa":
      app = createKoaServer(configureContainer(config.SERVER_TYPE));
      break;
    default:
      app = createExpressServer(configureContainer("express"));
  }

  return app;
};

export { createServer };
