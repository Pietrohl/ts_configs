import type { DogController } from "../../controllers/fastify/dog.controller";
import { type FastifyPluginCallback } from "fastify";

function createDogRouter(dogController: DogController) {
  const router: FastifyPluginCallback = (instance, _ops, done) => {
    instance.get("/", dogController.getAllDogs);

    instance.get<{Params: {id: string}}>("/:id", dogController.getDogById);

    instance.post("/", dogController.addDog);

    done();
  };
  return router;
}

export { createDogRouter };
