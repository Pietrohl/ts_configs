import type { AwilixContainer } from "awilix";
import bodyParser from "body-parser";
import cors from "cors";
import e from "express";
import helmet from "helmet";
import { configureContainer, type AppContainer } from "../container";
import { logger } from "../utils/logger";
import { morganMiddleware } from "../middleware/httpLogger";

const attachRoutes = (
  app: e.Express,
  container: AwilixContainer<AppContainer>
) => {
  // attach routes here
  app.use(container.resolve("dogRouter"));
};

const exitHandler = () => {
  logger.info("shutting down server...");
  logger.info("closing DB connections...");
  logger.info("shutdown complete...");
};

const createServerExpress = () => {
  logger.info("bootstraping server...");
  const app = e();
  app.use(helmet());
  app.use(cors());
  app.use(bodyParser.json());
  app.use(morganMiddleware);

  const container = configureContainer();

  attachRoutes(app, container);

  // Handle Server Exit
  process.once("SIGINT", exitHandler);
  process.once("SIGUSR2", exitHandler);

  return app;
};

export { createServerExpress };
