
#### Basic package.json

Copy and edit package.json
```
{
  "name": "node_scaffold",
  "version": "1.0.0",
  "description": "Quick config for node projects",
  "main": "./dist/index.js",
  "scripts": {
      "dev": "run-p watch:*",
      "watch:compile": "swc src -w --out-dir dist",
      "watch:dev": "nodemon --watch \"dist/**/*\" -e js ./dist/index.js",
      "build": "swc src -d dist",
      "start": "node dist/index.js NODE_ENV=production",
      "clean": "rm -rf dist",
      "debug": "run-s test:*",
      "test": "jest --detectOpenHandles",
      "test:watch": "jest --watch",
      "test:coverage": "jest --coverage",
      "lint": "eslint \"{src,apps,libs,test,spec}/**/*.ts\" --fix"
    },
  "dependencies": {
    "dotenv": "^16.0.3",
    "redis": "^4.6.6",
    "winston": "^3.8.2",
    "redoc": "^2.1.1",
    "passport": "^0.6.0",
    "awilix": "^8.0.1",
    // Express only Modules
    "express": "^4.18.2",
    "express-session": "^1.17.3",
    "morgan": "^1.10.0",
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    // Koa only Modules
    "koa": "^2.14.2",
    "@koa/bodyparser": "^5.0.0",
    "@koa/cors": "^4.0.0",
    "koa-helmet": "^7.0.2",
    "koa-logger": "^3.2.1",
    // Fastify only Modules
    "fastify": "^4.22.0",
    "@fastify/redis": "^6.1.1",
    "@fastify/awilix": "^3.2.0",
    "@fastify/passport": "^2.3.0",
    "@fastify/cookie": "^9.0.4",
    "@fastify/cors": "^8.3.0",
    "@fastify/helmet": "^11.0.0",
    "@fastify/swagger": "^8.9.0"
  },
  "devDependencies": {
    "typescript": "^5.0.4",
    "@types/node": "^20.1.1",
    "eslint": "^8.40.0",
    "eslint-plugin-prettier": "^4.2.1",
    "eslint-config-prettier": "^8.8.0",
    "@typescript-eslint/eslint-plugin": "^5.59.5",
    "@typescript-eslint/parser": "^5.59.5",
    "prettier": "^2.8.8",
    "nodemon": "^2.0.22",
    "npm-run-all": "^4.1.5",
    // SWC .ts compiler and types
    "@swc/cli": "^0.1.62",
    "@swc/core": "^1.3.57",
    "@swc/jest": "^0.2.26",
    // Jest types for Jest
    "jest": "^29.5.0",
    "@jest/globals": "^29.5.0",
    "@types/jest": "^29.5.1",
    "@types/supertest": "^2.0.12",
    // Express Types
    "@types/express": "^4.17.17",
    "@types/cors": "^2.8.13",
    "@types/cookie-parser": "^1.4.3",
    "@types/morgan": "^1.9.4"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/Pietrohl/ts_configs/node"
  },
  "author": "Pietro Labadessa",
  "license": "ISC"
}
```
#### Express Middleware Extensions

https://github.com/orgs/expressjs/repositories?type=all

#### Koa Middleware Extensions
https://github.com/koajs/koa/wiki#middleware
https://github.com/orgs/koajs/repositories?type=all

####  Fastify Plugins

https://fastify.dev/ecosystem/
https://github.com/orgs/fastify/repositories?type=all
https://github.com/israeleriston/awesome-fastify

#### More libs



To update dependencies
```
npx npm-check-updates -u
npm install 
```