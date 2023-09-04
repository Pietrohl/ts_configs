import { type Dog } from "../models/dog.model";

export interface DogRepository {
  getAllDogs(): Promise<Dog[]>;
  getDogById(id: number): Promise<Dog | undefined>;
  addDog(dog: Dog): Promise<void>;
}

export function createDogRepository(): DogRepository {
  const dogs: Dog[] = [];

  return {
    getAllDogs: async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 1);
      });
      return dogs;
    },
    getDogById: async (id: number) => {
      await new Promise((resolve) => {
        setTimeout(resolve, 1);
      });
      return dogs.find((dog) => dog.id === id);
    },
    addDog: async (dog: Dog) => {
      await new Promise((resolve) => {
        setTimeout(resolve, 1);
      });
      dogs.push(dog);
    },
  };
}
