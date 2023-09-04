import Logger from "koa-logger";
import { logger } from "../../utils/logger";

const koaLogger = Logger({
  transporter(_str, [_, method, url, status, time, length]) {
    logger.http(
      `${method} ${url} ${status || ""} res${length || ""} ${time || ""}`
    );
  },
});

export { koaLogger };
