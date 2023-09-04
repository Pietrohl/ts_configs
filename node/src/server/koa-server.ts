// koa-server.ts
import type { AwilixContainer } from "awilix";
import Koa from "koa";
import type { KoaAppContainer } from "../container";
import helmet from "koa-helmet";
import cors from "@koa/cors";
import { bodyParser } from "@koa/bodyparser";
import { koaLogger } from "../middleware/httpLogger/koaLogger.middleware";
import { logger } from "../utils/logger";

function attachRoutes(app: Koa, container: AwilixContainer<KoaAppContainer>) {
  // Define Koa routes using the router and resolve dependencies from the container
  app.use(container.resolve("dogRouter").routes());
}

export function createKoaServer(container: AwilixContainer<KoaAppContainer>) {
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
