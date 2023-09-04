import type { WriteStream } from "fs";
import pino from "pino";

const targets = [];

if (process.env.NODE_ENV === "production") {
  targets.push({
    target: "pino/file",
    level: "info",
    options: { destination: `logs/info.log` },
  });
} else {
  targets.push({
    level: "info",
    target: "pino-pretty",
    options: { colorize: true },
  });
}

const transports: WriteStream = pino.transport({
  targets,
}) as WriteStream;

export const logger = pino(
  {
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    customLevels: {
      http: 25,
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  transports
);
