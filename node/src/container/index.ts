import {
  asFunction,
  asValue,
  createContainer,
  InjectionMode,
  type AwilixContainer,
} from "awilix";
import { logger } from "../utils/logger";
import { config } from "../config";
import Express from "express";
import KoaRouter from "@koa/router";

import {
  type DogRepository,
  type DogService,
  createDogRepository,
  createDogService,
  createDogController,
  createDogRouter,
} from "../features/dogs";
import type { DogController as DogExpressController } from "../features/dogs/controllers/express/dog.controller";
import type { DogController as DogKoaController } from "../features/dogs/controllers/koa/dog.controller";

// Add services, controllers and config here
export interface AppContainer {
  config: typeof config;
  dogRepository: DogRepository;
  dogService: DogService;

  // Add scoped services, controllers and config here
}

// Add express specific services, controllers and config here
export interface ExpressAppContainer extends AppContainer {
  dogController: DogExpressController;
  dogRouter: Express.Router;
}

// Add koa specific services, controllers and config here
export interface KoaAppContainer extends AppContainer {
  dogController: DogKoaController;
  dogRouter: KoaRouter;
}

export function configureContainer(
  containerType: "express"
): AwilixContainer<ExpressAppContainer>;
export function configureContainer(
  containerType: "koa"
): AwilixContainer<KoaAppContainer>;
export function configureContainer(
  containerType: "express" | "koa"
): AwilixContainer {
  logger.info("initiating container...");

  const containerConfig = {
    injectionMode: InjectionMode.CLASSIC,
  };

  let container: AwilixContainer<KoaAppContainer | ExpressAppContainer>;

  switch (containerType) {
    case "koa":
      // Create a new Awilix container
      container = createContainer<KoaAppContainer>(containerConfig);
      break;
    default:
      // Create a new Awilix container
      container = createContainer<ExpressAppContainer>(containerConfig);
  }

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
}
