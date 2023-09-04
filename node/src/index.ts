import { config } from "./config";
import { createServer, type Server } from "./server";
import { logger } from "./utils/logger";
import os from "os";
import cluster from "cluster";
import process from "process";

async function bootstrap(app: Promise<Server> | Server) {
  const numCPUs = Math.ceil(os.availableParallelism() / 2);

  if (cluster.isPrimary && process.env.CLUSTER === "true") {
    logger.info(`Primary ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      logger.info(`Forking process number ${i}...`);
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      logger.info(
        `worker ${worker.process.pid || ""} died code ${code} signal ${signal}`
      );
    });
  } else {
    try {
      (await app).listen(config.PORT, "0.0.0.0", () => {
        logger.info(`process ${process.pid} running on port: ${config.PORT}`);
      });
    } catch (error) {
      logger.error(error);
      process.exit(1);
    }
  }
}

void bootstrap(createServer());
