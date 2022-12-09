import addUserAuthHook from "../hooks/user-authentication";

import { UserInstance } from "../types/user";
import { FastifyInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";

declare module "fastify" {
  interface FastifyRequest {
    currentUser: UserInstance;
  }
}

function privateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  addUserAuthHook(fastify);

  next();
}

export default privateRoutes;
