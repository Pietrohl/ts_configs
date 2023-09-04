import Router from "@koa/router";
import type { Dog } from "../../models/dog.model";
import type { DogService } from "../../services/dog.service";

export type DogController = {
  getAllDogs: Router.Middleware;
  getDogById: Router.Middleware;
  addDog: Router.Middleware;
};

export function createDogController(dogService: DogService): DogController {
  return {
    getAllDogs: async (ctx) => {
      const dogs = await dogService.getAllDogs();
      ctx.body = dogs;
    },
    getDogById: async (ctx) => {
      const id = parseInt(ctx.params.id);
      const dog = await dogService.getDogById(id);

      if (dog) {
        ctx.body = dog;
      } else {
        ctx.status = 404;
        ctx.body = { message: "Dog not found" };
      }
    },
    addDog: async (ctx) => {
      await dogService.addDog(ctx.body as Dog);
      ctx.status = 201;
      ctx.body = { message: "Dog added successfully" };
    },
  };
}
