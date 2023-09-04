import type { AppContainer } from "../../../container";
import type { DogService } from "../services/dog.service";
import { createDogController as createDogKoaController } from "./koa/dog.controller";
import { createDogController as createFastifyController } from "./fastify/dog.controller";
import { createDogController as createDogExpressController } from "./express/dog.controller";

export function createDogController(
  config: AppContainer["config"],
  dogService: DogService
): ReturnType<typeof createDogKoaController>;
export function createDogController(
  config: AppContainer["config"],
  dogService: DogService
): ReturnType<typeof createDogExpressController>;
export function createDogController(
  config: AppContainer["config"],
  dogService: DogService
):
  | ReturnType<typeof createDogKoaController>
  | ReturnType<typeof createDogExpressController>
  | ReturnType<typeof createFastifyController> {
  if (config.SERVER_TYPE === "fastify")
    return createFastifyController (dogService);

  if (config.SERVER_TYPE === "koa") return createDogKoaController(dogService);

  return createDogExpressController(dogService);
}
