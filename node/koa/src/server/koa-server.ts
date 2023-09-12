// koa-server.ts
import type { AwilixContainer } from "awilix";
import Koa from "koa";
import type { AppContainer } from "../container";
import helmet from "koa-helmet";
import cors from "@koa/cors";
import { bodyParser } from "@koa/bodyparser";
import { koaLogger } from "../middleware/httpLogger";
import { logger } from "../utils/logger";

function attachRoutes(app: Koa, container: AwilixContainer<AppContainer>) {
  // Define Koa routes using the router and resolve dependencies from the container
  app.use(container.resolve("dogRouter").routes());
}

export function createServer(container: AwilixContainer<AppContainer>) {
  logger.info("creating koa server...");
  const app = new Koa();

  // Middleware
  app.use(helmet());
  app.use(cors());
  app.use(bodyParser());
  app.use(koaLogger);

  // Attach routes
  attachRoutes(app, container); // Pass the router to attachRoutes

  return app;
}
