import type { DogController as DogKoaController } from "../controllers/koa/dog.controller";
import type { DogController as DogFastifyController } from "../controllers/fastify/dog.controller";
import type { DogController as DogExpressController } from "../controllers/express/dog.controller";
import { createDogRouter as createDogKoaRouter } from "./koa/dog.router";
import { createDogRouter as createDogFastifyRouter } from "./fastify/dog.router";
import { createDogRouter as createDogExpressRouter } from "./express/dog.router";
import type { AppContainer } from "../../../container";
import Express from "express";
import KoaRouter from "../../../../types/koa__router";
import type { FastifyPluginCallback } from "fastify";

export function createDogRouter(
  config: AppContainer["config"],
  dogController: DogFastifyController
): FastifyPluginCallback;
export function createDogRouter(
  config: AppContainer["config"],
  dogController: DogKoaController
): KoaRouter;
export function createDogRouter(
  config: AppContainer["config"],
  dogController: DogExpressController
): Express.Router;
export function createDogRouter(
  config: AppContainer["config"],
  dogController: DogExpressController | DogKoaController | DogFastifyController
): Express.Router | KoaRouter | FastifyPluginCallback {
  if (config.SERVER_TYPE === "fastify")
    return createDogFastifyRouter(dogController as DogFastifyController);

  if (config.SERVER_TYPE === "koa")
    return createDogKoaRouter(dogController as DogKoaController);

  return createDogExpressRouter(dogController as DogExpressController);
}
