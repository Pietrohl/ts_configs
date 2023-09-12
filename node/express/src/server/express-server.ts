import type { AwilixContainer } from "awilix";
import bodyParser from "body-parser";
import cors from "cors";
import e from "express";
import helmet from "helmet";
import { type AppContainer } from "../container";
import { logger } from "../utils/logger";
import { morganMiddleware } from "../middleware/httpLogger";

const attachRoutes = (
  app: e.Express,
  container: AwilixContainer<AppContainer>
) => {
  // attach routes here
  app.use(container.resolve("dogRouter"));
};

const createServer = (
  container: AwilixContainer<AppContainer>
) => {
  logger.info("creating express server...");
  const app = e();

  // Middleware
  app.use(helmet());
  app.use(cors());
  app.use(bodyParser.json());
  app.use(morganMiddleware);

  // Attach routes
  attachRoutes(app, container);

  return app;
};

export { createServer };
