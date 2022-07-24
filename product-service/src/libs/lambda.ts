import middy from "@middy/core"
import jsonBodyParser from "@middy/http-json-body-parser";
import { errorHandler, eventLogger } from "src/middleware";

export const middyfy = (handler) => {
  return middy(handler).use(jsonBodyParser()).use(eventLogger()).use(errorHandler());
};

