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
import KoaRouter from "../../types/koa__router";

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
import type { FastifyPluginCallback } from "fastify";

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

// Add Fastify specific services, controllers and config here
export interface FastifyAppContainer extends AppContainer {
  dogController: DogExpressController;
  dogRouter: FastifyPluginCallback;
}

export function configureContainer(
  containerType: "fastify"
): AwilixContainer<FastifyAppContainer>;
export function configureContainer(
  containerType: "express"
): AwilixContainer<ExpressAppContainer>;
export function configureContainer(
  containerType: "koa"
): AwilixContainer<KoaAppContainer>;
export function configureContainer(
  containerType: "express" | "koa" | "fastify"
): AwilixContainer {
  logger.info("initiating container...");

  const containerConfig = {
    injectionMode: InjectionMode.CLASSIC,
  };

  let container: AwilixContainer<
    KoaAppContainer | ExpressAppContainer | FastifyAppContainer
  >;

  switch (containerType) {
    case "fastify":
      // Create a new Awilix container
      container = createContainer<FastifyAppContainer>(containerConfig);
      break;

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
