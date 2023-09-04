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
      return dogs;
    },
    getDogById: async (id: number) => {
      return dogs.find((dog) => dog.id === id);
    },
    addDog: async (dog: Dog) => {
      dogs.push(dog);
    },
  };
}
