import winston from "winston";

const logLevel = process.env.NODE_ENV === "pruduction" ? "http" : "debug";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) =>
      `${info.timestamp as string} ${info.level}: ${info.message as string}`
  )
);

const format = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
);

const transports = [
  new winston.transports.Console({ format: consoleFormat }),
  // new winston.transports.File({format, filename: "logs/info.log", level: "info"}),
  //  ,new winston.transports.Http({ host:"", port:"" , level: 'error' }) // Could add a splunk log here
];

export const logger = winston.createLogger({
  level: logLevel,
  levels,
  format,
  transports,
});
