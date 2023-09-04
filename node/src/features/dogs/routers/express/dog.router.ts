/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { asyncHandler } from "../../../../utils/asyncHandler";
import type { DogController } from "../../controllers/express/dog.controller";

const createDogRouter = (dogController: DogController) => {
  const router = Router();

  router.get("/", asyncHandler(dogController.getAllDogs));

  router.get("/:id", asyncHandler(dogController.getDogById));

  router.post("/", asyncHandler(dogController.addDog));

  return router;
};

export { createDogRouter };
