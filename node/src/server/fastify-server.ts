import type { AwilixContainer } from "awilix";
import fastify, { type FastifyInstance } from "fastify";
import type { FastifyAppContainer } from "../container";
import { logger } from "../utils/logger";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";

async function attachRoutes(
  app: FastifyInstance,
  container: AwilixContainer<FastifyAppContainer>
) {
  const router = container.resolve("dogRouter");

  // Define Fastify routes using the router and resolve dependencies from the container
  await app.register(router, { prefix: "/" });
}

export async function createFastifyServer(
  container: AwilixContainer<FastifyAppContainer>
) {
  logger.info("creating fastify server...");
  const app = fastify({
    logger: false,
  });

  // Middleware
  await app.register(helmet);
  await app.register(cors);

  await attachRoutes(app, container);

  return app.then((app) => ({
    ...app,
    listen: (port: number, host: string, callback: () => void) => {
      app.listen({ port, host }, callback);
    },
  }));
}
