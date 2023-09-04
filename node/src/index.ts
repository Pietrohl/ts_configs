import { config } from "./config";
import { createServer, type Server } from "./server";
import { logger } from "./utils/logger";

async function bootstrap(app: Promise<Server> | Server) {
  try {
    (await app).listen(config.PORT, "0.0.0.0", () => {
      logger.info(`running on port: ${config.PORT}`);
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

void bootstrap(createServer());
