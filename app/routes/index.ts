import renderError from "./render-error";
import publicRoutes from "./public.routes";
import privateRoutes from "./private.routes";

import { FastifyInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";

function routes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.register(publicRoutes);
  fastify.register(privateRoutes);
  fastify.setErrorHandler((error, req, reply) => {
    renderError(req, reply, error);
  });
  next();
}

export default routes;
