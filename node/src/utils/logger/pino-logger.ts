import type { WriteStream } from "fs";
import pino from "pino";

const transports: WriteStream = pino.transport({
  targets: [
    // { target: "pino/file", level: "info", options: { destination: `logs/info.log` },    },
    { level: "info", target: "pino-pretty", options: { colorize: true } },
  ],
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
