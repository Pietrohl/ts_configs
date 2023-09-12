import Router from "@koa/router";
import type { DogController } from "../controllers/dog.controller";
import { DogDTO } from "../models/dog.DTO";

const createDogRouter = (dogController: DogController) => {
  const router = new Router();

  router.get("/", dogController.getAllDogs);

  router.get("/:id", dogController.getDogById);

  router.post("/", { body: DogDTO }, dogController.addDog);

  router.put("/:id", { body: DogDTO }, dogController.updateDog);

  return router;
};

export { createDogRouter };
