import fastify, { type FastifyInstance } from "fastify";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import type { AwilixContainer } from "awilix";
import type { FastifyAppContainer } from "../container";
import { logger } from "../utils/logger";
import { pinoConfig } from "../utils/logger";
import {
  createOpenapiConfig,
  swaggerUi,
} from "../middleware/swagger/fastify-swagger.middleware";
import { TypeBoxValidatorCompiler, type TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

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
    logger: pinoConfig,
  });

  // Middleware
  await app.register(helmet);
  await app.register(cors);
  await app.register(swagger, createOpenapiConfig());

  app.withTypeProvider<TypeBoxTypeProvider>();
  app.setValidatorCompiler(TypeBoxValidatorCompiler)


  // Attaching Routes
  await attachRoutes(app, container);
  await app.register(swaggerUi);

  return app.then((app) => {
    return {
      ...app,
      listen: (port: number, host: string, callback: () => void) => {
        app.listen({ port, host }, callback);
      },
    };
  });
}
