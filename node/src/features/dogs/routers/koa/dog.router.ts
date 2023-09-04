import Router from "@koa/router";
import type { DogController } from "../../controllers/koa/dog.controller";

const createDogRouter = (dogController: DogController) => {
  const router = new Router();

  router.get("/", dogController.getAllDogs);

  router.get("/:id", dogController.getDogById);

  router.post("/", dogController.addDog);

  return router;
};

export { createDogRouter };
