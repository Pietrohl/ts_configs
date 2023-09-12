import type { DogService } from "../../services/dog.service";
import type { DogDTO } from "../../models/dog.DTO";
import type { DefaultContext, DefaultState, Middleware } from "koa";

type UpdateContext = DefaultContext & { params: { id: string } };


export type DogController = {
  getAllDogs: Middleware
  getDogById: Middleware<DefaultState, UpdateContext>;
  addDog: Middleware;
  updateDog: Middleware<DefaultState, UpdateContext>;
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
      const dto = ctx.body as DogDTO;
      await dogService.addDog(dto);
      ctx.status = 201;
      ctx.body = { message: "Dog added successfully" };
    },
    updateDog: async (ctx) => {
      const id = parseInt(ctx.params.id);
      const dto = ctx.body as DogDTO;
      await dogService.updateDog({ id, ...dto });
      ctx.status = 201;
      ctx.body = { message: "Dog updated successfully" };
    },
  };
}
