import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const config = {
  PORT: Number(process.env.PORT) || 3000,
  LOGGER: "pino",
  // Add more configs here
  //   PUBLIC_FOLDER: process.env.PUBLIC_FOLDER,
  //   REDIS_URL: process.env.REDIS_URL,

  // This variable is only for tamplate app, for a production app you should use single server implementation
  SERVER_TYPE: process.env.SERVER_TYPE || "express", // Default to Express
};

export { config };
