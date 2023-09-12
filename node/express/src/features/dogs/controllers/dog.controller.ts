import type { NextFunction, Request, Response } from "express";
import type { Dog } from "../models/dog.model";
import type { DogService } from "../services/dog.service";

type expressHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export interface DogController {
  getAllDogs: expressHandler;
  getDogById: expressHandler;
  addDog: expressHandler;
}

export function createDogController(dogService: DogService): DogController {
  return {
    getAllDogs: async (_req: Request, res: Response) => {
      const dogs = await dogService.getAllDogs();
      res.json(dogs);
    },
    getDogById: async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const dog = await dogService.getDogById(id);

      if (dog) {
        res.json(dog);
      } else {
        res.status(404).json({ message: "Dog not found" });
      }
    },
    addDog: async (req: Request, res: Response) => {
      await dogService.addDog(req.body as Dog);
      res.status(201).json({ message: "Dog added successfully" });
    },
  };
}
