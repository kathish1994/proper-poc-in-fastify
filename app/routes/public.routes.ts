import { FastifyInstance } from "fastify";
import { Server, ServerResponse, IncomingMessage } from "http";

function publicRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  next();
}

export default publicRoutes;
