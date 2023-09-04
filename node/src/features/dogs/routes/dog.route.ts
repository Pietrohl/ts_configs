/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { type DogController } from "../controllers/dog.controller";
import { asyncHandler } from "../../../utils/asyncHandler";

const createDogRouter = (dogController: DogController) => {
  const router = Router();

  router.get("/", asyncHandler(dogController.getAllDogs));

  router.get("/:id", asyncHandler(dogController.getDogById));

  router.post("/", asyncHandler(dogController.addDog));

  return router;
};

export { createDogRouter };
