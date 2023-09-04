import type { AwilixContainer } from "awilix";
import fastify from "fastify";
import type { AppContainer } from "../container";

export function createFastifyServer(_container: AwilixContainer<AppContainer>) {
  const app = fastify();
  return app;
}
