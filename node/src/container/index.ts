import { asFunction, asValue, createContainer, InjectionMode } from "awilix";
import { logger } from "../utils/logger";
import { config } from "../config";
import type { Router } from "express";
import {
  type DogRepository,
  type DogService,
  type DogController,
  createDogRepository,
  createDogService,
  createDogController,
  createDogRouter,
} from "../features/dogs";

// Add services, controllers and config here
export interface AppContainer {
  config: typeof config;
  dogRepository: DogRepository;
  dogService: DogService;
  dogController: DogController;
  dogRouter: Router;

  // Add scoped services, controllers and config here
}

export const configureContainer = () => {
  logger.info("initiating container...");

  // Create a new Awilix container
  const container = createContainer<AppContainer>({
    injectionMode: InjectionMode.CLASSIC,
  });

  // Register dependencies
  container.register({
    // Config
    config: asValue(config),

    // Repositories
    dogRepository: asFunction(createDogRepository).singleton(),

    // Services
    dogService: asFunction(createDogService).singleton(),

    // Controllers
    dogController: asFunction(createDogController).singleton(),

    // Routers
    dogRouter: asFunction(createDogRouter).singleton(),
  });

  return container;
};
