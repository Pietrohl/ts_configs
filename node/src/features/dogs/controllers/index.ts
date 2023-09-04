import type { AppContainer } from "../../../container";
import type { DogService } from "../services/dog.service";
import { createDogController as createDogExpressController } from "./express/dog.controller";
import { createDogController as createDogKoaController } from "./koa/dog.controller";

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
  | ReturnType<typeof createDogExpressController> {
  if (config.SERVER_TYPE === "koa") return createDogKoaController(dogService);

  return createDogExpressController(dogService);
}
