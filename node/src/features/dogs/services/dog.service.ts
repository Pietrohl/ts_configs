import type { Dog } from "../models/dog.model";
import { type DogRepository } from "../repositories/dog.repository";

export interface DogService {
  getAllDogs(): Promise<Dog[]>;
  getDogById(id: number): Promise<Dog | undefined>;
  addDog(dog: Dog): Promise<void>;
}



export function createDogService(dogRepository: DogRepository): DogService {
  return {
    getAllDogs: async () => {
      return dogRepository.getAllDogs();
    },
    getDogById: async (id: number) => {
      return dogRepository.getDogById(id);
    },
    addDog: async (dog: Dog) => {
      await dogRepository.addDog(dog);
    },
  };
}
