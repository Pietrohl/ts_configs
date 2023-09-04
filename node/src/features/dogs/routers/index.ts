import type { DogController as DogKoaController } from "../controllers/koa/dog.controller";
import type { DogController } from "../controllers/express/dog.controller";
import { createDogRouter as createDogKoaRouter } from "./koa/dog.router";
import { createDogRouter as createDogExpressRouter } from "./express/dog.router";
import type { AppContainer } from "../../../container";
import Express from "express";
import KoaRouter from "@koa/router";

export function createDogRouter(
  config: AppContainer["config"],
  dogController: DogKoaController
): KoaRouter;
export function createDogRouter(
  config: AppContainer["config"],
  dogController: DogController
): Express.Router;
export function createDogRouter(
  config: AppContainer["config"],
  dogController: DogController | DogKoaController
): Express.Router | KoaRouter {
  if (config.SERVER_TYPE === "koa")
    return createDogKoaRouter(dogController as DogKoaController);

  return createDogExpressRouter(dogController as DogController);
}
